/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Ranked Matches (Async PvP)
   ═══════════════════════════════════════════════════════════════ */

class RankedManager {
    constructor() {
        this.activeChallenge = null;
    }

    // ─── CREATE CHALLENGE ───
    async createChallenge(targetUid, targetName, chapterId) {
        const challengerUid = authManager.currentUser.uid;
        const challengerName = authManager.getDisplayName();
        // Pick 3 random activities from the chapter
        const chapter = CHAPTERS.find(c => c.id === chapterId);
        if (!chapter) return null;
        const activities = chapter.activities.map(a => ({ id: a.id, title: a.title, starterCode: a.starterCode, validator: a.validator.toString() }));
        const challengeData = {
            challengerUid, challengerName,
            targetUid, targetName,
            chapterId, chapterTitle: chapter.title,
            activities,
            status: 'pending',
            challengerCode: null, challengerTime: 0, challengerScore: 0,
            targetCode: null, targetTime: 0, targetScore: 0,
            winner: null,
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

    // ─── SUBMIT CHALLENGE (challenger) ───
    async submitChallengerCode(challengeId, code, timeMs) {
        const score = code.split('\n').length; // Simple quality metric
        await fbDB.collection('challenges').doc(challengeId).update({
            challengerCode: code, challengerTime: timeMs, challengerScore: score,
            status: 'challenger_done'
        });
    }

    // ─── SUBMIT CHALLENGE (target) ───
    async submitTargetCode(challengeId, code, timeMs) {
        const score = code.split('\n').length;
        const challengeDoc = await fbDB.collection('challenges').doc(challengeId).get();
        const ch = challengeDoc.data();
        let winner = null;
        if (score > ch.challengerScore) winner = ch.targetUid;
        else if (score < ch.challengerScore) winner = ch.challengerUid;
        else winner = timeMs < ch.challengerTime ? ch.targetUid : ch.challengerUid;

        await fbDB.collection('challenges').doc(challengeId).update({
            targetCode: code, targetTime: timeMs, targetScore: score,
            status: 'completed', winner,
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Award XP
        const won = winner === authManager.currentUser.uid;
        if (typeof app !== 'undefined') {
            app.engine.addXP(won ? 50 : 25);
            app.engine.saveToCloud();
        }

        return { winner, won };
    }

    // ─── SEARCH PLAYERS ───
    async searchPlayers(query) {
        try {
            const classCode = authManager.getClassCode();
            if (!classCode) return [];
            const snap = await fbDB.collection('users')
                .where('role', '==', 'student')
                .where('classCode', '==', classCode)
                .get();
            return snap.docs
                .map(d => ({ uid: d.id, ...d.data() }))
                .filter(u => u.uid !== authManager.currentUser?.uid &&
                    (!query || u.displayName?.toLowerCase().includes(query.toLowerCase())));
        } catch (e) {
            console.warn('searchPlayers error:', e.message);
            return [];
        }
    }
}

const rankedManager = new RankedManager();
