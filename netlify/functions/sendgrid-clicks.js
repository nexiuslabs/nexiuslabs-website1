// Netlify Function (CJS): Receive SendGrid Event Webhook (clicks only for now)
// Endpoint: /.netlify/functions/sendgrid-clicks

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
      payload = raw;
    }

    const events = Array.isArray(payload) ? payload : [payload];
    const clicks = events.filter((e) => e && e.event === 'click');

    if (clicks.length) {
      const compact = clicks.map((e) => ({
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
    return { statusCode: 200, body: 'ok' };
  }
};
