import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

const WHATSAPP_NUMBER = '6596615284';
const DEFAULT_MESSAGE = 'Hi Nexius Labs, I would like to enquire about your services.';

interface WidgetMessage {
  id: string;
  content: string;
  is_from_visitor: boolean;
}

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        content: 'Hi — send us a message here and we’ll continue the conversation on WhatsApp.',
        is_from_visitor: false,
      },
    ]);
  }, []);

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
    if (!message.trim()) return;

    const trimmedMessage = message.trim();
    setMessage('');

    setMessages((prev) => [
      ...prev,
      {
        id: `visitor-${Date.now()}`,
        content: trimmedMessage,
        is_from_visitor: true,
      },
      {
        id: `system-${Date.now() + 1}`,
        content: 'Opening WhatsApp so you can continue with our team there.',
        is_from_visitor: false,
      },
    ]);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(trimmedMessage || DEFAULT_MESSAGE)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
              <span className="font-medium">Wendy</span>
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
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-nexius-dark-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message to WhatsApp..."
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
