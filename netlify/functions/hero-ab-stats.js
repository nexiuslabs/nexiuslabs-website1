// Netlify Function: Hero A/B test stats
// Endpoint: /.netlify/functions/hero-ab-stats
// Requires env:
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY

const getSupabaseClient = async () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');

  const mod = await import('@supabase/supabase-js');
  return mod.createClient(url, key, { auth: { persistSession: false } });
};

export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const days = Math.max(1, Math.min(90, Number(event.queryStringParameters?.days || 14)));
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const supabase = await getSupabaseClient();

    const { data, error } = await supabase
      .from('hero_ab_events')
      .select('event,variant,cta,created_at')
      .gte('created_at', since);

    if (error) throw error;

    const rows = data || [];
    const variants = ['A', 'B', 'C'];

    const counts = {};
    for (const v of variants) {
      counts[v] = {
        views: 0,
        clicks: 0,
        clicksByCta: {},
      };
    }

    for (const r of rows) {
      const v = r.variant;
      if (!variants.includes(v)) continue;

      if (r.event === 'hero_variant_view') counts[v].views += 1;
      if (r.event === 'hero_cta_click') {
        counts[v].clicks += 1;
        const cta = r.cta || 'unknown';
        counts[v].clicksByCta[cta] = (counts[v].clicksByCta[cta] || 0) + 1;
      }
    }

    const result = {
      days,
      since,
      totals: {
        rows: rows.length,
        views: variants.reduce((a, v) => a + counts[v].views, 0),
        clicks: variants.reduce((a, v) => a + counts[v].clicks, 0),
      },
      variants: variants.map((v) => ({
        variant: v,
        views: counts[v].views,
        clicks: counts[v].clicks,
        ctr: counts[v].views ? counts[v].clicks / counts[v].views : 0,
        clicksByCta: counts[v].clicksByCta,
      })),
    };

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: false, error: err?.message || String(err) }),
    };
  }
};
