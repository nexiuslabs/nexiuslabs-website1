export default async (request, context) => {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return new Response(JSON.stringify({ error: 'Missing Supabase env on server' }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
      },
    });
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type, authorization',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'access-control-allow-origin': '*' },
    });
  }

  const bodyText = await request.text();

  const upstream = await fetch(`${SUPABASE_URL}/functions/v1/chat-ai`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      // Call as the public client would (anon key). This keeps browser CORS out of the way.
      authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'x-client-info': 'nexiuslabs-webchat-proxy',
    },
    body: bodyText,
  });

  const respText = await upstream.text();
  return new Response(respText, {
    status: upstream.status,
    headers: {
      'content-type': upstream.headers.get('content-type') || 'application/json',
      'access-control-allow-origin': '*',
    },
  });
};
