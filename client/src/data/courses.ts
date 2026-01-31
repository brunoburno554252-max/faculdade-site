export interface CurriculumSubject {
  name: string;
  hours: number;
}

export interface CurriculumPeriod {
  period: string;
  subjects: CurriculumSubject[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  type: string; // Bacharelado, Licenciatura, Tecnólogo
  modality: string; // Presencial, EAD, Semipresencial
  duration: string;
  shift: string; // Manhã, Noite, Integral
  description: string;
  objectives: string;
  jobMarket: string;
  image: string;
  curriculum: CurriculumPeriod[];
}

export const courses: Course[] = [
  {
    id: "1",
    slug: "terapia-ocupacional",
    title: "Terapia Ocupacional",
    type: "Bacharelado",
    modality: "Presencial",
    duration: "4 Anos",
    shift: "Noite",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "O curso de Terapia Ocupacional da LA. Educação forma profissionais preparados para promover a autonomia, o bem-estar e a inclusão social de pessoas em diferentes fases da vida que enfrentam limitações físicas, cognitivas, emocionais ou sociais.",
    objectives: "Durante a graduação, o estudante aprende a avaliar e intervir em situações que afetam o desempenho nas atividades do cotidiano — como cuidar de si, estudar, trabalhar e se relacionar —, utilizando práticas que unem ciência, empatia e criatividade. A formação tem uma base sólida em áreas como anatomia, neurociências, psicologia, saúde coletiva e reabilitação, aliando teoria e prática desde os primeiros semestres. O curso também valoriza a vivência em estágios supervisionados e projetos de extensão, que aproximam o aluno da realidade dos serviços de saúde, educação e assistência social.",
    jobMarket: "Ao concluir o curso, o profissional estará habilitado a atuar em hospitais, clínicas, escolas, centros de reabilitação, instituições de longa permanência e programas de saúde pública, contribuindo para uma sociedade mais inclusiva e humana.",
    curriculum: [
      {
        period: "1º Período",
        subjects: [
          { name: "Anatomia Humana", hours: 80 },
          { name: "História da Terapia Ocupacional", hours: 60 },
          { name: "Psicologia do Desenvolvimento", hours: 60 },
          { name: "Saúde Coletiva", hours: 60 },
          { name: "Sociologia e Antropologia", hours: 40 }
        ]
      },
      {
        period: "2º Período",
        subjects: [
          { name: "Fisiologia Humana", hours: 80 },
          { name: "Cinesiologia e Biomecânica", hours: 80 },
          { name: "Fundamentos de Terapia Ocupacional", hours: 60 },
          { name: "Neuroanatomia", hours: 60 },
          { name: "Metodologia Científica", hours: 40 }
        ]
      },
      {
        period: "3º Período",
        subjects: [
          { name: "Patologia Geral", hours: 60 },
          { name: "Terapia Ocupacional Social", hours: 80 },
          { name: "Psicopatologia", hours: 60 },
          { name: "Atividades e Recursos Terapêuticos I", hours: 80 },
          { name: "Ética e Bioética", hours: 40 }
        ]
      },
      {
        period: "4º Período",
        subjects: [
          { name: "Terapia Ocupacional em Saúde Mental", hours: 80 },
          { name: "Terapia Ocupacional em Disfunções Físicas", hours: 80 },
          { name: "Farmacologia", hours: 40 },
          { name: "Atividades e Recursos Terapêuticos II", hours: 80 },
          { name: "Ergonomia", hours: 60 }
        ]
      }
    ]
  },
  {
    id: "2",
    slug: "direito",
    title: "Direito",
    type: "Bacharelado",
    modality: "Presencial",
    duration: "5 Anos",
    shift: "Noite",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "O curso de Direito da LA. Educação prepara profissionais éticos e competentes para atuar na defesa da justiça e dos direitos fundamentais, com sólida formação teórica e prática.",
    objectives: "Formar bacharéis em Direito com capacidade de análise crítica, interpretação e aplicação das normas jurídicas, aptos a atuar nas diversas carreiras jurídicas e na advocacia.",
    jobMarket: "Advocacia, Magistratura, Ministério Público, Defensoria Pública, Delegado de Polícia, Procuradorias, Consultoria Jurídica, Docência, entre outros.",
    curriculum: [
      {
        period: "1º Semestre",
        subjects: [
          { name: "Teoria Geral do Direito", hours: 80 },
          { name: "Português Jurídico", hours: 40 },
          { name: "História do Direito", hours: 60 },
          { name: "Psicologia Jurídica", hours: 60 },
          { name: "Filosofia Geral e Jurídica", hours: 60 },
          { name: "Atividade Complementar I", hours: 20 }
        ]
      },
      {
        period: "2º Semestre",
        subjects: [
          { name: "Teoria da Política e do Estado", hours: 60 },
          { name: "Teoria da Constituição", hours: 80 },
          { name: "Teoria Geral do Direito Civil", hours: 80 },
          { name: "Teoria do Crime", hours: 80 },
          { name: "Sociologia Geral e Jurídica", hours: 60 },
          { name: "Atividade Complementar II", hours: 20 }
        ]
      },
      {
        period: "3º Semestre",
        subjects: [
          { name: "Antropologia Geral e Jurídica", hours: 60 },
          { name: "Teoria Geral do Processo", hours: 80 },
          { name: "Organização do Estado", hours: 60 },
          { name: "Teoria Geral das Obrigações", hours: 80 },
          { name: "Teoria da Pena", hours: 60 },
          { name: "Atividade Complementar III", hours: 20 }
        ]
      },
      {
        period: "4º Semestre",
        subjects: [
          { name: "Processo de Conhecimento", hours: 80 },
          { name: "Crimes em Espécie I", hours: 60 },
          { name: "Direitos e Garantias Fundamentais", hours: 60 },
          { name: "Teoria Geral dos Contratos e Contratos em Espécie", hours: 80 },
          { name: "Direito Administrativo I", hours: 60 },
          { name: "Atividade Complementar IV", hours: 20 }
        ]
      },
      {
        period: "5º Semestre",
        subjects: [
          { name: "Teoria Geral dos Recursos e Recursos em Espécie", hours: 80 },
          { name: "Direito Processual Penal I", hours: 60 },
          { name: "Responsabilidade Civil", hours: 60 },
          { name: "Crimes em Espécie II", hours: 60 },
          { name: "Direito Administrativo II", hours: 60 },
          { name: "Atividade Complementar V", hours: 20 }
        ]
      },
      {
        period: "6º Semestre",
        subjects: [
          { name: "Processo de Execução", hours: 80 },
          { name: "Direito Processual Penal II", hours: 60 },
          { name: "Direito Empresarial I", hours: 60 },
          { name: "Direito das Coisas", hours: 60 },
          { name: "Direito do Trabalho I", hours: 60 },
          { name: "Atividade Complementar VI", hours: 20 }
        ]
      },
      {
        period: "7º Semestre",
        subjects: [
          { name: "Procedimentos Especiais", hours: 60 },
          { name: "Direito Processual Penal III", hours: 60 },
          { name: "Direito Empresarial II", hours: 60 },
          { name: "Direito de Família e Sucessões", hours: 80 },
          { name: "Direito do Trabalho II", hours: 60 },
          { name: "Estágio Supervisionado I", hours: 100 }
        ]
      },
      {
        period: "8º Semestre",
        subjects: [
          { name: "Direito Processual do Trabalho", hours: 60 },
          { name: "Direito Tributário I", hours: 60 },
          { name: "Direito do Consumidor", hours: 40 },
          { name: "Direito Previdenciário", hours: 60 },
          { name: "Estágio Supervisionado II", hours: 100 },
          { name: "Trabalho de Conclusão de Curso I", hours: 40 }
        ]
      },
      {
        period: "9º Semestre",
        subjects: [
          { name: "Direito Tributário II", hours: 60 },
          { name: "Direito Ambiental", hours: 40 },
          { name: "Direito Processual Constitucional", hours: 60 },
          { name: "Direito Internacional Público e Privado", hours: 60 },
          { name: "Estágio Supervisionado III", hours: 100 },
          { name: "Trabalho de Conclusão de Curso II", hours: 40 }
        ]
      },
      {
        period: "10º Semestre",
        subjects: [
          { name: "Direitos Humanos", hours: 40 },
          { name: "Direito Cibernético", hours: 40 },
          { name: "Estatuto da Criança e do Adolescente", hours: 40 },
          { name: "Optativa", hours: 40 },
          { name: "Estágio Supervisionado IV", hours: 100 },
          { name: "Atividades Complementares", hours: 100 }
        ]
      }
    ]
  },
  {
    id: "3",
    slug: "enfermagem",
    title: "Enfermagem",
    type: "Bacharelado",
    modality: "Presencial",
    duration: "5 Anos",
    shift: "Integral",
    image: "https://images.unsplash.com/photo-1584515933487-9bdb75f77f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "O curso de Enfermagem forma profissionais capacitados para o cuidado humano, atuando na promoção, prevenção, recuperação e reabilitação da saúde.",
    objectives: "Desenvolver competências técnicas, científicas e humanísticas para o exercício da enfermagem com qualidade, ética e responsabilidade social.",
    jobMarket: "Hospitais, Unidades Básicas de Saúde, Clínicas, Home Care, Gestão em Saúde, Ensino e Pesquisa.",
    curriculum: [
      {
        period: "1º Período",
        subjects: [
          { name: "Anatomia Humana I", hours: 80 },
          { name: "Citologia e Histologia", hours: 60 },
          { name: "História da Enfermagem", hours: 40 },
          { name: "Saúde Coletiva I", hours: 60 },
          { name: "Bioquímica", hours: 60 }
        ]
      }
    ]
  },
  {
    id: "4",
    slug: "psicologia",
    title: "Psicologia",
    type: "Bacharelado",
    modality: "Presencial",
    duration: "5 Anos",
    shift: "Manhã/Noite",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "O curso de Psicologia estuda os fenômenos psíquicos e o comportamento humano, preparando o profissional para atuar na promoção da saúde mental.",
    objectives: "Formar psicólogos generalistas, com visão crítica e reflexiva, capazes de atuar em diferentes contextos sociais e institucionais.",
    jobMarket: "Clínica, Escolas, Empresas (RH), Hospitais, Jurídica, Esporte, Social e Comunitária.",
    curriculum: [
      {
        period: "1º Período",
        subjects: [
          { name: "História da Psicologia", hours: 60 },
          { name: "Processos Psicológicos Básicos", hours: 80 },
          { name: "Anatomia e Fisiologia Humana", hours: 80 },
          { name: "Filosofia", hours: 40 },
          { name: "Sociologia", hours: 40 }
        ]
      }
    ]
  },
  {
    id: "5",
    slug: "administracao",
    title: "Administração",
    type: "Bacharelado",
    modality: "EAD",
    duration: "4 Anos",
    shift: "Flexível",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "O curso de Administração forma gestores capazes de planejar, organizar, dirigir e controlar organizações, com foco em resultados e inovação.",
    objectives: "Desenvolver habilidades de liderança, tomada de decisão, visão estratégica e empreendedorismo.",
    jobMarket: "Empresas privadas, Setor Público, Consultoria, Empreendedorismo, Gestão de Projetos, Finanças, Marketing, RH.",
    curriculum: [
      {
        period: "1º Período",
        subjects: [
          { name: "Teoria Geral da Administração", hours: 80 },
          { name: "Matemática Financeira", hours: 60 },
          { name: "Contabilidade Geral", hours: 80 },
          { name: "Economia", hours: 60 },
          { name: "Comunicação Empresarial", hours: 40 }
        ]
      }
    ]
  },
  {
    id: "6",
    slug: "pedagogia",
    title: "Pedagogia",
    type: "Licenciatura",
    modality: "EAD",
    duration: "4 Anos",
    shift: "Flexível",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1422&q=80",
    description: "O curso de Pedagogia forma educadores para atuar na docência da Educação Infantil e Anos Iniciais do Ensino Fundamental, além de gestão escolar.",
    objectives: "Capacitar profissionais para compreender e intervir nos processos de ensino-aprendizagem, gestão educacional e espaços não-escolares.",
    jobMarket: "Escolas (Docência e Gestão), Empresas (Pedagogia Empresarial), Hospitais (Pedagogia Hospitalar), Editoras, ONGs.",
    curriculum: [
      {
        period: "1º Período",
        subjects: [
          { name: "História da Educação", hours: 60 },
          { name: "Filosofia da Educação", hours: 60 },
          { name: "Sociologia da Educação", hours: 60 },
          { name: "Psicologia da Educação", hours: 80 },
          { name: "Didática Geral", hours: 80 }
        ]
      }
    ]
  }
];
