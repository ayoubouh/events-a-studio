import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Streamdown } from 'streamdown';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const EventsAIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visitorId] = useState(() => {
    let id = localStorage.getItem('events_visitor_id');
    if (!id) {
      id = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('events_visitor_id', id);
    }
    return id;
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (response: any) => {
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const updated = [...prev, assistantMessage];
        localStorage.setItem(`events_chat_${visitorId}`, JSON.stringify(updated));
        return updated;
      });
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast.error('Failed to get response from AI. Please try again.');
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const stored = localStorage.getItem(`events_chat_${visitorId}`);
      if (stored) {
        try {
          const loaded = JSON.parse(stored).map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }));
          setMessages(loaded);
        } catch (e) {
          showWelcomeMessage();
        }
      } else {
        showWelcomeMessage();
      }
    }
  }, [isOpen, visitorId]);

  const showWelcomeMessage = () => {
    const welcomeMessage: ChatMessage = {
      id: '0',
      role: 'assistant',
      content:
        'Hello! 👋 I\'m the Events, A studio AI Assistant. I\'m here to help you understand our services and answer any questions about planning your perfect event in Marrakech. What type of event are you interested in?',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMessage];
      localStorage.setItem(`events_chat_${visitorId}`, JSON.stringify(updated));
      return updated;
    });
    setInput('');
    setIsLoading(true);

    chatMutation.mutate({
      message: input,
      conversationHistory: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      visitorId: visitorId,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`events_chat_${visitorId}`);
    showWelcomeMessage();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-accent text-accent-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
        title="Open AI Chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="flex flex-col h-96 bg-background border border-border shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-accent text-accent-foreground p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <h3 className="font-semibold">Events AI Assistant</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-accent-foreground/20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent-foreground/20 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        {!isMinimized && (
          <>
            <ScrollArea className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-accent text-accent-foreground rounded-br-none'
                          : 'bg-muted text-foreground rounded-bl-none'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Streamdown>{message.content}</Streamdown>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4 space-y-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services, pricing, or availability..."
                className="resize-none text-sm"
                rows={2}
                disabled={isLoading}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Send size={16} className="mr-2" />
                  Send
                </Button>
                <Button
                  onClick={clearChat}
                  variant="outline"
                  className="px-3"
                  title="Clear conversation"
                >
                  ✕
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
