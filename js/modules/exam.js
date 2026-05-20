// ═══════════════════════════════════════════
// Exam Simulator Module
// ═══════════════════════════════════════════

const ExamSimulator = {
  state: null,
  timerInterval: null,

  start(totalQuestions = 60, timeLimitMinutes = 90) {
    // Build weighted question set matching CCNA domain percentages
    const domainWeights = {
      network_fundamentals: 0.20,
      network_access: 0.20,
      ip_connectivity: 0.25,
      ip_services: 0.10,
      security_fundamentals: 0.15,
      automation: 0.10
    };

    let selectedQuestions = [];
    const domains = Object.keys(domainWeights);

    domains.forEach(domain => {
      const count = Math.round(totalQuestions * domainWeights[domain]);
      const domainPool = QUESTIONS.filter(q => q.domain === domain);
      const shuffled = [...domainPool].sort(() => Math.random() - 0.5);
      selectedQuestions.push(...shuffled.slice(0, count));
    });

    // Fill remaining slots with random questions
    while (selectedQuestions.length < totalQuestions) {
      const remaining = QUESTIONS.filter(q => !selectedQuestions.includes(q));
      if (remaining.length === 0) break;
      const pick = remaining[Math.floor(Math.random() * remaining.length)];
      selectedQuestions.push(pick);
    }

    // Shuffle final selection
    selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, totalQuestions);

    // Ensure minimum 60 questions
    while (selectedQuestions.length < totalQuestions) {
      const extra = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
      if (!selectedQuestions.find(q => q.id === extra.id)) {
        selectedQuestions.push(extra);
      }
    }

    this.state = {
      questions: selectedQuestions,
      answers: {},       // { questionIndex: answerValue }
      flagged: new Set(),
      currentIndex: 0,
      totalQuestions: selectedQuestions.length,
      timeLimit: timeLimitMinutes * 60, // seconds
      timeRemaining: timeLimitMinutes * 60,
      startTime: Date.now(),
      finished: false
    };

    document.getElementById('examIntro').classList.add('hidden');
    document.getElementById('examArea').classList.remove('hidden');
    document.getElementById('examResults').classList.add('hidden');

    this.renderExamUI();
    this.startTimer();
    this.showQuestion(0);
  },

  renderExamUI() {
    const area = document.getElementById('examArea');
    area.innerHTML = `
      <div class="exam-header">
        <span class="exam-timer" id="examTimerDisplay">${this.formatTime(this.state.timeRemaining)}</span>
        <span class="exam-progress">${Lang.t('examQuestion')} <strong id="examCurrentNum">1</strong> ${Lang.t('examScore')} ${this.state.totalQuestions}</span>
        <span class="exam-progress">${Lang.t('examAnswered')} <strong id="examAnsweredCount">0</strong></span>
        <button class="btn btn-secondary btn-sm" id="btnFlagQuestion">🚩 ${Lang.t('examFlag')}</button>
      </div>
      <div class="exam-question-nav" id="examQuestionNav"></div>
      <div id="examQuestionCard"></div>
      <div class="exam-actions">
        <button class="btn btn-secondary" id="btnPrevQuestion" disabled>← ${Lang.t('examPrev')}</button>
        <button class="btn btn-primary" id="btnNextQuestion">${Lang.t('examNext')} →</button>
        <button class="btn btn-danger btn-sm" id="btnEndExam">${Lang.t('examEnd')}</button>
      </div>
    `;

    this.renderQuestionNav();
    this.attachListeners();
  },

  renderQuestionNav() {
    const nav = document.getElementById('examQuestionNav');
    nav.innerHTML = this.state.questions.map((q, i) => {
      let cls = 'q-nav-dot';
      if (i === this.state.currentIndex) cls += ' active';
      if (this.state.answers[i] !== undefined) cls += ' answered';
      if (this.state.flagged.has(i)) cls += ' flagged';
      return `<button class="${cls}" data-idx="${i}">${i + 1}</button>`;
    }).join('');
  },

  attachListeners() {
    document.querySelectorAll('.q-nav-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        this.showQuestion(idx);
      });
    });

    document.getElementById('btnPrevQuestion').addEventListener('click', () => {
      if (this.state.currentIndex > 0) this.showQuestion(this.state.currentIndex - 1);
    });

    document.getElementById('btnNextQuestion').addEventListener('click', () => {
      if (this.state.currentIndex < this.state.totalQuestions - 1) {
        this.showQuestion(this.state.currentIndex + 1);
      }
    });

    document.getElementById('btnFlagQuestion').addEventListener('click', () => {
      const idx = this.state.currentIndex;
      if (this.state.flagged.has(idx)) {
        this.state.flagged.delete(idx);
      } else {
        this.state.flagged.add(idx);
      }
      this.renderQuestionNav();
    });

    document.getElementById('btnEndExam').addEventListener('click', () => {
      this.confirmEnd();
    });
  },

  showQuestion(index) {
    this.state.currentIndex = index;
    const q = this.state.questions[index];
    const isMulti = q.type === 'multi';
    const selected = this.state.answers[index];

    document.getElementById('examCurrentNum').textContent = index + 1;

    let html = `<div class="question-card fade-in">
      <div class="question-number">${Lang.t('examQuestion')} ${index + 1} · ${Lang.domainName(CCNA_DOMAINS[q.domain])} · ${q.type === 'multi' ? Lang.t('examMultiQuestion') : Lang.t('examSingleQuestion')}</div>
      <div class="question-text">${Lang.questionText(q)}</div>
      <ul class="option-list">`;

    const options = Lang.questionOptions(q);
    options.forEach((opt, oi) => {
      let cls = 'option-item';
      if (isMulti) {
        if (selected && Array.isArray(selected) && selected.includes(oi)) cls += ' selected';
      } else {
        if (selected === oi) cls += ' selected';
      }
      html += `<li class="${cls}" data-oi="${oi}">
        <div class="option-marker">${String.fromCharCode(65 + oi)}</div>
        <span>${opt.substring(3)}</span>
      </li>`;
    });

    html += `</ul></div>`;

    document.getElementById('examQuestionCard').innerHTML = html;

    // Option click handlers
    document.querySelectorAll('.option-item').forEach(item => {
      item.addEventListener('click', () => {
        const oi = parseInt(item.dataset.oi);
        if (isMulti) {
          let current = this.state.answers[index];
          if (!current || !Array.isArray(current)) current = [];
          const idx = current.indexOf(oi);
          if (idx >= 0) current.splice(idx, 1);
          else current.push(oi);
          this.state.answers[index] = current;
        } else {
          this.state.answers[index] = oi;
        }
        this.showQuestion(index);
        this.renderQuestionNav();
        this.updateAnsweredCount();
      });
    });

    // Nav buttons
    document.getElementById('btnPrevQuestion').disabled = index === 0;
    document.getElementById('btnNextQuestion').disabled = index === this.state.totalQuestions - 1;

    this.renderQuestionNav();
    this.updateAnsweredCount();
  },

  updateAnsweredCount() {
    const count = Object.keys(this.state.answers).length;
    document.getElementById('examAnsweredCount').textContent = count;
  },

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.state.timeRemaining--;
      const display = document.getElementById('examTimerDisplay');
      if (display) {
        display.textContent = this.formatTime(this.state.timeRemaining);
        display.className = 'exam-timer';
        if (this.state.timeRemaining < 300) display.classList.add('danger');
        else if (this.state.timeRemaining < 900) display.classList.add('warning');
      }
      if (this.state.timeRemaining <= 0) {
        this.finish();
      }
    }, 1000);
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  },

  confirmEnd() {
    const unanswered = this.state.totalQuestions - Object.keys(this.state.answers).length;
    if (unanswered > 0) {
      if (confirm(`⚠️ ${unanswered} ${Lang.t('examConfirmUnanswered')}`)) {
        this.finish();
      }
    } else {
      if (confirm(Lang.t('examConfirmEnd'))) {
        this.finish();
      }
    }
  },

  finish() {
    clearInterval(this.timerInterval);
    this.state.finished = true;
    this.state.timeTaken = Math.round((Date.now() - this.state.startTime) / 60000);
    this.showResults();
  },

  showResults() {
    document.getElementById('examArea').classList.add('hidden');

    const s = this.state;
    let correct = 0;
    const domainResults = {};

    s.questions.forEach((q, i) => {
      const userAnswer = s.answers[i];
      let isCorrect = false;

      if (q.type === 'multi') {
        if (Array.isArray(userAnswer) && Array.isArray(q.answer)) {
          isCorrect = userAnswer.length === q.answer.length &&
                      userAnswer.every(a => q.answer.includes(a));
        }
      } else {
        isCorrect = userAnswer === q.answer;
      }

      if (isCorrect) correct++;

      if (!domainResults[q.domain]) {
        domainResults[q.domain] = { total: 0, correct: 0 };
      }
      domainResults[q.domain].total++;
      if (isCorrect) domainResults[q.domain].correct++;
    });

    const score = correct;
    const pct = Math.round((score / s.totalQuestions) * 100);
    const passed = pct >= 83; // ~825/1000

    // Save to storage
    Storage.recordExam(s.totalQuestions, score, s.timeTaken, domainResults);

    const resultsDiv = document.getElementById('examResults');
    resultsDiv.classList.remove('hidden');
    resultsDiv.innerHTML = `
      <div class="results-container fade-in">
        <h2 style="margin-bottom:20px">${passed ? Lang.t('examPassed') : Lang.t('examFailed')}</h2>
        <div class="result-score-ring" style="--score-pct:${pct}%">
          <div class="result-score">${pct}%</div>
        </div>
        <div class="result-grade ${passed ? 'pass' : 'fail'}">
          ${score} ${Lang.t('examScore')} ${s.totalQuestions} ${Lang.t('examCorrect')} — ${passed ? Lang.t('examPassNote') : Lang.t('examFailNote')}
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted)">${Lang.t('examTimeTaken')}: ${s.timeTaken} min</div>

        <div class="result-breakdown">
          ${Object.entries(domainResults).map(([domain, d]) => {
            const dpct = Math.round((d.correct / d.total) * 100);
            const icon = CCNA_DOMAINS[domain].icon;
            const name = Lang.domainName(CCNA_DOMAINS[domain]);
            const color = dpct >= 83 ? 'var(--success)' : dpct >= 60 ? 'var(--warning)' : 'var(--danger)';
            return `<div class="stat-card" style="padding:14px">
              <div style="font-size:1.5rem">${icon}</div>
              <div style="color:${color};font-weight:700;font-size:1.1rem">${dpct}%</div>
              <div class="stat-label">${name}</div>
              <div style="font-size:0.7rem;color:var(--text-muted)">${d.correct}/${d.total}</div>
            </div>`;
          }).join('')}
        </div>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px">
          <button class="btn btn-primary" id="btnExamReview">${Lang.t('examReview')}</button>
          <button class="btn btn-secondary" id="btnExamRetry">${Lang.t('examRetry')}</button>
          <button class="btn btn-secondary" id="btnExamDashboard">${Lang.t('examDashboard')}</button>
        </div>

        <div id="examReviewArea" class="hidden mt-2"></div>
      </div>
    `;

    // Button listeners
    document.getElementById('btnExamReview').addEventListener('click', () => this.renderReview());
    document.getElementById('btnExamRetry').addEventListener('click', () => {
      resultsDiv.classList.add('hidden');
      document.getElementById('examIntro').classList.remove('hidden');
    });
    document.getElementById('btnExamDashboard').addEventListener('click', () => {
      App.navigateTo('dashboard');
    });

    // Refresh app state
    if (typeof App !== 'undefined') App.refresh();
  },

  renderReview() {
    const area = document.getElementById('examReviewArea');
    area.classList.remove('hidden');
    const s = this.state;

    let html = `<h3 style="margin-top:20px">${Lang.t('examReviewTitle')}</h3>`;
    s.questions.forEach((q, i) => {
      const userAnswer = s.answers[i];
      let isCorrect = false;
      if (q.type === 'multi') {
        if (Array.isArray(userAnswer) && Array.isArray(q.answer)) {
          isCorrect = userAnswer.length === q.answer.length &&
                      userAnswer.every(a => q.answer.includes(a));
        }
      } else {
        isCorrect = userAnswer === q.answer;
      }

      const statusColor = isCorrect ? 'var(--success)' : 'var(--danger)';
      const statusIcon = isCorrect ? '✅' : '❌';

      html += `<div class="question-card" style="text-align:left;border-left:3px solid ${statusColor}">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
          <span>${statusIcon}</span>
          <strong>${Lang.t('practiceQuestion')} ${i + 1}</strong>
          <span style="color:var(--text-muted);font-size:0.8rem">${Lang.domainName(CCNA_DOMAINS[q.domain])}</span>
        </div>
        <div style="margin-bottom:8px">${Lang.questionText(q)}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">
          ${Lang.t('examYourAnswer')} <strong style="color:${statusColor}">${
            userAnswer === undefined ? Lang.t('examUnanswered') :
            Array.isArray(userAnswer) ? userAnswer.map(a => String.fromCharCode(65 + a)).join(', ') :
            String.fromCharCode(65 + userAnswer)
          }</strong>
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px">
          ${Lang.t('examCorrectAnswer')} <strong style="color:var(--success)">${
            Array.isArray(q.answer) ? q.answer.map(a => String.fromCharCode(65 + a)).join(', ') :
            String.fromCharCode(65 + q.answer)
          }</strong>
        </div>
        <div class="explanation-panel show" style="margin-top:8px;border:none;background:var(--bg-card)">
          <div class="exp-text">💡 ${Lang.questionExplanation(q)}</div>
        </div>
      </div>`;
    });

    area.innerHTML = html;
  }
};

if (typeof window !== 'undefined') {
  window.ExamSimulator = ExamSimulator;
}
