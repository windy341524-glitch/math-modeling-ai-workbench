import { Settings, BookOpen, Activity, Play, Sigma, ActivityIcon, ArrowUpRight, BarChart, FileEdit } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function ProfileScreen({ navigate }: any) {
  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-surface">
      <TopBar title="个人中心" onBack={() => navigate('home')} rightElement={<button className="p-0.5"><Settings className="w-6 h-6 text-on-surface-variant" /></button>} />
      
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-dim/30 mb-6 flex flex-col items-center mt-4">
         <div className="w-24 h-24 rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden relative mb-4">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" className="w-full h-full object-cover" />
            <div className="absolute bottom-1 right-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
               <span className="w-1.5 h-1.5 bg-white rounded-full inline-block animate-pulse"></span> 7 天
            </div>
         </div>
         <h2 className="text-2xl font-bold text-on-surface mb-1">Alex Rivers</h2>
         <div className="text-sm text-on-surface-variant font-medium mb-4">高级 AI 研究员 • 24 级</div>
         
         <div className="w-full mt-2">
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden mb-2">
               <div className="h-full bg-secondary w-[82%] rounded-full shadow-[0_0_8px_rgba(99,44,229,0.5)]"></div>
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant font-medium">
               <span>下一级</span>
               <span>1,240 / 1,500 经验值</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
               <BookOpen className="w-5 h-5 text-on-surface-variant" />
            </div>
            <div>
               <div className="text-[10px] text-on-surface-variant font-bold">已完成</div>
               <div className="text-lg font-bold">42 课程</div>
            </div>
         </div>
         <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
               <Sigma className="w-5 h-5" />
            </div>
            <div>
               <div className="text-[10px] text-on-surface-variant font-bold">模型</div>
               <div className="text-lg font-bold">18 已追踪</div>
            </div>
         </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-dim/30 mb-8 relative">
         <div className="flex justify-between items-start mb-4">
           <div className="flex items-center gap-2 text-secondary font-bold">
              <ActivityIcon className="w-5 h-5" /> AI 使用摘要
           </div>
           <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold">本周</span>
         </div>
         <p className="text-sm font-medium text-on-surface-variant mb-6 leading-relaxed">
           本周您生成了 <span className="font-bold text-primary">128</span> 条见解并起草了 <span className="font-bold text-primary">4</span> 个论文结构。您的首要兴趣是 <span className="font-bold text-secondary">神经架构</span>。
         </p>
         
         <div className="grid grid-cols-3 gap-2">
            <div>
               <div className="flex items-center gap-1 text-[10px] text-on-surface-variant mb-1 font-bold">
                 <BarChart className="w-3 h-3" /> 效率
               </div>
               <div className="text-lg font-bold text-primary">+14%</div>
            </div>
            <div className="border-l border-surface-dim/50 pl-3">
               <div className="flex items-center gap-1 text-[10px] text-on-surface-variant mb-1 font-bold">
                 <Activity className="w-3 h-3" /> AI 节省
               </div>
               <div className="text-lg font-bold text-primary">3.2h</div>
            </div>
            <div className="border-l border-surface-dim/50 pl-3">
               <div className="flex items-center gap-1 text-[10px] text-on-surface-variant mb-1 font-bold">
                 <BarChart className="w-3 h-3" /> 复杂度
               </div>
               <div className="text-lg font-bold text-primary">高</div>
            </div>
         </div>
      </div>

      <h3 className="text-xl font-bold mb-4">保存的内容</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="bg-primary text-white rounded-3xl p-5 shadow-sm relative overflow-hidden h-48 flex flex-col justify-end cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('prompts')}>
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
               <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">保存的提示词</h4>
            <div className="text-xs text-white/70">24 项</div>
         </div>
         <div className="flex flex-col gap-4 h-48">
            <div className="flex-1 bg-surface-container-high rounded-3xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
               <div className="flex items-center gap-2 text-on-surface">
                 <FileEdit className="w-4 h-4 text-primary" />
                 <div>
                   <h4 className="font-bold text-sm">草稿</h4>
                   <div className="text-[10px] text-on-surface-variant">3 待处理</div>
                 </div>
               </div>
               <ArrowUpRight className="w-4 h-4 text-outline" />
            </div>
            <div className="flex-1 bg-surface-dim rounded-3xl p-4 shadow-sm flex items-center justify-between text-on-surface cursor-pointer hover:bg-surface-dim/80 transition-colors">
               <div className="flex items-center gap-2">
                 <Play className="w-4 h-4 text-on-surface-variant" />
                 <div>
                   <h4 className="font-bold text-sm">历史记录</h4>
                   <div className="text-[10px] text-on-surface-variant">完整日志</div>
                 </div>
               </div>
               <ArrowUpRight className="w-4 h-4 text-outline" />
            </div>
         </div>
      </div>
      
      <button className="w-full bg-surface-container-lowest py-4 rounded-2xl shadow-sm border border-surface-dim/30 font-bold text-on-surface flex justify-between items-center px-4 mb-8">
         <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-outline" /> 编辑账户详情</span>
         <ArrowUpRight className="w-4 h-4 text-outline" />
      </button>

    </div>
  );
}
