import React, { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Download, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

interface ConversationPreview {
  visitorId: string;
  lastMessage: string;
  messageCount: number;
  timestamp: Date;
}

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [conversations, setConversations] = useState<ConversationPreview[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  // Load conversations from localStorage (admin only)
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      return;
    }

    setIsLoadingConversations(true);
    const allConversations: ConversationPreview[] = [];

    // Scan localStorage for all chat conversations
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('events_chat_')) {
        const visitorId = key.replace('events_chat_', '');
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const messages = JSON.parse(data);
            if (messages.length > 0) {
              const lastMsg = messages[messages.length - 1];
              allConversations.push({
                visitorId,
                lastMessage: lastMsg.content.substring(0, 100),
                messageCount: messages.length,
                timestamp: new Date(lastMsg.timestamp),
              });
            }
          } catch (e) {
            console.error('Error parsing conversation:', e);
          }
        }
      }
    }

    // Sort by most recent
    allConversations.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setConversations(allConversations);
    setIsLoadingConversations(false);
  }, [isAuthenticated, user?.role]);

  const filteredConversations = conversations.filter((conv) =>
    conv.visitorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConversationMessages = (visitorId: string) => {
    const data = localStorage.getItem(`events_chat_${visitorId}`);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const deleteConversation = (visitorId: string) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      localStorage.removeItem(`events_chat_${visitorId}`);
      setConversations(conversations.filter((c) => c.visitorId !== visitorId));
      if (selectedConversation === visitorId) {
        setSelectedConversation(null);
      }
      toast.success('Conversation deleted');
    }
  };

  const exportConversation = (visitorId: string) => {
    const messages = getConversationMessages(visitorId);
    const dataStr = JSON.stringify(messages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `conversation_${visitorId}_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('Conversation exported');
  };

  const selectedMessages = selectedConversation ? getConversationMessages(selectedConversation) : [];

  if (loading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Card className="p-8 text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You need admin access to view this dashboard.</p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Chat Conversations</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage all client conversations with the AI assistant
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="lg:col-span-1 p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {isLoadingConversations ? (
                  <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : filteredConversations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No conversations yet</div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.visitorId}
                      onClick={() => setSelectedConversation(conv.visitorId)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedConversation === conv.visitorId
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="font-mono text-xs text-muted-foreground mb-1">
                        {conv.visitorId.substring(0, 20)}...
                      </div>
                      <p className="text-sm line-clamp-2">{conv.lastMessage}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {conv.messageCount} messages • {conv.timestamp.toLocaleDateString()}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Conversation Details */}
          <Card className="lg:col-span-2 p-6">
            {selectedConversation ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Conversation Details</h2>
                    <p className="text-sm text-muted-foreground font-mono">{selectedConversation}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportConversation(selectedConversation)}
                    >
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteConversation(selectedConversation)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-4 max-h-[500px] overflow-y-auto">
                  {selectedMessages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No messages</div>
                  ) : (
                    selectedMessages.map((msg: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-accent/10 border border-accent/20'
                            : 'bg-muted border border-border'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm capitalize">{msg.role}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Select a conversation to view details</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
