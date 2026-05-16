import { Search, MapPin, BrainCog, Activity, Leaf, ShoppingCart } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function CasesScreen({ navigate, highlightId }: any) {
  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-background">
      <TopBar title="案例练习库" onBack={() => navigate('models')} />
      
      {highlightId && (
        <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl mt-4 mb-2">
           <h3 className="text-primary font-bold">针对您刚学习的课程，推荐以下实战案例：</h3>
           <p className="text-sm font-medium mt-1">您可以应用刚刚学到的知识来解决该问题。</p>
        </div>
      )}

      <p className="text-on-surface-variant font-medium text-sm mt-4 mb-4">
        通过我们精心挑选的学术案例研究，掌握真实世界的建模挑战。今天就开始提升你的分析技能。
      </p>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
        <input 
          type="text" 
          placeholder="搜索案例标题、主题或模型..." 
          className="w-full bg-surface-container-lowest border border-surface-dim/50 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 shadow-sm transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 mb-2">
         <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap shadow-sm">全部挑战</button>
         <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">简单</button>
         <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">中等</button>
         <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">困难</button>
      </div>

      <div className="space-y-4">
        
        {/* Main large card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-dim/30 hover:shadow-md transition-shadow relative overflow-hidden">
           <div className="p-4 bg-tertiary/5 border-b border-surface-dim/30">
              <div className="flex gap-2 mb-3">
                 <span className="px-2 py-1 bg-tertiary text-white rounded-full text-[10px] font-bold">新发布</span>
                 <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold">物流</span>
              </div>
              <h2 className="text-xl font-bold mb-2">城市物流效率：特大城市最后一公里</h2>
              <p className="text-sm font-medium text-on-surface-variant mb-4">
                在模拟的高密度环境中优化配送路线。使用图论和概率模型将碳足迹减少15%。
              </p>
              <div className="space-y-1.5 mb-4">
                 <div className="flex items-center gap-2 text-sm">
                   <Activity className="w-4 h-4 text-outline" /> 难度: <span className="text-secondary font-bold">高阶</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-on-surface">
                   <MapPin className="w-4 h-4 text-outline" /> 模型: 贝尔曼-福特算法, 马尔可夫链
                 </div>
              </div>
              <button className="w-full bg-secondary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md">
                 开始练习 <span>&rarr;</span>
              </button>
           </div>
           <div className="h-40 bg-gray-200">
             <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="city" />
           </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-4 shadow-sm border border-secondary/20 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[200%] animate-[shimmer_3s_infinite] pointer-events-none opacity-50"></div>
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2">
                <BrainCog className="w-4 h-4 text-secondary" />
                <span className="text-sm font-bold text-secondary">AI推荐</span>
             </div>
             <h3 className="font-bold text-base mb-2">预测性健康分析</h3>
             <p className="text-xs text-on-surface-variant font-medium mb-4">
               基于你最近在统计学方面的进展，这个案例将帮助你弥补回归分析的不足。
             </p>
             <div className="flex justify-between text-xs font-bold mb-1">
               <span>相关性</span>
               <span>94%</span>
             </div>
             <div className="h-1.5 w-full bg-surface-dim/40 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[94%] shadow-[0_0_8px_rgba(99,44,229,0.5)]"></div>
             </div>
           </div>
        </div>

        {/* Card items */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30">
           <div className="flex justify-between items-start mb-2">
             <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
             </div>
             <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold">经济学</span>
           </div>
           <h3 className="font-bold text-base mb-1">股市波动分析</h3>
           <p className="text-sm text-on-surface-variant font-medium mb-3">分析标普500历史数据，使用GARCH模型识别模式。</p>
           <div className="flex flex-wrap gap-2 mb-4">
              <span className="border border-surface-dim text-xs px-2 py-0.5 rounded font-medium">中等</span>
              <span className="border border-surface-dim text-xs px-2 py-0.5 rounded font-medium">时间序列</span>
           </div>
           <button className="w-full bg-surface-container-high py-2 rounded-xl text-primary font-bold text-sm">开始案例</button>
        </div>
      </div>
    </div>
  );
}
