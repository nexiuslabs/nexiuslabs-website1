import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createChatSession, sendChatMessage, getChatMessages } from '../lib/chats';
import type { ChatMessage } from '../types/database';

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visitorId, setVisitorId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [aiTyping, setAiTyping] = useState(false);

  const loadChatMessages = async (sessionId: string) => {
    if (!sessionId) return;

    console.log('Loading messages for session:', sessionId);
    try {
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading chat messages:', error);
        return;
      }

      console.log('Loaded messages:', messages);
      setMessages(messages || []);

      // Mark messages as read
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const initializeChat = useCallback(async () => {
    setLoading(true);
    try {
      const session = await createChatSession({
        visitor_id: visitorId,
      });

      setSessionId(session.id);

      // Fetch initial messages
      const messages = await getChatMessages(session.id);
      setMessages(messages);
    } catch (error) {
      console.error('Error initializing chat:', error);
    } finally {
      setLoading(false);
    }
  }, [visitorId]);

  useEffect(() => {
    // Generate a unique visitor ID if not exists
    const storedVisitorId = localStorage.getItem('visitorId');
    if (!storedVisitorId) {
      const newVisitorId = crypto.randomUUID();
      localStorage.setItem('visitorId', newVisitorId);
      setVisitorId(newVisitorId);
    } else {
      setVisitorId(storedVisitorId);
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      // Fetch initial messages
      loadChatMessages(sessionId);

      // Set up real-time subscription
      const channel = supabase
        .channel(`chat_${sessionId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public', 
            table: 'chat_messages', 
            filter: `session_id=eq.${sessionId}` 
          },
          (payload) => {
            console.log('New message received:', payload);
            setMessages(prev => {
              // Ensure we don't add duplicate messages
              const isDuplicate = prev.some(msg => msg.id === payload.new.id);
              if (!isDuplicate) {
                return [...prev, payload.new as ChatMessage];
              }
              return prev;
            });
          }
        ) 
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [sessionId]);

  useEffect(() => {
    if (isOpen && !sessionId) {
      initializeChat();
    }
  }, [isOpen, sessionId, initializeChat]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !sessionId) return;

    const trimmedMessage = message.trim();
    setMessage('');

    // Create visitor message
    const newMessage = {
      session_id: sessionId,
      visitor_id: visitorId,
      content: trimmedMessage,
      is_from_visitor: true,
      user_id: null,
      read: false,
    };

    try {
      await sendChatMessage(newMessage);
      
      // Show AI is typing
      setAiTyping(true);
      
      try {
        // Get AI response
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'x-client-info': 'chat-widget'
          },
          body: JSON.stringify({
            message: trimmedMessage,
            sessionId,
            visitorId
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get AI response');
        }

        const data = await response.json();
        if (!data || !data.message) {
          throw new Error('Invalid response from AI service');
        }

        // Message will be added via subscription
      } catch (aiError) {
        console.error('AI response error:', aiError);
        
        // Create fallback message if AI fails
        const fallbackMessage = {
          session_id: sessionId,
          visitor_id: visitorId,
          content: "I apologize, but I'm experiencing technical difficulties. A team member will assist you shortly.",
          is_from_visitor: false,
          user_id: null,
          read: false
        };
        
        try {
          await sendChatMessage(fallbackMessage);
        } catch (fallbackError) {
          console.error('Error sending fallback message:', fallbackError);
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
      setMessage(trimmedMessage);
    } finally {
      setAiTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div
          className={`bg-white rounded-lg shadow-xl transition-all duration-300 ${
            isMinimized ? 'h-14' : 'h-[500px]'
          } w-[350px] flex flex-col bg-nexius-dark-surface border border-nexius-dark-border`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-nexius-navy text-white rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Chat with Us</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div
                ref={messageContainerRef}
                className="flex-1 p-4 overflow-y-auto space-y-4"
              >
                {messages.map((msg, index) => (
                  <div
                    key={msg.id || index}
                    className={`flex ${
                      msg.is_from_visitor ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        msg.is_from_visitor
                          ? 'bg-nexius-teal text-white'
                          : 'bg-nexius-dark-card text-nexius-dark-text border border-nexius-dark-border'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {aiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-nexius-dark-card text-nexius-dark-text rounded-lg px-4 py-2 border border-nexius-dark-border">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-nexius-dark-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-nexius-dark-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-nexius-dark-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-nexius-dark-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-nexius-dark-border bg-nexius-dark-card text-nexius-dark-text placeholder-nexius-dark-text-muted rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="px-4 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-nexius-teal text-white p-4 rounded-full shadow-lg hover:bg-nexius-teal/90 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
