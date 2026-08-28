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
            const uid = authManager.currentUser.uid;
            const name = authManager.getDisplayName();
            const doc = await fbDB.collection('tournaments').doc(tournamentId).get();
            if (!doc.exists) return false;
            const data = doc.data();
            if (data.participants.find(p => p.uid === uid)) return true;
            data.participants.push({
                uid, name, score: 0, submissions: 0, rank: data.participants.length + 1
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

    // ─── GET TOURNAMENTS ───
    async getActive() {
        try {
            const snap = await fbDB.collection('tournaments')
                .where('status', 'in', ['waiting', 'active'])
                .limit(10).get();
            return snap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        } catch (e) {
            console.warn('getActive tournaments error:', e.message);
            return [];
        }
    }

    async getHistory() {
        try {
            const snap = await fbDB.collection('tournaments')
                .where('status', '==', 'finished')
                .limit(10).get();
            return snap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        } catch (e) {
            console.warn('getHistory tournaments error:', e.message);
            return [];
        }
    }
}

const tournamentManager = new TournamentManager();
