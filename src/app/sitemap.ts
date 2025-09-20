import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  // Extend this list if you later add localized routes like /en and /id
  const routes = [''];

  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}/${path}`.replace(/\/+$/, '/'),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
