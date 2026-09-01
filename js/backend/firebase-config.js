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
    if (typeof firebase.firestore.persistentMultipleTabManager === 'function') {
        fbDB.settings({
            cache: firebase.firestore.persistentLocalCache({
                tabManager: firebase.firestore.persistentMultipleTabManager()
            }),
            experimentalAutoDetectLongPolling: true,
            experimentalForceLongPolling: false
        });
    } else {
        fbDB.settings({
            experimentalAutoDetectLongPolling: true,
            experimentalForceLongPolling: false,
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
            merge: true
        });
        if (typeof fbDB.enablePersistence === 'function') {
            fbDB.enablePersistence({ synchronizeTabs: true }).catch((err) => {
                if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
                    console.warn('[Firebase] Notice de persistência:', err.code);
                }
            });
        }
    }
} catch (e) {
    // Configurações já aplicadas
}

console.log('[Firebase] Inicializado com sucesso e cache de alta velocidade ativado.');

/* ═══════════════════════════════════════════════════════════════
   STALE-WHILE-REVALIDATE (SWR) CACHE MANAGER
   Acelera carregamento de dados em 0ms e sincroniza em background
   ═══════════════════════════════════════════════════════════════ */
class SWRCacheManager {
    constructor() {
        this.memoryCache = new Map();
        this.prefix = 'gc_swr_';
    }

    get(key) {
        if (!key) return null;
        // 1. Memória rápida (0ms)
        if (this.memoryCache.has(key)) {
            return this.memoryCache.get(key);
        }
        // 2. LocalStorage persistente
        try {
            const raw = localStorage.getItem(this.prefix + key);
            if (raw) {
                const parsed = JSON.parse(raw);
                this.memoryCache.set(key, parsed);
                return parsed;
            }
        } catch (e) {}
        return null;
    }

    set(key, data) {
        if (!key || data === undefined) return;
        this.memoryCache.set(key, data);
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(data));
        } catch (e) {
            // Em caso de quota excedida, limpa chaves antigas de swr
            try {
                this.pruneOldEntries();
                localStorage.setItem(this.prefix + key, JSON.stringify(data));
            } catch (err) {}
        }
    }

    remove(key) {
        if (!key) return;
        this.memoryCache.delete(key);
        try {
            localStorage.removeItem(this.prefix + key);
        } catch (e) {}
    }

    pruneOldEntries() {
        try {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith(this.prefix)) {
                    keysToRemove.push(k);
                }
            }
            keysToRemove.slice(0, 10).forEach(k => localStorage.removeItem(k));
        } catch (e) {}
    }

    /**
     * Stale-While-Revalidate execution helper
     * @param {string} key - Chave de identificação no cache
     * @param {Function} fetcherFn - Função assíncrona que busca os dados atualizados no Firebase
     * @param {Function} [onUpdateFn] - Callback invocado quando novos dados remotos chegam e são diferentes do cache
     * @returns {Promise<any>} - Retorna os dados imediatos (do cache se existirem, ou do fetcher)
     */
    async fetchWithSWR(key, fetcherFn, onUpdateFn) {
        const cached = this.get(key);

        // Dispara a revalidação em segundo plano sem travar a interface
        const revalidatePromise = (async () => {
            try {
                const freshData = await fetcherFn();
                if (freshData !== null && freshData !== undefined) {
                    const cachedStr = JSON.stringify(cached);
                    const freshStr = JSON.stringify(freshData);
                    
                    // Se mudou ou não havia cache antes, salva e notifica
                    if (cachedStr !== freshStr) {
                        this.set(key, freshData);
                        if (typeof onUpdateFn === 'function') {
                            try { onUpdateFn(freshData); } catch (cbErr) {
                                console.warn('[SWR] onUpdate callback notice:', cbErr);
                            }
                        }
                    }
                }
                return freshData;
            } catch (err) {
                console.warn(`[SWR] Revalidation notice for key "${key}":`, err?.message || err);
                return cached;
            }
        })();

        // Se já tem cache, retorna imediatamente (0ms)
        if (cached !== null) {
            return cached;
        }

        // Se não tinha cache prévio, aguarda a requisição do servidor
        return await revalidatePromise;
    }
}

// Instância global do SWR Cache
const swrCache = new SWRCacheManager();


