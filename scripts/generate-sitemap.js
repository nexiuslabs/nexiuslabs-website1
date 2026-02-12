import { createClient } from '@supabase/supabase-js';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE_URL = process.env.SITE_URL || 'https://nexiuslabs.com';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('Missing Supabase credentials. Generating sitemap with static routes only.');
}

const formatDate = (date) => new Date(date).toISOString().split('T')[0];

async function fetchPublishedRoutes() {
  if (!supabase) {
    return { articles: [], caseStudies: [], events: [] };
  }

  try {
    const [articlesRes, caseStudiesRes, eventsRes] = await Promise.all([
      supabase.from('articles').select('slug, updated_at').eq('status', 'published'),
      supabase.from('case_studies').select('slug, updated_at').eq('status', 'published'),
      supabase.from('events').select('slug, updated_at').eq('status', 'published'),
    ]);

    return {
      articles: articlesRes.data || [],
      caseStudies: caseStudiesRes.data || [],
      events: eventsRes.data || [],
    };
  } catch (error) {
    console.error('Failed to fetch routes from Supabase:', error);
    return { articles: [], caseStudies: [], events: [] };
  }
}

function buildUrl(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function generate() {
  const { articles, caseStudies, events } = await fetchPublishedRoutes();

  const urls = [];
  const today = formatDate(new Date());

  // Static pages
  urls.push(buildUrl(`${SITE_URL}/`, today, 'weekly', '1.0'));
  urls.push(buildUrl(`${SITE_URL}/blog`, today, 'weekly', '0.8'));
  urls.push(buildUrl(`${SITE_URL}/case-studies`, today, 'weekly', '0.8'));
  urls.push(buildUrl(`${SITE_URL}/events`, today, 'weekly', '0.8'));

  // Dynamic content
  for (const article of articles) {
    urls.push(buildUrl(`${SITE_URL}/blog/${article.slug}`, formatDate(article.updated_at), 'monthly', '0.7'));
  }

  for (const cs of caseStudies) {
    urls.push(buildUrl(`${SITE_URL}/case-study/${cs.slug}`, formatDate(cs.updated_at), 'monthly', '0.7'));
  }

  for (const event of events) {
    urls.push(buildUrl(`${SITE_URL}/events/${event.slug}`, formatDate(event.updated_at), 'monthly', '0.6'));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

  await writeFile(sitemapPath, xml, 'utf8');
  console.log(`Sitemap written to ${sitemapPath}`);
}

generate();

