import { Search, Heart, Share2, BarChart2, Network, BookOpen, Zap } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function ModelsScreen({ navigate }: any) {
  return (
    <div className="pt-24 px-4 pb-24 min-h-screen bg-background">
      <TopBar onProfile={() => navigate('profile')} />

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 mb-2">
         <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap shadow-sm">全部模型</button>
         <button onClick={() => navigate('code')} className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">代码模板</button>
         <button onClick={() => navigate('playground')} className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">代码沙箱</button>
         <button onClick={() => navigate('cases')} className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">案例练习库</button>
         <button onClick={() => navigate('prompts')} className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">提示词库</button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
        <input 
          type="text" 
          placeholder="搜索数学模型..." 
          className="w-full bg-surface-container-lowest border border-surface-dim/50 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 shadow-sm transition-colors"
        />
      </div>

      <div className="bg-surface-container-lowest rounded-3xl p-1 mb-6 shadow-sm border border-surface-dim/30">
         <div className="h-36 rounded-t-[22px] bg-gradient-to-br from-primary to-secondary relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
         </div>
         <div className="p-4 grid grid-cols-2 gap-3 -mt-10 relative z-10">
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/20 hover:shadow-md transition-shadow cursor-pointer">
               <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                 <BarChart2 className="w-4 h-4" />
               </div>
               <div className="font-bold text-sm">预测模型</div>
               <div className="text-[10px] text-on-surface-variant">12个模型</div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/20 hover:shadow-md transition-shadow cursor-pointer">
               <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-3">
                 <Network className="w-4 h-4" />
               </div>
               <div className="font-bold text-sm">图论模型</div>
               <div className="text-[10px] text-on-surface-variant">8个模型</div>
            </div>
         </div>
      </div>

      <div onClick={() => navigate('model_lesson', { categoryId: 'evaluation' })} className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-dim/30 mb-4 relative overflow-hidden group cursor-pointer">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
         <div className="absolute top-4 right-4 text-outline/40 z-10">
           <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition-colors" />
         </div>
         <div className="relative z-10">
           <h3 className="text-xl font-bold mb-1">评价模型 (Evaluation)</h3>
           <div className="text-xs font-bold text-on-surface-variant mb-1 mt-2">包含模型</div>
           <p className="text-sm text-on-surface-variant mb-4 leading-relaxed font-medium">
             AHP, 熵权法, TOPSIS, 灰色关联, 模糊综合评价等
           </p>
           <div className="flex gap-2 mb-6">
             <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> 7 节课程
             </span>
           </div>
           <div className="flex gap-3 mt-auto">
             <button className="flex-1 bg-secondary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-secondary/90 transition-colors active:scale-95">
               <BookOpen className="w-4 h-4" /> 开始学习 (Start Learning)
             </button>
             <button className="w-12 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-dim/50 transition-colors" onClick={(e) => { e.stopPropagation(); navigate('cases'); }}>
               <Zap className="w-5 h-5 text-primary" />
             </button>
           </div>
         </div>
      </div>

      <div onClick={() => navigate('model_lesson', { categoryId: 'optimization' })} className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-dim/30 hover:shadow-md transition-shadow cursor-pointer">
         <div className="flex justify-between items-start mb-2">
           <div>
             <h3 className="font-bold text-xl flex items-center gap-2">
               优化模型 (Optimization)
             </h3>
             <div className="text-xs text-on-surface-variant italic mb-3 font-serif">Linear & Nonlinear Programming</div>
           </div>
           <Heart className="w-5 h-5 text-outline hover:text-red-500 transition-colors" />
         </div>
         <div className="text-xs font-bold text-on-surface-variant mb-1">包含模型</div>
         <p className="text-sm text-on-surface-variant mb-4 font-medium">线性规划, 整数规划, 动态规划, 遗传算法, 粒子群等</p>
         <div className="flex gap-2 mb-5">
           <span className="px-2 py-1 bg-tertiary-container/30 text-tertiary rounded-full text-[10px] font-bold flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div> 9 节课程
           </span>
         </div>
         <button className="w-full bg-surface-container-high py-3 rounded-xl font-bold text-on-surface flex items-center justify-center gap-2 hover:bg-surface-dim/50 transition-colors">
            <BookOpen className="w-4 h-4" /> 开始学习 (Start Learning)
         </button>
      </div>

    </div>
  );
}
