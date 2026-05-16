import { useState, useEffect, useRef } from 'react';
import { Upload, ScanLine, BarChart3, Workflow, AlignLeft, Send, Sparkles, ChevronRight, Bot, Loader2, StopCircle, RefreshCw, Trash2, Copy } from 'lucide-react';
import TopBar from '../components/TopBar';
import { callAI, getAITokenUsage } from '../services/aiService';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export default function AIScreen({ navigate, initialText = '' }: any) {
  const [inputText, setInputText] = useState(initialText);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFeature, setLoadingFeature] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  const handleAIAction = async (feature: string, promptText: string, aiMaxTokens: number = 2000) => {
    if (!promptText.trim()) {
      alert("请输入问题描述或内容");
      return;
    }
    
    if (isLoading) return;
    
    setIsLoading(true);
    setLoadingFeature(feature);
    
    // Add user request to chat
    const userMsg: ChatMessage = { role: 'user', content: `[${feature}] ${promptText}` };
    setChatHistory(prev => [...prev, userMsg]);
    
    try {
      const response = await callAI({
        feature,
        userMessage: promptText,
        context: chatHistory.map(m => `${m.role}: ${m.content}`).join('\n'),
        maxTokens: aiMaxTokens
      });
      
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, { role: 'ai', content: `Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
      setLoadingFeature(null);
    }
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const input = chatInput;
    setChatInput('');
    handleAIAction('General Chat', input, 1000);
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
    <div className="pt-20 px-4 pb-32 min-h-screen bg-background flex flex-col">
      <TopBar onProfile={() => navigate('profile')} />

      <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm border border-surface-dim/30 mb-6 focus-within:border-primary/50 focus-within:shadow-md transition-all">
        <textarea 
          placeholder="请在此粘贴您的问题描述或模型提示词..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-24 bg-transparent resize-none focus:outline-none text-sm font-medium"
        ></textarea>
        <div className="flex justify-between items-center border-t border-surface-dim/30 pt-3 mt-2">
           <div className="text-xs text-outline">{getAITokenUsage().remainingTokens.toLocaleString()} tokens left</div>
           <div className="flex justify-end gap-2">
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface-variant rounded-lg text-xs font-bold hover:bg-surface-dim/50 transition-colors">
               <Upload className="w-3.5 h-3.5" /> 上传
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface-variant rounded-lg text-xs font-bold hover:bg-surface-dim/50 transition-colors">
               <ScanLine className="w-3.5 h-3.5" /> 扫描
             </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
         <button 
            disabled={isLoading}
            onClick={() => handleAIAction('Problem Analysis', inputText, 2000)}
            className="w-full bg-secondary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-secondary/90 transition-colors disabled:opacity-50">
            {loadingFeature === 'Problem Analysis' ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart3 className="w-5 h-5" />} 分析问题
         </button>
         <div className="grid grid-cols-2 gap-3">
            <button 
               disabled={isLoading}
               onClick={() => handleAIAction('Model Recommendation', inputText, 1500)}
               className="bg-secondary/10 text-secondary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/20 transition-colors disabled:opacity-50">
               {loadingFeature === 'Model Recommendation' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} 推荐模型
            </button>
            <button 
               disabled={isLoading}
               onClick={() => handleAIAction('Workflow Generation', inputText, 3000)}
               className="bg-secondary/10 text-secondary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/20 transition-colors disabled:opacity-50">
               {loadingFeature === 'Workflow Generation' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Workflow className="w-4 h-4" />} 生成工作流
            </button>
         </div>
      </div>

      {chatHistory.length > 0 && (
         <div className="flex items-center justify-between mb-4 mt-2">
           <div className="flex items-center gap-2 text-primary font-bold">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
             </div>
             <span className="text-xl">AI 分析结果</span>
           </div>
           <button onClick={clearChat} className="text-xs text-outline flex items-center gap-1 hover:text-red-500">
             <Trash2 className="w-3 h-3" /> 清空
           </button>
         </div>
      )}

      {chatHistory.map((msg, idx) => (
         <div key={idx} className={`bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 mb-4 whitespace-pre-wrap ${msg.role === 'user' ? 'bg-surface-dim/20' : ''}`}>
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-2">
                 {msg.role === 'user' ? <AlignLeft className="w-4 h-4 text-primary" /> : <Sparkles className="w-4 h-4 text-secondary" />}
                 <h3 className={`font-bold text-sm ${msg.role === 'user' ? 'text-primary' : 'text-secondary'}`}>
                    {msg.role === 'user' ? '用户输入' : 'AI 回复'}
                 </h3>
               </div>
               {msg.role === 'ai' && (
                 <button onClick={() => handleCopy(msg.content)} className="p-1 text-outline hover:text-primary transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                 </button>
               )}
            </div>
            <div className="text-sm font-medium leading-relaxed font-sans text-on-surface">
               {msg.content}
            </div>
         </div>
      ))}
      
      {isLoading && loadingFeature === 'General Chat' && (
         <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 mb-4 flex items-center gap-2 text-secondary">
           <Loader2 className="w-4 h-4 animate-spin" />
           <span className="text-sm font-bold">AI 正在思考...</span>
         </div>
      )}

      {/* Floating Chat Input */}
      <div className="fixed bottom-[80px] left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-xl rounded-full shadow-[0_4px_20px_rgba(36,56,156,0.15)] border border-surface-dim/50 p-1 flex items-center pl-3 z-30">
        <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
           <Bot className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
          placeholder="继续追问 AI..." 
          className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder:text-outline font-medium"
        />
        <button 
          onClick={handleChatSubmit}
          disabled={isLoading || !chatInput.trim()}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50">
          <Send className="w-4 h-4 -mr-0.5" />
        </button>
      </div>

    </div>
  );
}
