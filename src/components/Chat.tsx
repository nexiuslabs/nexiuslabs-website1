import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createChatSession, sendChatMessage, getChatMessages } from '../lib/chats';
import type { ChatMessage } from '../types/database';

interface ChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialMessage?: string;
  onInitialMessageSent?: () => void;
}

export function Chat({ isOpen, setIsOpen, initialMessage, onInitialMessageSent }: ChatProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visitorId, setVisitorId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [aiTyping, setAiTyping] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const sendAIRequest = async (userMessage: string, sessionId: string, visitorId: string) => {
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
          message: userMessage,
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
    } finally {
      setAiTyping(false);
    }
  };

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
    if (isOpen && !sessionId && visitorId) {
      initializeChat();
    }
  }, [isOpen, visitorId]);

  // Handle initial message when chat is opened with a prefilled message
  useEffect(() => {
    const sendInitialMessage = async () => {
      if (sessionId && initialMessage && onInitialMessageSent) {
        try {
          // Create visitor message
          const newMessage = {
            session_id: sessionId,
            visitor_id: visitorId,
            content: initialMessage,
            is_from_visitor: true,
            user_id: null,
            read: false,
          };

          await sendChatMessage(newMessage);
          
          // Send AI request
          await sendAIRequest(initialMessage, sessionId, visitorId);
          
          // Clear the initial message
          onInitialMessageSent();
        } catch (error) {
          console.error('Error sending initial message:', error);
        }
      }
    };

    sendInitialMessage();
  }, [sessionId, initialMessage, visitorId, onInitialMessageSent]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const initializeChat = async () => {
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
  };

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
    setSendingMessage(true);

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
      const sentMessage = await sendChatMessage(newMessage);
      
      // Send AI request
      await sendAIRequest(trimmedMessage, sessionId, visitorId);

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
      setMessage(trimmedMessage);
    } finally {
      setSendingMessage(false);
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
            isMinimized ? 'h-14' : 'h-[calc(100vh-88px)]'
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
                {loading && !sessionId && (
                  <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-nexius-teal/20 border-t-nexius-teal rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-nexius-teal/30 rounded-full animate-ping"></div>
                        <div className="absolute inset-2 w-8 h-8 border-2 border-nexius-teal/40 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                      </div>
                      <p className="text-nexius-dark-text-muted text-sm">Connecting...</p>
                    </div>
                  </div>
                )}
                
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
                
                {sendingMessage && (
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-lg px-4 py-3 bg-nexius-teal/70 text-white animate-pulse">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
                        </div>
                        <span className="text-sm font-medium">Sending message</span>
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {aiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-nexius-dark-card text-nexius-dark-text rounded-lg px-4 py-3 border border-nexius-dark-border animate-pulse">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-nexius-teal/20 flex items-center justify-center relative">
                          <div className="w-3 h-3 bg-nexius-teal rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 w-8 h-8 border-2 border-nexius-teal/30 rounded-full animate-spin"></div>
                        </div>
                        <span className="text-sm text-nexius-dark-text-muted mr-2 font-medium">AI is thinking</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-nexius-teal rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.2s' }}></div>
                          <div className="w-2 h-2 bg-nexius-teal rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.2s' }}></div>
                          <div className="w-2 h-2 bg-nexius-teal rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.2s' }}></div>
                        </div>
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
                    disabled={sendingMessage || aiTyping}
                    className="flex-1 px-3 py-2 border border-nexius-dark-border bg-nexius-dark-card text-nexius-dark-text placeholder-nexius-dark-text-muted rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim() || sendingMessage || aiTyping}
                    className="px-4 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {sendingMessage ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      </div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
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