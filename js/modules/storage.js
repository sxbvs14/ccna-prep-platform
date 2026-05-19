// ═══════════════════════════════════════════
// Storage Module — localStorage wrapper
// ═══════════════════════════════════════════

const Storage = {
  KEY: 'ccna_prep_data',

  defaults() {
    return {
      version: 2,
      questionsAnswered: 0,
      questionsCorrect: 0,
      questionsByDomain: {},  // { domainId: { total, correct, streak } }
      examsTaken: [],
      labsCompleted: [],
      streakDays: 0,
      lastActiveDate: null,
      weakTopics: [],
      tutorHistory: []
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.defaults();
      const data = JSON.parse(raw);
      // Migrate old versions
      if (!data.version || data.version < 2) {
        return { ...this.defaults(), ...data, version: 2 };
      }
      return { ...this.defaults(), ...data };
    } catch (e) {
      return this.defaults();
    }
  },

  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save progress:', e.message);
    }
  },

  reset() {
    localStorage.removeItem(this.KEY);
    return this.defaults();
  },

  // Record a question attempt
  recordAnswer(questionId, domain, correct) {
    const data = this.load();
    data.questionsAnswered++;
    if (correct) data.questionsCorrect++;

    if (!data.questionsByDomain[domain]) {
      data.questionsByDomain[domain] = { total: 0, correct: 0, streak: 0, bestStreak: 0 };
    }
    const d = data.questionsByDomain[domain];
    d.total++;
    if (correct) {
      d.correct++;
      d.streak++;
      if (d.streak > (d.bestStreak || 0)) d.bestStreak = d.streak;
    } else {
      d.streak = 0;
    }

    // Update streak days
    const today = new Date().toDateString();
    if (data.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (data.lastActiveDate === yesterday) {
        data.streakDays++;
      } else if (data.lastActiveDate !== today) {
        data.streakDays = 1;
      }
      data.lastActiveDate = today;
    }

    this.save(data);
    return data;
  },

  recordExam(questions, score, timeTaken, domainBreakdown) {
    const data = this.load();
    data.examsTaken.push({
      date: new Date().toISOString(),
      totalQuestions: questions,
      score,
      pct: Math.round((score / questions) * 100),
      timeTaken,
      domainBreakdown
    });
    // Keep last 20 exams
    if (data.examsTaken.length > 20) data.examsTaken.shift();
    this.save(data);
    return data;
  },

  recordLab(labId, solved) {
    const data = this.load();
    if (!data.labsCompleted.includes(labId)) {
      data.labsCompleted.push(labId);
    }
    this.save(data);
    return data;
  },

  addTutorMessage(role, text) {
    const data = this.load();
    data.tutorHistory.push({ role, text, timestamp: Date.now() });
    if (data.tutorHistory.length > 100) data.tutorHistory.shift();
    this.save(data);
    return data;
  }
};

if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
