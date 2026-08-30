/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Tournaments (Real-time Battle Royale)
   ═══════════════════════════════════════════════════════════════ */

class TournamentManager {
    constructor() {
        this.currentTournament = null;
        this.unsubLeaderboard = null;
        this.onLeaderboardUpdate = null;
    }

    // ─── CREATE TOURNAMENT (teacher) ───
    async create(title, chapterIds, timeLimitMin, challengeCountPerChapter = 2) {
        const id = 'TOUR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const data = {
            id, title,
            createdBy: authManager.currentUser.uid,
            teacherName: authManager.getDisplayName(),
            status: 'waiting',
            chapterIds,
            timeLimit: timeLimitMin,
            challengeCountPerChapter,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            startedAt: null,
            participants: [],
            challenges: this.generateChallenges(chapterIds, challengeCountPerChapter)
        };
        await fbDB.collection('tournaments').doc(id).set(data);
        return id;
    }

    // ─── EDIT TOURNAMENT (teacher) ───
    async edit(tournamentId, title, chapterIds, timeLimitMin, challengeCountPerChapter = 2) {
        const doc = await fbDB.collection('tournaments').doc(tournamentId).get();
        if (!doc.exists) throw new Error('Torneio não encontrado');
        const updateData = {
            title,
            chapterIds,
            timeLimit: timeLimitMin,
            challengeCountPerChapter,
            challenges: this.generateChallenges(chapterIds, challengeCountPerChapter)
        };
        await fbDB.collection('tournaments').doc(tournamentId).update(updateData);
        return true;
    }

    // ─── DELETE TOURNAMENT (teacher) ───
    async delete(tournamentId) {
        await fbDB.collection('tournaments').doc(tournamentId).delete();
        return true;
    }

    generateChallenges(chapterIds, countPerChapter = 2) {
        const challenges = [];
        for (const chId of chapterIds) {
            const chapter = CHAPTERS.find(c => c.id === chId);
            if (!chapter) continue;
            const count = Math.max(1, Math.min(chapter.activities.length, countPerChapter || 2));
            const acts = chapter.activities.slice(0, count).map(a => ({
                id: a.id,
                title: a.title,
                difficulty: a.difficulty || 'medium',
                description: a.description || '',
                starterCode: a.starterCode || '#include <stdio.h>\n\nint main() {\n    // Escreva seu código aqui\n    return 0;\n}',
                hints: a.hints || [],
                tests: a.tests || []
            }));
            challenges.push({ chapterId: chId, chapterTitle: chapter.title, activities: acts });
        }
        return challenges;
    }

    // ─── JOIN TOURNAMENT ───
    async join(tournamentId) {
        try {
            if (!authManager.currentUser) return false;
            const uid = authManager.currentUser.uid;
            const name = authManager.getDisplayName() || 'Jogador';
            const email = authManager.currentUser.email || '';
            const photoURL = authManager.getPhotoURL() || '';
            const gp = (typeof app !== 'undefined' && app.engine ? app.engine.state : null) || authManager.userData?.gameProgress || {};
            const level = gp.level || 1;
            const completedChapters = gp.chapters ? Object.values(gp.chapters).filter(c => c && c.completed).length : 0;
            const power = (typeof app !== 'undefined' && app.engine ? app.engine.getGuildPower() : Math.round((completedChapters / 15) * 100));

            const doc = await fbDB.collection('tournaments').doc(tournamentId).get();
            if (!doc.exists) return false;
            const data = doc.data();
            
            const existingIdx = data.participants.findIndex(p => p.uid === uid);
            if (existingIdx !== -1) {
                // Atualiza dados caso o jogador tenha mudado de avatar ou nível
                data.participants[existingIdx].name = name;
                data.participants[existingIdx].email = email;
                data.participants[existingIdx].photoURL = photoURL;
                data.participants[existingIdx].level = level;
                data.participants[existingIdx].completedChapters = completedChapters;
                data.participants[existingIdx].power = power;
                await fbDB.collection('tournaments').doc(tournamentId).update({
                    participants: data.participants
                });
                this.currentTournament = { id: tournamentId, ...data };
                return true;
            }

            data.participants.push({
                uid,
                name,
                email,
                photoURL,
                level,
                completedChapters,
                power,
                score: 0,
                submissions: 0,
                rank: data.participants.length + 1
            });
            await fbDB.collection('tournaments').doc(tournamentId).update({
                participants: data.participants
            });
            this.currentTournament = { id: tournamentId, ...data };
            return true;
        } catch (e) {
            console.warn('join tournament error:', e.message);
            return false;
        }
    }

    // ─── START TOURNAMENT (teacher) ───
    async start(tournamentId) {
        await fbDB.collection('tournaments').doc(tournamentId).update({
            status: 'active',
            startedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    // ─── PAUSE / RESUME TOURNAMENT (teacher) ───
    async togglePause(tournamentId) {
        const doc = await fbDB.collection('tournaments').doc(tournamentId).get();
        if (!doc.exists) return false;
        const data = doc.data();
        const isCurrentlyPaused = data.status === 'paused';
        const newStatus = isCurrentlyPaused ? 'active' : 'paused';
        
        await fbDB.collection('tournaments').doc(tournamentId).update({
            status: newStatus,
            pausedAt: isCurrentlyPaused ? null : firebase.firestore.FieldValue.serverTimestamp()
        });
        return newStatus;
    }

    // ─── SKIP CHALLENGE GLOBALLY (teacher) ───
    async skipChallenge(tournamentId, newChallengeIdx) {
        await fbDB.collection('tournaments').doc(tournamentId).update({
            currentGlobalChallengeIdx: Number(newChallengeIdx) || 0,
            lastSkipAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    }

    // ─── SUBMIT SCORE ───
    async submitScore(tournamentId, challengeIdx, code, passed, timeMs) {
        if (!authManager.currentUser) return;
        const uid = authManager.currentUser.uid;
        const doc = await fbDB.collection('tournaments').doc(tournamentId).get();
        if (!doc.exists) return;
        const data = doc.data();
        const p = data.participants.find(p => p.uid === uid);
        if (!p) return;

        // Anti-Cheat: Validar que o código realmente compila/executa se alegou 'passed'
        let verifiedPass = false;
        if (passed && typeof CInterpreter !== 'undefined' && code && code.trim().length > 10) {
            try {
                const interp = new CInterpreter();
                const res = interp.execute(code);
                // Código deve executar sem erros fatais e gerar alguma saída ou ter estrutura main
                if (res.success && code.includes('main')) {
                    verifiedPass = true;
                }
            } catch (e) {
                verifiedPass = false;
            }
        }

        // Score: 100 base if verified pass, +speed bonus (up to 50), +quality (up to 50)
        let score = 0;
        if (verifiedPass) {
            score = 100;
            const validTimeMs = Math.max(1000, Number(timeMs) || 1000); // Mínimo 1s
            score += Math.max(0, 50 - Math.floor(validTimeMs / 1000)); // speed
            const lines = code.split('\n').filter(l => l.trim().length > 0).length;
            const hasComments = code.includes('//');
            score += Math.min(50, lines * 2 + (hasComments ? 20 : 0)); // quality
        }
        p.score += score;
        p.submissions++;
        await fbDB.collection('tournaments').doc(tournamentId).update({ participants: data.participants });
    }

    // ─── FINISH TOURNAMENT & SEAL WINNER ───
    async finish(tournamentId, preloadedData = null) {
        try {
            let data = preloadedData;
            if (!data) {
                const doc = await fbDB.collection('tournaments').doc(tournamentId).get();
                if (!doc.exists) return null;
                data = doc.data();
            }

            const participants = (data.participants && Array.isArray(data.participants)) ? [...data.participants] : [];
            participants.sort((a, b) => (b.score || 0) - (a.score || 0));

            let winner = null;
            if (participants.length > 0) {
                const first = participants[0];
                winner = {
                    uid: first.uid || '',
                    name: first.name || 'Campeão',
                    photoURL: first.photoURL || '',
                    level: first.level || 1,
                    score: first.score || 0,
                    power: first.power || 100,
                    completedChapters: first.completedChapters || 0
                };
            }

            const updatePayload = {
                status: 'finished',
                finishedAt: firebase.firestore.FieldValue.serverTimestamp(),
                winner: winner
            };

            await fbDB.collection('tournaments').doc(tournamentId).update(updatePayload);
            return { id: tournamentId, ...data, ...updatePayload };
        } catch (e) {
            console.warn('[Tournament] finish error:', e.message);
            return null;
        }
    }

    // ─── REMOVE / EXCLUDE FROM HALL OF FAME (teacher/admin) ───
    async removeFromHallOfFame(tournamentId) {
        if (!authManager.currentUser) throw new Error('Não autenticado');
        if (!authManager.isTeacher() && !authManager.isAdmin()) {
            throw new Error('Apenas Mestres e Administradores podem gerenciar o Hall da Fama.');
        }
        await fbDB.collection('tournaments').doc(tournamentId).update({
            removedFromHall: true,
            hallRemovedAt: firebase.firestore.FieldValue.serverTimestamp(),
            hallRemovedBy: authManager.currentUser.uid
        });
        return true;
    }

    // ─── GET HALL OF FAME (CHAMPIONS ONLY) ───
    async getHallOfFame() {
        try {
            const snap = await fbDB.collection('tournaments')
                .where('status', '==', 'finished')
                .limit(50).get();

            const list = [];
            snap.forEach(doc => {
                const d = { id: doc.id, ...doc.data() };
                if (d.winner && !d.removedFromHall && d.winner.score >= 0) {
                    list.push(d);
                }
            });

            // Ordena os campeões por pontuação do vencedor e data de vitória
            return list.sort((a, b) => {
                const scoreDiff = (b.winner?.score || 0) - (a.winner?.score || 0);
                if (scoreDiff !== 0) return scoreDiff;
                return (b.finishedAt?.seconds || b.createdAt?.seconds || 0) - (a.finishedAt?.seconds || a.createdAt?.seconds || 0);
            });
        } catch (e) {
            console.warn('[Tournament] getHallOfFame error:', e.message);
            return [];
        }
    }

    // ─── LISTEN LEADERBOARD (real-time) ───
    listenLeaderboard(tournamentId, callback) {
        if (this.unsubLeaderboard) this.unsubLeaderboard();
        this.unsubLeaderboard = fbDB.collection('tournaments').doc(tournamentId)
            .onSnapshot(doc => {
                if (doc.exists) {
                    const data = { id: doc.id, ...doc.data() };
                    if (data.participants && Array.isArray(data.participants)) {
                        data.participants.sort((a, b) => (b.score || 0) - (a.score || 0));
                        data.participants.forEach((p, i) => p.rank = i + 1);
                    }
                    this.currentTournament = data;
                    callback(data);
                }
            }, err => {
                console.warn('Tournament listenLeaderboard error:', err);
            });
    }

    stopListening() {
        if (this.unsubLeaderboard) { this.unsubLeaderboard(); this.unsubLeaderboard = null; }
    }

    // ─── GET TOURNAMENTS (ACTIVE / WAITING) WITH AUTO-EXPIRE ───
    async getActive() {
        try {
            const snap = await fbDB.collection('tournaments')
                .where('status', 'in', ['waiting', 'active', 'paused'])
                .limit(25).get();

            const nowSec = Math.floor(Date.now() / 1000);
            const activeList = [];

            for (const doc of snap.docs) {
                const d = { id: doc.id, ...doc.data() };
                
                // Auto-expiração: se estiver active e o tempo limite expirou
                if (d.status === 'active' && d.startedAt) {
                    const startedSec = d.startedAt.seconds || nowSec;
                    const limitSec = (Number(d.timeLimit) || 15) * 60;
                    if (startedSec + limitSec < nowSec) {
                        // Finaliza automaticamente e não exibe na lista de ativos
                        this.finish(doc.id, d).catch(() => {});
                        continue;
                    }
                }
                activeList.push(d);
            }

            return activeList.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        } catch (e) {
            console.warn('getActive tournaments error:', e.message);
            return [];
        }
    }

    async getHistory() {
        try {
            const snap = await fbDB.collection('tournaments')
                .where('status', '==', 'finished')
                .limit(20).get();
            return snap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                .sort((a, b) => (b.finishedAt?.seconds || b.createdAt?.seconds || 0) - (a.finishedAt?.seconds || a.createdAt?.seconds || 0));
        } catch (e) {
            console.warn('getHistory tournaments error:', e.message);
            return [];
        }
    }
}

const tournamentManager = new TournamentManager();
