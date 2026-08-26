/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Authentication Module
   Google Sign-In, Email/Password, Firestore sync
   ═══════════════════════════════════════════════════════════════ */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.onAuthChange = null; // callback(user)
    }

    init() {
        // Listen for auth state changes
        fbAuth.onAuthStateChanged((user) => {
            this.currentUser = user;
            if (this.onAuthChange) this.onAuthChange(user);
        });
    }

    // ─── EMAIL/PASSWORD REGISTRATION ───
    async registerWithEmail(email, password, displayName) {
        const cred = await fbAuth.createUserWithEmailAndPassword(email, password);
        // Update display name
        await cred.user.updateProfile({ displayName });
        // Create user document in Firestore
        await fbDB.collection('users').doc(cred.user.uid).set({
            displayName,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            gameProgress: null
        });
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
        // Create user doc if new
        const doc = await fbDB.collection('users').doc(cred.user.uid).get();
        if (!doc.exists) {
            await fbDB.collection('users').doc(cred.user.uid).set({
                displayName: cred.user.displayName,
                email: cred.user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                gameProgress: null
            });
        }
        return cred.user;
    }

    // ─── LOGOUT ───
    async logout() {
        await fbAuth.signOut();
        this.currentUser = null;
    }

    // ─── FIRESTORE: SAVE GAME PROGRESS ───
    async saveProgress(gameState) {
        if (!this.currentUser) return;
        try {
            await fbDB.collection('users').doc(this.currentUser.uid).update({
                gameProgress: gameState,
                lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[Auth] Failed to save progress:', e);
        }
    }

    // ─── FIRESTORE: LOAD GAME PROGRESS ───
    async loadProgress() {
        if (!this.currentUser) return null;
        try {
            const doc = await fbDB.collection('users').doc(this.currentUser.uid).get();
            if (doc.exists && doc.data().gameProgress) {
                return doc.data().gameProgress;
            }
        } catch (e) {
            console.warn('[Auth] Failed to load progress:', e);
        }
        return null;
    }

    // ─── HELPERS ───
    getDisplayName() {
        if (!this.currentUser) return '';
        return this.currentUser.displayName || this.currentUser.email.split('@')[0];
    }

    isSignedIn() {
        return !!this.currentUser;
    }
}

// Global instance
const authManager = new AuthManager();
