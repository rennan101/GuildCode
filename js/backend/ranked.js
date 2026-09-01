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

    // ─── HELPER: EVALUATE CODE QUALITY, SPEED & COHERENCE ───
    _evaluateSubmission(code, timeMs) {
        if (!code || typeof code !== 'string') return { score: 0, time: 999999, valid: false };
        let isValid = false;
        let compilerOutput = '';
        if (typeof CInterpreter !== 'undefined') {
            try {
                const interp = new CInterpreter();
                const res = interp.execute(code);
                if (res.success && code.includes('main')) {
                    isValid = true;
                    compilerOutput = res.output || '';
                }
            } catch (e) { isValid = false; }
        }

        const cleanedLines = code.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('//'));
        
        // Coerência e corretude do código
        let baseScore = isValid ? 100 : 0;
        let qualityBonus = isValid ? Math.min(30, cleanedLines.length * 2) : 0;

        // Bônus de velocidade: quanto mais rápido resolver, mais pontos acumula (máx 50 pts de velocidade)
        const timeSec = Math.max(1, (Number(timeMs) || 1000) / 1000);
        let speedBonus = 0;
        if (isValid) {
            if (timeSec <= 30) speedBonus = 50;
            else if (timeSec <= 60) speedBonus = 40;
            else if (timeSec <= 120) speedBonus = 30;
            else if (timeSec <= 180) speedBonus = 20;
            else if (timeSec <= 300) speedBonus = 10;
        }

        const totalScore = baseScore + qualityBonus + speedBonus;

        return {
            score: totalScore,
            time: Math.max(1000, Number(timeMs) || 1000),
            valid: isValid
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
        return evalRes;
    }

    // ─── FORFEIT CHALLENGE (desconexão ou recarregamento no meio do duelo) ───
    async forfeitChallenge(challengeId, forfeiterUid) {
        try {
            const docRef = fbDB.collection('challenges').doc(challengeId);
            const snap = await docRef.get();
            if (!snap.exists) return;
            const ch = snap.data();
            if (ch.status === 'completed') return;

            const isChallenger = ch.challengerUid === forfeiterUid;
            const winner = isChallenger ? ch.targetUid : ch.challengerUid;

            await docRef.update({
                status: 'completed',
                winner: winner,
                forfeitedBy: forfeiterUid,
                completedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Aplica derrota ao jogador que desistiu/desconectou
            if (typeof app !== 'undefined' && app.engine) {
                const engine = app.engine;
                const currentRenome = engine.state.renome !== undefined ? engine.state.renome : 100;
                let renomeDelta = -20;
                if (engine.hasSkill('hc_turbo_pvp', authManager.currentUser)) {
                    renomeDelta = -10;
                }
                engine.state.renome = Math.max(0, currentRenome + renomeDelta);
                const myCP = engine.state.codePower || 1000;
                const cpDelta = this.calculateCodePowerDelta(myCP, 1000, false);
                engine.state.codePower = Math.max(100, myCP + cpDelta);
                engine.state.pvpLosses = (engine.state.pvpLosses || 0) + 1;
                engine.state.winStreak = 0;
                engine.saveToCloud();
            }
        } catch (e) {
            console.warn('[RankedManager] forfeitChallenge error:', e);
        }
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
            // Em caso de empate de pontos, quem fez em menos tempo vence
            winner = evalRes.time <= ch.challengerTime ? ch.targetUid : ch.challengerUid;
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
            let renomeDelta = won ? 25 : -20;
            
            // Subclasse Hardcoder Perk: Fúria do Compilador (hc_turbo_pvp) reduz a perda de renome pela metade (-10 em vez de -20)
            if (!won && engine.hasSkill('hc_turbo_pvp', authManager.currentUser)) {
                renomeDelta = -10;
            }

            // Bônus de Avatar Ativo em PVP:
            if (typeof getAvatarSkillBonus === 'function') {
                if (!won) {
                    // Code Knight (03): Reduz em 20% a perda de Renome em derrotas no Coliseu PVP
                    const lossShield = getAvatarSkillBonus('pvp_loss_shield');
                    if (lossShield > 0) {
                        renomeDelta = Math.round(renomeDelta * (1 - lossShield));
                    }
                } else {
                    // SteamCore (05): +10% de Renome extra ao vencer em menos de 60s
                    const speedBonus = getAvatarSkillBonus('pvp_speed_bonus');
                    if (speedBonus > 0 && evalRes.time <= 60) {
                        renomeDelta = Math.round(renomeDelta * (1 + speedBonus));
                    }
                    // Void Caster (17): Converte 10% da pontuação em Tokens
                    const tokenSteal = getAvatarSkillBonus('pvp_token_steal');
                    if (tokenSteal > 0 && evalRes.score) {
                        const tokensFromScore = Math.max(1, Math.round(evalRes.score * tokenSteal));
                        engine.addTokens(tokensFromScore);
                    }
                }
            }

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

        return { winner, won, targetScore: evalRes.score, challengerScore: ch.challengerScore };
    }

    // ─── SEARCH PLAYERS NA GUILDA COM FILTRO DE CODE POWER (RN-MM-001) ───
    async searchPlayers(query = '', filterCPRange = 0) {
        try {
            let classCode = authManager.getClassCode();
            let members = [];

            if (classCode) {
                members = await Promise.race([
                    authManager.getGuildMembers(classCode),
                    new Promise(res => setTimeout(() => res([]), 2500))
                ]);
            }

            // Se ainda não encontrou membros suficientes, busca lista rápida de usuários
            if (!members || members.length <= 1) {
                const snap = await Promise.race([
                    fbDB.collection('users').limit(25).get(),
                    new Promise(res => setTimeout(() => res({ docs: [] }), 2500))
                ]);
                members = snap.docs ? snap.docs.map(d => ({ uid: d.id, ...d.data() })) : [];
            }

            const myUid = authManager.currentUser?.uid;
            const myCP = (typeof app !== 'undefined' && app.engine?.state?.codePower) || 1000;
            
            return members
                .filter(u => {
                    if (u.uid === myUid) return false;
                    const nameMatches = !query || (u.displayName || u.email || '').toLowerCase().includes(query.toLowerCase());
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

    // ─── GUILD RANKING (RN-RANK-001, RN-RANK-002 - SWR Enabled) ───
    async getGuildLeaderboard(onBackgroundUpdate) {
        try {
            let classCode = authManager.getClassCode();
            if (!classCode && authManager.getEffectiveGuildCode) {
                classCode = await authManager.getEffectiveGuildCode();
            }
            if (!classCode) return [];
            
            const formatMembersList = (members) => {
                return (members || []).map(m => {
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
                }).sort((a, b) => {
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
            };

            const members = await authManager.getGuildMembers(classCode, (freshMembers) => {
                if (typeof onBackgroundUpdate === 'function') {
                    onBackgroundUpdate(formatMembersList(freshMembers));
                }
            });
            
            return formatMembersList(members);
        } catch (e) {
            console.warn('[Ranked] getGuildLeaderboard error:', e);
            return [];
        }
    }
}

const rankedManager = new RankedManager();
