// ═══════════════════════════════════════════
// Analytics Module — Weakness Detection
// ═══════════════════════════════════════════

const Analytics = {
  analyze(data) {
    const domains = Object.keys(CCNA_DOMAINS);
    const results = domains.map(id => {
      const d = data.questionsByDomain[id] || { total: 0, correct: 0 };
      const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : null;
      const info = CCNA_DOMAINS[id];
      let status = 'unattempted';
      if (pct !== null) {
        if (pct >= 85) status = 'strong';
        else if (pct >= 60) status = 'improving';
        else status = 'needs-work';
      }
      return { ...info, ...d, pct, status };
    });

    // Sort by weakest first
    results.sort((a, b) => {
      if (a.pct === null && b.pct === null) return 0;
      if (a.pct === null) return -1;
      if (b.pct === null) return 1;
      return a.pct - b.pct;
    });

    return results;
  },

  getWeakest(data) {
    const analysis = this.analyze(data);
    return analysis.filter(d => d.status === 'needs-work' || d.status === 'unattempted')[0] || analysis[0];
  },

  getRecommendation(data) {
    const weakest = this.getWeakest(data);
    const totalAnswered = data.questionsAnswered;
    const overallPct = totalAnswered > 0 ? Math.round((data.questionsCorrect / totalAnswered) * 100) : null;

    if (totalAnswered === 0) {
      return {
        title: Lang.isEn() ? '🚀 Start your preparation' : '🚀 Empezá tu preparación',
        text: Lang.isEn() ? "You haven't answered any questions yet. I recommend starting with \"Network Fundamentals\" — it's the foundation for everything else and makes up 20% of the exam." : 'Todavía no respondiste preguntas. Te recomiendo empezar con "Fundamentos de Red" — es la base para todo lo demás y representa el 20% del examen.',
        action: Lang.isEn() ? 'Network Fundamentals' : 'Fundamentos de Red',
        domain: 'network_fundamentals'
      };
    }

    if (totalAnswered < 10) {
      return {
        title: Lang.isEn() ? '📝 Keep practicing' : '📝 Seguí practicando',
        text: Lang.isEn() ? `You've answered ${totalAnswered} questions. Keep practicing so the tutor can identify your weak areas and build a personalized study plan.` : `Respondiste ${totalAnswered} preguntas. Seguí practicando para que el tutor pueda identificar tus áreas débiles y armar un plan de estudio personalizado.`,
        action: Lang.isEn() ? 'Practice more' : 'Practicar más',
        domain: 'all'
      };
    }

    if (weakest && weakest.status === 'needs-work') {
      return {
        title: `⚠️ ${Lang.t('tutorWeakArea')} ${Lang.domainName(weakest)}`,
        text: `${Lang.t('tutorFamiliar')} ${Lang.domainName(weakest)} ${Lang.t('tutorIs')} ${weakest.pct}%. ${Lang.t('tutorExamPct')}`,
        action: `${Lang.t('tutorFocus')} ${Lang.domainName(weakest)}`,
        domain: weakest.id
      };
    }

    if (overallPct && overallPct < 80) {
      return {
        title: `📈 ${Lang.t('tutorImproving')}`,
        text: Lang.t('tutorGoodPath'),
        action: Lang.t('examStart'),
        domain: 'exam'
      };
    }

    return {
      title: Lang.t('tutorExcellent'),
      text: Lang.t('tutorReady'),
      action: Lang.t('examStart'),
      domain: 'exam'
    };
  },

  renderDomainGrid(data) {
    const analysis = this.analyze(data);
    const grid = document.getElementById('domainGrid');
    if (!grid) return;

    grid.innerHTML = analysis.map(d => {
      const pct = d.pct !== null ? `${d.pct}%` : '—';
      const pctColor = d.status === 'strong' ? 'var(--success)' :
                       d.status === 'improving' ? 'var(--warning)' :
                       d.status === 'needs-work' ? 'var(--danger)' : 'var(--text-muted)';
      const barWidth = d.pct !== null ? d.pct : 0;
      const barClass = d.status === 'strong' ? 'success' :
                       d.status === 'improving' ? 'warning' :
                       d.status === 'needs-work' ? 'danger' : '';

      return `
        <div class="domain-card" onclick="App.navigateTo('practice');App.startPractice('${d.id}')">
          <div class="domain-header">
            <div>
              <span style="font-size:1.2rem;margin-right:6px">${d.icon}</span>
              <span class="domain-name">${Lang.domainName(d)}</span>
            </div>
            <span class="domain-pct" style="color:${pctColor}">${pct}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${barClass}" style="width:${barWidth}%"></div>
          </div>
          <div class="domain-meta">
            ${d.total} preguntas · ${d.correct} correctas · ${d.total > 0 ? d.pct : 0}% — ${d.pct}% del examen
          </div>
        </div>`;
    }).join('');
  },

  renderAnalytics(data) {
    const container = document.getElementById('analyticsContent');
    if (!container) return;

    const analysis = this.analyze(data);
    const totalAnswered = data.questionsAnswered;
    const overallPct = totalAnswered > 0 ? Math.round((data.questionsCorrect / totalAnswered) * 100) : 0;

    let html = '';

    // Overall stats
    html += `<div class="dashboard-grid" style="margin-bottom:24px">
      <div class="stat-card">
        <div class="stat-value">${totalAnswered}</div>
        <div class="stat-label" data-i18n="analyticsTotal">Total Preguntas</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${overallPct}%</div>
        <div class="stat-label" data-i18n="analyticsAccuracy">Precisión General</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.examsTaken.length}</div>
        <div class="stat-label" data-i18n="analyticsExams">Simulacros</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.streakDays}</div>
        <div class="stat-label" data-i18n="analyticsStreak">Días de Racha</div>
      </div>
    </div>`;
    html += `<div class="card mb-2"><div class="card-title mb-2" data-i18n="analyticsDomainBreakdown">Desglose por Dominio</div>`;
    html += `<div class="domain-grid" style="margin-top:0">${analysis.map(d => {
      const pct = d.pct !== null ? `${d.pct}%` : '—';
      const pctColor = d.status === 'strong' ? 'var(--success)' :
                       d.status === 'improving' ? 'var(--warning)' :
                       d.status === 'needs-work' ? 'var(--danger)' : 'var(--text-muted)';
      const barWidth = d.pct !== null ? d.pct : 0;
      const barClass = d.status === 'strong' ? 'success' :
                       d.status === 'improving' ? 'warning' :
                       d.status === 'needs-work' ? 'danger' : '';
      return `
        <div class="domain-card" style="cursor:default">
          <div class="domain-header">
            <span>${d.icon} ${Lang.domainName(d)}</span>
            <span style="color:${pctColor};font-weight:700">${pct}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${barClass}" style="width:${barWidth}%"></div>
          </div>
          <div class="domain-meta">${d.total} preguntas · ${d.correct} correctas</div>
        </div>`;
    }).join('')}</div></div>`;

    // Last exams
    if (data.examsTaken.length > 0) {
      html += `<div class="card"><div class="card-title mb-2" data-i18n="analyticsExamHistory">Historial de Simulacros</div>`;
      const lastExams = [...data.examsTaken].reverse().slice(0, 5);
      html += lastExams.map((e, i) => {
        const d = new Date(e.date);
        const passed = e.pct >= 83;
        return `<div class="weakness-item" style="justify-content:space-between">
          <div><strong>${Lang.t('analyticsExam')} #${data.examsTaken.length - i}</strong> — ${d.toLocaleDateString()}</div>
          <div>
            <span style="color:${passed ? 'var(--success)' : 'var(--danger)'};font-weight:600">${e.score}/${e.totalQuestions} (${e.pct}%)</span>
            ${passed ? '✅' : '❌'}
            <span style="color:var(--text-muted);font-size:0.8rem;margin-left:8px">${e.timeTaken || '—'} min</span>
          </div>
        </div>`;
      }).join('');
      html += `</div>`;
    }

    // Weak areas focus
    const weakOnes = analysis.filter(d => d.status === 'needs-work');
    if (weakOnes.length > 0) {
      html += `<div class="card mt-2"><div class="card-title mb-2" data-i18n="analyticsWeakAreas">🔴 Áreas a Reforzar</div>`;
      html += weakOnes.map(d => `
        <div class="weakness-item">
          <div class="weakness-info">
            <div class="weakness-name">${d.icon} ${Lang.domainName(d)}</div>
            <div class="weakness-detail">${d.pct}% — ${d.total} ${Lang.t('analyticsQuestions')}, ${d.correct} ${Lang.t('analyticsCorrect')}</div>
          </div>
          <span class="weakness-status needs-work" data-i18n="analyticsWeakLabel">Necesita Práctica</span>
        </div>`).join('');
      html += `</div>`;
    }

    container.innerHTML = html || '<div class="text-center text-muted mt-3">Respondé preguntas para generar análisis.</div>';
  }
};

if (typeof window !== 'undefined') {
  window.Analytics = Analytics;
}
