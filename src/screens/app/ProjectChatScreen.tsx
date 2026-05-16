import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Send, 
  ArrowLeft, 
  Loader2, 
  Sparkles, 
  Bot, 
  User, 
  Copy, 
  Info,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectService, Project } from '../../services/projectService';
import { chatService, ChatMessage } from '../../services/chatService';
import { sendModelingMessage } from '../../services/modelingService';
import MessageContent from '../../components/renderers/MessageContent';

export default function ProjectChatScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      initChat(id);
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const initChat = async (projectId: string) => {
    try {
      const projData = await projectService.getProjectById(projectId);
      setProject(projData);
      
      const msgData = await chatService.getMessages(projectId);
      setMessages(msgData);
    } catch (err) {
      console.error('Failed to init chat:', err);
      navigate('/app');
    } finally {
      setIsInitializing(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !project || isLoading) return;

    const userText = inputText;
    setInputText('');
    setIsLoading(true);

    // Optimistic update for UI
    const tempUserMsg: ChatMessage = {
      id: 'temp-' + Date.now(),
      project_id: project.id,
      user_id: '', // Not needed for UI
      role: 'user',
      content: userText,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      // Call new backend modeling API (it handles saving user/assistant messages)
      const response = await sendModelingMessage({
        project_id: project.id,
        message: userText
      });

      // Update messages from the response
      const aiMsg: ChatMessage = {
        id: response.message_id,
        project_id: project.id,
        user_id: '',
        role: 'assistant',
        content: response.content,
        created_at: new Date().toISOString()
      };
      
      // Remove the temp message and add the real ones (or just re-fetch)
      // For simplicity, we just add the assistant message and assume user msg is saved
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== tempUserMsg.id);
        // We add both back to ensure we have the DB version (or just the assistant one)
        return [...filtered, { ...tempUserMsg, id: 'saved-' + Date.now() }, aiMsg];
      });

      // Show usage info if needed
      if (response.usage.used >= response.usage.limit * 0.8) {
        console.warn(`Usage alert: ${response.usage.used}/${response.usage.limit} tokens used.`);
      }

    } catch (err: any) {
      console.error('Chat error:', err);
      // Remove optimistic message on error
      setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id));
      alert('发送失败: ' + (err.message || '未知错误'));
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background max-w-2xl mx-auto relative overflow-hidden shadow-xl border-x border-surface-dim/20">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-lg border-b border-surface-dim/40 px-4 py-3 flex items-center gap-3 z-50 sticky top-0">
        <button onClick={() => navigate(`/app/projects/${id}`)} className="p-2 rounded-full hover:bg-surface-container transition-colors">
          <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-on-surface truncate">{project?.title}</h1>
          <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] text-on-surface-variant font-medium">AI 建模助手中...</span>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
           <Info className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-on-surface">开始建模对话</h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              您可以尝试提问：<br/>
              “帮我分析这个问题的变量有哪些？”<br/>
              “如何为这个场景建立目标函数？”<br/>
              “生成求解该模型的 Python 代码。”
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className="flex flex-col gap-1">
                  <div className={`px-4 py-3 rounded-2xl shadow-sm border ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white border-primary/20 rounded-tr-none' 
                      : 'bg-surface-container-lowest border-surface-dim/30 rounded-tl-none'
                  }`}>
                    <MessageContent content={msg.content} />
                  </div>
                  {msg.role === 'assistant' && (
                    <button 
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="self-start mt-1 text-[10px] font-bold text-outline flex items-center gap-1 hover:text-primary transition-colors px-1"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      {copiedId === msg.id ? '已复制' : '复制内容'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-surface-container-lowest border border-surface-dim/30 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full animate-bounce [animation-duration:1s]"></div>
                  <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-surface/90 backdrop-blur-lg border-t border-surface-dim/40 z-50 sticky bottom-0">
        <div className="relative flex items-end gap-2 bg-surface-container rounded-3xl p-1.5 border border-surface-dim/50 focus-within:border-primary/50 transition-all shadow-inner">
          <textarea 
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="描述建模需求或继续追问..."
            className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none placeholder:text-outline resize-none max-h-32"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all disabled:opacity-50 mb-0.5 mr-0.5"
          >
            <Send className="w-5 h-5 -mr-0.5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-outline mt-3">
          AI 生成的内容仅供参考，请根据实际建模需求进行调整。
        </p>
      </div>
    </div>
  );
}

