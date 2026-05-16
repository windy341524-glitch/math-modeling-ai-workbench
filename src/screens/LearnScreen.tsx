import { Check, Lock, BookOpen, Calculator, Bot, Zap, ChevronRight, Activity } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function LearnScreen({ navigate }: any) {
  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-surface overflow-hidden">
      <TopBar onProfile={() => navigate('profile')} />
      
      {/* Background Gradients */}
      <div className="fixed -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="fixed top-1/2 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mb-8 relative z-10">
        <h2 className="text-2xl font-bold mb-3">学习路线图</h2>
        <div className="flex gap-2">
           <div className="px-3 py-1 bg-tertiary/10 text-on-surface-variant rounded-full text-xs font-medium flex items-center gap-1">
              <Activity className="w-3 h-3" /> 掌握程度：42%
           </div>
           <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" /> 连续学习 7 天
           </div>
        </div>
      </div>

      <div className="relative border-l-4 border-primary/20 ml-4 space-y-10 pb-10 z-10 border-dashed">
        
        {/* Step 1 */}
        <div className="relative pl-6">
          <div className="absolute -left-[18px] top-0.5 w-8 h-8 bg-tertiary text-white rounded-full flex items-center justify-center shadow-md">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-on-surface/50">1. 初学者准备</h3>
            <span className="text-sm font-medium text-tertiary">已完成</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative pl-6">
          <div className="absolute -left-[18px] top-0 w-8 h-8 bg-white border-4 border-secondary rounded-full shadow-lg z-10 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -left-[4px] top-8 bottom-[-40px] w-1 bg-secondary rounded-full"></div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">2. 数学基础</h3>
            <span className="text-sm font-bold text-secondary">进行中</span>
          </div>

          <div className="space-y-4">
            {/* Active Card */}
            <div onClick={() => navigate('math_foundation')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-secondary/30 rounded-2xl p-4 shadow-md relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
               <div className="flex gap-3">
                 <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold">概念：线性代数</h4>
                     <span className="material-symbols-outlined text-outline text-[18px]">more_vert</span>
                   </div>
                   <p className="text-xs text-on-surface-variant mb-4">向量空间与变换的基础。</p>
                   <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-surface-dim border-2 border-white flex items-center justify-center text-[8px] font-bold">AI</div>
                        <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[8px] font-bold">JP</div>
                      </div>
                      <button className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-1.5 rounded-xl text-xs font-medium shadow-md">继续</button>
                   </div>
                 </div>
               </div>
            </div>

            {/* Progress Card */}
            <div onClick={() => navigate('math_foundation')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[200%] animate-[shimmer_3s_infinite] pointer-events-none opacity-50"></div>
               <div className="flex gap-3 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5" />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold mb-2 text-sm">公式：矩阵运算</h4>
                   <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary w-[75%] rounded-full shadow-[0_0_8px_rgba(36,56,156,0.5)]"></div>
                   </div>
                   <div className="flex justify-between text-[10px] text-on-surface-variant">
                     <span>已完成 75%</span>
                     <span>预计：12分钟</span>
                   </div>
                 </div>
               </div>
            </div>

            {/* AI Action Card */}
            <div onClick={() => navigate('math_foundation')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-tertiary-container/10 text-tertiary flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">AI 问答：特征值</h4>
                   <p className="text-[10px] text-on-surface-variant">个性化测验已准备就绪</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative pl-6 pt-4">
          <div className="absolute -left-[17px] top-5 w-8 h-8 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
            <span className="font-bold text-xs">3</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">3. 编程工具</h3>
            <span className="text-sm font-medium text-tertiary">开放练习</span>
          </div>

          <div className="space-y-4">
            <div onClick={() => navigate('python_course')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-100/50 text-blue-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">Python 数据分析</h4>
                   <p className="text-[10px] text-on-surface-variant">Numpy / Pandas / Scipy 基础</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>

            <div onClick={() => navigate('matlab_course')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-orange-100/50 text-orange-600 flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">MATLAB 快速入门</h4>
                   <p className="text-[10px] text-on-surface-variant">矩阵运算与绘图基础</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative pl-6 pt-4">
          <div className="absolute -left-[17px] top-5 w-8 h-8 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
            <span className="font-bold text-xs">4</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">4. 常用算法模型</h3>
            <span className="text-sm font-medium text-tertiary">最新加入</span>
          </div>

          <div className="space-y-4">
             <div onClick={() => navigate('model_lesson', { categoryId: 'evaluation' })} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-purple-100/50 text-purple-600 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">评价类模型</h4>
                   <p className="text-[10px] text-on-surface-variant">层次分析法(AHP) / 熵权法 / TOPSIS</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>

            <div onClick={() => navigate('models')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-green-100/50 text-green-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">优化类模型</h4>
                   <p className="text-[10px] text-on-surface-variant">线性规划 / 遗传算法</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="relative pl-6 pt-4">
          <div className="absolute -left-[17px] top-5 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">5. 经典教材读物</h3>
            <span className="text-sm font-medium text-primary">已解锁图书</span>
          </div>

          <div className="space-y-4">
            <div onClick={() => navigate('book_math')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-indigo-100/50 text-indigo-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">《数学模型》(第五版)</h4>
                   <p className="text-[10px] text-on-surface-variant">姜启源 - 建模思维启蒙</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>

            <div onClick={() => navigate('book_algorithm')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-rose-100/50 text-rose-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">《数学建模算法与应用》</h4>
                   <p className="text-[10px] text-on-surface-variant">司守奎 - 算法字典与实战代码</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>

            <div onClick={() => navigate('book_or')} className="bg-surface-container-lowest/70 backdrop-blur-md border border-surface-dim/40 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-teal-100/50 text-teal-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm mb-0.5">《运筹学》(第四版)</h4>
                   <p className="text-[10px] text-on-surface-variant">清华大学出版社 - 规划理论基础</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40 group">
        <Zap className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform" />
      </button>

    </div>
  );
}
