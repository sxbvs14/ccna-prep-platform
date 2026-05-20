// ═══════════════════════════════════════════
// i18n Module — Internationalization Engine
// ═══════════════════════════════════════════

const LANG_STRINGS = {
  es: {
    // Navigation
    navDashboard: '📊 Dashboard',
    navPractice: '📝 Practicar',
    navExam: '🎯 Simulacro',
    navLabs: '🔧 Labs CLI',
    navGuide: '📖 Guía',
    navAnalytics: '📈 Análisis',
    navTutor: '🤖 Tutor',

    // Header
    headerQuestions: 'Preguntas:',
    headerAccuracy: 'Precisión:',
    headerStreak: 'Racha:',
    headerStats: 'Estadísticas',

    // Dashboard
    dashQuestions: 'Preguntas Respondidas',
    dashAccuracy: 'Precisión General',
    dashExams: 'Simulacros Completados',
    dashLabs: 'Labs Resueltos',
    dashDomainsTitle: '🎯 Dominios del CCNA 200-301',
    dashDomainsSub: 'Desempeño por área — haz clic para practicar',
    dashTutorRecTitle: '🧠 Recomendación del Tutor',
    dashTutorRecEmpty: 'Responde preguntas para recibir recomendaciones personalizadas.',
    dashTutorRecSub: 'Basado en tu desempeño',

    // Practice
    practiceTitle: '📝 Modo Práctica',
    practiceSubtitle: 'Selecciona dominio y dificultad',
    practiceDomainAll: 'Todos los dominios',
    practiceDiffAdaptive: 'Adaptativo',
    practiceDiffEasy: 'Fácil',
    practiceDiffMedium: 'Medio',
    practiceDiffHard: 'Difícil',
    practiceStart: 'Iniciar Ronda',
    practiceIdle: 'Selecciona los filtros y presiona "Iniciar Ronda" para comenzar.',
    practiceNoQuestions: 'No hay preguntas disponibles con esos filtros. Intentá con otra combinación.',
    practiceSkip: 'Saltar →',
    practiceRespond: 'Responder',
    practiceCorrect: '¡Correcto!',
    practiceIncorrect: 'Incorrecto',
    practiceNext: 'Siguiente →',
    practiceResultsTitle: 'Ronda Completada',
    practiceResultsOf: 'de',
    practiceResultsCorrect: 'correctas',
    practiceAnother: '🔄 Otra Ronda',
    practiceQuestion: 'Pregunta',
    practiceOf: 'de',
    practiceEasy: '🟢 Fácil',
    practiceMedium: '🟡 Medio',
    practiceHard: '🔴 Difícil',
    practiceMulti: 'SELECCIÓN MÚLTIPLE',
    practiceSingle: 'OPCIÓN ÚNICA',

    // Exam
    examTitle: '🎯 Simulacro CCNA 200-301',
    examSubtitle: 'Simula el examen real de Cisco con preguntas aleatorias y límite de tiempo.',
    examQuestions: 'Preguntas',
    examTime: 'Tiempo',
    examMinScore: 'Puntaje Mínimo',
    examStart: '🚀 Iniciar Simulacro',
    examStartTip: 'El temporizador inicia inmediatamente. Asegúrate de tener 90 minutos disponibles.',
    examFlag: '🚩 Marcar',
    examPrev: '← Anterior',
    examNext: 'Siguiente →',
    examEnd: 'Finalizar',
    examQuestionNav: 'Navegación',
    examAnswered: 'Respondidas:',
    examQuestion: 'PREGUNTA',
    examMultiQuestion: 'Selección Múltiple',
    examSingleQuestion: 'Opción Única',
    examConfirmEnd: '¿Finalizar el simulacro?',
    examConfirmUnanswered: 'preguntas sin responder. ¿Seguro querés finalizar?',
    examPassed: '🎉 ¡Aprobaste!',
    examFailed: '📚 Seguí practicando',
    examScore: 'de',
    examCorrect: 'correctas',
    examPassNote: '¡Pasaste el corte de 825/1000!',
    examFailNote: 'El corte es ~83% (825/1000). ¡No te rindas!',
    examTimeTaken: 'minutos',
    examReview: '🔍 Revisar Respuestas',
    examRetry: '🔄 Nuevo Simulacro',
    examDashboard: '📊 Dashboard',
    examReviewTitle: 'Revisión de Respuestas',
    examYourAnswer: 'Tu respuesta:',
    examCorrectAnswer: 'Correcta:',
    examUnanswered: 'Sin responder',

    // Labs
    labsTitle: '🔧 Labs de Troubleshooting',
    labsSubtitle: 'Simulador de CLI Cisco IOS — diagnostica y resuelve',
    labsQuestionLabel: '🔍 Pregunta de Troubleshooting',
    labsCorrect: '✅ ¡Correcto! Acertaste el diagnóstico.',
    labsIncorrectPrefix: '❌ Incorrecto. La respuesta correcta es la ',
    labsSolution: 'Solución:',
    labsSolutionCmd: 'En',
    labsExecCmd: 'ejecutar:',
    labsCmdHelp: "Tipo '?' para ver comandos",
    labsCmdHost: "Tipo 'host SW1'/'host SW2' para cambiar de dispositivo",
    labsTermCleared: 'Terminal limpiada.',
    labsConnected: '[Conectado a',
    labsUnknownHost: '% Host desconocido:',
    labsAvailableHosts: 'Hosts disponibles:',
    labsAvailableCmds: 'Comandos disponibles:',
    labsChangeHost: "host <name> — Cambiar de dispositivo",
    labsClear: 'clear/cls — Limpiar terminal',
    labsHelp: '?/help — Mostrar esta ayuda',
    labsInvalidCmd: "% Comando inválido o no disponible en este escenario. Usá '?' para ver comandos disponibles.",

    // Guide
    guideTitle: '📖 Guía de Estudio CCNA 200-301',
    guideSubtitle: 'Resúmenes por dominio del examen',

    // Analytics
    analyticsTitle: '📈 Análisis de Desempeño',
    analyticsSubtitle: 'Identifica tus fortalezas y debilidades',
    analyticsEmpty: 'Responde preguntas para generar análisis de desempeño.',
    analyticsTotal: 'Total Preguntas',
    analyticsAccuracy: 'Precisión General',
    analyticsExams: 'Simulacros',
    analyticsStreak: 'Días de Racha',
    analyticsDomainBreakdown: 'Desglose por Dominio',
    analyticsExamHistory: 'Historial de Simulacros',
    analyticsWeakAreas: '🔴 Áreas a Reforzar',
    analyticsWeakLabel: 'Necesita Práctica',
    analyticsExam: 'Simulacro',
    analyticsQuestions: 'preguntas',
    analyticsCorrect: 'correctas',

    // Tutor
    tutorTitle: '🤖 Tutor Inteligente CCNA',
    tutorSubtitle: 'Preguntame cualquier cosa sobre el CCNA — conceptos, comandos, troubleshooting',
    tutorThinking: '🤔 Pensando...',
    tutorInputPlaceholder: 'Escribí tu pregunta sobre CCNA...',
    tutorSend: 'Enviar',
    tutorWelcome: `👋 ¡Hola! Soy tu tutor CCNA. Puedo explicarte conceptos, ayudarte con troubleshooting, y guiarte según tu desempeño.<br><br>
<strong>Probá preguntarme:</strong><br>
• \"¿Cómo funciona OSPF?\"<br>
• \"Explícame subnetting\"<br>
• \"¿Por qué no se forma la adyacencia OSPF?\"<br>
• \"Dame un ejercicio de VLANs\"<br>
• \"¿Qué debo estudiar para aprobar?\"`,
    tutorRecCard: '🧠 Recomendación Personalizada',
    tutorEmpty: 'Todavía no respondiste preguntas. Te recomiendo empezar con "Fundamentos de Red" — es la base para todo lo demás y representa el 20% del examen.',
    tutorKeepGoing: 'Seguí practicando para que el tutor pueda identificar tus áreas débiles.',
    tutorWeakArea: 'Área débil:',
    tutorFocus: 'Enfocate en',
    tutorFamiliar: 'Tu precisión en',
    tutorIs: 'es del',
    tutorExamPct: 'del examen. Te sugiero enfocarte en esta área con 20-30 preguntas de práctica.',
    tutorImproving: 'Mejorando',
    tutorGoodPath: 'Estás en buen camino pero todavía hay margen de mejora. Probá un simulacro completo para medirte bajo presión.',
    tutorExcellent: '🔥 ¡Excelente!',
    tutorReady: 'Estás listo para el examen. Mantené la práctica con simulacros y repasá las áreas donde tuviste errores.',
    tutorStartRecommended: 'Te recomiendo empezar respondiendo preguntas en modo Práctica — así puedo identificar tus fortalezas y debilidades.',
    tutorStartCta: 'Para arrancar ya mismo:',
    tutorStartStep1: 'Andá a la pestaña 📝 Practicar',
    tutorStartStep2: 'Seleccioná "Fundamentos de Red" (es la base de todo)',
    tutorStartStep3: 'Elegí dificultad "Fácil" para empezar',
    tutorStartOffer: '¿Querés que te explique algún tema en particular mientras tanto? Podés preguntarme sobre OSPF, subnetting, VLANs, STP, ACLs... ¡lo que necesites! 🚀',
    tutorDefaultRecommend: 'Basado en tu desempeño',
    tutorDefaultTopics: 'Temas sobre los que podés preguntarme:',
    tutorDefaultList: '• "¿Cómo funciona OSPF?" — "Explícame subnetting" — "VLANs y trunking"\n• "¿Cómo configuro una ACL?" — "Port Security" — "DHCP Snooping"\n• "Diferencias entre TCP y UDP" — "¿Qué es STP?" — "EtherChannel"',
    tutorDefaultAsk: '¿En qué querés profundizar? 🤓',
    tutorExamReadiness: 'Hacé simulacros en condiciones similares al examen real: 90-120 minutos sin interrupciones ni distracciones.',
    tutorExamTip: 'Tip:',

    // General
    resetTitle: '⚠️ Reiniciar Progreso',
    resetText: 'Esto eliminará todo tu historial de preguntas, simulacros y progreso. Esta acción no se puede deshacer.',
    resetCancel: 'Cancelar',
    resetConfirm: 'Reiniciar Todo',
    langEs: 'ES',
    langEn: 'EN',
    and: 'y',
    questions: 'preguntas',
    correct: 'correctas',
  },

  en: {
    // Navigation
    navDashboard: '📊 Dashboard',
    navPractice: '📝 Practice',
    navExam: '🎯 Exam',
    navLabs: '🔧 CLI Labs',
    navGuide: '📖 Guide',
    navAnalytics: '📈 Analytics',
    navTutor: '🤖 Tutor',

    // Header
    headerQuestions: 'Questions:',
    headerAccuracy: 'Accuracy:',
    headerStreak: 'Streak:',
    headerStats: 'Stats',

    // Dashboard
    dashQuestions: 'Questions Answered',
    dashAccuracy: 'Overall Accuracy',
    dashExams: 'Exams Completed',
    dashLabs: 'Labs Solved',
    dashDomainsTitle: '🎯 CCNA 200-301 Domains',
    dashDomainsSub: 'Performance by area — click to practice',
    dashTutorRecTitle: '🧠 Tutor Recommendation',
    dashTutorRecEmpty: 'Answer questions to get personalized recommendations.',
    dashTutorRecSub: 'Based on your performance',

    // Practice
    practiceTitle: '📝 Practice Mode',
    practiceSubtitle: 'Select domain and difficulty',
    practiceDomainAll: 'All Domains',
    practiceDiffAdaptive: 'Adaptive',
    practiceDiffEasy: 'Easy',
    practiceDiffMedium: 'Medium',
    practiceDiffHard: 'Hard',
    practiceStart: 'Start Round',
    practiceIdle: 'Select filters and press "Start Round" to begin.',
    practiceNoQuestions: 'No questions match those filters. Try a different combination.',
    practiceSkip: 'Skip →',
    practiceRespond: 'Answer',
    practiceCorrect: 'Correct!',
    practiceIncorrect: 'Incorrect',
    practiceNext: 'Next →',
    practiceResultsTitle: 'Round Complete',
    practiceResultsOf: 'of',
    practiceResultsCorrect: 'correct',
    practiceAnother: '🔄 Another Round',
    practiceQuestion: 'Question',
    practiceOf: 'of',
    practiceEasy: '🟢 Easy',
    practiceMedium: '🟡 Medium',
    practiceHard: '🔴 Hard',
    practiceMulti: 'MULTIPLE CHOICE',
    practiceSingle: 'SINGLE CHOICE',

    // Exam
    examTitle: '🎯 CCNA 200-301 Exam Simulator',
    examSubtitle: 'Simulate the real Cisco exam with random questions and a time limit.',
    examQuestions: 'Questions',
    examTime: 'Time',
    examMinScore: 'Minimum Score',
    examStart: '🚀 Start Exam',
    examStartTip: 'The timer starts immediately. Make sure you have 90 minutes available.',
    examFlag: '🚩 Flag',
    examPrev: '← Previous',
    examNext: 'Next →',
    examEnd: 'Finish',
    examQuestionNav: 'Navigation',
    examAnswered: 'Answered:',
    examQuestion: 'QUESTION',
    examMultiQuestion: 'Multiple Choice',
    examSingleQuestion: 'Single Choice',
    examConfirmEnd: 'Finish the exam?',
    examConfirmUnanswered: 'questions unanswered. Are you sure you want to finish?',
    examPassed: '🎉 You Passed!',
    examFailed: '📚 Keep Practicing',
    examScore: 'of',
    examCorrect: 'correct',
    examPassNote: 'You passed the 825/1000 cutoff!',
    examFailNote: 'The cutoff is ~83% (825/1000). Don\'t give up!',
    examTimeTaken: 'minutes',
    examReview: '🔍 Review Answers',
    examRetry: '🔄 New Exam',
    examDashboard: '📊 Dashboard',
    examReviewTitle: 'Answer Review',
    examYourAnswer: 'Your answer:',
    examCorrectAnswer: 'Correct:',
    examUnanswered: 'Unanswered',

    // Labs
    labsTitle: '🔧 Troubleshooting Labs',
    labsSubtitle: 'Cisco IOS CLI Simulator — diagnose and solve',
    labsQuestionLabel: '🔍 Troubleshooting Question',
    labsCorrect: '✅ Correct! You found the right diagnosis.',
    labsIncorrectPrefix: '❌ Incorrect. The correct answer is ',
    labsSolution: 'Solution:',
    labsSolutionCmd: 'On',
    labsExecCmd: 'run:',
    labsCmdHelp: "Type '?' for available commands",
    labsCmdHost: "Type 'host SW1'/'host SW2' to switch devices",
    labsTermCleared: 'Terminal cleared.',
    labsConnected: '[Connected to',
    labsUnknownHost: '% Unknown host:',
    labsAvailableHosts: 'Available hosts:',
    labsAvailableCmds: 'Available commands:',
    labsChangeHost: "host <name> — Switch device",
    labsClear: 'clear/cls — Clear terminal',
    labsHelp: '?/help — Show this help',
    labsInvalidCmd: "% Invalid command or not available in this scenario. Type '?' for available commands.",

    // Guide
    guideTitle: '📖 CCNA 200-301 Study Guide',
    guideSubtitle: 'Domain-by-domain exam summaries',

    // Analytics
    analyticsTitle: '📈 Performance Analytics',
    analyticsSubtitle: 'Identify your strengths and weaknesses',
    analyticsEmpty: 'Answer questions to generate performance analytics.',
    analyticsTotal: 'Total Questions',
    analyticsAccuracy: 'Overall Accuracy',
    analyticsExams: 'Exams',
    analyticsStreak: 'Day Streak',
    analyticsDomainBreakdown: 'Domain Breakdown',
    analyticsExamHistory: 'Exam History',
    analyticsWeakAreas: '🔴 Areas to Improve',
    analyticsWeakLabel: 'Needs Practice',
    analyticsExam: 'Exam',
    analyticsQuestions: 'questions',
    analyticsCorrect: 'correct',

    // Tutor
    tutorTitle: '🤖 CCNA Smart Tutor',
    tutorSubtitle: 'Ask me anything about CCNA — concepts, commands, troubleshooting',
    tutorThinking: '🤔 Thinking...',
    tutorInputPlaceholder: 'Type your CCNA question...',
    tutorSend: 'Send',
    tutorWelcome: `👋 Hi! I'm your CCNA tutor. I can explain concepts, help with troubleshooting, and guide you based on your performance.<br><br>
<strong>Try asking me:</strong><br>
• "How does OSPF work?"<br>
• "Explain subnetting"<br>
• "Why won't OSPF adjacency form?"<br>
• "Give me a VLAN exercise"<br>
• "What should I study to pass?"`,
    tutorRecCard: '🧠 Personalized Recommendation',
    tutorEmpty: "You haven't answered any questions yet. I recommend starting with \"Network Fundamentals\" — it's the foundation for everything else and makes up 20% of the exam.",
    tutorKeepGoing: 'Keep practicing so the tutor can identify your weak areas.',
    tutorWeakArea: 'Weak area:',
    tutorFocus: 'Focus on',
    tutorFamiliar: 'Your accuracy in',
    tutorIs: 'is',
    tutorExamPct: "of the exam. I suggest focusing on this area with 20-30 practice questions.",
    tutorImproving: 'Improving',
    tutorGoodPath: "You're on the right track but there's room for improvement. Try a full mock exam to test yourself under pressure.",
    tutorExcellent: '🔥 Excellent!',
    tutorReady: "You're ready for the exam. Keep practicing with mock exams and review the areas where you made mistakes.",
    tutorStartRecommended: "I recommend starting by answering questions in Practice mode — that way I can identify your strengths and weaknesses.",
    tutorStartCta: 'To get started right away:',
    tutorStartStep1: 'Go to the 📝 Practice tab',
    tutorStartStep2: 'Select "Network Fundamentals" (it\'s the foundation of everything)',
    tutorStartStep3: 'Choose "Easy" difficulty to start',
    tutorStartOffer: 'Want me to explain a specific topic in the meantime? You can ask me about OSPF, subnetting, VLANs, STP, ACLs... whatever you need! 🚀',
    tutorDefaultRecommend: 'Based on your performance',
    tutorDefaultTopics: 'Topics you can ask me about:',
    tutorDefaultList: '• "How does OSPF work?" — "Explain subnetting" — "VLANs and trunking"\n• "How do I configure an ACL?" — "Port Security" — "DHCP Snooping"\n• "TCP vs UDP differences" — "What is STP?" — "EtherChannel"',
    tutorDefaultAsk: 'What would you like to dive into? 🤓',
    tutorExamReadiness: 'Take practice exams under real exam conditions: 90-120 minutes without interruptions or distractions.',
    tutorExamTip: 'Tip:',

    // General
    resetTitle: '⚠️ Reset Progress',
    resetText: 'This will delete all your question history, exams, and progress. This action cannot be undone.',
    resetCancel: 'Cancel',
    resetConfirm: 'Reset Everything',
    langEs: 'ES',
    langEn: 'EN',
    and: 'and',
    questions: 'questions',
    correct: 'correct',
  }
};

const Lang = {
  KEY: 'ccna_lang',
  current: 'es',

  init() {
    this.current = localStorage.getItem(this.KEY) || 'es';
    return this.current;
  },

  t(key) {
    return LANG_STRINGS[this.current][key] || LANG_STRINGS.es[key] || `[${key}]`;
  },

  toggle() {
    this.current = this.current === 'es' ? 'en' : 'es';
    localStorage.setItem(this.KEY, this.current);
    return this.current;
  },

  set(lang) {
    if (lang === 'es' || lang === 'en') {
      this.current = lang;
      localStorage.setItem(this.KEY, lang);
    }
  },

  isEn() { return this.current === 'en'; },
  isEs() { return this.current === 'es'; },

  // Get localized domain name
  domainName(domain) {
    if (!domain) return '';
    return this.isEn() ? domain.name : (domain.nameEs || domain.name);
  },

  // Get localized question text
  questionText(q) {
    return this.isEn() && q.textEn ? q.textEn : q.text;
  },

  // Get localized question options
  questionOptions(q) {
    return this.isEn() && q.optionsEn ? q.optionsEn : q.options;
  },

  // Get localized question explanation
  questionExplanation(q) {
    return this.isEn() && q.explanationEn ? q.explanationEn : q.explanation;
  },

  // Get localized tutor response
  tutorResponse(esResponse, enResponse) {
    return this.isEn() && enResponse ? enResponse : esResponse;
  },

  // Get localized lab content
  labScenario(lab) {
    return this.isEn() && lab.scenarioEn ? lab.scenarioEn : lab.scenario;
  },

  labQuestion(lab) {
    return this.isEn() && lab.questionEn ? lab.questionEn : lab.question;
  },

  labOptions(lab) {
    return this.isEn() && lab.optionsEn ? lab.optionsEn : lab.options;
  },

  labExplanation(lab) {
    return this.isEn() && lab.explanationEn ? lab.explanationEn : lab.explanation;
  },

  // Get localized study guide sections
  studyGuide() {
    if (this.isEn()) {
      return STUDY_GUIDE_EN || STUDY_GUIDE;
    }
    return STUDY_GUIDE;
  }
};

// Initialize language on load
if (typeof window !== 'undefined') {
  Lang.init();
  window.Lang = Lang;
}
