import { useState } from 'react';
import { FileText, CheckCircle, Edit3, Lock, FileJson, ChevronDown, ChevronUp, Bot, Sigma, BookOpen, Loader2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import { callAI } from '../services/aiService';

export default function PaperScreen({ navigate }: any) {
  const [draftContent, setDraftContent] = useState(`1. We assume the traffic flow is incompressible within the designated urban grid...\n2. Weather conditions are considered optimal and consistent throughout the data gathering period to minimize external variables...`);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDraft = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const prompt = `针对"城市物流效率分析"的模型假设部分，请生成一段学术初稿。要求包含合理化约束和逻辑。`;
      const response = await callAI({
        feature: 'Paper Outline Generation',
        userMessage: prompt,
        maxTokens: 2000
      });
      setDraftContent(response);
    } catch (err: any) {
      alert(`AI生成失败: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-background">
      <TopBar onProfile={() => navigate('profile')} />

      <div className="flex items-center gap-2 mb-6 mt-2">
         <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="w-4 h-4" />
         </div>
         <h2 className="text-xl font-bold text-primary">论文助手</h2>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 mb-6 hover:shadow-md transition-shadow cursor-default">
         <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-on-surface-variant">当前项目</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">已完成 75%</span>
         </div>
         <div className="text-base font-bold mb-4">城市物流效率分析</div>
         <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-[75%] rounded-full shadow-[0_0_8px_rgba(99,44,229,0.5)]"></div>
         </div>
      </div>

      <div className="space-y-4 mb-8">
         {/* Completed Accordion */}
         <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-tertiary text-tertiary flex items-center justify-center shrink-0 bg-tertiary/10">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                 <h4 className="font-bold text-sm">摘要</h4>
                 <div className="text-xs text-on-surface-variant font-medium mt-0.5">已完成 · 250 字</div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-outline" />
         </div>

         {/* Active Accordion */}
         <div className="bg-surface-container-lowest rounded-2xl shadow-md border border-primary/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary"></div>
            <div className="p-4 flex items-center justify-between bg-primary/5 border-b border-primary/20 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Edit3 className="w-3.5 h-3.5" />
                </div>
                <div>
                   <h4 className="font-bold text-sm text-primary">模型假设</h4>
                   <div className="text-xs font-bold text-primary mt-0.5">草稿起草中</div>
                </div>
              </div>
              <ChevronUp className="w-5 h-5 text-primary" />
            </div>
            
            <div className="p-4 pb-5">
              <div className="bg-surface rounded-xl p-4 border border-secondary/20 mb-4 shadow-sm relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-xl"></div>
                 <div className="flex gap-2">
                   <Bot className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                   <div>
                      <h5 className="font-bold text-xs text-on-surface mb-1.5">指导：合理化约束</h5>
                      <p className="text-[13px] text-on-surface-variant leading-relaxed font-medium">
                        解释你做出的每一个假设的逻辑。为什么摩擦系数是常数？时间尺度如何证明忽略加速度是合理的？
                      </p>
                   </div>
                 </div>
              </div>

              <div className="flex gap-2">
                 <button 
                   onClick={handleGenerateDraft}
                   disabled={isGenerating}
                   className="flex-1 bg-secondary text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-4 shadow-md hover:bg-secondary/90 transition-colors active:scale-95 disabled:opacity-50">
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />} {isGenerating ? '正在生成...' : '使用 AI 生成初稿'}
                 </button>
                 <button 
                   onClick={() => navigate('prompts', { initialCategory: '论文与分析' })}
                   className="flex-1 bg-surface-container text-primary border border-primary/20 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-4 shadow-sm hover:bg-primary/5 transition-colors active:scale-95"
                 >
                    <BookOpen className="w-4 h-4" /> 挑选论文提示词
                 </button>
              </div>

              <div className="border border-surface-dim rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
                 <div className="flex items-center justify-between px-3 py-2.5 border-b border-surface-dim/50 bg-surface/50">
                    <div className="flex gap-3 text-on-surface">
                      <button className="font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-surface-dim/50">B</button>
                      <button className="italic font-serif w-6 h-6 flex items-center justify-center rounded hover:bg-surface-dim/50">I</button>
                      <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-dim/50">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-bold">
                       <button className="text-secondary flex items-center gap-1 hover:text-secondary/80">
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>
                         翻译
                       </button>
                       <span className="text-outline">保存中...</span>
                    </div>
                 </div>
                 <textarea 
                   className="p-3 w-full text-[13px] text-on-surface-variant leading-relaxed min-h-[140px] font-serif italic outline-none resize-none" 
                   value={draftContent}
                   onChange={(e) => setDraftContent(e.target.value)}
                 />
              </div>
            </div>
         </div>

         {/* Locked Accordion */}
         <div className="bg-surface-container-lowest opacity-60 rounded-2xl p-4 shadow-sm border border-surface-dim/30 flex items-center justify-between cursor-not-allowed">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-surface-container-high text-outline flex items-center justify-center shrink-0">
                <Sigma className="w-3.5 h-3.5" />
              </div>
              <div>
                 <h4 className="font-bold text-sm text-on-surface-variant">模型建立</h4>
                 <div className="text-xs font-medium text-on-surface-variant mt-0.5">排队中 · 0 字</div>
              </div>
            </div>
            <Lock className="w-4 h-4 text-outline" />
         </div>

         {/* Pending Accordion */}
         <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-surface-container-high text-outline flex items-center justify-center shrink-0">
                 <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                 <h4 className="font-bold text-sm">符号说明</h4>
                 <div className="text-xs text-on-surface-variant font-medium mt-0.5">未开始</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
               <button className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-blue-100 transition-colors">
                  <FileText className="w-3.5 h-3.5" /> 导出 Word
               </button>
               <button className="px-3 py-1.5 bg-surface-container text-on-surface text-[11px] font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-surface-dim/50 transition-colors">
                  <FileJson className="w-3.5 h-3.5" /> 导出 MD
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
