import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const SITE_URL = process.env.SITE_URL || 'https://nexiuslabs.com';

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('Missing Supabase credentials. Sitemap will include only static routes.');
}

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

async function fetchPublished(table) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(table)
    .select('slug, updated_at, published_at')
    .eq('status', 'published');
  if (error) {
    console.error(`Error fetching ${table}:`, error);
    return [];
  }
  return data || [];
}

async function generate() {
  const [articles, caseStudies, events] = await Promise.all([
    fetchPublished('articles'),
    fetchPublished('case_studies'),
    fetchPublished('events')
  ]);

  const urls = [
    { loc: `${SITE_URL}/`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/blog`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/case-studies`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/links`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/ai-ignite`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/events`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/agent`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/aboutus`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/privacy`, lastmod: formatDate(new Date()) },
    { loc: `${SITE_URL}/terms`, lastmod: formatDate(new Date()) },
    ...articles.map(a => ({
      loc: `${SITE_URL}/blog/${a.slug}`,
      lastmod: formatDate(a.updated_at || a.published_at || new Date())
    })),
    ...caseStudies.map(c => ({
      loc: `${SITE_URL}/case-study/${c.slug}`,
      lastmod: formatDate(c.updated_at || c.published_at || new Date())
    })),
    ...events.map(e => ({
      loc: `${SITE_URL}/event/${e.slug}`,
      lastmod: formatDate(e.updated_at || e.published_at || new Date())
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n') +
    `\n</urlset>\n`;

  const outPath = path.join('public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml);
  console.log(`Sitemap written to ${outPath}`);
}

generate().catch(err => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
