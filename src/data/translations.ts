// Translation data for English and Indonesian
export const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      projects: 'Projects',
      services: 'Services',
      contact: 'Contact'
    },
    
    // Hero Section
    hero: {
      greeting: "Hello, I'm",
      name: 'Arizal',
      role: 'Fullstack Developer',
      specialization: 'Specializing in',
      aiWorkflows: 'AI-Assisted Workflows',
      description: 'Leveraging AI-assisted workflows to architect, build, and deploy high-performance web applications with superior speed and quality. I combine cutting-edge technology with proven development practices to deliver exceptional digital solutions.',
      stats: {
        experience: 'Years Experience',
        projects: 'Projects Completed',
        satisfaction: 'Client Satisfaction'
      },
      cta: {
        consultation: 'Schedule Free Consultation',
        download: 'Download CV'
      }
    },
    
    // Tech Stack Section
    techStack: {
      title: 'Tech Stack & Expertise',
      description: 'Leveraging modern technologies and AI-powered tools to build exceptional web applications',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        ai: 'AI & Tools',
        devops: 'DevOps',
        other: 'Other'
      },
      highlight: {
        title: 'AI-Powered Development Advantage',
        description: 'By integrating AI tools like LLMs, Cursor IDE, Code Agentic, and advanced prompt engineering, I deliver projects 40% faster while maintaining exceptional code quality and best practices.'
      }
    },
    
    // Projects Section
    projects: {
      title: 'Featured Projects',
      description: 'Showcasing real-world applications built with modern technologies and AI-assisted workflows',
      status: {
        exam: 'Final Exam Project',
        live: 'Live Project',
        completed: 'Completed'
      },
      features: 'Key Features:',
      controls: {
        showMore: 'Show more',
        showLess: 'Show less',
      },
      actions: {
        viewLive: 'View Live',
        code: 'Code'
      },
      cta: {
        title: 'Interested in seeing more projects?',
        description: 'I have additional projects and case studies available upon request',
        button: 'View All Projects'
      },
      list: {
        quicktix: {
          title: 'QuickTix – Modern Ticketing Platform',
          status: 'exam',
          description: 'A ticketing platform with secure checkout, event management, and real-time updates.',
          features: [
            'Admin Dashboard',
            'User Dashboard',
            'Events Search',
            'Events Management',
            'Mobile Responsive',
            'Role-based access',
            'Real-time updates',
            'QR Code & Print Ticket',
            'Encrypted QR Code',
            'Deployed on CPanel',
          ],
        },
        abadiJaya: {
          title: 'Abadi Jaya – Company Profile Website',
          status: 'Completed',
          description: 'A fast, SEO-friendly company profile with products catalog, services, portfolio, and usefull dashboard pages',
          features: [
            'Helpfull Admin & User Dashboard',
            'Products Catalog',
            'Products & Services Management',
            'Contact and Address Map',
            'Services Review System',
            'SEO optimized pages',
            'Products & Services Search',
            'Mobile Responsive',
            'Data & Image Storage on Supabase',
            'Deployed on Vercel (CI/CD)',
          ],
        },
      },
    },
    
    // Services Section
    services: {
      title: 'Services Offered',
      description: 'Comprehensive web development services powered by AI-assisted workflows for faster delivery and superior quality',
      list: {
        webDev: {
          title: 'Custom Web App Development',
          description: 'Full-stack web applications tailored to your business needs, built with modern technologies and AI-assisted development workflows.',
          features: ['Custom functionality', 'Scalable architecture', 'Modern UI/UX', 'Mobile responsive'],
          pricing: 'Starting from $100',
          timeline: '1-8 weeks'
        },
        frontend: {
          title: 'High-Speed Frontend & Landing Pages',
          description: 'Lightning-fast, conversion-optimized landing pages and frontends that engage users and drive business results.',
          features: ['Performance optimized', 'SEO friendly', 'Conversion focused', 'A/B test ready'],
          pricing: 'Starting from $10',
          timeline: '1-3 weeks'
        },
        integration: {
          title: 'API & System Integration',
          description: 'Seamlessly connect your existing systems, third-party services, and databases for improved workflow efficiency.',
          features: ['RESTful APIs', 'Database integration', 'Third-party services', 'Data synchronization'],
          pricing: 'Starting from $100',
          timeline: '1-4 weeks'
        },
        consultation: {
          title: 'AI Strategy Consultation',
          description: 'Strategic guidance on implementing AI tools and workflows to accelerate your development process and business operations.',
          features: ['Workflow analysis', 'AI tool recommendation', 'Implementation strategy', 'Technical Support'],
          pricing: 'Starting from $5/hour',
          timeline: 'Flexible'
        }
      },
      advantages: {
        title: 'Why Choose AI-Assisted Development?',
        list: {
          speed: {
            title: '40% Faster Delivery',
            description: 'AI-assisted workflows enable rapid development without compromising quality'
          },
          quality: {
            title: 'Enterprise Quality',
            description: 'Proven practices ensure scalable, maintainable, and secure solutions'
          },
          innovation: {
            title: 'Innovation Focus',
            description: 'Latest technologies and best practices integrated into every project'
          },
          growth: {
            title: 'Business Growth',
            description: 'Solutions designed to scale with your business and drive measurable results'
          }
        }
      }
    },
    
    // Contact Section
    contact: {
      title: "Let's Build Something Amazing Together",
      description: "Ready to accelerate your web development project with AI-assisted workflows? Let's discuss your requirements and explore how I can help your business website grow.",
      methods: {
        whatsapp: {
          title: 'WhatsApp Consultation',
          description: 'Quick response, instant communication',
          action: 'Chat Now'
        },
        email: {
          title: 'Email Discussion',
          description: 'Detailed project requirements',
          action: 'Send Email'
        }
      },
      details: {
        location: 'Based in Indonesia, Available Worldwide',
        phone: '+62 888 0963 5936',
        email: 'arijalwinangun@gmail.com'
      },
      form: {
        title: 'Project Details',
        description: "Tell me about your project and I'll get back to you with a detailed proposal",
        fields: {
          name: 'Full Name *',
          email: 'Email Address *',
          company: 'Company/Organization',
          budget: 'Project Budget',
          timeline: 'Project Timeline',
          message: 'Project Description *'
        },
        placeholders: {
          name: 'Your full name',
          email: 'your.email@company.com',
          company: 'Your company name',
          budget: 'e.g., $100 - $500',
          timeline: 'e.g., 2-3 months, ASAP, Flexible',
          message: 'Describe your project requirements, goals, and any specific features you need...'
        },
        actions: {
          send: 'Send Message',
          sending: 'Sending...', 
          whatsapp: 'Quick WhatsApp',
          alternative: 'or'
        },
        success: {
          title: 'Message Sent Successfully!',
          description: "Thank you for your interest. I'll get back to you within 24 hours."
        }
      }
    },
    
    // Footer
    footer: {
      brand: {
        tagline: 'Fullstack Developer specializing in AI-Assisted Workflows',
        description: 'Building exceptional web applications with cutting-edge technology and proven development practices. Available for freelance projects and technical consultations worldwide.'
      },
      links: {
        quickLinks: 'Quick Links',
        services: 'Services',
        contact: 'Get In Touch'
      },
      servicesList: [
        'Custom Web Development',
        'Frontend & Landing Pages',
        'API Integration',
        'AI Consultation'
      ],
      availability: 'Available for new projects',
      copyright: 'All rights reserved.',
      builtWith: 'Built with React, AI-assistance, and lots of coffee ☕',
      backToTop: 'Back to top'
    }
  },
  
  id: {
    // Navigation
    nav: {
      about: 'Tentang',
      projects: 'Proyek',
      services: 'Layanan',
      contact: 'Kontak'
    },
    
    // Hero Section
    hero: {
      greeting: 'Halo, Saya',
      name: 'Arizal Winangun',
      role: 'Fullstack Developer',
      specialization: 'Spesialisasi dalam',
      aiWorkflows: 'Alur Kerja Berbasis AI',
      description: 'Memanfaatkan alur kerja berbasis AI untuk merancang, membangun, dan menciptakan aplikasi web berkinerja tinggi dengan kecepatan dan kualitas superior. Saya menggabungkan teknologi mutakhir dengan praktik pengembangan terbaru untuk memberikan solusi digital yang lebih baik.',
      stats: {
        experience: 'Tahun Pengalaman',
        projects: 'Proyek Selesai',
        satisfaction: 'Kepuasan Klien'
      },
      cta: {
        consultation: 'Jadwalkan Konsultasi Gratis',
        download: 'Unduh CV'
      }
    },
    
    // Tech Stack Section
    techStack: {
      title: 'Tech Stack & Keahlian',
      description: 'Memanfaatkan teknologi modern dan alat bertenaga AI untuk membangun aplikasi web yang lebih baik',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        ai: 'AI & Alat',
        devops: 'DevOps',
        other: 'Lainnya'
      },
      highlight: {
        title: 'Keunggulan Pengembangan Bertenaga AI',
        description: 'Dengan mengintegrasikan alat AI seperti LLMs, Cursor IDE, Code Agent, dan rekayasa prompt tingkat lanjut, saya dapat menyelesaikan proyek 40% lebih cepat sambil mempertahankan kualitas kode yang profesional dan praktik terbaik.'
      }
    },
    
    // Projects Section
    projects: {
      title: 'Proyek Unggulan',
      description: 'Menampilkan aplikasi dunia nyata yang dibangun dengan teknologi modern dan alur kerja berbantuan AI',
      status: {
        exam: 'Proyek Ujian Akhir',
        live: 'Proyek Live',
        completed: 'Selesai'
      },
      features: 'Fitur Utama:',
      controls: {
        showMore: 'Tampilkan semua',
        showLess: 'Sembunyikan',
      },
      actions: {
        viewLive: 'Lihat Live',
        code: 'Kode'
      },
      cta: {
        title: 'Tertarik melihat lebih banyak proyek?',
        description: 'Saya memiliki proyek dan studi kasus tambahan yang tersedia atas permintaan',
        button: 'Lihat Semua Proyek'
      },
      list: {
        quicktix: {
          title: 'QuickTix – Platform Tiketing Modern',
          status: 'Completed',
          description: 'Platform tiket dengan pencarian event, manajemen event, dan pembaruan real-time.',
          features: [
            'Dashboard Admin Informatif & Interaktif',
            'Dashboard User Informatif & Interaktif',
            'Pencarian Event',
            'Manajemen Event',
            'Mobile Responsif',
            'Akses berbasis Role',
            'Pembaruan Real-Time',
            'QR Code & Cetak Tiket',
            'Enkripsi QR Code',
            'Deploy di CPanel',
          ],
        },
        abadiJaya: {
          title: 'Abadi Jaya – Website Company Profile',
          status: 'Completed',
          description: 'Profil perusahaan yang cepat, SEO-Optimal, dengan halaman katalog produk, jasa, portofolio dan halaman dashboard yang membantu proses bisnis.',
          features: [
            'Dashboard yang Membantu Proses Bisnis',
            'Katalog Produk',
            'Manajemen Produk & Jasa',
            'Peta Alamat & Kontak',
            'Sistem Review Jasa',
            'Halaman Optimal SEO (Programatic SEO)',
            'Pencarian Produk & Layanan',
            'Mobile Responsif',
            'Penyimpanan Data & Gambar di Supabase',
            'Deploy di Vercel (CI/CD)',
          ],
        },
      },
    },
    
    // Services Section
    services: {
      title: 'Layanan yang Ditawarkan',
      description: 'Layanan pengembangan web komprehensif yang didukung oleh alur kerja berbantuan AI untuk pengiriman lebih cepat dan kualitas superior',
      list: {
        webDev: {
          title: 'Pengembangan Aplikasi Web Kustom',
          description: 'Aplikasi web full-stack yang disesuaikan dengan kebutuhan bisnis Anda, dibangun dengan teknologi modern dan alur kerja pengembangan berbantuan AI.',
          features: ['Fungsionalitas kustom', 'Arsitektur skalabel', 'UI/UX modern', 'Responsif mobile'],
          pricing: 'Mulai dari Rp. 1.5 Jt',
          timeline: '1-8 minggu'
        },
        frontend: {
          title: 'Frontend & Landing Page Berkecepatan Tinggi',
          description: 'Landing page dan frontend yang sangat cepat dan dioptimalkan untuk konversi yang menarik pengguna dan mendorong hasil bisnis.',
          features: ['Dioptimalkan performa', 'SEO friendly', 'Fokus konversi', 'Siap A/B test'],
          pricing: 'Mulai dari Rp. 300k',
          timeline: '1-3 minggu'
        },
        integration: {
          title: 'Integrasi API & Sistem',
          description: 'Menghubungkan dengan mulus sistem yang ada, layanan pihak ketiga, dan database untuk meningkatkan efisiensi alur kerja.',
          features: ['RESTful APIs', 'Integrasi database', 'Layanan pihak ketiga', 'Sinkronisasi data'],
          pricing: 'Mulai dari Rp. 1.5 Jt',
          timeline: '1-4 minggu'
        },
        consultation: {
          title: 'Konsultasi Strategi AI',
          description: 'Panduan strategis tentang penerapan alat dan alur kerja AI untuk mempercepat proses pengembangan dan operasi bisnis Anda.',
          features: ['Analisis alur kerja', 'Rekomendasi alat AI', 'Strategi implementasi', 'Pelatihan & dukungan'],
          pricing: 'Mulai dari Rp. 75k /jam',
          timeline: 'Fleksibel'
        }
      },
      advantages: {
        title: 'Mengapa Memilih Pengembangan Berbantuan AI?',
        list: {
          speed: {
            title: '40% Pengiriman Lebih Cepat',
            description: 'Alur kerja berbantuan AI memungkinkan pengembangan yang cepat tanpa mengorbankan kualitas'
          },
          quality: {
            title: 'Kualitas Enterprise',
            description: 'Praktik dapat memastikan solusi yang skalabel, dapat dipelihara, dan aman'
          },
          innovation: {
            title: 'Fokus Inovasi',
            description: 'Teknologi terbaru dan praktik terbaik terintegrasi dalam setiap proyek'
          },
          growth: {
            title: 'Pertumbuhan Bisnis',
            description: 'Solusi dirancang untuk berkembang dengan bisnis Anda dan mendorong hasil yang terukur'
          }
        }
      }
    },
    
    // Contact Section
    contact: {
      title: 'Mari Membangun Sesuatu yang Luar Biasa Bersama',
      description: 'Siap mempercepat proyek pengembangan web Anda dengan alur kerja berbantuan AI? Mari diskusikan kebutuhan Anda dan berdiskusi tentang bagaimana saya dapat membantu website bisnis Anda berkembang.',
      methods: {
        whatsapp: {
          title: 'Konsultasi WhatsApp',
          description: 'Respon cepat, komunikasi instan',
          action: 'Chat Sekarang'
        },
        email: {
          title: 'Diskusi Email',
          description: 'Persyaratan proyek detail',
          action: 'Kirim Email'
        }
      },
      details: {
        location: 'Berbasis di Indonesia, Tersedia di Seluruh Dunia',
        phone: '+62 888 0963 5936',
        email: 'arijalwinangun@gmail.com'
      },
      form: {
        title: 'Detail Proyek',
        description: "Ceritakan tentang proyek Anda dan saya akan menghubungi Anda dengan proposal detail",
        fields: {
          name: 'Nama Lengkap *',
          email: 'Alamat Email *',
          company: 'Perusahaan/Organisasi',
          budget: 'Anggaran Proyek',
          timeline: 'Timeline Proyek',
          message: 'Deskripsi Proyek *'
        },
        placeholders: {
          name: 'Nama lengkap Anda',
          email: 'email.anda@perusahaan.com',
          company: 'Nama perusahaan Anda',
          budget: 'misal, Rp. 1.5 Jt - Rp. 8 Jt',
          timeline: 'misal, 2-3 bulan, SEGERA, Fleksibel',
          message: 'Jelaskan persyaratan proyek, tujuan, dan fitur spesifik yang Anda butuhkan...'
        },
        actions: {
          send: 'Kirim Pesan',
          sending: 'Mengirim...', 
          whatsapp: 'WhatsApp Cepat',
          alternative: 'atau'
        },
        success: {
          title: 'Pesan Berhasil Dikirim!',
          description: 'Terima kasih atas minat Anda. Saya akan menghubungi Anda dalam 24 jam.'
        }
      }
    },
    
    // Footer
    footer: {
      brand: {
        tagline: 'Fullstack Developer yang berspesialisasi dalam Alur Kerja Berbantuan AI',
        description: 'Membangun aplikasi web yang luar biasa dengan teknologi mutakhir dan praktik pengembangan terbukti. Tersedia untuk proyek freelance dan konsultasi teknis di seluruh dunia.'
      },
      links: {
        quickLinks: 'Tautan Cepat',
        services: 'Layanan',
        contact: 'Hubungi Saya'
      },
      servicesList: [
        'Pengembangan Web Kustom',
        'Frontend & Landing Page',
        'Integrasi API',
        'Konsultasi AI'
      ],
      availability: 'Tersedia untuk proyek baru',
      copyright: 'Semua hak dilindungi.',
      builtWith: 'Dibangun dengan React, bantuan AI, dan banyak kopi ☕',
      backToTop: 'Kembali ke atas'
    }
  }
};
