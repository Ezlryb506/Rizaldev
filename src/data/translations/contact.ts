export const contactTranslations = {
  en: {
    contact: {
      title: "Let's Build Something Amazing Together",
      description:
        "Don't know where to start? Contact me via WhatsApp, I'll ask you questions to help you make a decision, then I'll create a proposal and a visual design for your page for free.",
      methods: {
        whatsapp: {
          title: "WhatsApp Consultation",
          description: "Quick response, instant reply",
          action: "Chat Now",
        },
        email: {
          title: "Email Discussion",
          description: "Detailed project requirements",
          action: "Send Email",
        },
      },
      details: {
        location: "Based in Indonesia, Available Worldwide",
        phone: "+62 888 0963 5936",
        email: "arijalwinangun@gmail.com",
      },
      form: {
        title: "Project Details",
        description:
          "Tell me about your project and I'll get back to you with a detailed proposal",
        fields: {
          name: "Full Name *",
          email: "Email Address *",
          company: "Company/Organization",
          budget: "Project Budget",
          timeline: "Project Timeline",
          message: "Project Description *",
        },
        placeholders: {
          name: "Your full name",
          email: "your.email@domain.com",
          company: "Your company name",
          budget: "e.g., $100 - $500",
          timeline: "e.g., 2-3 months, ASAP, Flexible",
          message:
            "- What is the main problem you want to solve?\n- Do you have any reference?\n- What are the mandatory features that you need?",
        },
        actions: {
          send: "Send Message",
          sending: "Sending...",
          whatsapp: "Quick WhatsApp",
          alternative: "or",
        },
        success: {
          title: "Message Sent Successfully!",
          description:
            "Thank you for your interest. I'll get back to you within 24 hours.",
        },
      },
    },
  },
  id: {
    contact: {
      title: "Mari Membangun Sesuatu yang Luar Biasa Bersama",
      description:
        "Belum tahu harus mulai dari mana? Hubungi saya via WhatsApp, saya akan memberikan pertanyaan yang membantu Anda membuat keputusan, kemudian saya akan menyiapkan proposal dan tampilan visual halaman secara gratis.",
      methods: {
        whatsapp: {
          title: "Konsultasi WhatsApp",
          description: "Komunikasi cepat dan langsung",
          action: "Chat Sekarang",
        },
        email: {
          title: "Diskusi Email",
          description: "Kebutuhan proyek yang mendetail",
          action: "Kirim Email",
        },
      },
      details: {
        location: "Berbasis di Indonesia, Tersedia di Seluruh Dunia",
        phone: "+62 888 0963 5936",
        email: "arijalwinangun@gmail.com",
      },
      form: {
        title: "Detail Proyek",
        description:
          "Ceritakan tentang proyek Anda dan saya akan menghubungi Anda dengan proposal detail",
        fields: {
          name: "Nama Lengkap *",
          email: "Alamat Email *",
          company: "Perusahaan/Organisasi",
          budget: "Anggaran Proyek",
          timeline: "Timeline Proyek",
          message: "Deskripsi Proyek *",
        },
        placeholders: {
          name: "Nama lengkap Anda",
          email: "Email.anda@domain.com",
          company: "Nama perusahaan Anda",
          budget: "Mis. Rp. 1 Jt - Rp. 30 Jt",
          timeline: "Mis. 2-3 bulan, SEGERA, Fleksibel",
          message:
            "- Apa masalah utama yang ingin diselesaikan?\n- Kamu punya contoh referensi?\n- Apa fitur wajib yang kamu butuhkan?",
        },
        actions: {
          send: "Kirim Pesan",
          sending: "Mengirim...",
          whatsapp: "WhatsApp Cepat",
          alternative: "atau",
        },
        success: {
          title: "Pesan Berhasil Dikirim!",
          description:
            "Terima kasih atas minat Anda. Saya akan menghubungi Anda dalam 24 jam.",
        },
      },
    },
  },
} as const;

export type ContactTranslations = typeof contactTranslations;
