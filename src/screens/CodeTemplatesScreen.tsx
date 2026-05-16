import { Download, Code2, Copy, FileCode, CheckCircle, Eye, Search } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function CodeTemplatesScreen({ navigate }: any) {
  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-surface">
      <TopBar title="代码模板" onBack={() => navigate('models')} />
      
      <div className="relative mb-4 mt-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
        <input 
          type="text" 
          placeholder="搜索模板 (如 'Gaussian', 'Regression')" 
          className="w-full bg-surface-container-lowest border border-surface-dim/50 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 shadow-sm transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 mb-2">
         <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap shadow-sm">全部</button>
         <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">Python</button>
         <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">MATLAB</button>
         <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">预处理</button>
         <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors rounded-full text-sm font-medium whitespace-nowrap">可视化</button>
      </div>

      <div className="space-y-4">
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-dim/30 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full z-0"></div>
           <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BarChart2Icon />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">K-Means 聚类</h3>
                   <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                     <Code2 className="w-3 h-3" /> Python / Scikit-learn
                   </div>
                 </div>
              </div>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold">中级</span>
           </div>
           <p className="text-sm text-on-surface-variant mb-4 font-medium relative z-10">
             带有肘部法则可视化和轮廓分析的 K-Means++ 标准化实现，用于学术数据集。
           </p>
           <div className="flex gap-2 relative z-10">
              <button 
                onClick={() => navigate('playground', { initialTab: 'python', initialTemplateId: 'py-kmeans' })}
                className="flex-1 bg-secondary text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md">
                 <Copy className="w-4 h-4" /> 沙箱运行
              </button>
              <button className="flex-1 bg-surface-container-high text-on-surface-variant py-2.5 rounded-xl font-bold flex items-center justify-center gap-2">
                 <FileCode className="w-4 h-4" /> 原理解析
              </button>
           </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-dim/30">
           <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                 <SigmaIcon />
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">初级</span>
           </div>
           <h3 className="font-bold text-lg mb-1">快速傅里叶变换</h3>
           <p className="text-sm text-on-surface-variant mb-4 font-medium">
             用于时间序列数据频谱分析的学术信号处理模板。
           </p>
           <button 
             onClick={() => navigate('playground', { initialTab: 'matlab', initialTemplateId: 'mat-matrix' })}
             className="w-full bg-surface-container-high text-on-surface-variant py-2.5 rounded-xl font-bold flex items-center justify-center gap-2">
              <Code2 className="w-4 h-4" /> 查看 MATLAB 代码
           </button>
        </div>
        
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-dim/30">
           <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                 <CheckCircle className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold">高级</span>
           </div>
           <h3 className="font-bold text-lg mb-1">LSTM 神经网络</h3>
           <p className="text-sm text-on-surface-variant mb-4 font-medium">
             气候建模中用于高精度序列预测的循环模型架构。
           </p>
           <div className="flex gap-2">
              <button 
                onClick={() => navigate('playground', { initialTab: 'python', initialTemplateId: 'py-preprocess' })}
                className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold flex items-center justify-center shadow-md">
                 在沙箱运行
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}

function BarChart2Icon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
}
function SigmaIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7V4H6l6 8-6 8h12v-3"></path></svg>;
}
