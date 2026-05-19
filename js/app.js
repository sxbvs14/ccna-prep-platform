// ═══════════════════════════════════════════
// CCNA Prep Platform — Main Application
// ═══════════════════════════════════════════

const App = {
  data: null,
  currentView: 'dashboard',
  practiceQuestions: [],
  practiceIndex: 0,
  practiceAnswered: 0,
  practiceCorrect: 0,
  practiceMode: 'practice',

  init() {
    this.data = Storage.load();
    this.setupNavigation();
    this.setupEventListeners();
    this.renderDashboard();
    this.refresh();
  },

  refresh() {
    this.data = Storage.load();
    this.updateHeaderStats();
    if (this.currentView === 'dashboard') this.renderDashboard();
    if (this.currentView === 'analytics') Analytics.renderAnalytics(this.data);
  },

  updateHeaderStats() {
    const total = this.data.questionsAnswered;
    const pct = total > 0 ? Math.round((this.data.questionsCorrect / total) * 100) : null;
    document.getElementById('statQuestions').textContent = total;
    document.getElementById('statAccuracy').textContent = pct !== null ? `${pct}%` : '—';
    document.getElementById('statStreak').textContent = `${this.data.streakDays}d`;
  },

  setupNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        this.navigateTo(view);
      });
    });
  },

  setupEventListeners() {
    // Exam start button
    document.getElementById('btnStartExam').addEventListener('click', () => {
      ExamSimulator.start(60, 90);
    });

    // Practice start button
    document.getElementById('btnPracticeStart').addEventListener('click', () => {
      this.startPractice();
    });

    // Populate domain dropdowns
    const domainSelects = ['practiceDomain'];
    domainSelects.forEach(id => {
      const sel = document.getElementById(id);
      if (sel) {
        // Already has "all" option, add specific domains
        Object.values(CCNA_DOMAINS).forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.id;
          opt.textContent = `${d.icon} ${d.nameEs}`;
          sel.appendChild(opt);
        });
      }
    });

    // Lab selector
    const labSel = document.getElementById('labSelector');
    if (labSel) {
      labSel.addEventListener('change', (e) => LabSim.loadLab(e.target.value));
    }

    // Reset button
    document.getElementById('btnConfirmReset').addEventListener('click', () => {
      this.data = Storage.reset();
      document.getElementById('resetModal').classList.remove('show');
      this.refresh();
    });

    // Nav tab for reset
    document.querySelectorAll('.nav-tab').forEach(tab => {
      if (tab.dataset.view === 'analytics') {
        tab.addEventListener('dblclick', () => {
          document.getElementById('resetModal').classList.add('show');
        });
      }
    });
  },

  navigateTo(view) {
    this.currentView = view;

    // Update tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === view);
    });

    // Show/hide views
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    const target = document.getElementById(`view-${view}`);
    if (target) target.classList.remove('hidden');

    // Render view
    switch (view) {
      case 'dashboard': this.renderDashboard(); break;
      case 'practice': this.renderPracticeView(); break;
      case 'exam':
        document.getElementById('examArea').classList.add('hidden');
        document.getElementById('examResults').classList.add('hidden');
        document.getElementById('examIntro').classList.remove('hidden');
        break;
      case 'labs': this.renderLabView(); if (window._setupLabInput) window._setupLabInput(); break;
      case 'guide': this.renderGuideView(); break;
      case 'analytics': Analytics.renderAnalytics(this.data); break;
      case 'tutor': this.renderTutorView(); break;
    }
  },

  // ═══ Dashboard ═══
  renderDashboard() {
    this.data = Storage.load();
    this.updateHeaderStats();

    document.getElementById('dashQuestions').textContent = this.data.questionsAnswered;
    const pct = this.data.questionsAnswered > 0
      ? Math.round((this.data.questionsCorrect / this.data.questionsAnswered) * 100)
      : '—';
    document.getElementById('dashAccuracy').textContent = pct !== '—' ? `${pct}%` : pct;
    document.getElementById('dashExams').textContent = this.data.examsTaken.length;
    document.getElementById('dashLabs').textContent = this.data.labsCompleted.length;

    Analytics.renderDomainGrid(this.data);

    // Tutor recommendation
    const rec = Analytics.getRecommendation(this.data);
    document.getElementById('tutorRecommendation').innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px">
        <div style="font-size:2rem">🧠</div>
        <div>
          <strong>${rec.title}</strong>
          <p style="margin-top:4px;color:var(--text-secondary);font-size:0.9rem">${rec.text}</p>
          <button class="btn btn-primary btn-sm mt-1" onclick="App.handleRecommendation('${rec.domain}')">
            ${rec.action} →
          </button>
        </div>
      </div>`;
  },

  handleRecommendation(domain) {
    if (domain === 'exam') {
      this.navigateTo('exam');
    } else {
      this.navigateTo('practice');
      this.startPractice(domain);
    }
  },

  // ═══ Practice Mode ═══
  renderPracticeView() {
    this.practiceQuestions = [];
    this.practiceIndex = 0;
    this.practiceAnswered = 0;
    this.practiceCorrect = 0;
    this.practiceMode = 'idle';

    document.getElementById('practiceArea').innerHTML = `
      <div class="text-center text-muted mt-3">
        Seleccioná los filtros y presioná "Iniciar Ronda" para comenzar.
      </div>`;
  },

  startPractice(domainOverride = null) {
    const domain = domainOverride || document.getElementById('practiceDomain').value;
    const difficulty = document.getElementById('practiceDifficulty').value;
    const questions = Tutor.selectQuestions(this.data, domain, difficulty, 15);

    if (questions.length === 0) {
      document.getElementById('practiceArea').innerHTML = `
        <div class="card text-center">
          <p class="text-muted">No hay preguntas disponibles con esos filtros. Intentá con otra combinación.</p>
        </div>`;
      return;
    }

    this.practiceQuestions = questions;
    this.practiceIndex = 0;
    this.practiceAnswered = 0;
    this.practiceCorrect = 0;
    this.practiceMode = 'active';
    this.showPracticeQuestion();
  },

  showPracticeQuestion() {
    if (this.practiceIndex >= this.practiceQuestions.length) {
      this.showPracticeResults();
      return;
    }

    this.practiceMode = 'active';
    const q = this.practiceQuestions[this.practiceIndex];
    const total = this.practiceQuestions.length;

    document.getElementById('practiceArea').innerHTML = `
      <div class="card-header flex-between mb-2">
        <span>Pregunta <strong>${this.practiceIndex + 1}</strong> de ${total} · ${CCNA_DOMAINS[q.domain].nameEs} · ${q.difficulty === 'easy' ? '🟢 Fácil' : q.difficulty === 'medium' ? '🟡 Medio' : '🔴 Difícil'}</span>
        <span>✅ ${this.practiceCorrect}/${this.practiceAnswered} correctas</span>
      </div>
      <div class="question-card">
        <div class="question-number">${q.type === 'multi' ? 'SELECCIÓN MÚLTIPLE' : 'OPCIÓN ÚNICA'}</div>
        <div class="question-text">${q.text}</div>
        <ul class="option-list" id="practiceOptions">
          ${q.options.map((opt, i) => `
            <li class="option-item" data-oi="${i}">
              <div class="option-marker">${String.fromCharCode(65 + i)}</div>
              <span>${opt.substring(3)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="exam-actions">
        <button class="btn btn-secondary btn-sm" id="btnPracticeSkip">Saltar →</button>
        <button class="btn btn-primary" id="btnPracticeSubmit" disabled>Responder</button>
      </div>
      <div id="practiceExplanation" class="hidden"></div>
    `;

    let selectedAnswer = q.type === 'multi' ? [] : null;

    // Option click handlers
    document.querySelectorAll('#practiceOptions .option-item').forEach(item => {
      item.addEventListener('click', () => {
        const oi = parseInt(item.dataset.oi);
        if (q.type === 'multi') {
          const idx = selectedAnswer.indexOf(oi);
          if (idx >= 0) {
            selectedAnswer.splice(idx, 1);
            item.classList.remove('selected');
          } else {
            selectedAnswer.push(oi);
            item.classList.add('selected');
          }
          document.getElementById('btnPracticeSubmit').disabled = selectedAnswer.length === 0;
        } else {
          document.querySelectorAll('#practiceOptions .option-item').forEach(el => el.classList.remove('selected'));
          item.classList.add('selected');
          selectedAnswer = oi;
          document.getElementById('btnPracticeSubmit').disabled = false;
        }
      });
    });

    document.getElementById('btnPracticeSubmit').addEventListener('click', () => {
      this.submitPracticeAnswer(q, selectedAnswer);
    });

    document.getElementById('btnPracticeSkip').addEventListener('click', () => {
      this.practiceIndex++;
      this.showPracticeQuestion();
    });
  },

  submitPracticeAnswer(q, userAnswer) {
    let isCorrect = false;
    if (q.type === 'multi') {
      isCorrect = Array.isArray(userAnswer) && Array.isArray(q.answer) &&
                  userAnswer.length === q.answer.length &&
                  userAnswer.every(a => q.answer.includes(a));
    } else {
      isCorrect = userAnswer === q.answer;
    }

    this.practiceAnswered++;
    if (isCorrect) this.practiceCorrect++;

    // Record in storage
    Storage.recordAnswer(q.id, q.domain, isCorrect);
    this.data = Storage.load();
    this.updateHeaderStats();

    // Highlight correct/incorrect
    document.querySelectorAll('#practiceOptions .option-item').forEach((item, i) => {
      item.style.pointerEvents = 'none';
      if (i === q.answer || (Array.isArray(q.answer) && q.answer.includes(i))) {
        item.classList.add('correct');
      }
      if (q.type === 'multi') {
        if (Array.isArray(userAnswer) && userAnswer.includes(i) && !q.answer.includes(i)) {
          item.classList.add('incorrect');
        }
      } else {
        if (userAnswer === i && !isCorrect) item.classList.add('incorrect');
      }
    });

    document.getElementById('btnPracticeSubmit').disabled = true;

    // Show explanation
    const exp = document.getElementById('practiceExplanation');
    exp.classList.remove('hidden');
    exp.innerHTML = `
      <div class="explanation-panel show">
        <div class="exp-header ${isCorrect ? 'correct-header' : 'incorrect-header'}">
          ${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
        </div>
        <div class="exp-text">${q.explanation}</div>
      </div>
      <button class="btn btn-primary mt-2" id="btnPracticeNext">Siguiente →</button>
    `;

    document.getElementById('btnPracticeSkip').style.display = 'none';

    document.getElementById('btnPracticeNext').addEventListener('click', () => {
      this.practiceIndex++;
      this.showPracticeQuestion();
    });
  },

  showPracticeResults() {
    this.practiceMode = 'results';
    const pct = this.practiceAnswered > 0
      ? Math.round((this.practiceCorrect / this.practiceAnswered) * 100) : 0;

    document.getElementById('practiceArea').innerHTML = `
      <div class="card text-center fade-in">
        <h2 style="margin-bottom:12px">Ronda Completada</h2>
        <div class="result-score-ring" style="--score-pct:${pct}%;width:120px;height:120px">
          <div class="result-score" style="font-size:2rem">${pct}%</div>
        </div>
        <p style="margin:16px 0">${this.practiceCorrect} de ${this.practiceAnswered} correctas</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="App.startPractice()">🔄 Otra Ronda</button>
          <button class="btn btn-secondary" onclick="App.navigateTo('dashboard')">📊 Dashboard</button>
          <button class="btn btn-secondary" onclick="App.navigateTo('analytics')">📈 Análisis</button>
        </div>
      </div>`;
  },

  // ═══ Lab View ═══
  renderLabView() {
    if (LAB_SCENARIOS.length > 0) {
      LabSim.loadLab(LAB_SCENARIOS[0].id);
    }
  },

  // ═══ Study Guide View ═══
  renderGuideView() {
    const container = document.getElementById('guideContent');
    container.innerHTML = STUDY_GUIDE.map(section => `
      <div class="guide-section">
        <div class="guide-header" data-guide="${section.id}">
          <span>${section.icon} <strong>${section.title}</strong></span>
          <span style="color:var(--text-muted)">▼</span>
        </div>
        <div class="guide-content" id="guide-${section.id}">
          ${section.sections.map(s => `
            <h3>${s.title}</h3>
            ${s.content}
          `).join('')}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.guide-header').forEach(header => {
      header.addEventListener('click', () => {
        const id = header.dataset.guide;
        const content = document.getElementById(`guide-${id}`);
        const isOpen = content.classList.contains('show');
        container.querySelectorAll('.guide-content').forEach(c => c.classList.remove('show'));
        container.querySelectorAll('.guide-header').forEach(h => h.classList.remove('active'));
        if (!isOpen) {
          content.classList.add('show');
          header.classList.add('active');
        }
      });
    });
  },

  // ═══ Tutor Chat View ═══
  renderTutorView() {
    this.data = Storage.load();
    const rec = Analytics.getRecommendation(this.data);
    document.getElementById('tutorRecContent').innerHTML = `
      <p style="margin-top:8px"><strong>${rec.title}</strong></p>
      <p style="color:var(--text-secondary);font-size:0.9rem">${rec.text}</p>
      <button class="btn btn-primary btn-sm mt-1" onclick="App.handleRecommendation('${rec.domain}')">${rec.action} →</button>`;

    // Wire up send button
    const sendBtn = document.getElementById('btnTutorSend');
    const input = document.getElementById('tutorInput');
    if (sendBtn && input) {
      const handler = () => this.sendTutorMessage();
      sendBtn.replaceWith(sendBtn.cloneNode(true));
      document.getElementById('btnTutorSend').addEventListener('click', handler);
      input.replaceWith(input.cloneNode(true));
      document.getElementById('tutorInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendTutorMessage();
      });
    }
  },

  sendTutorMessage() {
    const input = document.getElementById('tutorInput');
    const msg = input.value.trim();
    if (!msg) return;

    const messagesDiv = document.getElementById('tutorMessages');

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'tutor-msg user fade-in';
    userDiv.textContent = msg;
    messagesDiv.appendChild(userDiv);

    input.value = '';

    // Add bot thinking indicator
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'tutor-msg bot';
    thinkingDiv.textContent = '🤔 Pensando...';
    thinkingDiv.id = 'tutorThinking';
    messagesDiv.appendChild(thinkingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Simulate slight delay for realism
    setTimeout(() => {
      const thinking = document.getElementById('tutorThinking');
      if (thinking) thinking.remove();

      const response = Tutor.respond(msg, Storage.load());
      const botDiv = document.createElement('div');
      botDiv.className = 'tutor-msg bot fade-in';
      botDiv.innerHTML = response.replace(/\n/g, '<br>');
      messagesDiv.appendChild(botDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      Storage.addTutorMessage('user', msg);
      Storage.addTutorMessage('bot', response);
    }, 600);
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());

if (typeof window !== 'undefined') {
  window.App = App;
}
