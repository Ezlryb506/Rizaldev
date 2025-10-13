import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, MessageCircle, Globe, Code2, Bot, HelpCircle } from 'lucide-react'


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website, Front-End & Fullstack',
  description:
    'Jasa pembuatan website modern (Next.js/React), Front-End dan Fullstack. SEO-friendly, cepat, dan dibantu AI untuk hasil lebih efektif.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Jasa Pembuatan Website, Front-End & Fullstack',
    description:
      'Website modern berbasis Next.js/React. Layanan Front-End, Fullstack, dan pembuatan website dengan bantuan AI.',
    url: `${SITE_URL}/services`,
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Jasa Pembuatan Website — Arizal Winangun' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website — Arizal Winangun',
    description: 'Front-End & Fullstack Developer. Website cepat dan SEO-friendly.',
    images: ['/og-image.jpg'],
  },
}

export default function ServicesPage() {
  const services = [
    {
      name: 'Jasa Pembuatan Website',
      keywords: [
        'Jasa Pembuatan Website',
        'Jasa Buat Website',
        'Jasa Buat Halaman Web',
        'Company Profile',
        'Landing Page',
      ],
    },
    {
      name: 'Jasa Front-End',
      keywords: ['Jasa Front-End', 'React', 'Next.js', 'Tailwind', 'TypeScript'],
    },
    {
      name: 'Jasa Fullstack',
      keywords: ['Jasa Fullstack', 'Next.js', 'API', 'Database'],
    },
    {
      name: 'Jasa Pembuatan Website dengan AI',
      keywords: ['AI', 'AI-assisted', 'Automations', 'Prompt Engineering'],
    },
  ]

  const faqs = [
    {
      q: 'Berapa lama pembuatan website?',
      a: 'Landing page biasanya 3–7 hari kerja. Proyek custom bergantung pada fitur (umumnya 2–4 minggu).',
    },
    {
      q: 'Apakah mendukung SEO?',
      a: 'Ya. Struktur HTML, metadata, sitemap/robots, performa, dan schema.org dioptimalkan sejak awal.',
    },
    {
      q: 'Bisakah pakai AI untuk mempercepat?',
      a: 'Bisa. Proses menggunakan workflow berbantuan AI untuk konten awal, komponen UI, dan otomatisasi yang aman.',
    },
    {
      q: 'Teknologi yang digunakan?',
      a: 'Next.js, React, TypeScript, Tailwind, dan integrasi API/database sesuai kebutuhan.',
    },
  ]

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'Service',
      position: i + 1,
      name: s.name,
      description:
        'Layanan pengembangan web profesional oleh Arizal Winangun. Cepat, SEO-friendly, modern stack.',
      areaServed: { '@type': 'Country', name: 'ID' },
      availableLanguage: ['id', 'en'],
      provider: {
        '@type': 'Person',
        name: 'Arizal Winangun',
        url: SITE_URL,
      },
      keywords: s.keywords.join(', '),
      url: `${SITE_URL}/services`,
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const email = 'arijalwinangun@gmail.com'
  const wa = 'https://wa.me/6288809635936'

  return (
    <section className="container py-12 page-with-sticky-header" id="services">
      {/* Hero */}
      <div className="services-hero">
        <h1 className="hero-title">Layanan</h1>
        <p className="hero-subtitle">Jasa Pembuatan Website, Front-End, dan Fullstack dengan Next.js/React. Fokus pada performa, SEO, dan pengalaman pengguna.</p>
        <div className="keyword-chips" aria-label="Kata kunci layanan">
          {[
            'Jasa Pembuatan Website',
            'Jasa Front-End',
            'Jasa Fullstack',
            'Next.js',
            'React',
            'TypeScript',
            'SEO',
            'AI-Assisted Development',
          ].map((k) => (
            <span key={k} className="keyword-chip">{k}</span>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Services Grid */}
      <div className="tech-grid animate-fade-slide-in mt-8">
        {services.map((s, i) => {
          const Icon = [Globe, Code2, Globe, Bot][i % 4]
          return (
            <Card key={i} className="tech-card category-other">
              <CardContent className="tech-card-content service-card-content">
                <div className="tech-card-header">
                  <div className="tech-icon"><Icon className="h-6 w-6" /></div>
                  <h3 className="tech-title">{s.name}</h3>
                </div>
                <div className="service-chip-block">
                  {s.keywords.map((k) => (
                    <Badge key={k} variant="secondary" className="tech-badge">{k}</Badge>
                  ))}
                </div>
                <div className="service-cta">
                  <a href={`mailto:${email}?subject=Konsultasi%20${encodeURIComponent(s.name)}`} className="project-btn primary inline-flex items-center gap-2" aria-label={`Konsultasi ${s.name} via Email`}>
                    <Mail className="h-4 w-4" /> Email
                  </a>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="project-btn secondary inline-flex items-center gap-2" aria-label={`Konsultasi ${s.name} via WhatsApp`}>
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* FAQ */}
      <div className="section-divider" />
      <div className="faq-section">
        <Card className="tech-card">
          <CardContent className="tech-card-content">
            <div className="tech-card-header">
              <div className="tech-icon"><HelpCircle className="h-6 w-6" /></div>
              <h2 className="tech-title">FAQ</h2>
            </div>
            <p className="section-description">Pertanyaan umum seputar durasi, SEO, penggunaan AI, dan teknologi.</p>
            <div className="workflow-grid auto-spotlight animate-fade-slide-in faq-grid">
              {faqs.map((f, idx) => (
                <Card key={idx} className="workflow-card">
                  <CardContent className="workflow-card-content">
                    <h3 className="workflow-title">{f.q}</h3>
                    <p className="workflow-description">{f.a}</p>
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
          <p>Diskusikan kebutuhan Anda. Saya bantu wujudkan website cepat, SEO-friendly, dan mudah dikelola.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="cta-button inline-flex items-center">
            <MessageCircle className="h-5 w-5" /> Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
