/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Authentication Module
   Google, Email/Password, Teacher roles, Firestore sync
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
            }
            if (this.onAuthChange) this.onAuthChange(user);
        });
    }

    // ─── USER DATA ───
    async loadUserData() {
        if (!this.currentUser) return;
        try {
            const doc = await fbDB.collection('users').doc(this.currentUser.uid).get();
            if (doc.exists) {
                this.userData = doc.data();
            }
        } catch (e) {
            console.warn('[Auth] Failed to load user data:', e);
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
    getClassCode() { return this.userData?.classCode || ''; }
    isTeacher() { return this.getRole() === 'teacher'; }
    isAdmin() { return this.isAdminEmail(this.currentUser?.email) || this.getRole() === 'admin' || this.getRole() === 'teacher'; }

    // ─── EMAIL/PASSWORD REGISTRATION ───
    async registerWithEmail(email, password, displayName, classCode) {
        const cred = await fbAuth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName });
        
        const isMaster = this.isAdminEmail(email);
        const role = isMaster ? 'teacher' : 'student';
        const assignedClassCode = isMaster ? 'TURMA-UNICAP-MESTRE' : (classCode || '');

        const userData = {
            displayName, email,
            role,
            classCode: assignedClassCode,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            gameProgress: null
        };
        await fbDB.collection('users').doc(cred.user.uid).set(userData);

        if (isMaster) {
            await fbDB.collection('classes').doc(assignedClassCode).set({
                teacherUid: cred.user.uid,
                teacherName: displayName,
                name: 'Turma do Mestre - Rennan Raffaele',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                students: []
            }, { merge: true });
        }

        this.userData = userData;
        return cred.user;
    }

    // ─── TEACHER REGISTRATION ───
    async registerTeacher(email, password, displayName) {
        const cred = await fbAuth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName });
        const classCode = 'TURMA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const userData = {
            displayName, email,
            role: 'teacher',
            classCode,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await fbDB.collection('users').doc(cred.user.uid).set(userData);
        await fbDB.collection('classes').doc(classCode).set({
            teacherUid: cred.user.uid,
            teacherName: displayName,
            name: displayName + ' - Turma',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            students: []
        });
        this.userData = userData;
        return { user: cred.user, classCode };
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
            const classCode = isMaster ? 'TURMA-UNICAP-MESTRE' : '';
            const userData = {
                displayName: cred.user.displayName || 'Jogador',
                email: cred.user.email,
                role, classCode,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                gameProgress: null
            };
            await fbDB.collection('users').doc(cred.user.uid).set(userData);

            if (isMaster) {
                await fbDB.collection('classes').doc(classCode).set({
                    teacherUid: cred.user.uid,
                    teacherName: cred.user.displayName || 'Prof. Rennan Raffaele',
                    name: 'Turma do Mestre - Rennan Raffaele',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    students: []
                }, { merge: true });
            }

            this.userData = userData;
        } else if (isMaster && doc.data().role !== 'teacher') {
            // Garantir que a conta rennan.raffaele@unicap.br sempre tenha o role teacher
            await fbDB.collection('users').doc(cred.user.uid).update({
                role: 'teacher',
                classCode: doc.data().classCode || 'TURMA-UNICAP-MESTRE'
            });
            this.userData = { ...doc.data(), role: 'teacher' };
        }
        return cred.user;
    }

    // ─── JOIN CLASS ───
    async joinClass(classCode) {
        if (!this.currentUser) return false;
        const classDoc = await fbDB.collection('classes').doc(classCode).get();
        if (!classDoc.exists) return false;
        await fbDB.collection('users').doc(this.currentUser.uid).update({ classCode });
        this.userData = { ...this.userData, classCode };
        // Add student to class
        const classData = classDoc.data();
        const students = classData.students || [];
        if (!students.includes(this.currentUser.uid)) {
            students.push(this.currentUser.uid);
            await fbDB.collection('classes').doc(classCode).update({ students });
        }
        return true;
    }

    // ─── GET CLASS STUDENTS ───
    async getClassStudents() {
        if (!this.isTeacher() || !this.userData?.classCode) return [];
        const students = [];
        try {
            const classDoc = await fbDB.collection('classes').doc(this.userData.classCode).get();
            if (classDoc.exists) {
                const sids = classDoc.data().students || [];
                for (const sid of sids) {
                    const sDoc = await fbDB.collection('users').doc(sid).get();
                    if (sDoc.exists) {
                        students.push({ uid: sid, ...sDoc.data() });
                    }
                }
            }
        } catch (e) { console.warn('[Auth] getClassStudents error:', e); }
        return students;
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
            const doc = await fbDB.collection('users').doc(this.currentUser.uid).get();
            if (doc.exists && doc.data().gameProgress) return doc.data().gameProgress;
        } catch (e) { console.warn('[Auth] loadProgress failed:', e); }
        return null;
    }

    // ─── HELPERS ───
    getDisplayName() {
        if (!this.currentUser) return '';
        return this.currentUser.displayName || this.currentUser.email?.split('@')[0] || '';
    }
    isSignedIn() { return !!this.currentUser; }
}

const authManager = new AuthManager();
