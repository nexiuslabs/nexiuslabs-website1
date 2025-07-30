import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import OpenAI from 'npm:openai@4.28.0';

// Function to retrieve context from LlamaIndex
async function retrieveContextFromLlamaIndex(query: string): Promise<{
  answer?: string;
  sourceNodes?: Array<{ text: string; metadata?: any }>;
}> {
  try {
    console.log('🔗 LlamaIndex Retrieval Start');
    
    // Get environment variables at runtime to ensure they're fresh
    const LLAMA_INDEX_PIPELINE_URL = Deno.env.get('LLAMA_INDEX_PIPELINE_URL');
    const LLAMA_INDEX_API_KEY = Deno.env.get('LLAMA_INDEX_API_KEY');
    
    if (!LLAMA_INDEX_PIPELINE_URL || !LLAMA_INDEX_API_KEY) {
      console.log('⚠️ LlamaIndex environment variables not configured');
      console.log('- LLAMA_INDEX_PIPELINE_URL:', LLAMA_INDEX_PIPELINE_URL ? 'SET' : 'MISSING');
      console.log('- LLAMA_INDEX_API_KEY:', LLAMA_INDEX_API_KEY ? 'SET' : 'MISSING');
      return {};
    }

    console.log('✅ LlamaIndex configuration found');
    console.log('- Pipeline URL:', LLAMA_INDEX_PIPELINE_URL.substring(0, 50) + '...');
    console.log('- API Key:', LLAMA_INDEX_API_KEY.substring(0, 10) + '...');
    
    const requestBody = {
      query: query,
      topK: 5,
      stream: false,
      include_metadata: true
    };
    
    console.log('📤 LlamaIndex Request:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(LLAMA_INDEX_PIPELINE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLAMA_INDEX_API_KEY}`,
       
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ LlamaIndex API error (${response.status}):`, errorText);
      console.error('- Response headers:', Object.fromEntries(response.headers.entries()));
      return {};
    }

    const result = await response.json();
    console.log('📥 Raw LlamaIndex Response:');
    console.log('- Response type:', typeof result);
    console.log('- Response keys:', Object.keys(result));
    
    // Log the complete raw result for debugging
    console.log('🔍 COMPLETE RAW RESULT FROM LLAMAINDEX:');
    console.log(JSON.stringify(result, null, 2));
    
    // Log specific checks for common field names
    console.log('🔍 FIELD-BY-FIELD ANALYSIS:');
    console.log('- result.answer:', result.answer);
    console.log('- result.response:', result.response);
    console.log('- result.text:', result.text);
    console.log('- result.message:', result.message);
    console.log('- result.sourceNodes:', result.sourceNodes);
    console.log('- result.sources:', result.sources);
    console.log('- result.nodes:', result.nodes);
    console.log('- result.documents:', result.documents);
    console.log('- result.chunks:', result.chunks);
    
    // Check for various possible response formats
    const answer = result.answer || result.response || result.text || result.message;
    const sourceNodes = result.retrieval_nodes ? result.retrieval_nodes.map(item => ({
      text: item.node.text,
      metadata: item.node.extra_info,
      score: item.score
    })) : (result.sourceNodes || result.sources || result.nodes || result.documents || result.chunks || []);
    
    console.log('🔍 EXTRACTED VALUES:');
    console.log('- Answer found:', answer ? 'YES' : 'NO');
    console.log('- Answer type:', typeof answer);
    console.log('- Answer value:', answer);
    console.log('- Source nodes count:', Array.isArray(sourceNodes) ? sourceNodes.length : 0);
    console.log('- Source nodes type:', typeof sourceNodes);
    console.log('- Source nodes value:', sourceNodes);
    
    if (answer || (Array.isArray(sourceNodes) && sourceNodes.length > 0)) {
      console.log('✅ Successfully retrieved context from LlamaIndex');
      if (answer) {
        console.log('- Answer length:', answer.length);
        console.log('- Answer preview:', answer.substring(0, 200) + '...');
      }
      if (Array.isArray(sourceNodes) && sourceNodes.length > 0) {
        console.log('- Source nodes preview:', sourceNodes.map((node, i) => {
          const nodeText = typeof node === 'string' ? node : (node.text || node.content || 'Unknown format');
          return `Node ${i + 1}: ${nodeText.substring(0, 50)}...`;
        }));
      }
      
      console.log('🎯 RETURNING FROM LLAMAINDEX FUNCTION:');
      console.log('- Final answer:', answer);
      console.log('- Final sourceNodes:', sourceNodes);
      
      return {
        answer,
        sourceNodes: Array.isArray(sourceNodes) ? sourceNodes : [],
      };
    } else {
      console.log('⚠️ No relevant context found in LlamaIndex');
      console.log('📊 Response structure analysis:');
      console.log('- Keys in response:', Object.keys(result));
      console.log('- Response type:', typeof result);
      console.log('- Is array?', Array.isArray(result));
      
      // Try to find any text content in unexpected places
      const allTextContent = JSON.stringify(result).match(/"text":\s*"([^"]+)"/g);
      if (allTextContent) {
        console.log('- Found text fields:', allTextContent.slice(0, 3));
      }
    }
    
    return {};
  } catch (error) {
    console.error('❌ LlamaIndex connection error:', error.message);
    console.error('- Error type:', error.constructor.name);
    console.error('- Stack trace:', error.stack);
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
    console.log('🔍 Querying LlamaIndex with message:', message.substring(0, 100) + '...');
    const { answer: llamaAnswer, sourceNodes } = await retrieveContextFromLlamaIndex(message);
    
    // Log what we actually received from LlamaIndex function
    console.log('📊 RECEIVED FROM LLAMAINDEX FUNCTION:');
    console.log('- Answer received:', llamaAnswer ? 'YES' : 'NO');
    console.log('- Answer type:', typeof llamaAnswer);
    console.log('- Answer length:', llamaAnswer ? llamaAnswer.length : 'N/A');
    console.log('- Answer content:', llamaAnswer || 'NULL/UNDEFINED');
    if (llamaAnswer) {
      console.log('- Answer preview:', llamaAnswer.substring(0, 200) + '...');
    }
    console.log('- Source nodes received:', sourceNodes ? sourceNodes.length : 0);
    console.log('- Source nodes type:', typeof sourceNodes);
    console.log('- Source nodes is array:', Array.isArray(sourceNodes));
    if (sourceNodes && sourceNodes.length > 0) {
      console.log('- Source nodes details:');
      sourceNodes.forEach((node, i) => {
        const nodeText = typeof node === 'string' ? node : (node.text || node.content || JSON.stringify(node));
        console.log(`  Node ${i + 1}: ${nodeText.substring(0, 100)}...`);
        console.log(`  Node ${i + 1} type:`, typeof node);
        console.log(`  Node ${i + 1} keys:`, typeof node === 'object' ? Object.keys(node) : 'N/A');
      });
    }
    
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
          const nodeText = typeof node === 'string' ? node : (node.text || JSON.stringify(node));
          contextInfo += `${index + 1}. ${nodeText.substring(0, 200)}...\n`;
        });
      }
      
      contextInfo += '\n\nIMPORTANT: Use this context information to provide accurate, specific answers about Nexius Labs services and capabilities.';
    }
    
    // Log the constructed context info in detail
    console.log('🧠 CONTEXT INFO CONSTRUCTION ANALYSIS:');
    console.log('- Context info length:', contextInfo.length);
    console.log('- Context info is empty:', contextInfo === '');
    console.log('- Context info is whitespace only:', contextInfo.trim() === '');
    if (contextInfo.length > 0) {
      console.log('- Context info preview:', contextInfo.substring(0, 300) + '...');
      console.log('- FULL CONTEXT INFO:');
      console.log(contextInfo);
    } else {
      console.log('- No context info constructed (LlamaIndex returned no relevant data)');
      console.log('- Checking individual conditions:');
      console.log('  - llamaAnswer exists:', !!llamaAnswer);
      console.log('  - sourceNodes exists:', !!sourceNodes);
      console.log('  - sourceNodes is array:', Array.isArray(sourceNodes));
      console.log('  - sourceNodes length > 0:', sourceNodes && sourceNodes.length > 0);
    }

    // Get previous messages for context
    const { data: previousMessages, error: messagesError } = await supabaseClient
      .from('chat_messages')
      .select('content, is_from_visitor')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(12);

    if (messagesError) {
      console.error('Error fetching previous messages:', messagesError);
      throw new Error('Failed to fetch conversation history');
    }

    // Format messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are Nexius Labs' website concierge.${contextInfo}
Nexius Labs builds:
(1) Customised sales acquisition (find the right customers with limited time/resources).
(2) Open-source AI-enhanced stacks (scale without expensive/dumb software).
(3) Natural-language operations (talk to AI agents; they understand & execute changes).

Goals per chat: diagnose pains → map to (1)/(2)/(3) → propose a concrete next step → collect contact & consent → schedule if fit.
Never oversell; be specific and scrappy. Keep answers < 120 words unless asked for detail.`
      },
      ...(previousMessages?.map(msg => ({
        role: msg.is_from_visitor ? 'user' : 'assistant',
        content: msg.content
      })) || []),
      { role: 'user', content: message }
    ];

    // Log the final system message sent to OpenAI in detail
    console.log('🤖 OPENAI REQUEST CONSTRUCTION:');
    console.log('- Total messages in conversation:', messages.length);
    console.log('- System message length:', messages[0].content.length);
    console.log('- System message contains contextInfo:', messages[0].content.includes('Relevant information from our knowledge base'));
    console.log('- COMPLETE SYSTEM MESSAGE:');
    console.log(messages[0].content);
    console.log('- User message length:', message.length);
    console.log('- User message:', message);
    console.log('- Previous messages count:', messages.length - 2); // Excluding system and current user message

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