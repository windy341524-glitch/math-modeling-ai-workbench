import { ArrowLeft, Play } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function PythonCourseScreen({ navigate }: any) {
  return (
    <div className="min-h-screen bg-background pt-20 pb-24 px-4 font-sans">
      <TopBar title="Python数据分析基础" onBack={() => navigate('learn')} />
      
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-dim/30 mb-6 mt-4">
        <h2 className="text-xl font-bold mb-2">第一章：NumPy 与多维数组</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
          在数学建模中，我们需要处理大规模矩阵和向量运算。NumPy 是 Python 科学计算的基础包，它提供了一个高性能的多维数组对象 <code className="bg-surface-dim px-1 rounded text-primary text-xs">ndarray</code>。
        </p>
        
        <div className="bg-[#1e1e1e] rounded-xl p-4 overflow-x-auto mb-4 font-mono text-[13px] text-gray-300 shadow-inner">
          <div className="text-gray-500 mb-1"># 导入numpy库并创建数组</div>
          <div><span className="text-blue-400">import</span> numpy <span className="text-blue-400">as</span> np</div>
          <div className="mt-2 text-gray-500"># 创建一个 2x3 的矩阵</div>
          <div>matrix <span className="text-pink-400">=</span> np.array([[<span className="text-orange-300">1</span>, <span className="text-orange-300">2</span>, <span className="text-orange-300">3</span>], [<span className="text-orange-300">4</span>, <span className="text-orange-300">5</span>, <span className="text-orange-300">6</span>]])</div>
          <div className="mt-2">print(matrix.shape) <span className="text-gray-500"># 输出: (2, 3)</span></div>
        </div>

        <h3 className="text-lg font-bold mb-2 mt-6">第二章：Pandas 数据清洗</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
          当处理国赛或美赛的真实数据集时，数据通常包含缺失值或噪声。Pandas 提供了 <code className="bg-surface-dim px-1 rounded text-primary text-xs">DataFrame</code> 用于快速操作表格数据。
        </p>

        <div className="bg-[#1e1e1e] rounded-xl p-4 overflow-x-auto mb-4 font-mono text-[13px] text-gray-300 shadow-inner">
          <div><span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd</div>
          <div className="mt-2 text-gray-500"># 读取 Excel 数据集</div>
          <div>df <span className="text-pink-400">=</span> pd.read_excel(<span className="text-green-300">'data.xlsx'</span>)</div>
          <div className="mt-2 text-gray-500"># 处理缺失值（使用均值填充）</div>
          <div>df.fillna(df.mean(), inplace<span className="text-pink-400">=</span><span className="text-blue-400">True</span>)</div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-surface-dim/30">
          <h3 className="text-lg font-bold mb-4">下一步 (Next Steps)</h3>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('playground', { initialTab: 'python', initialTemplateId: 'py-load-csv' })}
              className="w-full bg-[#ffc107] text-[#333] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] transition-transform"
            >
              <Play className="w-4 h-4" /> 打开 Python 沙箱 (Python Sandbox)
            </button>
            <button 
              onClick={() => navigate('playground', { initialTab: 'matlab', initialTemplateId: 'mat-matrix' })}
              className="w-full bg-[#0070bc] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] transition-transform"
            >
              <Play className="w-4 h-4" /> 打开 MATLAB 沙箱 (MATLAB Playground)
            </button>
            <button 
              onClick={() => navigate('matlab_course')}
              className="w-full bg-secondary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-secondary/90 transition-colors"
            >
               继续学习：MATLAB基础
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
