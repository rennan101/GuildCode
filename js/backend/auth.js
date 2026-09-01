/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Authentication & Guild Management Module
   Google, Email/Password, Multi-Guild Support, Teacher roles, Firestore sync
   ═══════════════════════════════════════════════════════════════ */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.userData = null;
        this.onAuthChange = null;
        this.currentSessionId = this._getOrCreateLocalSessionId();
        this._sessionUnsubscribe = null;
        this.onConcurrentSessionTerminated = null;
    }

    _getOrCreateLocalSessionId() {
        let sid = sessionStorage.getItem('gc_active_session_id');
        if (!sid) {
            sid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
            sessionStorage.setItem('gc_active_session_id', sid);
        }
        return sid;
    }

    _generateNewSessionId() {
        const sid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        this.currentSessionId = sid;
        sessionStorage.setItem('gc_active_session_id', sid);
        return sid;
    }

    getCurrentUser() {
        return this.currentUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
    }

    isSignedIn() {
        return !!this.getCurrentUser();
    }

    getRandomDefaultAvatar(isTeacher = false) {
        if (isTeacher) return 'assets/avatars/avatar_01.png';
        // Avatar inicial padrão para todos os novos alunos: Neon Coder (avatar_02.png)
        return 'assets/avatars/avatar_02.png';
    }

    init() {
        fbAuth.onAuthStateChanged(async (user) => {
            this.currentUser = user;
            if (user) {
                try {
                    await this.loadUserData();
                } catch(e) {}
                this._listenSessionValidity(user.uid);
            } else {
                this.userData = null;
                this._stopSessionListener();
            }
            if (this.onAuthChange) this.onAuthChange(user);
        });
    }

    // ─── SINGLE ACTIVE SESSION MONITOR (IMPEÇO DE DUPLO LOGIN) ───
    _stopSessionListener() {
        if (this._sessionUnsubscribe) {
            try { this._sessionUnsubscribe(); } catch (e) {}
            this._sessionUnsubscribe = null;
        }
    }

    async claimActiveSession(uid) {
        if (!uid || typeof fbDB === 'undefined') return;
        const sid = this._generateNewSessionId();
        try {
            await fbDB.collection('users').doc(uid).set({
                activeSessionId: sid,
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (e) {
            console.warn('[Auth] claimActiveSession notice:', e);
        }
    }

    _listenSessionValidity(uid) {
        this._stopSessionListener();
        if (!uid || typeof fbDB === 'undefined') return;

        // Se a sessão local ainda não foi sincronizada, lê do sessionStorage
        if (!this.currentSessionId) {
            this.currentSessionId = sessionStorage.getItem('gc_active_session_id');
        }

        let isInitialSnapshot = true;

        // Monitora em tempo real se um novo login foi efetuado em outro dispositivo/aba
        this._sessionUnsubscribe = fbDB.collection('users').doc(uid).onSnapshot((doc) => {
            if (!doc || !doc.exists || !this.currentUser) return;
            const data = doc.data();
            const remoteSessionId = data.activeSessionId;

            if (isInitialSnapshot) {
                isInitialSnapshot = false;
                // No primeiro snapshot, se já existe uma sessão remota e este cliente não tinha uma própria registrada no login, adota a remota
                if (!this.currentSessionId && remoteSessionId) {
                    this.currentSessionId = remoteSessionId;
                    sessionStorage.setItem('gc_active_session_id', remoteSessionId);
                    return;
                } else if (!remoteSessionId) {
                    // Se o Firestore não tinha session gravada, grava a atual
                    this.claimActiveSession(uid);
                    return;
                } else if (this.currentSessionId && remoteSessionId !== this.currentSessionId) {
                    // Se viemos de um reload onde o Firestore já tem outra sessão mais recente gravada
                    // e nós não acabamos de logar nesta aba
                    return;
                }
            }

            // Se um outro dispositivo/aba realizou um novo login (modificou o activeSessionId para um valor diferente do nosso)
            if (remoteSessionId && this.currentSessionId && remoteSessionId !== this.currentSessionId) {
                console.warn('[Auth] Nova sessão detectada em outro dispositivo/navegador. Desconectando sessão anterior...');
                this._handleSessionKicked();
            }
        }, (err) => {
            console.warn('[Auth] Session monitor notice:', err);
        });
    }

    async _handleSessionKicked() {
        this._stopSessionListener();
        sessionStorage.removeItem('gc_active_session_id');
        this.currentSessionId = null;
        
        // Desloga o cliente local
        try {
            await fbAuth.signOut();
        } catch (e) {}

        this.currentUser = null;
        this.userData = null;

        if (typeof this.onConcurrentSessionTerminated === 'function') {
            this.onConcurrentSessionTerminated();
        } else if (typeof app !== 'undefined' && app.ui && typeof app.ui.showModal === 'function') {
            app.ui.showModal(
                'SESSÃO ENCERRADA',
                'Sua conta foi conectada em outro computador, navegador ou aba. Por segurança, esta sessão anterior foi desconectada automaticamente.',
                '🛡️',
                () => { window.location.reload(); }
            );
        } else {
            alert('Sua conta foi acessada em outro dispositivo. Esta sessão foi finalizada.');
            window.location.reload();
        }
    }

    async registerActiveSession(uid) {
        if (!uid || typeof fbDB === 'undefined') return;
        const sid = this._generateNewSessionId();
        try {
            await fbDB.collection('users').doc(uid).set({
                activeSessionId: sid,
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (e) {
            console.warn('[Auth] Could not register active session:', e);
        }
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

                // Garante que o avatar seja sempre um dos avatares oficiais do jogo (assets/avatars/...)
                const currentAvatar = data.photoURL;
                if (!currentAvatar || !currentAvatar.startsWith('assets/avatars/')) {
                    const defaultAvatar = this.getRandomDefaultAvatar(isMaster);
                    this.userData.photoURL = defaultAvatar;
                    fbDB.collection('users').doc(this.currentUser.uid).update({ photoURL: defaultAvatar }).catch(() => {});
                }

                // Sincronização automática de guilda se for professor
                if (isMaster && (!this.userData.classCode || !this.userData.guildCode)) {
                    try {
                        const tGuilds = await this.getTeacherGuilds();
                        if (tGuilds && tGuilds.length > 0) {
                            const gCode = tGuilds[0].classCode || tGuilds[0].guildCode || tGuilds[0].id;
                            if (gCode) {
                                this.userData.classCode = gCode;
                                this.userData.guildCode = gCode;
                                fbDB.collection('users').doc(this.currentUser.uid).update({ classCode: gCode, guildCode: gCode }).catch(() => {});
                            }
                        }
                    } catch (e) {
                        console.warn('[Auth] Guild auto-sync notice:', e);
                    }
                }
            } else if (isMaster) {
                // Cria documento inicial se não existia
                const initialData = {
                    displayName: this.currentUser.displayName || 'Mestre Rennan',
                    email: this.currentUser.email,
                    photoURL: 'assets/avatars/avatar_01.png',
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

    async getEffectiveGuildCode() {
        let code = this.getClassCode();
        if (code) return code;
        if (this.isTeacher() && this.currentUser) {
            try {
                const guilds = await this.getTeacherGuilds();
                if (guilds && guilds.length > 0) {
                    const foundCode = guilds[0].classCode || guilds[0].guildCode || guilds[0].id || '';
                    if (foundCode) {
                        if (this.userData) {
                            this.userData.classCode = foundCode;
                            this.userData.guildCode = foundCode;
                        }
                        return foundCode;
                    }
                }
            } catch(e) {
                console.warn('[Auth] getEffectiveGuildCode error:', e);
            }
        }
        return '';
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
        const defaultAvatar = this.getRandomDefaultAvatar(isMaster);
        const sid = this._generateNewSessionId();

        const userData = {
            displayName, email,
            photoURL: defaultAvatar,
            role,
            classCode: cleanedGuildCode,
            guildCode: cleanedGuildCode,
            activeSessionId: sid,
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        this._listenSessionValidity(cred.user.uid);
        return cred.user;
    }

    // ─── EMAIL/PASSWORD LOGIN ───
    async loginWithEmail(email, password) {
        const cred = await fbAuth.signInWithEmailAndPassword(email, password);
        const sid = this._generateNewSessionId();

        try {
            const updates = {
                activeSessionId: sid,
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            if (this.isAdminEmail(cred.user?.email)) {
                updates.role = 'teacher';
            }
            await fbDB.collection('users').doc(cred.user.uid).set(updates, { merge: true });
            this._listenSessionValidity(cred.user.uid);
        } catch(e) {
            console.warn('[Auth] Login session sync notice:', e);
        }

        return cred.user;
    }

    // ─── FORGOT / RESET PASSWORD ───
    async sendPasswordReset(email) {
        if (!email || !email.trim()) throw new Error('Por favor, informe o seu email cadastrado.');
        await fbAuth.sendPasswordResetEmail(email.trim());
        return true;
    }

    // ─── GOOGLE SIGN-IN ───
    async loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        const cred = await fbAuth.signInWithPopup(provider);
        const doc = await fbDB.collection('users').doc(cred.user.uid).get();
        const isMaster = this.isAdminEmail(cred.user.email);
        const photoURL = this.getRandomDefaultAvatar(isMaster);
        const sid = this._generateNewSessionId();

        if (!doc.exists) {
            const role = isMaster ? 'teacher' : 'student';
            const userData = {
                displayName: cred.user.displayName || 'Jogador',
                email: cred.user.email,
                photoURL,
                role,
                classCode: '',
                guildCode: '',
                activeSessionId: sid,
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                gameProgress: null
            };
            await fbDB.collection('users').doc(cred.user.uid).set(userData);
            this.userData = userData;
        } else {
            const currentData = doc.data();
            const updates = {
                activeSessionId: sid,
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            if (isMaster && currentData.role !== 'teacher') updates.role = 'teacher';
            if (!currentData.photoURL) updates.photoURL = photoURL;
            await fbDB.collection('users').doc(cred.user.uid).set(updates, { merge: true });
            this.userData = { ...currentData, ...updates };
        }
        this._listenSessionValidity(cred.user.uid);
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
        try {
            const cleanCode = (code || '').trim().toUpperCase();
            const guildDoc = await fbDB.collection('classes').doc(cleanCode).get();
            const studentsMap = new Map();
            const teacherUid = guildDoc.exists ? guildDoc.data()?.teacherUid : null;

            // 1. Alunos listados no array students do doc da classe
            if (guildDoc.exists) {
                const sids = guildDoc.data().students || [];
                if (sids.length > 0) {
                    const promises = sids
                        .filter(sid => sid && sid !== teacherUid)
                        .map(sid => 
                            fbDB.collection('users').doc(sid).get()
                                .then(doc => doc.exists ? { uid: sid, ...doc.data() } : null)
                                .catch(() => null)
                        );
                    const results = await Promise.all(promises);
                    results.filter(Boolean).forEach(st => {
                        if (st && st.uid) studentsMap.set(st.uid, st);
                    });
                }
            }

            // 2. Alunos que possuem classCode ou guildCode igual ao código da guilda
            try {
                const usersByClass = await fbDB.collection('users').where('classCode', '==', cleanCode).get();
                usersByClass.forEach(doc => {
                    if (doc.id !== teacherUid && !studentsMap.has(doc.id)) {
                        studentsMap.set(doc.id, { uid: doc.id, ...doc.data() });
                    }
                });
            } catch (err) {
                console.warn('[Auth] getGuildStudents fallback query failed:', err);
            }

            return Array.from(studentsMap.values());
        } catch (e) { 
            console.warn('[Auth] getGuildStudents error:', e); 
            return [];
        }
    }

    // ─── GET ALL PLATFORM USERS (Exclusivo para Professor / Mestre) ───
    async getAllPlatformUsers() {
        if (!this.currentUser) return [];
        if (!this.isTeacher() && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Acesso restrito ao Mestre da Guilda.');
        }

        try {
            const snap = await fbDB.collection('users').get();
            const users = [];
            snap.forEach(doc => {
                users.push({
                    uid: doc.id,
                    ...doc.data()
                });
            });
            return users;
        } catch (e) {
            console.warn('[Auth] getAllPlatformUsers error:', e);
            return [];
        }
    }

    // ─── ASSIGN / MOVE STUDENT TO GUILD (Professor adiciona aluno diretamente) ───
    async assignStudentToGuild(studentUid, targetGuildCode) {
        if (!this.currentUser) throw new Error('Usuário não autenticado.');
        if (!this.isTeacher() && !this.isAdminEmail(this.currentUser.email)) {
            throw new Error('Apenas Mestres podem alocar alunos nas Guildas.');
        }

        const cleanCode = (targetGuildCode || '').trim().toUpperCase();
        if (!cleanCode) throw new Error('Selecione uma Guilda de destino.');

        const guildRef = fbDB.collection('classes').doc(cleanCode);
        const guildDoc = await guildRef.get();
        if (!guildDoc.exists) throw new Error(`Guilda ${cleanCode} não encontrada.`);

        const gData = guildDoc.data();
        const currentStudents = gData.students || [];

        // 1. Insere o UID no array de estudantes da guilda de destino se ainda não estiver
        if (!currentStudents.includes(studentUid)) {
            currentStudents.push(studentUid);
            await guildRef.update({ students: currentStudents });
        }

        // 2. Atualiza o documento do aluno com o novo classCode / guildCode
        const userRef = fbDB.collection('users').doc(studentUid);
        const uDoc = await userRef.get();
        const oldClassCode = uDoc.exists ? (uDoc.data()?.classCode || uDoc.data()?.guildCode) : null;

        await userRef.set({
            classCode: cleanCode,
            guildCode: cleanCode
        }, { merge: true });

        // 3. Se o aluno pertencia a outra guilda anteriormente, remove do array da guilda anterior
        if (oldClassCode && oldClassCode.toUpperCase() !== cleanCode) {
            try {
                const oldGuildRef = fbDB.collection('classes').doc(oldClassCode.toUpperCase());
                const oldGuildDoc = await oldGuildRef.get();
                if (oldGuildDoc.exists) {
                    const oldStudents = (oldGuildDoc.data().students || []).filter(id => id !== studentUid);
                    await oldGuildRef.update({ students: oldStudents });
                }
            } catch (err) {
                console.warn('[Auth] Erro ao desvincular aluno da guilda anterior:', err);
            }
        }

        return { success: true, guildName: gData.name, guildCode: cleanCode };
    }

    // ─── GET ALL GUILD MEMBERS WITH COMPLETE PROFILES (Todos os membros) ───
    async getGuildMembers(targetGuildCode) {
        let code = targetGuildCode || this.getClassCode();
        if (!code && this.getEffectiveGuildCode) {
            code = await this.getEffectiveGuildCode();
        }
        if (!code) return [];
        try {
            const cleanCode = (code || '').trim().toUpperCase();
            const guildDoc = await fbDB.collection('classes').doc(cleanCode).get();
            const membersMap = new Map();

            if (guildDoc.exists) {
                const gData = guildDoc.data();

                // 1. Mestre da Guilda
                if (gData.teacherUid) {
                    try {
                        const tDoc = await fbDB.collection('users').doc(gData.teacherUid).get();
                        if (tDoc.exists) {
                            membersMap.set(gData.teacherUid, { uid: gData.teacherUid, isTeacher: true, ...tDoc.data() });
                        }
                    } catch (err) {
                        console.warn('[Auth] Error fetching teacher profile:', err);
                    }
                }

                // 2. Estudantes na lista da guilda
                const sids = gData.students || [];
                if (sids.length > 0) {
                    const studentPromises = sids
                        .filter(sid => sid && sid !== gData.teacherUid)
                        .map(sid => fbDB.collection('users').doc(sid).get().then(doc => doc.exists ? { uid: sid, isTeacher: false, ...doc.data() } : null).catch(() => null));
                    
                    const studentResults = await Promise.all(studentPromises);
                    studentResults.filter(Boolean).forEach(st => {
                        if (st && st.uid) membersMap.set(st.uid, st);
                    });
                }
            }

            // 3. Fallback / Complemento: Buscar usuários que possuem classCode ou guildCode igual
            try {
                const usersByClass = await fbDB.collection('users').where('classCode', '==', cleanCode).get();
                usersByClass.forEach(doc => {
                    if (!membersMap.has(doc.id)) {
                        const data = doc.data();
                        membersMap.set(doc.id, {
                            uid: doc.id,
                            isTeacher: data.role === 'teacher' || this.isAdminEmail(data.email),
                            ...data
                        });
                    }
                });
            } catch (err) {
                console.warn('[Auth] users where classCode fallback check skipped/failed:', err);
            }

            // Se o usuário atual está vinculado à guilda e por algum motivo não apareceu (ex: recém-criado/cache), inclui ele
            if (this.currentUser && (this.getClassCode() === cleanCode || (this.userData && (this.userData.classCode === cleanCode || this.userData.guildCode === cleanCode)))) {
                if (!membersMap.has(this.currentUser.uid)) {
                    membersMap.set(this.currentUser.uid, {
                        uid: this.currentUser.uid,
                        isTeacher: this.isTeacher(),
                        displayName: this.getDisplayName(),
                        photoURL: this.getPhotoURL(),
                        gameProgress: (typeof gameEngine !== 'undefined' && gameEngine?.state) ? gameEngine.state : (this.userData?.gameProgress || {}),
                        ...(this.userData || {})
                    });
                }
            }

            return Array.from(membersMap.values());
        } catch (e) {
            console.warn('[Auth] getGuildMembers error:', e);
            return [];
        }
    }

    // ─── GET CURRENT GUILD INFO ───
    async getCurrentGuildInfo() {
        let code = this.getClassCode();
        if (!code && this.getEffectiveGuildCode) {
            code = await this.getEffectiveGuildCode();
        }
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
        this._stopSessionListener();
        sessionStorage.removeItem('gc_active_session_id');
        this.currentSessionId = null;
        await fbAuth.signOut();
        this.currentUser = null;
        this.userData = null;
    }

    // ─── DELETE ACCOUNT ───
    async deleteAccount() {
        if (!this.currentUser) throw new Error('Nenhum usuário autenticado.');
        const user = this.currentUser;
        const uid = user.uid;
        const guildCode = this.getClassCode();

        this._stopSessionListener();
        sessionStorage.removeItem('gc_active_session_id');
        this.currentSessionId = null;

        // 1. Remove o usuário da sua guilda se estiver vinculado
        if (guildCode && typeof fbDB !== 'undefined') {
            try {
                await fbDB.collection('classes').doc(guildCode).update({
                    students: firebase.firestore.FieldValue.arrayRemove(uid)
                }).catch(() => {});
            } catch(e) {
                console.warn('[Auth] Error removing from guild during account deletion:', e);
            }
        }

        // 2. Remove o documento de perfil no Firestore
        if (typeof fbDB !== 'undefined') {
            try {
                await fbDB.collection('users').doc(uid).delete().catch(() => {});
            } catch(e) {
                console.warn('[Auth] Error deleting user document:', e);
            }
        }

        // 3. Deleta a conta de autenticação do Firebase Auth
        try {
            await user.delete();
        } catch (e) {
            console.error('[Auth] user.delete error:', e);
            // Se for requires-recent-login, lança para que o modal avise o usuário
            if (e.code === 'auth/requires-recent-login') {
                throw e;
            }
            // Em outros casos (ex: rede), tenta deslogar e relança
            await fbAuth.signOut().catch(() => {});
            throw e;
        }

        this.currentUser = null;
        this.userData = null;
        return true;
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
        
        // 1. Se os dados do usuário já foram carregados no onAuthStateChanged, usa imediatamente sem requisição extra
        if (this.userData && this.userData.gameProgress) {
            return this.userData.gameProgress;
        }

        // 2. Busca do Firestore com tempo hábil suficiente para conexões com oscilação
        try {
            const docPromise = fbDB.collection('users').doc(this.currentUser.uid).get();
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000));
            const doc = await Promise.race([docPromise, timeoutPromise]);
            if (doc && doc.exists) {
                const data = doc.data();
                if (data && data.gameProgress) {
                    if (this.userData) this.userData.gameProgress = data.gameProgress;
                    return data.gameProgress;
                }
            }
        } catch (e) { 
            console.warn('[Auth] loadProgress error:', e); 
        }
        return null;
    }

    async updateDisplayName(newName) {
        if (!this.currentUser) return;
        try {
            if (this.userData) {
                this.userData.displayName = newName;
            }
            await this.currentUser.updateProfile({ displayName: newName }).catch(() => {});
            if (typeof fbDB !== 'undefined') {
                await fbDB.collection('users').doc(this.currentUser.uid).update({
                    displayName: newName
                });
            }
            return true;
        } catch (e) {
            console.error('[Auth] updateDisplayName error:', e);
            throw e;
        }
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
        const photo = this.userData?.photoURL;
        if (photo && photo.startsWith('assets/avatars/')) return photo;
        return this.isTeacher() ? 'assets/avatars/avatar_01.png' : 'assets/avatars/avatar_02.png';
    }
    isSignedIn() { return !!this.currentUser; }
    hasGuild() { return !!this.getClassCode(); }
}

const authManager = new AuthManager();
