/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Firebase Configuration
   Uses Firebase Compat SDK (no build tools needed)
   ═══════════════════════════════════════════════════════════════ */

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAaDUyH0sDAx9-ciBgdSeKic9-3ZO5E-G8",
    authDomain: "guildcode.firebaseapp.com",
    projectId: "guildcode",
    storageBucket: "guildcode.firebasestorage.app",
    messagingSenderId: "812873599275",
    appId: "1:812873599275:web:9c5e356a8fdd7684759d6e",
    measurementId: "G-Z0X8XT1X01"
};

// Initialize Firebase (compat mode — loaded via CDN script tags)
const fbApp = firebase.initializeApp(firebaseConfig);
const fbAuth = firebase.auth();
const fbDB = firebase.firestore();

// Configurações avançadas de alta velocidade, persistência multi-aba e resiliência
try {
    fbDB.settings({
        experimentalAutoDetectLongPolling: true,
        experimentalForceLongPolling: false,
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
        merge: true
    });
} catch (e) {
    // Configurações já aplicadas
}

// Ativa persistência IndexedDB sincronizada entre abas para carregamento instantâneo
if (typeof fbDB.enablePersistence === 'function') {
    fbDB.enablePersistence({ synchronizeTabs: true }).catch((err) => {
        if (err.code === 'failed-precondition') {
            console.warn('[Firebase] Persistência limitada a uma única aba ativa.');
        } else if (err.code === 'unimplemented') {
            console.warn('[Firebase] O navegador atual não suporta persistência IndexedDB.');
        } else {
            console.warn('[Firebase] Notice de persistência:', err.code);
        }
    });
}

console.log('[Firebase] Inicializado com sucesso e cache de alta velocidade ativado.');
