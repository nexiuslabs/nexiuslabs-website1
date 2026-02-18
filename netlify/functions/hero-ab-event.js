// Netlify Function: capture hero A/B test events
// Endpoint: /.netlify/functions/hero-ab-event
// Purpose: minimal logging for hero variant impressions + clicks.

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

    // Keep logs compact (no PII). Rely on analytics IDs if needed later.
    const safe = {
      t: new Date().toISOString(),
      event: payload?.event,
      variant: payload?.variant,
      path: payload?.path,
      ref: payload?.ref,
      cta: payload?.cta,
      sessionId: payload?.sessionId,
      ua: event.headers['user-agent'] || event.headers['User-Agent'],
    };

    console.log('[hero-ab-event]', JSON.stringify(safe));

    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.log('[hero-ab-event] error:', err && (err.stack || err.message || String(err)));
    return { statusCode: 200, body: 'ok' };
  }
};
