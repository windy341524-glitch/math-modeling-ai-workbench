import { Play, ArrowLeft } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function MatlabCourseScreen({ navigate }: any) {
  return (
    <div className="min-h-screen bg-background pt-20 pb-24 px-4 font-sans">
      <TopBar title="MATLAB 快速入门" onBack={() => navigate('learn')} />
      
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-dim/30 mb-6 mt-4">
        <div className="flex items-center gap-2 mb-4">
           <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded">第1版</span>
           <span className="text-xs text-on-surface-variant">MATLAB官方教程精简版</span>
        </div>
        
        <h2 className="text-xl font-bold mb-2">1. 矩阵运算基础</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
          MATLAB 的核心是矩阵（MATrix LABoratory）。无需定义维度即可进行高效的线性代数运算。
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto mb-4 font-mono text-[13px] text-slate-800 shadow-inner">
          <div className="text-slate-400 mb-1">% 定义矩阵 A 和 B</div>
          <div>A = [1 2 3; 4 5 6; 7 8 9];</div>
          <div>B = inv(A); <span className="text-slate-400">% 矩阵求逆</span></div>
          <div className="mt-2 text-slate-400">% 计算特征值和特征向量</div>
          <div>[V, D] = eig(A);</div>
        </div>

        <h3 className="text-lg font-bold mb-2 mt-6">2. 二维与三维数据可视化</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
          美观的图表是论文加分项。使用 <code className="bg-surface-dim px-1 rounded text-orange-600 text-xs">plot</code> 和 <code className="bg-surface-dim px-1 rounded text-orange-600 text-xs">surf</code> 进行快速可视化。
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto mb-4 font-mono text-[13px] text-slate-800 shadow-inner">
          <div className="text-slate-400">% 绘制三维曲面图</div>
          <div>[X,Y] = meshgrid(-2:0.1:2);</div>
          <div>Z = X.*exp(-X.^2 - Y.^2);</div>
          <div>surf(X,Y,Z)</div>
          <div>colormap <span className="text-purple-600">jet</span></div>
          <div>title(<span className="text-purple-600">'三维高斯曲面'</span>)</div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-surface-dim/30">
          <h3 className="text-lg font-bold mb-4">下一步 (Next Steps)</h3>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('playground', { initialTab: 'matlab', initialTemplateId: 'mat-matrix' })}
              className="w-full bg-[#0070bc] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] transition-transform"
            >
              <Play className="w-4 h-4" /> 打开 MATLAB 沙箱 (MATLAB Playground)
            </button>
            <button 
              onClick={() => navigate('playground', { initialTab: 'python', initialTemplateId: 'py-load-csv' })}
              className="w-full bg-[#ffc107] text-[#333] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] transition-transform"
            >
              <Play className="w-4 h-4" /> 打开 Python 沙箱 (Python Sandbox)
            </button>
            <button 
              onClick={() => navigate('model_lesson', { categoryId: 'evaluation' })}
              className="w-full bg-secondary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-secondary/90 transition-colors"
            >
               继续学习：评价类模型
            </button>
            <button 
              onClick={() => navigate('learn')}
              className="w-full bg-surface-container-high text-on-surface-variant py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-dim transition-colors"
            >
               <ArrowLeft className="w-4 h-4" /> 返回学习路线图
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
