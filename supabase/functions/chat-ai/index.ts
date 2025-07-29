import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import OpenAI from 'npm:openai@4.28.0';

// Environment variable validation
const LLAMA_INDEX_PIPELINE_URL = Deno.env.get('LLAMA_INDEX_PIPELINE_URL');
const LLAMA_INDEX_API_KEY = Deno.env.get('LLAMA_INDEX_API_KEY');

// Function to retrieve context from LlamaIndex
async function retrieveContextFromLlamaIndex(query: string): Promise<{
  answer?: string;
  sourceNodes?: Array<{ text: string; metadata?: any }>;
}> {
  try {
    if (!LLAMA_INDEX_PIPELINE_URL || !LLAMA_INDEX_API_KEY) {
      console.warn('LlamaIndex configuration missing, skipping retrieval');
      return {};
    }

    console.log('Querying LlamaIndex with:', query);
    
    const response = await fetch(LLAMA_INDEX_PIPELINE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LLAMA_INDEX_API_KEY,
      },
      body: JSON.stringify({
        query: query,
        topK: 3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LlamaIndex API error:', response.status, errorText);
      return {};
    }

    const result = await response.json();
    console.log('LlamaIndex response received');
    
    return {
      answer: result.answer || result.response,
      sourceNodes: result.sourceNodes || result.sources || [],
    };
  } catch (error) {
    console.error('Error retrieving from LlamaIndex:', error);
    return {};
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  let supabaseClient;
  let openai;

  try {
    // Initialize Supabase client
    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Validate and initialize OpenAI
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key not configured');
    }

    const trimmedApiKey = openaiApiKey.trim();
    if (!trimmedApiKey.startsWith('sk-') || trimmedApiKey.length < 20) {
      console.error('Invalid OpenAI API key format');
      throw new Error('Invalid OpenAI API key format');
    }

    openai = new OpenAI({
      apiKey: trimmedApiKey,
    });

    // Parse request body
    const requestBody = await req.json();
    const { message, sessionId, visitorId } = requestBody;

    if (!message || !sessionId || !visitorId) {
      throw new Error('Missing required parameters: message, sessionId, or visitorId');
    }

    console.log('Processing chat message for session:', sessionId);

    // Retrieve relevant context from LlamaIndex
    console.log('Retrieving context from LlamaIndex...');
    const { answer: llamaAnswer, sourceNodes } = await retrieveContextFromLlamaIndex(message);
    
    // Prepare context information
    let contextInfo = '';
    if (llamaAnswer || (sourceNodes && sourceNodes.length > 0)) {
      contextInfo = '\n\nRelevant information from our knowledge base:\n';
      
      if (llamaAnswer) {
        contextInfo += `Knowledge base response: ${llamaAnswer}\n`;
      }
      
      if (sourceNodes && sourceNodes.length > 0) {
        contextInfo += '\nRelevant context sources:\n';
        sourceNodes.forEach((node, index) => {
          contextInfo += `${index + 1}. ${node.text.substring(0, 200)}...\n`;
        });
      }
      
      contextInfo += '\nPlease use this information to provide accurate answers about Nexius Labs services and capabilities.';
    }
    // Get previous messages for context
    const { data: previousMessages, error: messagesError } = await supabaseClient
      .from('chat_messages')
      .select('content, is_from_visitor')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    if (messagesError) {
      console.error('Error fetching previous messages:', messagesError);
      throw new Error('Failed to fetch conversation history');
    }

    // Format messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are Nexius Labs' website concierge.
Nexius Labs builds:
(1) Customised sales acquisition (find the right customers with limited time/resources).
(2) Open-source AI-enhanced stacks (scale without expensive/dumb software).
(3) Natural-language operations (talk to AI agents; they understand & execute changes).

Goals per chat: diagnose pains → map to (1)/(2)/(3) → propose a concrete next step → collect contact & consent → schedule if fit.
Never oversell; be specific and scrappy. Keep answers < 120 words unless asked for detail.${contextInfo}`
      },
      ...(previousMessages?.map(msg => ({
        role: msg.is_from_visitor ? 'user' : 'assistant',
        content: msg.content
      })) || []),
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenAI with', messages.length, 'messages');

    // Get AI response with timeout
    const completion = await Promise.race([
      openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 500
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('OpenAI request timeout')), 30000)
      )
    ]) as OpenAI.Chat.Completions.ChatCompletion;

    const aiResponse = completion.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error('No response content from OpenAI');
      // Provide a fallback message instead of throwing an error
      const fallbackMessage = "I'm having trouble processing your message right now. Could you please try rephrasing your question? I'm here to help you with Nexius Labs services.";
      
      // Save fallback response to database
      const { data: savedMessage, error: saveError } = await supabaseClient
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          visitor_id: visitorId,
          content: fallbackMessage,
          is_from_visitor: false,
          read: false
        })
        .select()
        .single();

      if (saveError) {
        console.error('Error saving fallback message to database:', saveError);
        throw new Error('Failed to save AI response');
      }

      return new Response(
        JSON.stringify({ 
          message: savedMessage,
          success: true 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    console.log('Received response from OpenAI, saving to database');

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

    if (saveError) {
      console.error('Error saving message to database:', saveError);
      throw new Error('Failed to save AI response');
    }

    console.log('Successfully processed chat message');

    return new Response(
      JSON.stringify({ 
        message: savedMessage,
        success: true 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Chat AI Error:', error);
    
    // Determine appropriate error status
    let status = 500;
    if (error.message.includes('API key')) {
      status = 401;
    } else if (error.message.includes('timeout')) {
      status = 408;
    } else if (error.message.includes('Missing required parameters')) {
      status = 400;
    }

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: status,
      }
    );
  }
});