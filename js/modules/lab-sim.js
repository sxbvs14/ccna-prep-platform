// ═══════════════════════════════════════════
// Lab Simulator — Cisco IOS CLI Simulation
// ═══════════════════════════════════════════

const LabSim = {
  currentLab: null,
  currentHost: null,
  outputLines: [],
  selectedAnswer: null,
  solved: false,

  loadLab(labId) {
    this.currentLab = LAB_SCENARIOS.find(l => l.id === labId);
    if (!this.currentLab) return;

    this.currentHost = this.currentLab.initialHost;
    this.outputLines = [];
    this.selectedAnswer = null;
    this.solved = false;

    this.render();
  },

  render() {
    const lab = this.currentLab;
    if (!lab) return;

    // Scenario
    document.getElementById('labScenario').innerHTML = `
      ${Lang.labScenario(lab)}
      <div class="lab-question" id="labQuestionArea">
        <h4 style="color:var(--accent-light);margin-bottom:10px">🔍 ${Lang.t('labsQuestionLabel')}</h4>
        <p style="margin-bottom:12px">${Lang.labQuestion(lab)}</p>
        <ul class="option-list" id="labOptions">
          ${Lang.labOptions(lab).map((opt, i) => `
            <li class="option-item" data-oi="${i}">
              <div class="option-marker">${String.fromCharCode(65 + i)}</div>
              <span>${opt}</span>
            </li>
          `).join('')}
        </ul>
        <div id="labAnswerFeedback" class="hidden mt-2"></div>
      </div>
    `;

    // Populate lab selector if needed
    const selector = document.getElementById('labSelector');
    if (selector && selector.options.length === 0) {
      selector.innerHTML = LAB_SCENARIOS.map(l =>
        `<option value="${l.id}">${Lang.isEn() ? (l.titleEn || l.title) : l.title} (${Lang.t('practiceDiff' + l.difficulty.charAt(0).toUpperCase() + l.difficulty.slice(1))})</option>`
      ).join('');
      selector.value = lab.id;
      selector.addEventListener('change', (e) => {
        this.loadLab(e.target.value);
      });
    }

    // Terminal
    document.getElementById('labTermTitle').textContent = `${lab.prompt}`;
    document.getElementById('labPrompt').textContent = lab.prompt;
    this.outputLines = [
      `<span class="highlight">╔══════════════════════════════════════╗</span>`,
      `<span class="highlight">║   CCNA Lab Simulator — Cisco IOS   ║</span>`,
      `<span class="highlight">║   ${Lang.t('labsCmdHelp')}       ║</span>`,
      `<span class="highlight">║   ${Lang.t('labsCmdHost')}    ║</span>`,
      `<span class="highlight">╚══════════════════════════════════════╝</span>`,
      ``
    ];
    this.updateOutput();

    // Lab option click handlers
    document.querySelectorAll('#labOptions .option-item').forEach(item => {
      item.addEventListener('click', () => {
        if (this.solved) return;
        this.selectedAnswer = parseInt(item.dataset.oi);
        this.checkAnswer();
      });
    });
  },

  executeCommand(cmd) {
    const lab = this.currentLab;
    const cmdLower = cmd.trim().toLowerCase();

    // Special commands
    if (cmdLower === 'clear' || cmdLower === 'cls') {
      this.outputLines = [`<span class="highlight">${Lang.t('labsTermCleared')}</span>`];
      this.updateOutput();
      return;
    }

    if (cmdLower.startsWith('host ')) {
      const target = cmd.split(' ')[1].toUpperCase();
      if (lab.hosts.includes(target)) {
        this.currentHost = target;
        this.outputLines.push(`<span class="highlight">${Lang.t('labsConnected')} ${target}]</span>`);
        document.getElementById('labTermTitle').textContent = `${target}> enable`;
        document.getElementById('labPrompt').textContent = `${target}#`;
      } else {
        this.outputLines.push(`<span class="error">% ${Lang.t('labsUnknownHost')} ${target}. ${Lang.t('labsAvailableHosts')}: ${lab.hosts.join(', ')}</span>`);
      }
      this.updateOutput();
      return;
    }

    // Help
    if (cmdLower === '?' || cmdLower === 'help') {
      const cmds = Object.keys(lab.commands);
      this.outputLines.push(`<span class="prompt">${lab.prompt}</span> <span class="cmd">?</span>`);
      this.outputLines.push(`<span class="highlight">${Lang.t('labsAvailableCmds')}</span>`);
      cmds.forEach(c => this.outputLines.push(`  ${c}`));
      this.outputLines.push(`  ${Lang.t('labsChangeHost')}`);
      this.outputLines.push(`  ${Lang.t('labsClear')}`);
      this.outputLines.push(`  ${Lang.t('labsHelp')}`);
      this.updateOutput();
      return;
    }

    // Check if it matches a known command
    this.outputLines.push(`<span class="prompt">${lab.prompt}</span> <span class="cmd">${cmd}</span>`);

    let matched = false;
    for (const [pattern, outputs] of Object.entries(lab.commands)) {
      if (cmdLower.startsWith(pattern)) {
        const output = outputs[this.currentHost] || `% Comando no disponible en ${this.currentHost}`;
        output.split('\n').forEach(line => {
          if (line.startsWith('% ') || line.includes('Error') || line.includes('Invalid')) {
            this.outputLines.push(`<span class="error">${line}</span>`);
          } else {
            this.outputLines.push(line);
          }
        });
        matched = true;
        break;
      }
    }

    if (!matched) {
      this.outputLines.push(`<span class="error">${Lang.t('labsInvalidCmd')}</span>`);
    }

    this.updateOutput();
  },

  updateOutput() {
    const output = document.getElementById('labOutput');
    output.innerHTML = this.outputLines.join('\n');
    output.scrollTop = output.scrollHeight;
  },

  checkAnswer() {
    const lab = this.currentLab;
    const feedback = document.getElementById('labAnswerFeedback');
    feedback.classList.remove('hidden');

    if (this.selectedAnswer === lab.answer) {
      this.solved = true;
      feedback.innerHTML = `
        <div class="explanation-panel show">
          <div class="exp-header correct-header">${Lang.t('labsCorrect')}</div>
          <div class="exp-text">${Lang.labExplanation(lab)}</div>
          ${lab.solvedCommand ? `<div class="exp-text mt-2"><strong>${Lang.t('labsSolution')}</strong> ${Lang.t('labsSolutionCmd')} <code>${lab.solvedHost}</code>, ${Lang.t('labsExecCmd')}<br><code>${lab.solvedCommand}</code></div>` : ''}
        </div>`;
      Storage.recordLab(lab.id, true);
    } else {
      feedback.innerHTML = `
        <div class="explanation-panel show">
          <div class="exp-header incorrect-header">${Lang.t('labsIncorrectPrefix')}${String.fromCharCode(65 + lab.answer)}.</div>
          <div class="exp-text">${Lang.labExplanation(lab)}</div>
          ${lab.solvedCommand ? `<div class="exp-text mt-2"><strong>${Lang.t('labsSolution')}</strong> ${Lang.t('labsSolutionCmd')} <code>${lab.solvedHost}</code>, ${Lang.t('labsExecCmd')}<br><code>${lab.solvedCommand}</code></div>` : ''}
        </div>`;
    }

    // Highlight correct/incorrect in options
    document.querySelectorAll('#labOptions .option-item').forEach((item, i) => {
      item.classList.remove('correct', 'incorrect', 'selected');
      if (i === lab.answer) item.classList.add('correct');
      if (i === this.selectedAnswer && i !== lab.answer) item.classList.add('incorrect');
    });

    if (typeof App !== 'undefined') App.refresh();
  }
};

if (typeof window !== 'undefined') {
  window.LabSim = LabSim;

  // Terminal input listener — fire immediately if DOM already ready
  function setupLabInput() {
    const input = document.getElementById('labInput');
    if (!input) return;
    // Remove old listener to avoid duplicates
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    newInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = newInput.value.trim();
        if (cmd) {
          LabSim.executeCommand(cmd);
          newInput.value = '';
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLabInput);
  } else {
    setupLabInput();
  }

  // Re-attach when navigating to labs view
  window._setupLabInput = setupLabInput;
}
