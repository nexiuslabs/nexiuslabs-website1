import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, sessionId, visitorId } = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get previous messages for context
    const { data: previousMessages } = await supabaseClient
      .from('chat_messages')
      .select('content, is_from_visitor')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Format messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are an AI assistant for NEXIUS Labs, an AI consulting company that helps businesses implement AI solutions and automation. Be professional, helpful, and knowledgeable about AI implementation, business process optimization, and digital transformation. Keep responses concise and not more than 50 words for each reply and focused on helping potential clients understand how AI can benefit their business.`
      },
      ...(previousMessages?.map(msg => ({
        role: msg.is_from_visitor ? 'user' : 'assistant',
        content: msg.content
      })) || []),
      { role: 'user', content: message }
    ];

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
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