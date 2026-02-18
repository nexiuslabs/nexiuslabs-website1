// Netlify Function (CJS): capture hero A/B test events → Supabase
// Endpoint: /.netlify/functions/hero-ab-event
// Required env:
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY

async function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const mod = await import('@supabase/supabase-js');
  return mod.createClient(url, key, { auth: { persistSession: false } });
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const contentType = (event.headers['content-type'] || event.headers['Content-Type'] || '').toLowerCase();
    const raw = event.body || '';
    let payload = null;

    if (contentType.includes('application/json')) {
      payload = JSON.parse(raw || '{}');
    } else {
      payload = { raw };
    }

    const safe = {
      event: payload?.event,
      variant: payload?.variant,
      cta: payload?.cta,
      path: payload?.path,
      ref: payload?.ref,
      session_id: payload?.sessionId,
      user_agent: event.headers['user-agent'] || event.headers['User-Agent'],
    };

    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('hero_ab_events').insert([
        {
          event: safe.event,
          variant: safe.variant,
          cta: safe.cta,
          path: safe.path,
          ref: safe.ref,
          session_id: safe.session_id,
          user_agent: safe.user_agent,
        },
      ]);
      if (error) console.log('[hero-ab-event] supabase_insert_error:', error);
    } else {
      console.log('[hero-ab-event] supabase not configured (missing env vars).');
    }

    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.log('[hero-ab-event] error:', err && (err.stack || err.message || String(err)));
    return { statusCode: 200, body: 'ok' };
  }
};
