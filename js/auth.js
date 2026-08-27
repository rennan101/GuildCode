/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Authentication & Guild Management Module
   Google, Email/Password, Multi-Guild Support, Teacher roles, Firestore sync
   ═══════════════════════════════════════════════════════════════ */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.userData = null;
        this.onAuthChange = null;
    }

    init() {
        fbAuth.onAuthStateChanged(async (user) => {
            this.currentUser = user;
            if (user) {
                // Não bloqueia o fluxo; carrega em paralelo
                this.loadUserData();
            } else {
                this.userData = null;
            }
            if (this.onAuthChange) this.onAuthChange(user);
        });
    }

    // ─── USER DATA ───
    async loadUserData() {
        if (!this.currentUser) return;
        try {
            // Timeout de 2.5s para evitar travamento em caso de lentidão de rede
            const docPromise = fbDB.collection('users').doc(this.currentUser.uid).get();
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500));
            const doc = await Promise.race([docPromise, timeoutPromise]);
            if (doc && doc.exists) {
                this.userData = doc.data();
            }
        } catch (e) {
            console.warn('[Auth] Failed or timed out loading user data:', e);
        }
    }

    // ─── ADMIN / TEACHER DETECTION ───
    isAdminEmail(email) {
        if (!email) return false;
        return email.toLowerCase().trim() === 'rennan.raffaele@unicap.br';
    }

    getRole() {
        if (this.isAdminEmail(this.currentUser?.email) || this.isAdminEmail(this.userData?.email)) {
            return 'teacher';
        }
        return this.userData?.role || 'student';
    }
    
    getClassCode() { 
        return this.userData?.classCode || this.userData?.guildCode || ''; 
    }
    
    isTeacher() { return this.getRole() === 'teacher'; }
    isAdmin() { return this.isAdminEmail(this.currentUser?.email) || this.getRole() === 'admin' || this.getRole() === 'teacher'; }

    // ─── EMAIL/PASSWORD REGISTRATION ───
    async registerWithEmail(email, password, displayName, guildCode) {
        const cred = await fbAuth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName });
        
        const isMaster = this.isAdminEmail(email);
        const role = isMaster ? 'teacher' : 'student';
        const cleanedGuildCode = (guildCode || '').trim().toUpperCase();

        const userData = {
            displayName, email,
            role,
            classCode: cleanedGuildCode,
            guildCode: cleanedGuildCode,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            gameProgress: null
        };
        await fbDB.collection('users').doc(cred.user.uid).set(userData);

        if (cleanedGuildCode && role === 'student') {
            try {
                const guildRef = fbDB.collection('classes').doc(cleanedGuildCode);
                const guildDoc = await guildRef.get();
                if (guildDoc.exists) {
                    const students = guildDoc.data().students || [];
                    if (!students.includes(cred.user.uid)) {
                        students.push(cred.user.uid);
                        await guildRef.update({ students });
                    }
                }
            } catch (e) {
                console.warn('[Auth] Could not link student to guild on registration:', e);
            }
        }

        this.userData = userData;
        return cred.user;
    }

    // ─── EMAIL/PASSWORD LOGIN ───
    async loginWithEmail(email, password) {
        const cred = await fbAuth.signInWithEmailAndPassword(email, password);
        return cred.user;
    }

    // ─── GOOGLE SIGN-IN ───
    async loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        const cred = await fbAuth.signInWithPopup(provider);
        const doc = await fbDB.collection('users').doc(cred.user.uid).get();
        const isMaster = this.isAdminEmail(cred.user.email);

        if (!doc.exists) {
            const role = isMaster ? 'teacher' : 'student';
            const userData = {
                displayName: cred.user.displayName || 'Jogador',
                email: cred.user.email,
                role,
                classCode: '',
                guildCode: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                gameProgress: null
            };
            await fbDB.collection('users').doc(cred.user.uid).set(userData);
            this.userData = userData;
        } else if (isMaster && doc.data().role !== 'teacher') {
            await fbDB.collection('users').doc(cred.user.uid).update({ role: 'teacher' });
            this.userData = { ...doc.data(), role: 'teacher' };
        }
        return cred.user;
    }

    // ─── CREATE NEW GUILD (TEACHER) ───
    async createGuild(guildName) {
        if (!this.isTeacher() || !this.currentUser) throw new Error('Apenas Mestres podem forjar Guildas.');
        
        const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
        const guildCode = 'GUILDA-' + randomPart;

        const guildData = {
            classCode: guildCode,
            guildCode: guildCode,
            name: guildName || ('Guilda ' + randomPart),
            teacherUid: this.currentUser.uid,
            teacherName: this.getDisplayName() || 'Mestre',
            teacherEmail: this.currentUser.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            students: [],
            chapterUnlocks: { 1: true }
        };

        await fbDB.collection('classes').doc(guildCode).set(guildData);
        
        // Se o professor ainda não tem uma guilda ativa, seta esta
        if (!this.userData?.classCode) {
            await fbDB.collection('users').doc(this.currentUser.uid).update({ 
                classCode: guildCode,
                guildCode: guildCode 
            });
            this.userData = { ...this.userData, classCode: guildCode, guildCode: guildCode };
        }

        return guildData;
    }

    // ─── GET ALL GUILDS CREATED BY CURRENT TEACHER ───
    async getTeacherGuilds() {
        if (!this.isTeacher() || !this.currentUser) return [];
        try {
            const snap = await fbDB.collection('classes')
                .where('teacherUid', '==', this.currentUser.uid)
                .get();
            const guilds = [];
            snap.forEach(doc => guilds.push({ id: doc.id, ...doc.data() }));
            return guilds;
        } catch (e) {
            console.warn('[Auth] getTeacherGuilds error:', e);
            return [];
        }
    }

    // ─── JOIN GUILD (STUDENT) ───
    async joinGuild(guildCode) {
        if (!this.currentUser) throw new Error('Usuário não autenticado.');
        const code = (guildCode || '').trim().toUpperCase();
        if (!code) throw new Error('Digite o código da Guilda.');

        const guildDoc = await fbDB.collection('classes').doc(code).get();
        if (!guildDoc.exists) {
            throw new Error('Guilda não encontrada. Verifique o código fornecido pelo seu Mestre.');
        }

        const guildData = guildDoc.data();
        const students = guildData.students || [];
        if (!students.includes(this.currentUser.uid)) {
            students.push(this.currentUser.uid);
            await fbDB.collection('classes').doc(code).update({ students });
        }

        await fbDB.collection('users').doc(this.currentUser.uid).update({ 
            classCode: code,
            guildCode: code 
        });
        this.userData = { ...this.userData, classCode: code, guildCode: code };

        return guildData;
    }

    // ─── GET GUILD STUDENTS DATA ───
    async getGuildStudents(targetGuildCode) {
        const code = targetGuildCode || this.getClassCode();
        if (!code) return [];
        const students = [];
        try {
            const guildDoc = await fbDB.collection('classes').doc(code).get();
            if (guildDoc.exists) {
                const sids = guildDoc.data().students || [];
                for (const sid of sids) {
                    const sDoc = await fbDB.collection('users').doc(sid).get();
                    if (sDoc.exists) {
                        students.push({ uid: sid, ...sDoc.data() });
                    }
                }
            }
        } catch (e) { 
            console.warn('[Auth] getGuildStudents error:', e); 
        }
        return students;
    }

    // ─── GET CURRENT GUILD INFO ───
    async getCurrentGuildInfo() {
        const code = this.getClassCode();
        if (!code) return null;
        try {
            const doc = await fbDB.collection('classes').doc(code).get();
            if (doc.exists) return { id: doc.id, ...doc.data() };
        } catch (e) {
            console.warn('[Auth] getCurrentGuildInfo error:', e);
        }
        return null;
    }

    // ─── LOGOUT ───
    async logout() {
        await fbAuth.signOut();
        this.currentUser = null;
        this.userData = null;
    }

    // ─── FIRESTORE: SAVE/LOAD PROGRESS ───
    async saveProgress(gameState) {
        if (!this.currentUser) return;
        try {
            await fbDB.collection('users').doc(this.currentUser.uid).update({
                gameProgress: gameState,
                lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) { console.warn('[Auth] saveProgress failed:', e); }
    }

    async loadProgress() {
        if (!this.currentUser) return null;
        try {
            const docPromise = fbDB.collection('users').doc(this.currentUser.uid).get();
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000));
            const doc = await Promise.race([docPromise, timeoutPromise]);
            if (doc && doc.exists && doc.data().gameProgress) return doc.data().gameProgress;
        } catch (e) { console.warn('[Auth] loadProgress failed or timed out:', e); }
        return null;
    }

    // ─── HELPERS ───
    getDisplayName() {
        if (!this.currentUser) return '';
        return this.currentUser.displayName || this.currentUser.email?.split('@')[0] || '';
    }
    isSignedIn() { return !!this.currentUser; }
    hasGuild() { return !!this.getClassCode(); }
}

const authManager = new AuthManager();
