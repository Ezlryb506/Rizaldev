import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { LucideIcon } from 'lucide-react'
import {
  Mail,
  MessageCircle,
  Globe,
  Code2,
  Bot,
  HelpCircle,
  Layers,
  LineChart,
} from 'lucide-react'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website & Optimasi SEO Profesional',
  description:
    'Arizal Winangun membantu bisnis merancang, membangun, dan mengoptimalkan website dengan Next.js, React, dan praktik SEO modern agar mudah ditemukan dan mudah dipelihara.',
  keywords: [
    'jasa pembuatan website profesional',
    'jasa frontend next.js',
    'pengembangan fullstack react',
    'optimasi seo teknis',
    'konsultan pengembangan website',
    'integrasi api',
    'pembuatan landing page cepat',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Layanan Pengembangan Website & SEO — Arizal Winangun',
    description:
      'Website modern berbasis Next.js/React dengan performa tinggi, optimasi SEO teknis, dan otomatisasi berbasis AI.',
    url: `${SITE_URL}/services`,
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Jasa Pembuatan Website — Arizal Winangun' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website — Arizal Winangun',
    description: 'Front-End & Fullstack Developer. Website cepat, aman, dan siap bersaing di mesin pencari.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

type Service = {
  name: string
  summary: string
  keywords: string[]
  highlights: string[]
  icon: LucideIcon
  schemaType: string
}

const services: Service[] = [
  {
    name: 'Pembuatan Website Kustom',
    summary:
      'Website company profile, landing page, atau portal informasi yang ringan diakses, mudah diperbarui, dan siap menerima trafik organik sejak hari pertama.',
    keywords: ['Jasa Pembuatan Website', 'Company Profile', 'Landing Page', 'Next.js'],
    highlights: [
      'Pemetaan tujuan bisnis & struktur konten',
      'Desain responsif dengan fokus keterbacaan',
      'Integrasi CMS atau dashboard internal bila dibutuhkan',
      'Optimasi performa dan Core Web Vitals dari awal',
    ],
    icon: Globe,
    schemaType: 'Custom Web Development',
  },
  {
    name: 'Pengembangan Front-End Modern',
    summary:
      'Implementasi UI React/Next.js yang mematuhi standar aksesibilitas, mudah diuji, dan terasa konsisten di berbagai ukuran layar.',
    keywords: ['Jasa Front-End', 'React', 'Tailwind CSS', 'Design System'],
    highlights: [
      'Membangun design system & komponen reusable',
      'Konversi desain Figma ke antarmuka produksi',
      'Integrasi animasi, state, dan komunikasi API',
      'QA lintas perangkat dan audit aksesibilitas',
    ],
    icon: Layers,
    schemaType: 'Frontend Development',
  },
  {
    name: 'Solusi Fullstack & Integrasi API',
    summary:
      'Pengembangan ujung-ke-ujung dengan Next.js App Router, database, dan integrasi API sehingga alur data tetap stabil dan terdokumentasi.',
    keywords: ['Jasa Fullstack', 'Integrasi API', 'Database', 'Workflow Otomatis'],
    highlights: [
      'Perancangan arsitektur, ERD, dan standar API',
      'Pembuatan REST/GraphQL API dan webhook',
      'Integrasi pembayaran, otentikasi, dan layanan pihak ketiga',
      'Automasi proses bisnis & sinkronisasi data',
    ],
    icon: Code2,
    schemaType: 'Fullstack Development',
  },
  {
    name: 'Optimasi SEO & Automasi Berbasis AI',
    summary:
      'Audit performa, struktur, dan konten; dilanjutkan rekomendasi implementasi serta otomasi ringan berbasis AI agar tim tetap produktif.',
    keywords: ['Optimasi SEO', 'AI-Assisted Development', 'Core Web Vitals', 'Konten Terstruktur'],
    highlights: [
      'Audit SEO teknis beserta daftar prioritas perbaikan',
      'Implementasi metadata, schema markup, dan sitemap',
      'Draft konten dibantu AI lalu disunting manual',
      'Integrasi automasi marketing & monitoring rutin',
    ],
    icon: LineChart,
    schemaType: 'SEO Optimization',
  },
  {
    name: 'Pendampingan Strategi & AI Consulting',
    summary:
      'Sesi konsultasi untuk menyusun roadmap fitur, alur kerja tim, dan penggunaan AI yang realistis agar produk bergerak lebih terarah.',
    keywords: ['Konsultasi Produk', 'Strategi Digital', 'AI Workflow', 'Roadmap Pengembangan'],
    highlights: [
      'Workshop kebutuhan, risiko, dan prioritas',
      'Rekomendasi alat, automasi, dan dokumentasi kerja',
      'Blueprint implementasi beserta estimasi sumber daya',
      'Review berkala dan sesi tanya jawab on-demand',
    ],
    icon: Bot,
    schemaType: 'Consulting Service',
  },
]

const faqs = [
  {
    q: 'Berapa lama pembuatan website?',
    a: 'Landing page sederhana biasanya selesai 3–7 hari kerja. Sistem kustom dengan banyak integrasi memerlukan sekitar 2–6 minggu tergantung kompleksitasnya.',
  },
  {
    q: 'Sejauh apa optimasi SEO yang dilakukan?',
    a: 'Paket dasar meliputi struktur HTML semantik, metadata lengkap, sitemap, robots, schema markup, Core Web Vitals, serta integrasi analytics.',
  },
  {
    q: 'Bagaimana peran AI dalam proses kerja?',
    a: 'AI membantu riset, penulisan draft konten, hingga otomatisasi QA. Seluruh hasil dicek ulang secara manual agar akurat dan tetap sesuai nada brand.',
  },
  {
    q: 'Teknologi yang digunakan?',
    a: 'Stack utama meliputi Next.js, React, TypeScript, Tailwind, Prisma, dan Supabase/PostgreSQL. Integrasi tambahan seperti Midtrans, OpenAI, atau HubSpot bisa disesuaikan kebutuhan.',
  },
]

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'Service',
    position: index + 1,
    name: service.name,
    serviceType: service.schemaType,
    description: service.summary,
    areaServed: { '@type': 'AdministrativeArea', name: 'Indonesia' },
    availableLanguage: ['id', 'en'],
    provider: {
      '@type': 'Person',
      name: 'Arizal Winangun',
      url: SITE_URL,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.highlights.map((highlight) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: highlight,
        },
      })),
    },
    keywords: service.keywords.join(', '),
    url: `${SITE_URL}/services`,
  })),
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Beranda',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Layanan',
      item: `${SITE_URL}/services`,
    },
  ],
}

const email = 'arijalwinangun@gmail.com'
const wa = 'https://wa.me/6288809635936'

export default function ServicesPage() {
  return (
    <section className="container py-12 page-with-sticky-header" id="services">
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <div className="services-hero">
        <h1 className="hero-title">Layanan Pembuatan Website & Optimasi Digital</h1>
        <p className="hero-subtitle">
          Saya mendampingi UKM, startup, hingga organisasi nirlaba membangun produk digital yang ringan, mudah dirawat, dan ramah mesin pencari.
          Teknologi yang dipakai mengutamakan Next.js, React, TypeScript, serta otomasi AI yang diawasi langsung.
        </p>
        <div className="keyword-chips" aria-label="Kata kunci layanan">
          {[
            'Jasa Pembuatan Website',
            'Pengembangan Front-End',
            'Integrasi API',
            'Optimasi SEO',
            'Next.js & React',
            'AI-Assisted Workflow',
            'Core Web Vitals',
            'Konsultasi Digital',
          ].map((keyword) => (
            <span key={keyword} className="keyword-chip">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      <div className="rich-text-block">
        <p>
          Pendekatan kerja saya dimulai dari memahami tujuan bisnis, audiens, dan proses internal Anda.
          Setelah itu barulah solusi teknis dipilih supaya website tidak hanya tampil baik, tetapi juga memiliki pondasi SEO yang kuat.
        </p>
        <p>
          Layanan dapat diambil terpisah atau digabungkan menjadi paket proyek.
          Anda akan menerima proposal yang merinci ruang lingkup, estimasi waktu, dan rekomendasi stack sehingga keputusan dapat dibuat dengan data yang jelas.
        </p>
      </div>

      {/* Services Grid */}
      <div className="tech-grid animate-fade-slide-in mt-10">
        {services.map((service) => (
          <Card key={service.name} className="tech-card category-other">
            <CardContent className="tech-card-content service-card-content">
              <div className="tech-card-header">
                <div className="tech-icon">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="tech-title">{service.name}</h3>
              </div>
              <p className="service-description">{service.summary}</p>
              <div className="service-chip-block">
                {service.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="tech-badge">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <div className="service-features">
                <ul className="features-list">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="feature-item">
                      <div className="feature-dot" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service-cta">
                <a
                  href={`mailto:${email}?subject=Konsultasi%20${encodeURIComponent(service.name)}`}
                  className="project-btn primary inline-flex items-center gap-2"
                  aria-label={`Konsultasi ${service.name} via Email`}
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn secondary inline-flex items-center gap-2"
                  aria-label={`Konsultasi ${service.name} via WhatsApp`}
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div className="section-divider" />
      <div className="faq-section">
        <Card className="tech-card">
          <CardContent className="tech-card-content">
            <div className="tech-card-header">
              <div className="tech-icon">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h2 className="tech-title">FAQ</h2>
            </div>
            <p className="section-description">
              Ringkasan pertanyaan yang sering muncul terkait durasi pengerjaan, dukungan SEO, peran AI, hingga teknologi yang dipakai.
            </p>
            <div className="workflow-grid auto-spotlight animate-fade-slide-in faq-grid">
              {faqs.map((faq) => (
                <Card key={faq.q} className="workflow-card">
                  <CardContent className="workflow-card-content">
                    <h3 className="workflow-title">{faq.q}</h3>
                    <p className="workflow-description">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Block */}
      <div className="projects-cta mt-16">
        <div className="cta-content">
          <h3>Siap mulai proyek?</h3>
          <p>
            Sampaikan kebutuhan dan target bisnis Anda. Saya bantu susun strategi, estimasi, dan langkah eksekusi agar website segera menghasilkan dampak.
          </p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="cta-button inline-flex items-center">
            <MessageCircle className="h-5 w-5" /> Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
