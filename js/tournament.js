/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Tournaments (Real-time Battle Royale)
   ═══════════════════════════════════════════════════════════════ */

class TournamentManager {
    constructor() {
        this.currentTournament = null;
        this.unsubLeaderboard = null;
        this.onLeaderboardUpdate = null;
    }

    // ─── CREATE TOURNAMENT (teacher) ───
    async create(title, chapterIds, timeLimitMin) {
        const id = 'TOUR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const data = {
            id, title,
            createdBy: authManager.currentUser.uid,
            teacherName: authManager.getDisplayName(),
            status: 'waiting',
            chapterIds,
            timeLimit: timeLimitMin,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            startedAt: null,
            participants: [],
            challenges: this.generateChallenges(chapterIds)
        };
        await fbDB.collection('tournaments').doc(id).set(data);
        return id;
    }

    generateChallenges(chapterIds) {
        const challenges = [];
        for (const chId of chapterIds) {
            const chapter = CHAPTERS.find(c => c.id === chId);
            if (!chapter) continue;
            const acts = chapter.activities.slice(0, 2).map(a => ({
                id: a.id, title: a.title, starterCode: a.starterCode
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
        const uid = authManager.currentUser.uid;
        const doc = await fbDB.collection('tournaments').doc(tournamentId).get();
        const data = doc.data();
        const p = data.participants.find(p => p.uid === uid);
        if (!p) return;

        // Score: 100 base if passed, +speed bonus (up to 50), +quality (up to 50)
        let score = 0;
        if (passed) {
            score = 100;
            score += Math.max(0, 50 - Math.floor(timeMs / 1000)); // speed
            const lines = code.split('\n').length;
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
                    const data = doc.data();
                    data.participants.sort((a, b) => b.score - a.score);
                    data.participants.forEach((p, i) => p.rank = i + 1);
                    callback(data);
                }
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
