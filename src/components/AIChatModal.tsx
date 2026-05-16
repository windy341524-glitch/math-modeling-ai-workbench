import React, { useState } from 'react';
import { Bot, Send, X, Copy, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { callAI, getAITokenUsage } from '../services/aiService';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  context: string;
  initialPrompt?: string;
  maxTokens?: number;
}

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export default function AIChatModal({ isOpen, onClose, feature, context, initialPrompt, maxTokens = 1500 }: AIChatModalProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // When opened with an initialPrompt, send it immediately
  // But wait! useEffect will trigger safely
  React.useEffect(() => {
    if (isOpen && initialPrompt && chatHistory.length === 0 && !isLoading) {
      handleChatSubmit(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  if (!isOpen) return null;

  const handleChatSubmit = async (text: string = chatInput) => {
    if (!text.trim()) return;
    
    setChatInput('');
    setIsLoading(true);
    
    const newChatHistory = [...chatHistory, { role: 'user', content: text } as ChatMessage];
    setChatHistory(newChatHistory);
    
    try {
      const response = await callAI({
        feature,
        userMessage: text,
        context,
        maxTokens
      });
      setChatHistory([...newChatHistory, { role: 'ai', content: response }]);
    } catch (err: any) {
      setChatHistory([...newChatHistory, { role: 'ai', content: `Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  const clearChat = () => {
    if(window.confirm('确定清空对话历史吗？')) {
       setChatHistory([]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-lg h-[80vh] sm:h-[85vh] sm:rounded-3xl rounded-t-3xl flex flex-col shadow-2xl relative">
        <div className="flex items-center justify-between p-4 border-b border-surface-dim/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">{feature}</h3>
              <div className="text-[10px] text-on-surface-variant">{getAITokenUsage().remainingTokens.toLocaleString()} tokens left</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {chatHistory.length > 0 && (
              <button onClick={clearChat} className="p-2 text-outline hover:text-red-500 rounded-full hover:bg-surface-dim/50">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="p-2 text-outline hover:text-on-surface rounded-full hover:bg-surface-dim/50">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant px-4">
              <Bot className="w-12 h-12 mb-3 text-surface-dim" />
              <p className="text-sm font-medium">你好！我是 {feature} 助手。</p>
              <p className="text-xs mt-1 text-outline">我可以帮你解释内容、分析代码或者答疑解惑。</p>
            </div>
          )}
          
          {chatHistory.map((msg, idx) => (
             <div key={idx} className={`rounded-2xl p-4 shadow-sm border border-surface-dim/30 whitespace-pre-wrap ${msg.role === 'user' ? 'bg-surface-dim/20 ml-8' : 'bg-surface-container-lowest mr-8'}`}>
                <div className="flex items-center justify-between mb-2">
                   <h3 className={`font-bold text-xs ${msg.role === 'user' ? 'text-primary' : 'text-secondary'}`}>
                      {msg.role === 'user' ? '你' : 'AI'}
                   </h3>
                   {msg.role === 'ai' && (
                     <button onClick={() => handleCopy(msg.content)} className="text-outline hover:text-primary transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                     </button>
                   )}
                </div>
                <div className="text-sm font-medium leading-relaxed font-sans text-on-surface">
                   {msg.content}
                </div>
             </div>
          ))}
          
          {isLoading && (
            <div className="mr-8 bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 flex items-center gap-2 text-secondary">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-bold">思考中...</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-surface border-t border-surface-dim/50">
          <div className="flex items-center bg-surface-container-lowest border border-surface-dim/50 rounded-full px-2 py-1 shadow-sm">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit(chatInput)}
              placeholder="在此输入你要询问的问题..." 
              className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder:text-outline font-medium"
            />
            <button 
              onClick={() => handleChatSubmit(chatInput)}
              disabled={isLoading || !chatInput.trim()}
              className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
