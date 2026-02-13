import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
// OpenAI client removed: this function now proxies to OpenClaw chat completions.

function extractEmail(text: string): string | null {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : null;
}

function extractName(text: string): string | null {
  const patterns = [
    /(?:my name is|i am|i'm)\s+([a-zA-Z][a-zA-Z\s'-]{1,40})/i,
    /(?:this is)\s+([a-zA-Z][a-zA-Z\s'-]{1,40})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openclawChatUrl = Deno.env.get('OPENCLAW_CHAT_URL');
const openclawGatewayToken = Deno.env.get('OPENCLAW_GATEWAY_TOKEN');
if (!openclawChatUrl || !openclawGatewayToken) {
  throw new Error('OPENCLAW_CHAT_URL or OPENCLAW_GATEWAY_TOKEN not configured');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, sessionId, visitorId } = await req.json();
    const detectedEmail = extractEmail(message || '');
    const detectedName = extractName(message || '');

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Upsert captured visitor details when provided in chat
    if (detectedEmail || detectedName) {
      const patch: Record<string, string> = {};
      if (detectedEmail) patch.visitor_email = detectedEmail;
      if (detectedName) patch.visitor_name = detectedName;

      await supabaseClient
        .from('chat_sessions')
        .update(patch)
        .eq('id', sessionId);
    }

    // Get previous messages for context
    const { data: previousMessages } = await supabaseClient
      .from('chat_messages')
      .select('content, is_from_visitor')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(14);

    // Format messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are Nexius Agent, the AI assistant for Nexius Labs — a Singapore-based company that builds Agentic AI systems (ERP, CRM, and workflow automation) for SMEs.

Your role is to welcome visitors, understand their business needs, and help them see how Nexius Labs can solve real operational challenges with AI automation.

About Nexius Labs:
- We build adaptive, AI-native business systems — ERP, CRM, finance automation, inventory management, and custom workflows
- Our approach: "Describe the outcome you want, and our AI agents execute it"
- Founded by Melverick Ng (30+ years business & tech experience) and Darryl Wong (CPA, 20+ years corporate finance)
- We also run Nexius Academy — SkillsFuture-approved AI training courses
- Website: https://www.nexiuslabs.com
- Book a free discovery call: https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb%40nexiuslabs.com

Communication Guidelines:
- Be professional, warm, and genuinely helpful
- Keep replies concise (under 120 words) unless the visitor asks for more detail
- Ask one focused follow-up question at a time to understand their situation
- When there's a clear fit, suggest booking a free discovery call
- If they share their name or email, acknowledge it warmly and continue the conversation
- If asked about pricing, provide a general range and recommend a discovery call for an accurate quote
- Never fabricate case studies, client names, or guarantees
- If asked something outside your scope, politely offer to connect them with the team
- Use practical, real-world examples relevant to SMEs
- Highlight how AI automation saves time, reduces errors, and scales operations`
      },
      ...(previousMessages?.map(msg => ({
        role: msg.is_from_visitor ? 'user' : 'assistant',
        content: msg.content
      })) || []),
      { role: 'user', content: message }
    ];

    // Get response from OpenClaw chat-completions endpoint (OpenAI-compatible)
    const ocResp = await fetch(openclawChatUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openclawGatewayToken}`,
        'Content-Type': 'application/json',
        'x-openclaw-agent-id': 'main'
      },
      body: JSON.stringify({
        model: 'openclaw:main',
        user: `webchat:${visitorId}`,
        messages,
        stream: false,
        temperature: 0.4,
        max_tokens: 450
      })
    });

    if (!ocResp.ok) {
      const errText = await ocResp.text();
      throw new Error(`OpenClaw chat error: ${ocResp.status} ${errText}`);
    }

    const ocJson = await ocResp.json();
    const aiResponse = ocJson?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenClaw');
    }

    // Save AI response to database
    const { data: savedMessage, error: saveError } = await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        visitor_id: visitorId,
        content: aiResponse,
        is_from_visitor: false,
        read: false
      })
      .select()
      .single();

    if (saveError) throw saveError;

    await supabaseClient
      .from('chat_sessions')
      .update({ last_message_at: new Date().toISOString(), status: 'active' })
      .eq('id', sessionId);

    return new Response(
      JSON.stringify({ message: savedMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
