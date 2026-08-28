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
                await this.loadUserData();
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
            const docPromise = fbDB.collection('users').doc(this.currentUser.uid).get();
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000));
            const doc = await Promise.race([docPromise, timeoutPromise]);
            const isMaster = this.isAdminEmail(this.currentUser.email);

            if (doc && doc.exists) {
                const data = doc.data();
                this.userData = data;
                // Auto-promoção garantida para o email do mestre
                if (isMaster && data.role !== 'teacher') {
                    try {
                        await fbDB.collection('users').doc(this.currentUser.uid).update({ role: 'teacher' });
                        this.userData.role = 'teacher';
                    } catch (e) {
                        console.warn('[Auth] Role sync update notice:', e);
                    }
                }
                // Salva photoURL atualizada se o usuário tiver feito login via Google
                if (this.currentUser.photoURL && data.photoURL !== this.currentUser.photoURL) {
                    try {
                        await fbDB.collection('users').doc(this.currentUser.uid).update({ photoURL: this.currentUser.photoURL });
                        this.userData.photoURL = this.currentUser.photoURL;
                    } catch(e) {}
                }
            } else if (isMaster) {
                // Cria documento inicial se não existia
                const initialData = {
                    displayName: this.currentUser.displayName || 'Mestre Rennan',
                    email: this.currentUser.email,
                    photoURL: this.currentUser.photoURL || '',
                    role: 'teacher',
                    classCode: '',
                    guildCode: '',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    gameProgress: null
                };
                try {
                    await fbDB.collection('users').doc(this.currentUser.uid).set(initialData);
                    this.userData = initialData;
                } catch (e) {
                    console.warn('[Auth] Init user profile notice:', e);
                }
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
    
    isTeacher() { return this.isAdminEmail(this.currentUser?.email) || this.getRole() === 'teacher'; }
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
            photoURL: '',
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
        if (this.isAdminEmail(cred.user?.email)) {
            try {
                const docRef = fbDB.collection('users').doc(cred.user.uid);
                const doc = await docRef.get();
                if (doc.exists && doc.data().role !== 'teacher') {
                    await docRef.update({ role: 'teacher' });
                }
            } catch(e) {
                console.warn('[Auth] Admin role sync notice:', e);
            }
        }
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
        const photoURL = cred.user.photoURL || '';

        if (!doc.exists) {
            const role = isMaster ? 'teacher' : 'student';
            const userData = {
                displayName: cred.user.displayName || 'Jogador',
                email: cred.user.email,
                photoURL,
                role,
                classCode: '',
                guildCode: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                gameProgress: null
            };
            await fbDB.collection('users').doc(cred.user.uid).set(userData);
            this.userData = userData;
        } else {
            const currentData = doc.data();
            const updates = {};
            if (isMaster && currentData.role !== 'teacher') updates.role = 'teacher';
            if (photoURL && currentData.photoURL !== photoURL) updates.photoURL = photoURL;
            if (Object.keys(updates).length > 0) {
                await fbDB.collection('users').doc(cred.user.uid).update(updates);
                this.userData = { ...currentData, ...updates };
            } else {
                this.userData = currentData;
            }
        }
        return cred.user;
    }

    // ─── CREATE NEW GUILD (TEACHER) ───
    async createGuild(guildName) {
        if (!this.currentUser) throw new Error('Usuário não autenticado.');
        
        // Garante que se for master admin, a permissão e o documento estejam sincronizados
        const isMaster = this.isAdminEmail(this.currentUser.email);
        if (!this.isTeacher() && !isMaster) {
            throw new Error('Apenas Mestres podem forjar Guildas.');
        }
        
        // Se o documento ainda não está com role teacher, garante antes de criar
        try {
            const userDoc = await fbDB.collection('users').doc(this.currentUser.uid).get();
            if (!userDoc.exists || userDoc.data().role !== 'teacher') {
                await fbDB.collection('users').doc(this.currentUser.uid).set({
                    displayName: this.getDisplayName() || 'Mestre',
                    email: this.currentUser.email,
                    role: 'teacher',
                    photoURL: this.getPhotoURL() || '',
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                this.userData = { ...(this.userData || {}), role: 'teacher' };
            }
        } catch(e) {
            console.warn('[Auth] Guild pre-check notice:', e);
        }

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
            chapterUnlocks: [1]
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
        if (!this.currentUser) return [];
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

    // ─── EDIT GUILD NAME (TEACHER) ───
    async editGuildName(guildCode, newName) {
        if (!this.currentUser) throw new Error('Usuário não autenticado.');
        if (!this.isTeacher() && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Apenas Mestres podem editar a Guilda.');
        }
        const name = (newName || '').trim();
        if (!name) throw new Error('O nome da Guilda não pode ser vazio.');
        const code = (guildCode || '').trim().toUpperCase();
        if (!code) throw new Error('Código de Guilda inválido.');

        const docRef = fbDB.collection('classes').doc(code);
        const docSnap = await docRef.get();
        if (!docSnap.exists) throw new Error('Guilda não encontrada.');
        
        const gData = docSnap.data();
        if (gData.teacherUid !== this.currentUser.uid && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Você não tem permissão para editar esta Guilda.');
        }

        await docRef.update({ name });
        return true;
    }

    // ─── DELETE GUILD (TEACHER) ───
    async deleteGuild(guildCode) {
        if (!this.currentUser) throw new Error('Usuário não autenticado.');
        if (!this.isTeacher() && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Apenas Mestres podem excluir a Guilda.');
        }
        const code = (guildCode || '').trim().toUpperCase();
        if (!code) throw new Error('Código de Guilda inválido.');

        const docRef = fbDB.collection('classes').doc(code);
        const docSnap = await docRef.get();
        if (!docSnap.exists) throw new Error('Guilda não encontrada.');

        const gData = docSnap.data();
        if (gData.teacherUid !== this.currentUser.uid && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Você não tem permissão para excluir esta Guilda.');
        }

        // Limpa classCode dos estudantes vinculados
        const sids = gData.students || [];
        for (const sid of sids) {
            try {
                const sRef = fbDB.collection('users').doc(sid);
                const sDoc = await sRef.get();
                if (sDoc.exists) {
                    const uData = sDoc.data();
                    if (uData.classCode === code || uData.guildCode === code) {
                        await sRef.update({ classCode: '', guildCode: '' });
                    }
                }
            } catch (e) {
                console.warn('[Auth] Could not unlink student on guild delete:', e);
            }
        }

        await docRef.delete();

        // Se o professor estava ativo nessa guilda, limpa da sessão local
        if (this.getClassCode() === code) {
            await fbDB.collection('users').doc(this.currentUser.uid).update({ classCode: '', guildCode: '' });
            this.userData = { ...this.userData, classCode: '', guildCode: '' };
        }

        return true;
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

    // ─── KICK / EXPEL STUDENT FROM GUILD (TEACHER) ───
    async kickStudent(studentUid, targetGuildCode) {
        if (!this.currentUser) throw new Error('Usuário não autenticado.');
        if (!this.isTeacher() && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Apenas Mestres podem remover aprendizes da Guilda.');
        }
        const guildCode = (targetGuildCode || this.getClassCode() || '').trim().toUpperCase();
        if (!guildCode) throw new Error('Guilda não especificada.');

        const guildRef = fbDB.collection('classes').doc(guildCode);
        const guildDoc = await guildRef.get();
        if (!guildDoc.exists) throw new Error('Guilda não encontrada.');
        
        const gData = guildDoc.data();
        if (gData.teacherUid !== this.currentUser.uid && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Você não tem permissão para gerenciar esta Guilda.');
        }

        const currentStudents = gData.students || [];
        const updatedStudents = currentStudents.filter(id => id !== studentUid);
        await guildRef.update({ students: updatedStudents });

        // Tenta desvincular o classCode do usuário expulso
        try {
            const userRef = fbDB.collection('users').doc(studentUid);
            const uDoc = await userRef.get();
            if (uDoc.exists) {
                const uData = uDoc.data();
                if (uData.classCode === guildCode || uData.guildCode === guildCode) {
                    await userRef.update({
                        classCode: '',
                        guildCode: ''
                    });
                }
            }
        } catch(e) {
            console.warn('[Auth] Could not update kicked student user doc:', e);
        }

        return true;
    }

    // ─── GET GUILD STUDENTS DATA (Mestre) ───
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

    // ─── GET ALL GUILD MEMBERS WITH COMPLETE PROFILES (Todos os membros) ───
    async getGuildMembers(targetGuildCode) {
        const code = targetGuildCode || this.getClassCode();
        if (!code) return [];
        const members = [];
        try {
            const guildDoc = await fbDB.collection('classes').doc(code).get();
            if (guildDoc.exists) {
                const gData = guildDoc.data();
                // Inclui o Mestre da guilda se existir
                if (gData.teacherUid) {
                    const tDoc = await fbDB.collection('users').doc(gData.teacherUid).get();
                    if (tDoc.exists) {
                        members.push({ uid: gData.teacherUid, isTeacher: true, ...tDoc.data() });
                    }
                }
                const sids = gData.students || [];
                for (const sid of sids) {
                    if (sid === gData.teacherUid) continue;
                    const sDoc = await fbDB.collection('users').doc(sid).get();
                    if (sDoc.exists) {
                        members.push({ uid: sid, isTeacher: false, ...sDoc.data() });
                    }
                }
            }
        } catch (e) {
            console.warn('[Auth] getGuildMembers error:', e);
        }
        return members;
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

    // ─── GET USER PROFILE BY UID ───
    async getUserProfile(uid) {
        if (!uid) return null;
        try {
            const doc = await fbDB.collection('users').doc(uid).get();
            if (doc.exists) {
                return { uid: doc.id, ...doc.data() };
            }
        } catch (e) {
            console.warn('[Auth] getUserProfile error:', e);
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

    async updateProfilePhoto(photoPath) {
        if (!this.currentUser) return;
        try {
            if (this.userData) {
                this.userData.photoURL = photoPath;
            }
            if (typeof fbDB !== 'undefined') {
                await fbDB.collection('users').doc(this.currentUser.uid).update({
                    photoURL: photoPath
                });
            }
            return true;
        } catch (e) {
            console.error('[Auth] updateProfilePhoto error:', e);
            throw e;
        }
    }

    // ─── HELPERS ───
    getDisplayName() {
        if (!this.currentUser) return '';
        return this.currentUser.displayName || this.currentUser.email?.split('@')[0] || '';
    }
    getPhotoURL() {
        return this.userData?.photoURL || this.currentUser?.photoURL || '';
    }
    isSignedIn() { return !!this.currentUser; }
    hasGuild() { return !!this.getClassCode(); }
}

const authManager = new AuthManager();
