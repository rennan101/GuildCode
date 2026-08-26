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
        const snap = await fbDB.collection('challenges')
            .where('targetUid', '==', uid)
            .where('status', 'in', ['pending', 'challenger_done'])
            .orderBy('createdAt', 'desc')
            .limit(20).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    // ─── GET CHALLENGE HISTORY ───
    async getChallengeHistory() {
        if (!authManager.currentUser) return [];
        const uid = authManager.currentUser.uid;
        const snap = await fbDB.collection('challenges')
            .where('status', '==', 'completed')
            .where(ch => (ch.where('challengerUid', '==', uid)).orWhere('targetUid', '==', uid))
            .orderBy('completedAt', 'desc').limit(20).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
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
        const snap = await fbDB.collection('users')
            .where('role', '==', 'student')
            .where('classCode', '==', authManager.getClassCode())
            .get();
        return snap.docs
            .map(d => ({ uid: d.id, ...d.data() }))
            .filter(u => u.uid !== authManager.currentUser?.uid &&
                u.displayName?.toLowerCase().includes(query.toLowerCase()));
    }
}

const rankedManager = new RankedManager();
