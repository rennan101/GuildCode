/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Ranked Matches & Guild PvP Progression System
   Implements Business Rules (RN-PVP, RN-REP, RN-TIER, RN-RANK, RN-CP, RN-MM, RN-ABUSE)
   ═══════════════════════════════════════════════════════════════ */

const PVP_TIERS = [
    { name: "Scriptling", minRenome: 0, maxRenome: 99, icon: "⟨/⟩", color: "#94a3b8", rewardXP: 50, rewardTokens: 30 },
    { name: "Code Initiate", minRenome: 100, maxRenome: 249, icon: "◈", color: "#4ade80", rewardXP: 100, rewardTokens: 60 },
    { name: "Syntax Adept", minRenome: 250, maxRenome: 449, icon: "◆", color: "#38bdf8", rewardXP: 180, rewardTokens: 100 },
    { name: "Logic Knight", minRenome: 450, maxRenome: 699, icon: "⚔", color: "#818cf8", rewardXP: 280, rewardTokens: 150 },
    { name: "Code Master", minRenome: 700, maxRenome: 999, icon: "♔", color: "#fbbf24", rewardXP: 400, rewardTokens: 220 },
    { name: "Arcane Coder", minRenome: 1000, maxRenome: 1399, icon: "✦", color: "#a855f7", rewardXP: 600, rewardTokens: 320 },
    { name: "Grand CodeMancer", minRenome: 1400, maxRenome: 1899, icon: "★", color: "#c084fc", rewardXP: 900, rewardTokens: 450 },
    { name: "Legendary CodeMancer", minRenome: 1900, maxRenome: Infinity, icon: "✧", color: "#f43f5e", rewardXP: 1500, rewardTokens: 800, grantAscensionCrystal: true }
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

    // ─── CALCULAR GANHO E PERDA BALANCEADA DE RENOME ───
    calculateRenomeDelta(currentRenome, won) {
        const r = Math.max(0, Number(currentRenome) || 0);
        if (won) {
            if (r < 250) return 30;   // Elos Iniciais (Scriptling / Initiate): incentivo forte (+30)
            if (r < 700) return 25;   // Elos Intermediários (Syntax Adept / Logic Knight): balanceado (+25)
            if (r < 1400) return 20;  // Elos Altos (Code Master / Arcane Coder): exigente (+20)
            return 18;                // Elos Mestres / Lendários (Grand / Legendary): competitivo (+18)
        } else {
            if (r < 100) return -5;   // Scriptling: proteção inicial para novos aprendizes (-5)
            if (r < 250) return -10;  // Code Initiate: perda suave (-10)
            if (r < 700) return -15;  // Intermediários: perda moderada (-15)
            if (r < 1400) return -18; // Elos Altos: perda balanceada (-18)
            return -20;               // Mestres / Lendários: erro punitivo (-20)
        }
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
        
        const isCSharp = (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const chapterList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;
        const chapter = chapterList.find(c => c.id === chapterId);
        if (!chapter) return null;

        let activities = [];

        // 1. Atividades do Capítulo (pega as 2 primeiras)
        if (chapter.activities && Array.isArray(chapter.activities)) {
            const chActs = chapter.activities.slice(0, 2).map((a, idx) => ({
                id: a.id || `pvp_ch_${chapterId}_act_${idx + 1}`,
                title: a.title ? `[Capítulo] ${a.title}` : `Desafio ${idx + 1}`,
                description: a.description || a.prompt || 'Resolva o problema para pontuar no duelo.',
                starterCode: a.starterCode || '',
                tests: a.tests || [],
                hints: a.hints || [],
                source: 'chapter'
            }));
            activities.push(...chActs);
        }

        // 2. Desafio do Abismo correspondente ao andar do capítulo
        let abyssQuests = [];
        if (typeof app !== 'undefined' && typeof app.getAbyssQuestsForFloor === 'function') {
            try {
                abyssQuests = app.getAbyssQuestsForFloor(chapterId) || [];
            } catch (e) { console.warn('getAbyssQuestsForFloor error:', e); }
        } else if (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) {
            abyssQuests = SIDE_QUESTS[chapterId];
        }

        if (abyssQuests && abyssQuests.length > 0) {
            const abQuest = abyssQuests[0];
            activities.push({
                id: abQuest.id || `pvp_abyss_${chapterId}_1`,
                title: abQuest.title ? `[Abismo] ${abQuest.title}` : `Desafio do Abismo`,
                description: abQuest.description || 'Desafio do Andar do Abismo. Conclua com código limpo e preciso!',
                starterCode: abQuest.starterCode || '',
                tests: abQuest.tests || [],
                hints: abQuest.hints || [],
                source: 'abyss'
            });
        }

        // 3. Fallback C# Procedural ou Atividades restantes se não tiver 3
        if (activities.length < 3 && isCSharp && typeof window !== 'undefined' && window.PTS && typeof window.PTS.generateChallenge === 'function') {
            try {
                while (activities.length < 3) {
                    const proc = window.PTS.generateChallenge(chapterId);
                    if (proc) {
                        activities.push({
                            id: proc.id || `pvp_proc_${chapterId}_${activities.length + 1}`,
                            title: proc.title ? `[C# PTS] ${proc.title}` : `Duelo C#: Câmara ${activities.length + 1}`,
                            description: proc.description || 'Desafio procedural do Duelo.',
                            starterCode: proc.starterCode || 'using UnityEngine;\n\npublic class PvpChallenge : MonoBehaviour {\n    void Start() {\n        \n    }\n}',
                            tests: proc.tests || [],
                            hints: proc.hints || [],
                            source: 'procedural'
                        });
                    } else {
                        break;
                    }
                }
            } catch (err) {
                console.warn('[RankedManager] Fallback C# PTS:', err);
            }
        }

        // Fallback final caso capítulo tenha mais atividades
        if (activities.length < 3 && chapter.activities && chapter.activities.length > 2) {
            for (let i = 2; i < chapter.activities.length && activities.length < 3; i++) {
                const a = chapter.activities[i];
                activities.push({
                    id: a.id || `pvp_ch_${chapterId}_extra_${i + 1}`,
                    title: a.title ? `[Capítulo] ${a.title}` : `Desafio Extra ${i + 1}`,
                    description: a.description || 'Resolva o problema.',
                    starterCode: a.starterCode || '',
                    tests: a.tests || [],
                    hints: a.hints || [],
                    source: 'chapter'
                });
            }
        }

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
            worldId: isCSharp ? 'csharp_unity' : 'c_lang',
            activities,
            status: 'pending',
            challengerCode: null, 
            challengerTime: 0, 
            challengerScore: 0,
            challengerHits: 0,
            challengerErrors: 0,
            targetCode: null, 
            targetTime: 0, 
            targetScore: 0,
            targetHits: 0,
            targetErrors: 0,
            winner: null,
            renomeDeltaWon: 25,
            renomeDeltaLost: -20,
            challengerRewardClaimed: false,
            targetRewardClaimed: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            completedAt: null
        };
        const ref = await fbDB.collection('challenges').add(challengeData);
        return ref.id;
    }

    // ─── DECLINE / REJECT CHALLENGE ───
    async declineChallenge(challengeId) {
        if (!authManager.currentUser) return false;
        try {
            const docRef = fbDB.collection('challenges').doc(challengeId);
            const snap = await docRef.get();
            if (!snap.exists) return true;
            const ch = snap.data();
            // Permite que o targetUid apague o desafio pendente
            if (ch.targetUid === authManager.currentUser.uid || ch.challengerUid === authManager.currentUser.uid) {
                await docRef.delete();
                return true;
            }
            return false;
        } catch (e) {
            console.warn('[RankedManager] declineChallenge error:', e.message);
            return false;
        }
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
            // Executa duas queries autorizadas pelo Firestore Security Rules (uma onde o usuário é desafiante, outra onde é o desafiado)
            const [snapChallenger, snapTarget] = await Promise.all([
                fbDB.collection('challenges')
                    .where('challengerUid', '==', uid)
                    .where('status', '==', 'completed')
                    .limit(30).get().catch(err => {
                        console.warn('snapChallenger error:', err.message);
                        return { docs: [] };
                    }),
                fbDB.collection('challenges')
                    .where('targetUid', '==', uid)
                    .where('status', '==', 'completed')
                    .limit(30).get().catch(err => {
                        console.warn('snapTarget error:', err.message);
                        return { docs: [] };
                    })
            ]);

            const map = new Map();
            [...snapChallenger.docs, ...snapTarget.docs].forEach(d => {
                map.set(d.id, { id: d.id, ...d.data() });
            });

            return Array.from(map.values())
                .sort((a, b) => {
                    const timeA = a.completedAt?.seconds || (a.completedAt ? new Date(a.completedAt).getTime()/1000 : 0) || 0;
                    const timeB = b.completedAt?.seconds || (b.completedAt ? new Date(b.completedAt).getTime()/1000 : 0) || 0;
                    return timeB - timeA;
                });
        } catch (e) {
            console.warn('getChallengeHistory error:', e.message);
            return [];
        }
    }

    // ─── HELPER: EVALUATE CODE QUALITY, SPEED & COHERENCE ───
    _evaluateSubmission(code, timeMs, stats = {}) {
        if (!code || typeof code !== 'string') {
            return { score: 0, time: 999999, valid: false, hits: 0, errors: stats.errors || 0 };
        }
        const isCSharp = (typeof app !== 'undefined' && app.ui && typeof app.ui.isCSharpWorld === 'function' && app.ui.isCSharpWorld(code)) ||
                         (/using\s+UnityEngine/i.test(code) || /MonoBehaviour/i.test(code) || /Debug\.Log/i.test(code));

        let isValid = false;

        if (isCSharp && (typeof CSharpInterpreter !== 'undefined' || (typeof window !== 'undefined' && typeof window.CSharpInterpreter !== 'undefined'))) {
            try {
                const InterpClass = (typeof CSharpInterpreter !== 'undefined') ? CSharpInterpreter : window.CSharpInterpreter;
                const csInterp = new InterpClass();
                const res = csInterp.execute(code);
                const hasStructure = /(?:int|float|string|bool|Vector3|void|Debug\.Log)/.test(code);
                const noErrors = (!res.errors || res.errors.length === 0);
                if ((res.success || noErrors) && hasStructure) {
                    isValid = true;
                }
            } catch (e) { isValid = false; }
        } else if (typeof CInterpreter !== 'undefined' || (typeof window !== 'undefined' && typeof window.CInterpreter !== 'undefined')) {
            try {
                const InterpClass = (typeof CInterpreter !== 'undefined') ? CInterpreter : window.CInterpreter;
                const interp = new InterpClass();
                const res = interp.execute(code);
                if (res.success || (res.errors && res.errors.length === 0)) {
                    isValid = true;
                }
            } catch (e) { isValid = false; }
        }

        const hits = stats.hits !== undefined ? Number(stats.hits) : (isValid ? 3 : 0);
        const errors = stats.errors !== undefined ? Number(stats.errors) : (isValid ? 0 : 1);

        if (hits > 0) isValid = true;

        const cleanedLines = code.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('//'));
        
        let baseScore = isValid ? (hits * 40) : 0;
        let penalty = Math.min(60, errors * 10);
        let qualityBonus = isValid ? Math.min(20, cleanedLines.length * 2) : 0;

        let effectiveTimeMs = Math.max(1000, Number(timeMs) || 1000);

        if (typeof getAvatarSkillBonus === 'function') {
            const cooldownReduction = getAvatarSkillBonus('skill_cooldown_red');
            if (cooldownReduction > 0) {
                effectiveTimeMs = Math.max(800, Math.round(effectiveTimeMs * (1 - cooldownReduction)));
                if (typeof notifyAvatarSkillTrigger === 'function') {
                    notifyAvatarSkillTrigger(`-20% Tempo de Ação PVP`);
                }
            }
        }

        const timeSec = Math.max(1, effectiveTimeMs / 1000);
        let speedBonus = 0;
        if (isValid) {
            if (timeSec <= 30) speedBonus = 50;
            else if (timeSec <= 60) speedBonus = 40;
            else if (timeSec <= 120) speedBonus = 30;
            else if (timeSec <= 180) speedBonus = 20;
            else if (timeSec <= 300) speedBonus = 10;
        }

        let totalScore = Math.max(0, baseScore + qualityBonus + speedBonus - penalty);

        if (isValid && typeof getAvatarSkillBonus === 'function') {
            const pvpDamageBonus = getAvatarSkillBonus('pvp_damage');
            if (pvpDamageBonus > 0) {
                const bonusScore = Math.round(totalScore * pvpDamageBonus);
                totalScore += bonusScore;
                if (typeof notifyAvatarSkillTrigger === 'function') {
                    notifyAvatarSkillTrigger(`+${bonusScore} Pontos Dragão`);
                }
            }
        }

        return {
            score: totalScore,
            time: effectiveTimeMs,
            valid: isValid,
            hits: hits,
            errors: errors
        };
    }

    // ─── HELPER: APPLY MATCH REWARDS TO CURRENT PLAYER ───
    applyPvPMatchRewards(won, myTimeSec, myScore, opponentCP = 1000) {
        if (typeof app === 'undefined' || !app.engine) {
            return { xpGained: 0, renomeDelta: 0, cpDelta: 0 };
        }
        const engine = app.engine;

        // RN-PVP-002 / RN-PVP-003: XP por vitória/derrota
        const xpGained = won ? 50 : 20;
        engine.addXP(xpGained);

        // RN-REP-002 / RN-REP-003 / RN-REP-004: Renome balanceado com piso em 0
        const currentRenome = (engine.state.renome !== undefined && engine.state.renome !== null) ? engine.state.renome : 80;
        let renomeDelta = this.calculateRenomeDelta(currentRenome, won);

        // Subclasse Hardcoder Perk: Fúria do Compilador (hc_turbo_pvp) reduz a perda de renome pela metade
        if (!won && engine.hasSkill('hc_turbo_pvp', authManager.currentUser)) {
            renomeDelta = Math.round(renomeDelta / 2);
        }

        // Bônus de Avatar Ativo em PVP:
        if (typeof getAvatarSkillBonus === 'function') {
            if (!won) {
                // Code Knight (03): Reduz em 20% a perda de Renome em derrotas no Coliseu PVP
                const lossShield = getAvatarSkillBonus('pvp_loss_shield');
                if (lossShield > 0) {
                    renomeDelta = Math.round(renomeDelta * (1 - lossShield));
                    if (typeof notifyAvatarSkillTrigger === 'function') {
                        notifyAvatarSkillTrigger(`Perda de Renome reduzida em ${Math.round(lossShield * 100)}%`);
                    }
                }
            } else {
                // SteamCore (05): +10% de Renome extra ao vencer em menos de 60s
                const speedBonus = getAvatarSkillBonus('pvp_speed_bonus');
                if (speedBonus > 0 && myTimeSec <= 60) {
                    renomeDelta = Math.round(renomeDelta * (1 + speedBonus));
                    if (typeof notifyAvatarSkillTrigger === 'function') {
                        notifyAvatarSkillTrigger(`+${Math.round(speedBonus * 100)}% Renome por Vitória Rápida`);
                    }
                }
                // Void Caster (17): Converte 10% da pontuação em Tokens
                const tokenSteal = getAvatarSkillBonus('pvp_token_steal');
                if (tokenSteal > 0 && myScore) {
                    const tokensFromScore = Math.max(1, Math.round(myScore * tokenSteal));
                    engine.addTokens(tokensFromScore);
                    if (typeof notifyAvatarSkillTrigger === 'function') {
                        notifyAvatarSkillTrigger(`+${tokensFromScore} Tokens do Adversário`);
                    }
                }
            }
        }

        engine.state.renome = Math.max(0, currentRenome + renomeDelta);

        // RN-CP-003: Ajuste de Code Power (Elo MMR)
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
        return { xpGained, renomeDelta, cpDelta };
    }

    // ─── SUBMIT CHALLENGE (challenger) ───
    async submitChallengerCode(challengeId, code, timeMs, stats = {}) {
        const evalRes = this._evaluateSubmission(code, timeMs, stats);
        const docRef = fbDB.collection('challenges').doc(challengeId);
        const snap = await docRef.get();
        const ch = snap.exists ? snap.data() : {};

        const updateData = {
            challengerCode: code, 
            challengerTime: evalRes.time, 
            challengerScore: evalRes.score,
            challengerHits: evalRes.hits,
            challengerErrors: evalRes.errors
        };

        // Se o adversário já concluiu, finaliza o duelo agora
        if (ch.status === 'target_done' || (ch.targetScore !== undefined && ch.targetScore !== null && ch.targetTime > 0)) {
            updateData.challengerRewardClaimed = true;
            const tScore = ch.targetScore || 0;
            const tTime = ch.targetTime || 999999;
            let winnerUid = null;
            let winnerName = '';

            if (evalRes.score > tScore) {
                winnerUid = ch.challengerUid;
                winnerName = ch.challengerName || 'Desafiante';
            } else if (evalRes.score < tScore) {
                winnerUid = ch.targetUid;
                winnerName = ch.targetName || 'Desafiado';
            } else {
                winnerUid = evalRes.time <= tTime ? ch.challengerUid : ch.targetUid;
                winnerName = (winnerUid === ch.challengerUid) ? (ch.challengerName || 'Desafiante') : (ch.targetName || 'Desafiado');
            }

            updateData.status = 'completed';
            updateData.winner = winnerUid;
            updateData.winnerName = winnerName;
            updateData.completedAt = firebase.firestore.FieldValue.serverTimestamp();

            await docRef.update(updateData);

            const won = winnerUid === authManager.currentUser?.uid;
            const myTimeSec = Math.round(evalRes.time / 1000);
            this.applyPvPMatchRewards(won, myTimeSec, evalRes.score, ch.targetCP || 1000);

            return {
                ...evalRes,
                isDuelCompleted: true,
                winner: winnerUid,
                winnerName: winnerName,
                won: won,
                challengerScore: evalRes.score,
                targetScore: tScore,
                challengerTime: evalRes.time,
                targetTime: tTime
            };
        } else {
            updateData.status = 'challenger_done';
            await docRef.update(updateData);
            return {
                ...evalRes,
                isDuelCompleted: false
            };
        }
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
            const winnerName = isChallenger ? (ch.targetName || 'Desafiado') : (ch.challengerName || 'Desafiante');

            await docRef.update({
                status: 'completed',
                winner: winner,
                winnerName: winnerName,
                forfeitedBy: forfeiterUid,
                completedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Aplica derrota ao jogador que desistiu/desconectou
            if (typeof app !== 'undefined' && app.engine) {
                const engine = app.engine;
                const currentRenome = (engine.state.renome !== undefined && engine.state.renome !== null) ? engine.state.renome : 80;
                let renomeDelta = this.calculateRenomeDelta(currentRenome, false);
                if (engine.hasSkill('hc_turbo_pvp', authManager.currentUser)) {
                    renomeDelta = Math.round(renomeDelta / 2);
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
    async submitTargetCode(challengeId, code, timeMs, stats = {}) {
        const evalRes = this._evaluateSubmission(code, timeMs, stats);
        const docRef = fbDB.collection('challenges').doc(challengeId);
        const challengeDoc = await docRef.get();
        const ch = challengeDoc.data() || {};
        
        const cScore = ch.challengerScore || 0;
        const cTime = ch.challengerTime || 999999;
        let winner = null;
        let winnerName = '';

        if (evalRes.score > cScore) {
            winner = ch.targetUid;
            winnerName = ch.targetName || 'Desafiado';
        } else if (evalRes.score < cScore) {
            winner = ch.challengerUid;
            winnerName = ch.challengerName || 'Desafiante';
        } else {
            // Em caso de empate de pontos, quem fez em menos tempo vence
            if (evalRes.time <= cTime) {
                winner = ch.targetUid;
                winnerName = ch.targetName || 'Desafiado';
            } else {
                winner = ch.challengerUid;
                winnerName = ch.challengerName || 'Desafiante';
            }
        }

        const isChallengerAlreadyDone = (ch.status === 'challenger_done') || (cTime > 0 && cTime < 999999);
        const finalStatus = isChallengerAlreadyDone ? 'completed' : 'target_done';

        await docRef.update({
            targetCode: code, 
            targetTime: evalRes.time, 
            targetScore: evalRes.score,
            targetHits: evalRes.hits,
            targetErrors: evalRes.errors,
            targetRewardClaimed: true,
            status: finalStatus, 
            winner: winner,
            winnerName: winnerName,
            completedAt: finalStatus === 'completed' ? firebase.firestore.FieldValue.serverTimestamp() : null
        });

        // Aplica Regras de Negócio de PvP ao Jogador Atual
        const currentUid = authManager.currentUser?.uid;
        const won = winner === currentUid;
        const myTimeSec = Math.round(evalRes.time / 1000);
        const rewards = this.applyPvPMatchRewards(won, myTimeSec, evalRes.score, ch.challengerCP || 1000);

        return { 
            winner, 
            winnerName,
            won, 
            isDuelCompleted: finalStatus === 'completed',
            targetScore: evalRes.score, 
            challengerScore: cScore,
            targetTime: evalRes.time,
            challengerTime: cTime,
            rewards 
        };
    }

    // ─── CHECK & PROCESS UNCLAIMED DUELS (quando o jogador ausente retorna) ───
    async checkUnclaimedDuelResults() {
        if (!authManager.currentUser) return [];
        const uid = authManager.currentUser.uid;
        try {
            const [snapChallenger, snapTarget] = await Promise.all([
                fbDB.collection('challenges')
                    .where('challengerUid', '==', uid)
                    .where('status', '==', 'completed')
                    .limit(10).get().catch(() => ({ docs: [] })),
                fbDB.collection('challenges')
                    .where('targetUid', '==', uid)
                    .where('status', '==', 'completed')
                    .limit(10).get().catch(() => ({ docs: [] }))
            ]);

            const unclaimed = [];
            snapChallenger.docs.forEach(d => {
                const data = { id: d.id, ...d.data() };
                if (data.challengerRewardClaimed !== true) {
                    unclaimed.push({ role: 'challenger', data });
                }
            });
            snapTarget.docs.forEach(d => {
                const data = { id: d.id, ...d.data() };
                if (data.targetRewardClaimed !== true) {
                    unclaimed.push({ role: 'target', data });
                }
            });

            const processed = [];
            for (const item of unclaimed) {
                const ch = item.data;
                const won = ch.winner === uid;
                const isChallenger = item.role === 'challenger';
                const myTimeSec = Math.round(((isChallenger ? ch.challengerTime : ch.targetTime) || 0) / 1000);
                const myScore = isChallenger ? (ch.challengerScore || 0) : (ch.targetScore || 0);
                const oppCP = isChallenger ? (ch.targetCP || 1000) : (ch.challengerCP || 1000);

                const rewards = this.applyPvPMatchRewards(won, myTimeSec, myScore, oppCP);

                const updateField = isChallenger ? { challengerRewardClaimed: true } : { targetRewardClaimed: true };
                await fbDB.collection('challenges').doc(ch.id).update(updateField).catch(() => {});

                processed.push({
                    challenge: ch,
                    won: won,
                    rewards: rewards
                });
            }
            return processed;
        } catch (e) {
            console.warn('checkUnclaimedDuelResults error:', e.message);
            return [];
        }
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
                    const renome = (gp.renome !== undefined && gp.renome !== null) ? gp.renome : 80;
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
