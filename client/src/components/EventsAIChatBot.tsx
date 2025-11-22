import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, X, Minimize2, Maximize2, Copy, Check } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Streamdown } from 'streamdown';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { language } = useLanguageContext();
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

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      en: 'Hello! 👋 I\'m the Events, A studio AI Assistant. I\'m here to help you understand our services and answer any questions about planning your perfect event in Marrakech. What type of event are you interested in?',
      fr: 'Bonjour! 👋 Je suis l\'assistant IA d\'Events, A studio. Je suis là pour vous aider à comprendre nos services et répondre à vos questions sur la planification de votre événement parfait à Marrakech. Quel type d\'événement vous intéresse?',
      ar: 'مرحبا! 👋 أنا مساعد ذكي من Events, A studio. أنا هنا لمساعدتك على فهم خدماتنا والإجابة على أي أسئلة حول تخطيط حدثك المثالي في مراكش. ما نوع الحدث الذي يهمك؟',
    };
    return welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en;
  };

  const showWelcomeMessage = () => {
    const welcomeMessage: ChatMessage = {
      id: '0',
      role: 'assistant',
      content: getWelcomeMessage(),
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
    
    // Store language preference
    localStorage.setItem('events_language', language);
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
      <Card className="flex flex-col h-[600px] bg-background border border-border shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-accent-foreground/20 rounded-full p-2">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Events AI</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-accent-foreground/20 rounded transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-accent-foreground/20 rounded transition-colors"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        {!isMinimized && (
          <>
            <ScrollArea className="flex-1 p-4 overflow-y-auto bg-background">
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`group relative max-w-xs px-4 py-3 rounded-lg text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-accent text-accent-foreground rounded-br-none shadow-md'
                          : 'bg-card text-foreground border border-border rounded-bl-none shadow-sm'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Streamdown className="prose prose-sm dark:prose-invert max-w-none">
                          {message.content}
                        </Streamdown>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                      
                      {/* Copy Button */}
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                        title="Copy message"
                      >
                        {copiedId === message.id ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} className="text-muted-foreground" />
                        )}
                      </button>

                      {/* Timestamp */}
                      <div className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-card text-foreground border border-border px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4 space-y-3 bg-background flex-shrink-0">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat.placeholder', language)}
                className="resize-none text-sm bg-card text-foreground border-border focus:border-accent"
                rows={2}
                disabled={isLoading}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                >
                  <Send size={16} className="mr-2" />
                  {t('chat.send', language)}
                </Button>
                <Button
                  onClick={clearChat}
                  variant="outline"
                  className="px-3 border-border hover:bg-muted"
                  title="Clear conversation"
                >
                  ✕
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {t('chat.language', language)}: {language.toUpperCase()}
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
