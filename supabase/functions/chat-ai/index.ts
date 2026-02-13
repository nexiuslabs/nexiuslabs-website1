import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

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

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') || '';
const TELEGRAM_CHAT_ID = '1037337205'; // Melverick

async function sendTelegramNotification(sessionId: string, customerMessage: string, site: string) {
  if (!TELEGRAM_BOT_TOKEN) return;
  const safeMsg = customerMessage.substring(0, 500).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const text = `🔔 <b>Customer needs help</b> (${site})\n\nSession: <code>${sessionId}</code>\nMessage: ${safeMsg}\n\nReply with:\n<code>/reply ${site}:${sessionId} Your message here</code>`;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });
  } catch (e) {
    console.error('Telegram notification error:', e);
  }
}

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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Upsert captured visitor details
    if (detectedEmail || detectedName) {
      const patch: Record<string, string> = {};
      if (detectedEmail) patch.visitor_email = detectedEmail;
      if (detectedName) patch.visitor_name = detectedName;
      await supabaseClient.from('chat_sessions').update(patch).eq('id', sessionId);
    }

    // Check if session is in human handoff mode
    const { data: session } = await supabaseClient
      .from('chat_sessions')
      .select('handoff_active')
      .eq('id', sessionId)
      .single();

    if (session?.handoff_active) {
      // Session is in handoff mode — forward message to Telegram, don't call AI
      await sendTelegramNotification(sessionId, message, 'main');

      // Save a system message so customer knows we got it
      const waitMsg = "Your message has been forwarded to our team. They'll respond shortly — please stay on this chat.";
      const { data: savedMessage, error: saveError } = await supabaseClient
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          visitor_id: visitorId,
          content: waitMsg,
          is_from_visitor: false,
          read: false,
        })
        .select()
        .single();

      if (saveError) throw saveError;

      return new Response(
        JSON.stringify({ message: savedMessage }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Get previous messages for context
    const { data: previousMessages } = await supabaseClient
      .from('chat_messages')
      .select('content, is_from_visitor')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(14);

    const messages = [
      {
        role: 'system',
        content: `You are Nexius Agent, the AI assistant for Nexius Labs — a Singapore-based company that builds Agentic AI systems (ERP, CRM, and workflow automation) for SMEs.

Your role is to welcome visitors, understand their business needs, and help them see how Nexius Labs can solve real operational challenges with AI automation.

About Nexius Labs:
- We build adaptive, AI-native business systems — ERP, CRM, finance automation, inventory management, and custom workflows
- Our approach: "Describe the outcome you want, and our AI agents execute it"
- Founded by Melverick Ng (30+ years business & technology experience) and Darryl Wong (CPA, 20+ years corporate finance)
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
- Highlight how AI automation saves time, reduces errors, and scales operations

ESCALATION RULES:
If the customer asks something you genuinely cannot answer (e.g. very specific pricing, custom project scoping, contract terms, partnership requests, complaints, or technical issues with our products), respond helpfully but include the exact marker [ESCALATE] at the very end of your message (after your response text). This marker will NOT be shown to the customer — it triggers a handoff to a human team member.
Examples of when to escalate:
- Specific project quotes or custom pricing
- Technical support for existing customers
- Partnership or reseller inquiries
- Complaints or dissatisfaction
- Requests to speak with a person
Do NOT escalate for general questions about AI, our services, courses, or booking a call.`
      },
      ...(previousMessages?.map(msg => ({
        role: msg.is_from_visitor ? 'user' : 'assistant',
        content: msg.content,
      })) || []),
      { role: 'user', content: message },
    ];

    // Get AI response
    const ocResp = await fetch(openclawChatUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openclawGatewayToken}`,
        'Content-Type': 'application/json',
        'x-openclaw-agent-id': 'main',
      },
      body: JSON.stringify({
        model: 'openclaw:main',
        user: `webchat:${visitorId}`,
        messages,
        stream: false,
        temperature: 0.4,
        max_tokens: 450,
      }),
    });

    if (!ocResp.ok) {
      const errText = await ocResp.text();
      throw new Error(`OpenClaw chat error: ${ocResp.status} ${errText}`);
    }

    const ocJson = await ocResp.json();
    let aiResponse = ocJson?.choices?.[0]?.message?.content;
    if (!aiResponse) throw new Error('No response from OpenClaw');

    // Check for escalation marker
    const shouldEscalate = aiResponse.includes('[ESCALATE]');
    aiResponse = aiResponse.replace(/\s*\[ESCALATE\]\s*/g, '').trim();

    if (shouldEscalate) {
      // Add handoff message
      aiResponse += '\n\nI\'m connecting you with a team member who can help you further. Please hold on — they\'ll join this chat shortly.';

      // Set handoff mode
      await supabaseClient
        .from('chat_sessions')
        .update({ handoff_active: true })
        .eq('id', sessionId);

      // Notify Melverick on Telegram
      await sendTelegramNotification(sessionId, message, 'main');
    }

    // Save AI response
    const { data: savedMessage, error: saveError } = await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        visitor_id: visitorId,
        content: aiResponse,
        is_from_visitor: false,
        read: false,
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
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
