/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Missions Manager (Chapters & Abyss Data Service)
   Hybrid storage: Local JSON default + Firestore real-time sync & Teacher CRUD
   ═══════════════════════════════════════════════════════════════ */

class MissionsManager {
    constructor() {
        this.chapters = [];
        this.abyssFloors = {};
        this.isLoaded = false;
        this.onDataUpdated = null;
    }

    /**
     * Inicializa carregando os dados locais e conectando ao Firestore
     */
    async init() {
        try {
            await this.loadLocalDefaults();
            this.isLoaded = true;
            
            // Tenta sincronizar com o Firestore em background se disponível
            if (typeof fbDb !== 'undefined' && fbDb) {
                this.syncWithFirestore();
            }
        } catch (e) {
            console.warn('[MissionsManager] Falha ao carregar defaults locais, usando fallback em memória:', e);
            if (typeof CHAPTERS !== 'undefined') this.chapters = CHAPTERS;
            if (typeof SIDE_QUESTS !== 'undefined') this.abyssFloors = SIDE_QUESTS;
            this.isLoaded = true;
        }
    }

    /**
     * Carrega os arquivos JSON estáticos locais
     */
    async loadLocalDefaults() {
        try {
            const [chRes, abRes] = await Promise.all([
                fetch('data/chapters_data.json'),
                fetch('data/abyss_data.json')
            ]);
            
            if (chRes.ok && abRes.ok) {
                this.chapters = await chRes.json();
                this.abyssFloors = await abRes.json();
                console.log('[MissionsManager] Dados padrão locais carregados com sucesso.');
            } else {
                throw new Error('Fetch status non-200');
            }
        } catch (err) {
            console.warn('[MissionsManager] Fetch JSON local falhou (possível file:// protocol). Usando variáveis em runtime se existirem.');
            if (typeof CHAPTERS !== 'undefined') this.chapters = CHAPTERS;
            if (typeof SIDE_QUESTS !== 'undefined') this.abyssFloors = SIDE_QUESTS;
        }
    }

    /**
     * Sincroniza em tempo real com as coleções do Firestore
     */
    syncWithFirestore() {
        if (!fbDb) return;

        // 1. Ouvir atualizações de capítulos
        try {
            fbDb.collection('chapter_activities').onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        const chIdx = this.chapters.findIndex(c => c.id === data.id);
                        if (chIdx !== -1) {
                            this.chapters[chIdx] = { ...this.chapters[chIdx], ...data };
                        } else {
                            this.chapters.push(data);
                        }
                    });
                    this.chapters.sort((a, b) => a.id - b.id);
                    if (this.onDataUpdated) this.onDataUpdated('chapters');
                }
            }, err => console.warn('[MissionsManager] Sync chapter_activities offline:', err));

            // 2. Ouvir atualizações do abismo
            fbDb.collection('abyss_activities').onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        const floorKey = doc.id;
                        const data = doc.data();
                        this.abyssFloors[floorKey] = data.quests || data.chambers || [];
                    });
                    if (this.onDataUpdated) this.onDataUpdated('abyss');
                }
            }, err => console.warn('[MissionsManager] Sync abyss_activities offline:', err));
        } catch (e) {
            console.warn('[MissionsManager] Erro no listener do Firestore:', e);
        }
    }

    // ─── CONSULTAS ───

    getChapters() {
        return this.chapters || [];
    }

    getChapter(chapterId) {
        return this.chapters.find(c => c.id === parseInt(chapterId, 10));
    }

    getChapterActivity(chapterId, activityIndex) {
        const ch = this.getChapter(chapterId);
        if (!ch || !ch.activities) return null;
        return ch.activities[activityIndex] || null;
    }

    getAbyssFloors() {
        return this.abyssFloors || {};
    }

    getAbyssFloor(floorKey) {
        return this.abyssFloors[floorKey] || [];
    }

    getAbyssChamber(floorKey, chamberIdx) {
        const quests = this.getAbyssFloor(floorKey);
        return quests[chamberIdx] || null;
    }

    // ─── CRUD PROFESSOR (SALVA NO FIRESTORE) ───

    /**
     * Salva/Atualiza um capítulo inteiro no Firestore
     */
    async saveChapter(chapterData) {
        if (!chapterData || chapterData.id === undefined) return false;
        
        // Atualiza em memória
        const idx = this.chapters.findIndex(c => c.id === chapterData.id);
        if (idx !== -1) {
            this.chapters[idx] = { ...this.chapters[idx], ...chapterData };
        } else {
            this.chapters.push(chapterData);
            this.chapters.sort((a, b) => a.id - b.id);
        }

        // Salva no Firestore
        if (typeof fbDb !== 'undefined' && fbDb) {
            const docRef = fbDb.collection('chapter_activities').doc(`ch_${chapterData.id}`);
            await docRef.set(chapterData, { merge: true });
        }
        return true;
    }

    /**
     * Salva/Atualiza uma atividade de capítulo
     */
    async saveChapterActivity(chapterId, activityIndex, activityData) {
        const ch = this.getChapter(chapterId);
        if (!ch) return false;

        if (!ch.activities) ch.activities = [];

        if (activityIndex >= 0 && activityIndex < ch.activities.length) {
            ch.activities[activityIndex] = activityData;
        } else {
            // Nova atividade
            ch.activities.push(activityData);
        }

        return await this.saveChapter(ch);
    }

    /**
     * Exclui uma atividade de capítulo
     */
    async deleteChapterActivity(chapterId, activityIndex) {
        const ch = this.getChapter(chapterId);
        if (!ch || !ch.activities || !ch.activities[activityIndex]) return false;

        ch.activities.splice(activityIndex, 1);
        return await this.saveChapter(ch);
    }

    /**
     * Salva/Atualiza um andar inteiro do Abismo
     */
    async saveAbyssFloor(floorKey, quests) {
        this.abyssFloors[floorKey] = quests;

        if (typeof fbDb !== 'undefined' && fbDb) {
            const docRef = fbDb.collection('abyss_activities').doc(String(floorKey));
            await docRef.set({ quests }, { merge: true });
        }
        return true;
    }

    /**
     * Salva/Atualiza uma câmara do Abismo
     */
    async saveAbyssChamber(floorKey, chamberIdx, chamberData) {
        const quests = [...(this.getAbyssFloor(floorKey) || [])];

        if (chamberIdx >= 0 && chamberIdx < quests.length) {
            quests[chamberIdx] = chamberData;
        } else {
            quests.push(chamberData);
        }

        return await this.saveAbyssFloor(floorKey, quests);
    }

    /**
     * Exclui uma câmara do Abismo
     */
    async deleteAbyssChamber(floorKey, chamberIdx) {
        const quests = [...(this.getAbyssFloor(floorKey) || [])];
        if (!quests[chamberIdx]) return false;

        quests.splice(chamberIdx, 1);
        return await this.saveAbyssFloor(floorKey, quests);
    }
}

// Instância singleton global
const missionsManager = new MissionsManager();
if (typeof window !== 'undefined') {
    window.missionsManager = missionsManager;
}
if (typeof module !== 'undefined') {
    module.exports = MissionsManager;
}
