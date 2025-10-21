export const techStackTranslations = {
  en: {
    workflow: {
      title: "AI-Powered Development Workflow",
      description:
        "A clear and efficient 6-step process from planning to launch, leveraging AI for speed and quality.",
      list: [
        {
          key: "strategy",
          icon: "Target",
          title: "Strategy & Planning",
          description:
            "Define goals, KPIs, scope, gather requirements, research market & business flows. AI as Junior Analyst for summaries, risk hints, and user story drafts.",
        },
        {
          key: "design",
          icon: "Layout",
          title: "Design & Prototyping",
          description:
            "Create IA, wireframes, and high-fidelity UI/UX. AI as Design Assistant for variations, mood boards, and UX best practices.",
        },
        {
          key: "development",
          icon: "Code2",
          title: "Core Development",
          description:
            "Project setup, scaffolding, core components, API integrations, and data wiring. AI as Pair Programmer for boilerplate and schema suggestions.",
        },
        {
          key: "iteration",
          icon: "Wrench",
          title: "Iteration & Refinement",
          description:
            "Bug fixes, responsiveness, accessibility, and refactoring. AI as Code Reviewer and Problem Solver.",
        },
        {
          key: "testing",
          icon: "SearchCheck",
          title: "Testing & Optimization",
          description:
            "QA, UAT, CWV performance, SEO (meta, structured data). AI as Quality & Performance Engineer.",
        },
        {
          key: "launch",
          icon: "BookOpen",
          title: "Launch & Handover",
          description:
            "Production deploy, monitoring, docs, operational guide, and training. AI as Technical Writer.",
        },
      ],
    },
    techStack: {
      title: "Tech Stack & Experience",
      description:
        "Leveraging modern technologies and AI-powered tools to build exceptional web applications",
      actions: {
        viewWorkflow: "View Workflow",
        viewTechStack: "View Tech Stack",
      },
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        ai: "AI & Tools",
        devops: "DevOps",
        other: "Other",
      },
      highlight: {
        title: "AI-Powered Development Advantage",
        description:
          "By integrating AI tools like LLMs, Cursor IDE, Code Agentic, and advanced prompt engineering, I deliver projects 40% faster while maintaining exceptional code quality and best practices.",
      },
    },
  },
  id: {
    workflow: {
      title: "Alur Kerja Pengembangan Berbantuan AI",
      description:
        "Proses 6 langkah yang jelas dan efisien dari perencanaan hingga peluncuran, memanfaatkan AI untuk kecepatan dan kualitas.",
      list: [
        {
          key: "strategy",
          icon: "Target",
          title: "Strategi & Perencanaan",
          description:
            "Menentukan tujuan, KPI, lingkup, mengumpulkan kebutuhan, riset pasar & alur bisnis. AI sebagai Analis Junior untuk ringkasan, risiko, dan draft user story.",
        },
        {
          key: "design",
          icon: "Layout",
          title: "Desain & Prototyping",
          description:
            "Membuat IA, wireframe, dan UI/UX high fidelity. AI sebagai Asisten Desain untuk variasi, mood board, dan praktik UX terbaik.",
        },
        {
          key: "development",
          icon: "Code2",
          title: "Core Development",
          description:
            "Setup project, scaffolding, komponen inti, integrasi API, dan wiring data. AI sebagai Pair Programmer untuk boilerplate dan saran skema.",
        },
        {
          key: "iteration",
          icon: "Wrench",
          title: "Iterasi & Penyempurnaan",
          description:
            "Perbaikan bug, responsivitas, aksesibilitas, dan refactor. AI sebagai Code Reviewer dan Problem Solver.",
        },
        {
          key: "testing",
          icon: "SearchCheck",
          title: "Testing & Optimasi",
          description:
            "QA, UAT, performa CWV, SEO (meta, structured data). AI sebagai Quality & Performance Engineer.",
        },
        {
          key: "launch",
          icon: "BookOpen",
          title: "Launch & Handover",
          description:
            "Deploy produksi, monitoring, dokumentasi, panduan operasional, dan pelatihan. AI sebagai Technical Writer.",
        },
      ],
    },
    techStack: {
      title: "Tech Stack & Pengalaman",
      description:
        "Memanfaatkan teknologi modern dan tools berbasis AI untuk membangun aplikasi web yang luar biasa",
      actions: {
        viewWorkflow: "Lihat Alur Kerja",
        viewTechStack: "Lihat Tech Stack",
      },
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        ai: "AI & Tools",
        devops: "DevOps",
        other: "Lainnya",
      },
      highlight: {
        title: "Keunggulan Pengembangan Berbantuan AI",
        description:
          "Dengan mengintegrasikan tools AI seperti LLM, Cursor IDE, Code Agentic, dan prompt engineering lanjutan, saya mengirimkan proyek 40% lebih cepat sambil menjaga kualitas kode dan praktik terbaik.",
      },
    },
  },
} as const;

export type TechStackTranslations = typeof techStackTranslations;
