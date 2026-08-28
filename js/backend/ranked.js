/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Ranked Matches & Guild PvP Progression System
   Implements Business Rules (RN-PVP, RN-REP, RN-TIER, RN-RANK, RN-CP, RN-MM, RN-ABUSE)
   ═══════════════════════════════════════════════════════════════ */

const PVP_TIERS = [
    { name: "Scriptling", minRenome: 0, maxRenome: 199, icon: "⟨/⟩", color: "#94a3b8" },
    { name: "Code Apprentice", minRenome: 200, maxRenome: 399, icon: "◈", color: "#4ade80" },
    { name: "Code Adept", minRenome: 400, maxRenome: 699, icon: "◆", color: "#38bdf8" },
    { name: "Code Knight", minRenome: 700, maxRenome: 999, icon: "⚔", color: "#818cf8" },
    { name: "CodeMage", minRenome: 1000, maxRenome: 1399, icon: "✦", color: "#a855f7" },
    { name: "Arch CodeMage", minRenome: 1400, maxRenome: 1899, icon: "★", color: "#c084fc" },
    { name: "Code Master", minRenome: 1900, maxRenome: 2499, icon: "♔", color: "#fbbf24" },
    { name: "Code Lord", minRenome: 2500, maxRenome: 3199, icon: "▲", color: "#f97316" },
    { name: "Code Sage", minRenome: 3200, maxRenome: 3999, icon: "⬡", color: "#06b6d4" },
    { name: "Legendary CodeMancer", minRenome: 4000, maxRenome: Infinity, icon: "✧", color: "#f43f5e" }
];

class RankedManager {
    constructor() {
        this.activeChallenge = null;
    }

    // ─── TIER CALCULATION (RN-TIER-001) ───
    getTierForRenome(renome) {
        const r = Math.max(0, Number(renome) || 0);
        for (let i = PVP_TIERS.length - 1; i >= 0; i--) {
            if (r >= PVP_TIERS[i].minRenome) {
                return PVP_TIERS[i];
            }
        }
        return PVP_TIERS[0];
    }

    // ─── ELO / CODE POWER CALCULATION (RN-CP-003, RN-CP-004, RN-CP-005, RN-CP-006) ───
    calculateCodePowerDelta(playerCP, opponentCP, playerWon) {
        const K = 32;
        const expectedScore = 1 / (1 + Math.pow(10, (opponentCP - playerCP) / 400));
        const actualScore = playerWon ? 1 : 0;
        const delta = Math.round(K * (actualScore - expectedScore));
        if (playerWon) {
            return Math.max(5, delta);
        } else {
            return Math.min(-5, delta);
        }
    }

    // ─── CREATE CHALLENGE ───
    async createChallenge(targetUid, targetName, chapterId) {
        if (!authManager.currentUser) throw new Error('Não autenticado');
        const challengerUid = authManager.currentUser.uid;
        const challengerName = authManager.getDisplayName();
        
        const chapter = CHAPTERS.find(c => c.id === chapterId);
        if (!chapter) return null;
        const activities = chapter.activities.map(a => ({ 
            id: a.id, 
            title: a.title, 
            starterCode: a.starterCode, 
            validator: a.validator.toString() 
        }));

        const challengerProgress = (typeof app !== 'undefined' && app.engine?.state) || {};
        const challengerCP = challengerProgress.codePower || 1000;
        const challengerRenome = challengerProgress.renome !== undefined ? challengerProgress.renome : 100;

        const challengeData = {
            challengerUid, 
            challengerName,
            challengerCP,
            challengerRenome,
            targetUid, 
            targetName,
            chapterId, 
            chapterTitle: chapter.title,
            activities,
            status: 'pending',
            challengerCode: null, 
            challengerTime: 0, 
            challengerScore: 0,
            targetCode: null, 
            targetTime: 0, 
            targetScore: 0,
            winner: null,
            renomeDeltaWon: 25,
            renomeDeltaLost: -20,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            completedAt: null
        };
        const ref = await fbDB.collection('challenges').add(challengeData);
        return ref.id;
    }

    // ─── GET PENDING CHALLENGES ───
    async getPendingChallenges() {
        if (!authManager.currentUser) return [];
        const uid = authManager.currentUser.uid;
        try {
            const snap = await fbDB.collection('challenges')
                .where('targetUid', '==', uid)
                .limit(20).get();
            return snap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                .filter(c => c.status === 'pending' || c.status === 'challenger_done')
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        } catch (e) {
            console.warn('getPendingChallenges error:', e.message);
            return [];
        }
    }

    // ─── GET CHALLENGE HISTORY ───
    async getChallengeHistory() {
        if (!authManager.currentUser) return [];
        const uid = authManager.currentUser.uid;
        try {
            const snap = await fbDB.collection('challenges')
                .where('status', '==', 'completed')
                .limit(50).get();
            return snap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                .filter(c => c.challengerUid === uid || c.targetUid === uid)
                .sort((a, b) => (b.completedAt?.seconds || 0) - (a.completedAt?.seconds || 0));
        } catch (e) {
            console.warn('getChallengeHistory error:', e.message);
            return [];
        }
    }

    // ─── HELPER: EVALUATE CODE QUALITY & VALIDITY ───
    _evaluateSubmission(code, timeMs) {
        if (!code || typeof code !== 'string') return { score: 0, time: 999999 };
        let isValid = false;
        if (typeof CInterpreter !== 'undefined') {
            try {
                const interp = new CInterpreter();
                const res = interp.execute(code);
                if (res.success && code.includes('main')) isValid = true;
            } catch (e) { isValid = false; }
        }
        const cleanedLines = code.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('//'));
        const baseScore = isValid ? 100 : 10;
        const qualityBonus = Math.min(50, cleanedLines.length * 3);
        return {
            score: baseScore + qualityBonus,
            time: Math.max(1000, Number(timeMs) || 1000)
        };
    }

    // ─── SUBMIT CHALLENGE (challenger) ───
    async submitChallengerCode(challengeId, code, timeMs) {
        const evalRes = this._evaluateSubmission(code, timeMs);
        await fbDB.collection('challenges').doc(challengeId).update({
            challengerCode: code, 
            challengerTime: evalRes.time, 
            challengerScore: evalRes.score,
            status: 'challenger_done'
        });
    }

    // ─── SUBMIT CHALLENGE (target) & RESOLVE MATCH ───
    async submitTargetCode(challengeId, code, timeMs) {
        const evalRes = this._evaluateSubmission(code, timeMs);
        const challengeDoc = await fbDB.collection('challenges').doc(challengeId).get();
        const ch = challengeDoc.data();
        
        let winner = null;
        if (evalRes.score > ch.challengerScore) {
            winner = ch.targetUid;
        } else if (evalRes.score < ch.challengerScore) {
            winner = ch.challengerUid;
        } else {
            winner = evalRes.time < ch.challengerTime ? ch.targetUid : ch.challengerUid;
        }

        await fbDB.collection('challenges').doc(challengeId).update({
            targetCode: code, 
            targetTime: evalRes.time, 
            targetScore: evalRes.score,
            status: 'completed', 
            winner,
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Aplica Regras de Negócio de PvP ao Jogador Atual
        const currentUid = authManager.currentUser.uid;
        const won = winner === currentUid;
        
        if (typeof app !== 'undefined' && app.engine) {
            const engine = app.engine;
            // RN-PVP-002 / RN-PVP-003: XP por vitória/derrota
            const xpGained = won ? 50 : 20;
            engine.addXP(xpGained);

            // RN-REP-002 / RN-REP-003 / RN-REP-004: Renome (+25 vitória, -20 derrota, piso 0)
            const currentRenome = engine.state.renome !== undefined ? engine.state.renome : 100;
            const renomeDelta = won ? 25 : -20;
            engine.state.renome = Math.max(0, currentRenome + renomeDelta);

            // RN-CP-003: Ajuste de Code Power (Elo MMR)
            const opponentCP = (currentUid === ch.challengerUid) ? (ch.targetCP || 1000) : (ch.challengerCP || 1000);
            const myCP = engine.state.codePower || 1000;
            const cpDelta = this.calculateCodePowerDelta(myCP, opponentCP, won);
            engine.state.codePower = Math.max(100, myCP + cpDelta);

            // Histórico e streaks
            if (won) {
                engine.state.pvpWins = (engine.state.pvpWins || 0) + 1;
                engine.state.winStreak = (engine.state.winStreak || 0) + 1;
            } else {
                engine.state.pvpLosses = (engine.state.pvpLosses || 0) + 1;
                engine.state.winStreak = 0;
            }

            engine.saveToCloud();
        }

        return { winner, won };
    }

    // ─── SEARCH PLAYERS NA GUILDA COM FILTRO DE CODE POWER (RN-MM-001) ───
    async searchPlayers(query = '', filterCPRange = 0) {
        try {
            const classCode = authManager.getClassCode();
            if (!classCode) return [];
            const snap = await fbDB.collection('users')
                .where('classCode', '==', classCode)
                .get();

            const myCP = (typeof app !== 'undefined' && app.engine?.state?.codePower) || 1000;
            
            return snap.docs
                .map(d => ({ uid: d.id, ...d.data() }))
                .filter(u => {
                    if (u.uid === authManager.currentUser?.uid) return false;
                    const nameMatches = !query || (u.displayName || '').toLowerCase().includes(query.toLowerCase());
                    if (!nameMatches) return false;
                    
                    if (filterCPRange > 0) {
                        const targetCP = u.gameProgress?.codePower || 1000;
                        return Math.abs(targetCP - myCP) <= filterCPRange;
                    }
                    return true;
                });
        } catch (e) {
            console.warn('searchPlayers error:', e.message);
            return [];
        }
    }

    // ─── GUILD RANKING (RN-RANK-001, RN-RANK-002) ───
    async getGuildLeaderboard() {
        try {
            let classCode = authManager.getClassCode();
            if (!classCode && authManager.getEffectiveGuildCode) {
                classCode = await authManager.getEffectiveGuildCode();
            }
            if (!classCode) return [];
            const members = await authManager.getGuildMembers(classCode);
            
            const list = members.map(m => {
                const gp = m.gameProgress || {};
                const renome = gp.renome !== undefined ? gp.renome : 100;
                const wins = gp.pvpWins || 0;
                const losses = gp.pvpLosses || 0;
                const total = wins + losses;
                const winRate = total > 0 ? ((wins / total) * 100) : 0;
                const cp = gp.codePower || 1000;
                const tier = this.getTierForRenome(renome);
                const level = gp.level || 1;
                const xp = gp.xp || 0;
                const completedChapters = gp.chapters ? Object.values(gp.chapters).filter(c => c && c.completed).length : 0;

                return {
                    uid: m.uid,
                    displayName: m.displayName || m.email?.split('@')[0] || 'Aprendiz',
                    email: m.email || '',
                    photoURL: m.photoURL || '',
                    isTeacher: !!m.isTeacher || m.role === 'teacher',
                    renome,
                    tier,
                    codePower: cp,
                    wins,
                    losses,
                    winRate: Math.round(winRate * 10) / 10,
                    winStreak: gp.winStreak || 0,
                    totalMatches: total,
                    level,
                    xp,
                    completedChapters
                };
            });

            // Ordenação estrita das regras de negócio (RN-RANK-001, RN-RANK-002):
            // 1. Renome DESC
            // 2. Vitórias DESC
            // 3. Win Rate DESC
            // 4. Code Power DESC
            // 5. Total de partidas disputadas DESC
            list.sort((a, b) => {
                if (b.renome !== a.renome) return b.renome - a.renome;
                if (b.wins !== a.wins) return b.wins - a.wins;
                if (b.winRate !== a.winRate) return b.winRate - a.winRate;
                if (b.codePower !== a.codePower) return b.codePower - a.codePower;
                return b.totalMatches - a.totalMatches;
            });

            list.forEach((item, index) => {
                item.position = index + 1;
            });

            return list;
        } catch (e) {
            console.warn('[Ranked] getGuildLeaderboard error:', e);
            return [];
        }
    }
}

const rankedManager = new RankedManager();
