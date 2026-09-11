export const slidesData = [
  {
    id: 1,
    type: 'cover',
    title: 'VISÃO GERAL DOS CUIDADOS FARMACÊUTICOS NA ONCOLOGIA',
    subtitle: 'Do medicamento ao cuidado centrado no paciente',
    badge: 'Farmácia Oncológica • Pós Graduação - PUC PR',
    presenter: {
      name: 'Ana Carolina Sugisaka',
      title: 'Farmacêutica | Especialista em Oncologia'
    }
  },
  {
    id: 2,
    type: 'question-reveal',
    title: 'O que o farmacêutico faz na oncologia?',
    subtitle: 'Mapeando as dimensões de atuação profissional',
    question: '💭 Vamos começar com vocês. O que vem à cabeça quando você pensa na atuação do farmacêutico em oncologia?',
    revealButtonText: 'Revelar possibilidades de atuação',
    items: [
      { label: 'Prescrição / Validação', icon: 'FileCheck', desc: 'Análise crítica do protocolo e doses' },
      { label: 'Manipulação', icon: 'FlaskConical', desc: 'Cabine de Segurança Biológica' },
      { label: 'Dispensação', icon: 'PackageCheck', desc: 'Rastreabilidade' },
      { label: 'Segurança', icon: 'ShieldCheck', desc: 'Barreiras contra erros de medicação' },
      { label: 'Orientação', icon: 'UserCheck', desc: 'Educação em saúde ao paciente' },
      { label: 'Monitoramento', icon: 'Activity', desc: 'Acompanhamento clínico e exames' },
      { label: 'Intervenção', icon: 'Sparkles', desc: 'Manejo de toxicidades e interações' },
      { label: 'Farmacoeconomia', icon: 'Sparkles', desc: 'Gestão de estoque' }
    ]
  },
  {
    id: 3,
    type: 'challenge',
    title: 'O Desafio Clínico',
    subtitle: 'A complexidade farmacoterapêutica no paciente oncológico',
    highlights: [
      {
        icon: 'AlertCircle',
        title: 'Polifarmácia Extensa',
        text: 'O paciente com câncer raramente utiliza apenas um fármaco. Ele está exposto simultaneamente a múltiplos regimes.'
      },
      {
        icon: 'Layers',
        title: 'Arsenal Farmacológico Simultâneo',
        text: 'Antineoplásicos (IV/orais), medicamentos de suporte (antieméticos, analgésicos), fármacos para comorbidades prévias.'
      },
      {
        icon: 'HeartPulse',
        title: 'Uso Oculto e Automedicação',
        text: 'Fitoterápicos, suplementos alimentares, polivitamínicos e fórmulas sem prescrição formal.'
      }
    ],
    summaryBox: {
      title: 'Contexto Multifatorial Dinâmico',
      text: 'Doença de base + múltiplos tratamentos + toxicidades acumuladas + flutuações laboratoriais + alterações clínicas rápidas.'
    }
  },
  {
    id: 4,
    type: 'case-study-intro',
    caseNumber: 1,
    title: 'CASO 1 — O Primeiro Contato',
    subtitle: 'Identificação inicial na admissão do paciente',
    patient: {
      name: 'Maria',
      age: '58 anos',
      diagnosis: 'Câncer de Mama',
      context: 'Diagnóstico recente de CA de mama. Encaminhada ao serviço hospitalar para início de tratamento quimioterápico sistêmico.'
    },
    medicalReport: '“Ela não utiliza nenhum medicamento importante.”',
    question: 'Antes de validar o tratamento antineoplásico, quais informações cruciais precisamos investigar?'
  },
  {
    id: 5,
    type: 'case-study-findings',
    caseNumber: 1,
    title: 'CASO 1 — O que descobrimos na investigação',
    subtitle: 'Detalhamento da farmacoterapia e hábitos da paciente',
    patient: {
      name: 'Maria',
      age: '58 anos'
    },
    medications: [
      { name: 'Losartana 50 mg', posology: '1x ao dia', reason: 'Hipertensão Arterial' },
      { name: 'Hidroclorotiazida 25 mg', posology: '1x ao dia', reason: 'Controle pressórico' },
      { name: 'Omeprazol 20 mg', posology: '1x ao dia pela manhã', reason: 'Proteção gástrica' },
      { name: 'Dipirona 500 mg', posology: 'Uso eventual', reason: 'Cefaleia / Dor' },
      { name: 'Multivitamínico A-Z', posology: '1 cápsula/dia', reason: 'Suplementação' },
      { name: 'Chá de Erva-de-São-João', posology: 'Uso diário', reason: 'Ansiedade / Insônia (Hypericum perforatum)' }
    ],
    patientQuote: '“Quando fico muito nervosa, tomo um remédio que minha vizinha me deu.”',
    reflection: 'O que chamou a sua atenção clínica nessa lista?'
  },
  {
    id: 6,
    type: 'case-study-points',
    caseNumber: 1,
    title: 'CASO 1 — Pontos de Atenção Críticos',
    subtitle: 'O que o farmacêutico deve analisar com prioridade?',
    question: 'Quais os riscos e pontos prioritários que precisam de intervenção imediata no caso da Maria?',
    revealButtonText: 'Revelar pontos de atenção farmacêutica',
    points: [
      { title: 'Medicamentos Prescritos', desc: 'Adesão e controle de hipertensão com Losartana e HCTZ', tag: 'Segurança' },
      { title: 'Medicamentos Eventuais', desc: 'Uso indiscriminado de sintomáticos sem registro', tag: 'Manejo' },
      { title: 'Automedicação Ativa', desc: 'Compostos sem indicação e sem conhecimento médico', tag: 'Alerta' },
      { title: 'Fitoterápicos (Erva-de-São-João)', desc: 'Potente indutor do CYP3A4 e P-gp (reduz eficácia antineoplásica)', tag: 'Interação Grave' },
      { title: 'Suplementos & Vitaminas', desc: 'Possível interferência na ação oxidativa de quimioterápicos', tag: 'Atenção' },
      { title: 'Remédio de Terceiros (Vizinha)', desc: 'Risco altíssimo de benzodiazepínicos ou fármacos contraindicados', tag: 'Risco Crítico' },
      { title: 'Interações Farmacocinéticas', desc: 'Alterações de clearance, absorção e meia-vida', tag: 'Farmacologia' },
      { title: 'Histórico de Alergias', desc: 'Necessidade de investigar reações prévias', tag: 'Protocolo' }
    ]
  },
  {
    id: 7,
    type: 'concept-pillars',
    title: 'Anamnese Farmacêutica Estruturada',
    subtitle: 'O farmacêutico deve conhecer o padrão real de uso de medicamentos',
    pillars: [
      { number: '1', question: 'O que o paciente realmente usa?', desc: 'Prescritos, automedicados, fitoterápicos, suplementos e chás.' },
      { number: '2', question: 'Como usa e por que usa?', desc: 'Horários, doses, relação com alimentos, técnica de administração.' },
      { number: '3', question: 'Está funcionando como esperado?', desc: 'Efetividade terapêutica e controle dos sintomas/doenças de base.' },
      { number: '4', question: 'Está causando problemas?', desc: 'Eventos adversos, desconfortos gástricos, tonturas, toxicidade.' },
      { number: '5', question: '⭐ Está realmente utilizando?', desc: 'Adesão genuína, esquecimentos e barreiras econômicas/culturais.', highlight: true }
    ]
  },
  {
    id: 8,
    type: 'quote-highlight',
    title: 'Conciliação Medicamentosa',
    subtitle: 'Investigação sistemática e contínua do histórico medicamentoso',
    bullets: [
      'Levantamento minucioso de doses, horários, indicações exatas e tempo de uso de cada fármaco.',
      'Rastreio obrigatório de suplementos, polivitamínicos, fitoterápicos e chás caseiros.',
      'Identificação de alergias medicamentosas e histórico de reações adversas anteriores.'
    ],
    quote: '“Se eu não sei o que o paciente usa, não consigo avaliar adequadamente o que está sendo prescrito.”',
    author: 'Princípio Fundamental da Farmácia Clínica Oncológica'
  },
  {
    id: 9,
    type: 'prescription-analysis',
    title: 'A Prescrição (Protocolo AC)',
    subtitle: 'Quimioterapia Adjuvante para Câncer de Mama',
    patientData: {
      weight: '72 kg',
      height: '165 cm',
      bsa: '1,82 m²'
    },
    items: [
      { drug: 'Doxorrubicina', dose: '60 mg/m²', calculated: '109,2 mg', route: 'IV (Intravenosa)' },
      { drug: 'Ciclofosfamida', dose: '600 mg/m²', calculated: '1092 mg', route: 'IV (Intravenosa)' },
      { drug: 'Ondansetrona', dose: '8 mg', calculated: '8 mg', route: 'IV (Pré-quimio)' },
      { drug: 'Dexametasona', dose: 'Conforme protocolo', calculated: '20 mg', route: 'IV (Pré-quimio)' }
    ],
    prompt: 'O que você confere antes de liberar essa prescrição para manipulação?'
  },
  {
    id: 10,
    type: 'four-cards-grid',
    title: 'Validação Farmacêutica em 4 Dimensões',
    subtitle: 'O checklist sistemático de segurança antes da manipulação',
    columns: [
      {
        icon: 'UserCheck',
        category: 'Paciente',
        color: 'blue',
        items: ['Identificação', 'Peso atualizado', 'Altura conferida', 'Superfície Corpórea (SC)', 'Histórico de alergias']
      },
      {
        icon: 'FileText',
        category: 'Protocolo',
        color: 'teal',
        items: ['Diagnóstico oncológico', 'Esquema padronizado', 'Número do Ciclo atual', 'Intervalo entre ciclos', 'Critérios de inclusão']
      },
      {
        icon: 'Pill',
        category: 'Medicamento',
        color: 'indigo',
        items: ['Dose calculada', 'Via de administração', 'Diluente e volume', 'Estabilidade físico-química', 'Ordem cronológica de infusão']
      },
      {
        icon: 'ShieldAlert',
        category: 'Segurança',
        color: 'emerald',
        items: ['Hemograma recente', 'Função renal e hepática', 'Grau de toxicidades prévias', 'Interações medicamentosas', 'Dose cumulativa (Antraciclinas)']
      }
    ]
  },
  {
    id: 11,
    type: 'warning-banner',
    title: '“A conta está certa?”',
    mainAlert: 'Dose correta ≠ Tratamento necessariamente seguro',
    description: 'A validação farmacêutica vai muito além do cálculo matemático da dose por m².',
    equation: 'Paciente + Doença + Protocolo + Medicamento + Dose + Momento + Condições Clínicas Atuais'
  },
  {
    id: 12,
    type: 'case-followup',
    caseNumber: 1,
    title: 'Três Semanas Depois...',
    subtitle: 'Retorno para avaliação do 2º ciclo de tratamento',
    patient: 'Maria, 58 anos (após o 1º ciclo de AC)',
    complaint: '“Estou muito enjoada depois da quimioterapia.”',
    otherSymptoms: [
      'Constipação intestinal persistente',
      'Fadiga acentuada (cansaço extremo)',
      'Grande dificuldade para manter a alimentação e hidratação'
    ],
    question: 'O que o farmacêutico clínico precisa investigar imediatamente?'
  },
  {
    id: 13,
    type: 'investigation-checklist',
    title: 'Manejo de Náusea e Vômito (NVIQ)',
    subtitle: 'Roteiro de investigação clínica antiemética',
    checks: [
      { question: 'Profilaxia adequada?', desc: 'O paciente recebeu o protocolo antiemético correto para o potencial emetogênico do esquema (AC é altamente emetogênico)?' },
      { question: 'Uso correto em domicílio?', desc: 'Utilizou a dexametasona e demais antieméticos orais nos horários e doses recomendados?' },
      { question: 'Uso da medicação de resgate?', desc: 'O paciente sabe exatamente quando e como tomar a medicação de resgate prescrita?' },
      { question: 'Capacidade de ingesta?', desc: 'Consegue manter a hidratação oral básica e alimentação fracionada?' },
      { question: 'Fármacos agravantes?', desc: 'Existem outros medicamentos em uso que podem estar piorando a irritação gástrica ou a náusea?' },
      { question: 'Necessidade de associações?', desc: 'É o momento de sugerir ao médico a inclusão de antagonista NK1 (Aprepitanto) ou Olanzapina?' }
    ]
  },
  {
    id: 14,
    type: 'toxicity-grid',
    title: 'Toxicidade & Eventos Adversos',
    subtitle: 'As toxicidades frequentes que exigem monitoramento ativo',
    toxicities: [
      { name: 'Náusea / Vômito', desc: 'Agudo (<24h), tardio (>24h) ou antecipatório', icon: 'Sparkles', color: 'blue' },
      { name: 'Diarreia / Constipação', desc: 'Alterações graves de motilidade do TGI', icon: 'Activity', color: 'teal' },
      { name: 'Mucosite / Estomatite', desc: 'Lesões dolorosas e risco de infecção na mucosa oral', icon: 'ShieldAlert', color: 'amber' },
      { name: 'Neuropatia Periférica', desc: 'Parestesias, perda de sensibilidade e dor em extremidades', icon: 'Zap', color: 'purple' },
      { name: 'Mielossupressão', desc: 'Neutropenia febril, anemia e trombocitopenia', icon: 'HeartPulse', color: 'rose' },
      { name: 'Fadiga & Dor', desc: 'Cansaço crônico debilitante e controle álgico inadequado', icon: 'Clock', color: 'indigo' }
    ]
  },
  {
    id: 15,
    type: 'myth-buster',
    title: 'Reflexão Clínica Fundamental',
    question: 'Todo sintoma apresentado pelo paciente é toxicidade do antineoplásico?',
    verdict: 'NÃO.',
    explanation: 'O sintoma relatado pode estar diretamente associado a: outros medicamentos em uso de rotina, interações medicamentosas farmacodinâmicas, infecções intercorrentes, progressão da doença de base, desidratação, distúrbios hidroeletrolíticos ou erros de administração.'
  },
  {
    id: 16,
    type: 'clinical-reasoning',
    title: 'O Exemplo da Maria',
    subtitle: 'Aplicando o raciocínio farmacoterapêutico',
    regimen: 'Doxorrubicina + Ciclofosfamida + Ondansetrona',
    reportedProblem: '“Estou com constipação intestinal severa há vários dias.”',
    investigation: 'Existe algo na farmacoterapia que pode estar contribuindo decisivamente para esse quadro?',
    mechanism: 'A Ondansetrona (antagonista 5-HT3) lentifica o trânsito gastro intestinal e é uma causa clássica de constipação severa!',
    formula: {
      step1: 'Evento Adverso Relatado',
      step2: 'Identificação do Fator Contribuinte (Ondansetrona + pouca ingesta hídrica)',
      step3: 'Intervenção Farmacêutica (Ajuste de laxativos osmóticos, hidratação e rodízio de antiemético)'
    }
  },
  {
    id: 17,
    type: 'biological-safety',
    title: 'Cuidados na Manipulação em Cabine de Segurança Biológica',
    subtitle: 'Proteção tríplice (operador, produto e ambiente) no preparo asséptico de antineoplásicos',
    classification: 'CSB Classe II Tipo B2 • 100% Exaustão Externa • ISO Classe 5 • RDC 220/ANVISA',
    tripleProtection: [
      {
        target: 'Operador',
        icon: 'ShieldAlert',
        desc: 'Barreira de ar frontal contínua e exaustão total externa, impedindo a inalação de citotóxicos e o contato com aerossóis perigosos.'
      },
      {
        target: 'Produto (Medicamento)',
        icon: 'FlaskConical',
        desc: 'Fluxo laminar vertical estéril descendente com filtragem HEPA (ISO Classe 5), garantindo assepsia total da preparação injetável.'
      },
      {
        target: 'Meio Ambiente',
        icon: 'Activity',
        desc: '100% do ar extraído passa por filtragem absoluta antes de ser expelido, sem recirculação para a sala limpa ou áreas hospitalares.'
      }
    ],
    pillars: [
      {
        category: 'Fluxo de Ar & Barreira',
        icon: 'Layers',
        tag: 'Dinâmica do Ar',
        items: [
          'Grelhas frontal e posterior 100% desobstruídas (não apoiar materiais ou braços)',
          'Movimentos lentos, suaves e perpendiculares (evita turbulências que quebram o fluxo)',
          'Não posicionar mãos ou braços obstruindo a cortina de ar frontal protetora'
        ]
      },
      {
        category: 'Organização da Bancada',
        icon: 'PackageCheck',
        tag: 'Área de Trabalho',
        items: [
          'Fluxo unidirecional: Insumos estéreis ➔ Manipulação central ➔ Descarte à direita',
          'Respeitar a "Zona Crítica": ar estéril do HEPA direto na agulha e ponto de infusão',
          'Manter materiais a pelo menos 10 a 15 cm das bordas e grelhas da cabine'
        ]
      },
      {
        category: 'Técnica & Pressão Negativa',
        icon: 'Syringe',
        tag: 'Farmacotécnica',
        items: [
          'Desinfecção prévia com álcool 70% estéril e gaze que não libere partículas',
          'Ajuste pressão negativa nos frascos para evitar aerossóis e vazamentos',
          'Proibido ejetar ar com resíduos ou borrifar qualquer solução na cabine'
        ]
      },
      {
        category: 'Biossegurança & EPIs',
        icon: 'ShieldCheck',
        tag: 'Segurança da Equipe',
        items: [
          'Dois pares de luvas estéreis e sem talco (uma sob e outra sobre o punho do avental)',
          'Troca de luvas a cada 1 hora ou imediatamente em caso de perfuração ou contaminação',
          'Avental impermeável com punho elástico e fechamento posterior + máscara PFF2/N95',
          'Descarte imediato de perfurocortantes em coletor rígido químico dentro da cabine'
        ]
      }
    ],
    goldenRule: ' Regra de Ouro: A Cabine de Segurança Biológica não compensa falhas técnicas. Movimentos bruscos, excesso de materiais ou bloqueio de grelhas quebram a barreira de ar e expõem o manipulador e o medicamento a contaminação.'
  },
  {
    id: 18,
    type: 'safety-matrix',
    title: 'Segurança do Paciente em Oncologia',
    corePrinciple: 'Os 5 Certos Ampliados: Paciente certo, Medicamento certo, Dose certa, Via certa e Horário certo. Em oncologia: “O tratamento certo para o paciente certo no momento certo.”',
    sectionTitle: 'Erros e riscos graves que a atuação farmacêutica sistemática evita:',
    errors: [
      { name: 'Erro de Paciente', desc: 'Homônimos e identificação incorreta' },
      { name: 'Erro de Medicamento', desc: 'Troca de nomes semelhantes (LASA)' },
      { name: 'Erro de Dose', desc: 'Cálculo de superfície corpórea incorreto' },
      { name: 'Erro de Via', desc: 'Vias inadvertidas (ex: Vincristina intratecal)' },
      { name: 'Erro de Programação', desc: 'Taxas e tempos de bomba de infusão' },
      { name: 'Interações Graves', desc: 'Indução ou inibição enzimática crítica' },
      { name: 'Toxicidade Evitável', desc: 'Dose cumulativa não monitorada' },
      { name: 'Falha de Monitoramento', desc: 'Liberação sem exames laboratoriais' }
    ]
  },
  {
    id: 19,
    type: 'flow-pipeline',
    title: 'Onde o Farmacêutico Atua?',
    subtitle: 'Presença ativa em toda a linha de cuidado oncológico',
    steps: [
      { num: '1', title: 'Prescrição', icon: 'FileText', desc: 'Análise técnica de indicação e protocolos' },
      { num: '2', title: 'Validação', icon: 'CheckSquare', desc: 'Checagem rigorosa de doses, exames e dados' },
      { num: '3', title: 'Manipulação', icon: 'FlaskConical', desc: 'Preparo asséptico em cabines de fluxo laminar' },
      { num: '4', title: 'Administração', icon: 'Syringe', desc: 'Suporte de compatibilidade e tempo de infusão' },
      { num: '5', title: 'Orientação', icon: 'UserCheck', desc: 'Consulta farmacêutica ao paciente e familiares' },
      { num: '6', title: 'Monitoramento', icon: 'Activity', desc: 'Acompanhamento de exames e desfechos' },
      { num: '7', title: 'Intervenção', icon: 'Sparkles', desc: 'Ajustes clínicos com a equipe médica' }
    ],
    takeaway: 'A atuação farmacêutica permeia toda a jornada do medicamento e do paciente.'
  },
  {
    id: 20,
    type: 'cycle-view',
    title: 'O Cuidado Farmacêutico Contínuo',
    subtitle: 'Metodologia clínica centrada no paciente',
    cycle: [
      { step: '1', name: 'AVALIAR', desc: 'Paciente, dados clínicos, laboratoriais e biológicos', color: 'blue' },
      { step: '2', name: 'IDENTIFICAR', desc: 'Riscos, interações medicamentosas e toxicidades', color: 'teal' },
      { step: '3', name: 'INTERVIR', desc: 'Ajustes posológicos, conciliação e orientações', color: 'emerald' },
      { step: '4', name: 'MONITORAR', desc: 'Efetividade, segurança, adesão e qualidade de vida', color: 'indigo' },
      { step: '5', name: 'REAVALIAR', desc: 'Novos ciclos, exames de controle e desfechos', color: 'purple' }
    ],
    message: '🔄 O cuidado farmacêutico não é uma atividade pontual ou isolada, mas um processo contínuo, dinâmico e integrado à equipe multiprofissional.'
  },
  {
    id: 21,
    type: 'break-timer',
    title: '☕ PAUSA PARA INTERVALO',
    subtitle: 'Pausa programada de 15 minutos',
    defaultMinutes: 15,
    message: 'Aproveite para tomar um café, tirar dúvidas, trocar experiências e recarregar as energias!'
  },
  {
    id: 22,
    type: 'case-study-intro',
    caseNumber: 2,
    title: 'CASO 2 — O Tratamento em Casa',
    subtitle: 'A quimioterapia antineoplásica por via oral',
    patient: {
      name: 'João',
      age: '71 anos',
      diagnosis: 'Câncer Colorretal',
      context: 'Inicia tratamento com protocolo CAPOX (Capecitabina oral + Oxaliplatina IV).'
    },
    medicalReport: 'Protocolo: Oxaliplatina IV no D1 + Capecitabina oral 1000 mg/m² 2x/dia do D1 ao D14 (ciclos de 21 dias).',
    question: 'Quais os cuidados essenciais e orientações farmacêuticas antes de iniciar o tratamento em domicílio?'
  },
  {
    id: 23,
    type: 'challenge',
    title: 'Terapia Antineoplásica Oral',
    subtitle: 'A transferência do cuidado para o ambiente doméstico',
    highlights: [
      {
        icon: 'Home',
        title: 'Administração Domiciliar',
        text: 'No protocolo CAPOX, a Capecitabina é autoadministrada pelo paciente ou cuidador na sua residência por 14 dias seguidos.'
      },
      {
        icon: 'UserX',
        title: 'Ausência da Equipe à Beira-Leito',
        text: 'Não existe um profissional de saúde ao lado do paciente durante as tomadas para checar horários, náuseas ou toxicidades.'
      }
    ],
    summaryBox: {
      title: 'A Mudança de Paradigma',
      text: '“Agora não existe mais a equipe ao lado do paciente durante a administração. O paciente se torna o gestor do seu próprio tratamento antineoplásico.”'
    }
  },
  {
    id: 24,
    type: 'education-pillars',
    title: 'O Paciente em Casa: O Que Ele Precisa Saber?',
    subtitle: 'Pilares fundamentais da orientação farmacêutica para antineoplásicos orais',
    pillars: [
      {
        title: 'Como Tomar Corretamente',
        icon: 'Clock',
        items: ['Dose exata prescrita', 'Horários fixos (a cada 12 horas)', 'Ingerir até 30 min após as refeições com água', 'O que fazer exatamente em caso de esquecimento']
      },
      {
        title: 'Armazenamento & Manuseio',
        icon: 'ShieldCheck',
        items: ['Manter em local seco, fresco e fora do alcance de crianças', 'Não partir, abrir ou mastigar os comprimidos', 'Lavar as mãos antes e após o manuseio']
      },
      {
        title: 'O Que Evitar & Cuidados',
        icon: 'AlertTriangle',
        items: ['Não usar medicamentos ou fitoterápicos sem consulta prévia', 'Cuidado com antiácidos com hidróxido de alumínio/magnésio', 'Evitar bebidas alcoólicas e automedicação']
      },
      {
        title: 'Sinais de Alerta para Contato',
        icon: 'PhoneCall',
        items: ['Diarreia grave (≥4 evacuações/dia acima do normal)', 'Febre (temperatura ≥ 37,8°C)', 'Dor/vermelhidão intensa nas mãos e pés (Síndrome Mão-Pé)', 'Feridas dolorosas na boca (mucosite)']
      }
    ]
  },
  {
    id: 25,
    type: 'interactive-scenarios',
    title: 'Desafios Práticos com o Paciente João',
    subtitle: 'Como conduzir as seguintes situações no consultório farmacêutico?',
    scenarios: [
      {
        id: 's1',
        title: 'Cenário 1: Esquecimento de Dose',
        situation: 'João esqueceu a dose da noite de ontem e lembrou hoje pela manhã. O que ele deve fazer?',
        guidance: 'Orientação: Não tomar a dose esquecida junto com a dose da manhã. Seguir o horário habitual da manhã e registrar a ocorrência para comunicação à equipe.'
      },
      {
        id: 's2',
        title: 'Cenário 2: Tentativa de Compensação',
        situation: 'João pensa em tomar o dobro de comprimidos hoje para “compensar o atraso do tratamento”.',
        guidance: 'Orientação: Jamais dobrar doses! A elevação aguda da concentração sérica de fluoropirimidinas pode desencadear toxicidade fatal (mielossupressão severa, enterite e necrose de mucosa).'
      },
      {
        id: 's3',
        title: 'Cenário 3: Uso de Suplemento “Natural”',
        situation: 'João começou a utilizar um chá medicinal e um suplemento vitamínico indicado por um vizinho.',
        guidance: 'Orientação: Avaliar a composição botânica e farmacológica. Fitoterápicos podem alterar a depuração da Capecitabina e potencializar a toxicidade gastrointestinal e hepática.'
      }
    ]
  },
  {
    id: 26,
    type: 'adherence-matrix',
    title: 'Adesão ao Tratamento Oncológico Oral',
    subtitle: 'Fatores multifatoriais que impactam o sucesso terapêutico',
    factors: [
      { name: 'Efeitos Adversos', desc: 'Náusea, diarreia e fadiga não manejados levam à suspensão voluntária' },
      { name: 'Esquecimento & Rotina', desc: 'Falta de organizadores e rotinas complexas' },
      { name: 'Dificuldade de Acesso', desc: 'Entraves burocráticos e custo elevado' },
      { name: 'Complexidade Posológica', desc: 'Múltiplos comprimidos em intervalos rígidos' },
      { name: 'Falta de Compreensão', desc: 'Instruções médicas não compreendidas' },
      { name: 'Crenças & Medos', desc: 'Receio infundado de dependência ou efeitos irreversíveis' },
      { name: 'Depressão & Isolamento', desc: 'Impacto na motivação e autocuidado' },
      { name: 'Ausência de Sintomas', desc: 'Falsa sensação de que o remédio não é mais necessário' }
    ],
    goldenRule: '“O farmacêutico precisa perguntar ativamente e com empatia, e nunca presumir que o paciente está tomando corretamente.”'
  },
  {
    id: 27,
    type: 'health-education',
    title: 'Comunicação e Educação em Saúde Eficaz',
    subtitle: 'As 5 perguntas essenciais que toda orientação farmacêutica deve responder',
    steps: [
      { num: '1', question: 'O que devo fazer?', desc: 'Nome do fármaco, finalidade clara e dose exata prescrita.' },
      { num: '2', question: 'Como devo fazer?', desc: 'Modo de tomar, relação com alimentos, armazenamento e horários.' },
      { num: '3', question: 'Por que isso é importante?', desc: 'A relevância clínica da adesão e da pontualidade para combater as células tumorais.' },
      { num: '4', question: 'O que pode acontecer?', desc: 'Efeitos colaterais previsíveis e estratégias preventivas de manejo.' },
      { num: '5', question: 'Quando devo procurar ajuda?', desc: 'Sinais de alerta vermelhos e canais de contato de emergência com o hospital.' }
    ]
  },
  {
    id: 28,
    type: 'case-study-intro',
    caseNumber: 3,
    title: 'CASO 3 — O Paciente Complexo',
    subtitle: 'Polifarmácia crítica e fragilidade clínica',
    patient: {
      name: 'Antônio',
      age: '72 anos',
      diagnosis: 'Câncer de Pulmão de Células Não Pequenas Avançado',
      context: 'Iniciará quimioterapia sistêmica combinada com imunoterapia.'
    },
    medicationsList: [
      'Losartana 50 mg (Anti-hipertensivo)',
      'Metformina 850 mg (Hipoglicemiante oral)',
      'Varfarina / DOAC (Anticoagulante para fibrilação atrial)',
      'Sertralina 50 mg (Antidepressivo)',
      'Tramadol / Dipirona (Analgesia oncológica)',
      'Lactulose (Laxativo osmótico)',
      'Metoclopramida (Antiemético pró-cinético)'
    ],
    evolution: 'Semanas após início do tratamento antineoplásico: Apresenta fadiga severa (grau 3), diarreia persistente, anorexia marcada e alteração relevante de exames renais e hepáticos.'
  },
  {
    id: 29,
    type: 'multidisciplinary',
    title: '“Quem Cuida Desse Paciente?”',
    subtitle: 'O modelo de assistência integrada e multiprofissional',
    question: 'A responsabilidade pelo sucesso terapêutico é apenas do médico ou apenas do farmacêutico?',
    answer: 'NÃO. A oncologia exige uma rede multiprofissional coordenada e centrada na pessoa.',
    team: [
      { role: 'Médico Oncologista', icon: 'Stethoscope' },
      { role: 'Farmacêutico Clínico', icon: 'Pill' },
      { role: 'Enfermagem Oncológica', icon: 'HeartPulse' },
      { role: 'Nutrição Clínica', icon: 'Apple' },
      { role: 'Psicologia', icon: 'Smile' },
      { role: 'Fisioterapia', icon: 'Activity' },
      { role: 'Odontologia', icon: 'Sparkles' },
      { role: 'Serviço Social', icon: 'Users' }
    ]
  },
  {
    id: 30,
    type: 'interdisciplinary-actions',
    title: 'Atuação Farmacêutica Multiprofissional',
    subtitle: 'Ações concretas no round clínico e ambulatório',
    actions: [
      { title: 'Identificação Precoce de PRMs', desc: 'Detectar problemas relacionados a medicamentos e sugerir intervenções precisas aos prescritores.' },
      { title: 'Manejo Profilático de Toxicidades', desc: 'Auxiliar na otimização de terapias de suporte para náuseas, mucosite, diarreia e dor.' },
      { title: 'Avaliação Avançada de Interações', desc: 'Identificar sinergismos tóxicos entre terapia oncológica e comorbidades crônicas.' },
      { title: 'Seguimento & Adesão Terapêutica', desc: 'Acompanhar o uso correto de antineoplásicos orais e documentar desfechos clínicos.' },
      { title: 'Registro em Prontuário Eletrônico', desc: 'Garantir comunicação clara, rastreável e interprofissional entre todos os membros da equipe.' }
    ],
    competenceNote: '⚠️ Limite de Competência: O farmacêutico precisa reconhecer prontamente quando o quadro clínico ultrapassa seu escopo e exige encaminhamento médico imediato.'
  },
  {
    id: 31,
    type: 'interactions-deepdive',
    title: 'Interações Medicamentosas em Oncologia',
    subtitle: 'Desmistificando o julgamento clínico e a conduta farmacêutica',
    question: 'Interação medicamentosa significa necessariamente que dois fármacos NÃO podem ser administrados juntos?',
    verdict: 'NÃO.',
    pillars: [
      { title: 'Farmacocinética', desc: 'Alterações em absorção, biodisponibilidade, metabolismo hepático (CYP450) e excreção renal.' },
      { title: 'Farmacodinâmica', desc: 'Potencialização de toxicidades (ex: prolongamento do intervalo QTc) ou antagonismo de efeito.' },
      { title: 'Relevância Clínica', desc: 'Avaliação de severidade teórica vs. evidência clínica real e histórico individual do paciente.' },
      { title: 'Estratégias de Manejo', desc: 'Espaçamento de horários de tomada, monitoramento laboratorial intensificado e ajuste de doses.' }
    ],
    quote: '“Nem toda interação exige suspensão do medicamento. Mas toda interação relevante precisa ser formalmente reconhecida e gerenciada.”'
  },
  {
    id: 32,
    type: 'bridge-concept',
    title: 'O Farmacêutico como “Ponte de Cuidado”',
    subtitle: 'Conectando a ciência farmacêutica às necessidades humanas',
    equation: 'PACIENTE ➔ FARMACÊUTICO ➔ Medicamento | Equipe | Sistema de Saúde',
    desc: 'O farmacêutico atua como o elo humanizado que traduz a complexidade dos tratamentos oncológicos em segurança palpável, personalizando a farmacoterapia para cada momento de vida do paciente.'
  },
  {
    id: 33,
    type: 'final-challenge',
    title: '⚡ DESAFIO FINAL: Ação Farmacêutica Rápida',
    subtitle: 'Raciocínio clínico sob pressão de tempo',
    challengePrompt: 'Você tem 2 minutos! Liste 5 oportunidades de intervenção farmacêutica para um paciente complexo como o Sr. Antônio.',
    revealButtonText: 'Revelar matriz de oportunidades de intervenção',
    opportunities: [
      { num: '1', text: 'Conciliação medicamentosa rigorosa na admissão e em cada ciclo' },
      { num: '2', text: 'Triagem e manejo de interações farmacocinéticas com quimio e imunoterapia' },
      { num: '3', text: 'Graduação e monitoramento ativo de toxicidades clínicas (CTCAE)' },
      { num: '4', text: 'Acompanhamento rigoroso de exames laboratoriais (função renal e hepática)' },
      { num: '5', text: 'Consulta farmacêutica personalizada e educação em saúde ao paciente/familiar' },
      { num: '6', text: 'Avaliação contínua da adesão e identificação de barreiras práticas' },
      { num: '7', text: 'Intervenção estruturada junto ao médico para ajuste posológico' },
      { num: '8', text: 'Otimização e escalonamento de medicamentos de suporte para náusea e dor' },
      { num: '9', text: 'Educação preventiva sobre sinais de alerta que exigem pronto-atendimento' },
      { num: '10', text: 'Documentação clínica em prontuário e farmacovigilância de eventos graves' }
    ]
  },
  {
    id: 34,
    type: 'knowledge-fixation',
    title: 'Atividade de Fixação de Conhecimento',
    subtitle: 'Aplicação prática e consolidação dos conceitos clínicos discutidos na aula',
    badge: 'Atividade Prática • Fixação de Conteúdo',
    formUrl: 'https://forms.gle/SoqSnWc9UUmCpWyQA',
    shortUrl: 'forms.gle/SoqSnWc9UUmCpWyQA',
    instructions: [
      'Aponte a câmera do seu celular para o QR Code ao lado',
      'Acesse o formulário',
      'Responda aos exercícios para consolidar o que foi visto em aula'
    ],
    highlights: [
      {
        icon: 'CheckSquare',
        title: 'Caso Prático',
        desc: 'Um caso clínico focado na conduta do farmacêutico'
      },
      {
        icon: 'Sparkles',
        title: 'Raciocínio Clínico',
        desc: 'Questões para revisão'
      }
    ]
  },
  {
    id: 35,
    type: 'conclusion',
    title: 'O medicamento é o meio.\nO paciente é o foco.',
    coreMessage: 'Cuidar do medicamento com excelência técnica é indispensável.',
    highlightMessage: 'Mas cuidar da pessoa que utiliza o medicamento é a nossa verdadeira missão.',
    author: {
      name: 'Ana Carolina Anversa Sugisaka',
      title: 'Farmacêutica | Especialista em Oncologia',
      thankYou: 'Muito obrigado pela atenção!'
    }
  }
];
