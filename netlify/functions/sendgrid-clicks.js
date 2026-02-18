// Netlify Function: Receive SendGrid Event Webhook (clicks only for now)
// Endpoint: /.netlify/functions/sendgrid-clicks
// NOTE: Minimal implementation logs events to Netlify function logs.

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const contentType = (event.headers['content-type'] || event.headers['Content-Type'] || '').toLowerCase();
    const raw = event.body || '';

    let payload = null;
    if (contentType.includes('application/json')) {
      payload = JSON.parse(raw || '[]');
    } else {
      // SendGrid usually sends JSON, but keep a fallback
      payload = raw;
    }

    // SendGrid sends an array of event objects
    const events = Array.isArray(payload) ? payload : [payload];

    // Filter click events only
    const clicks = events.filter(e => e && e.event === 'click');

    if (clicks.length) {
      // Log compactly (avoid dumping huge payloads)
      const compact = clicks.map(e => ({
        event: e.event,
        email: e.email,
        url: e.url,
        timestamp: e.timestamp,
        sg_message_id: e.sg_message_id,
        custom_args: e.custom_args,
        category: e.category,
      }));
      console.log('[sendgrid-clicks] clicks:', JSON.stringify(compact));
    }

    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.log('[sendgrid-clicks] error:', err && (err.stack || err.message || String(err)));
    return { statusCode: 200, body: 'ok' }; // Respond 200 to avoid webhook retries storm
  }
};
