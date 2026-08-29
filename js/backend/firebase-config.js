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

// Configurações de resiliência e estabilidade para conexões web
try {
    fbDB.settings({
        experimentalForceLongPolling: true,
        merge: true
    });
} catch (e) {
    console.warn('[Firebase] Configuração de Firestore settings já aplicada ou ignorada:', e);
}

// Habilita persistência offline segura para manter a sessão instantânea mesmo com instabilidades de rede
if (typeof fbDB.enablePersistence === 'function') {
    fbDB.enablePersistence({ synchronizeTabs: true }).catch((err) => {
        if (err.code === 'failed-precondition') {
            console.warn('[Firebase] Persistência falhou: múltiplas abas abertas.');
        } else if (err.code === 'unimplemented') {
            console.warn('[Firebase] O navegador não suporta persistência offline.');
        }
    });
}

console.log('[Firebase] Inicializado com sucesso');
