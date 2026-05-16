import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, CheckCircle, 
  ChevronLeft, ChevronRight, Play, Brain, 
  Sparkles, Moon, Sun, Type, Search, Layout
} from 'lucide-react';
import TopBar from '../components/TopBar';
import AIChatModal from '../components/AIChatModal';

const CHAPTERS = [
  {
    id: 1,
    title: '第一章：线性规划',
    pages: [
      {
        title: '线性规划的基础',
        explanation: '线性规划是研究在线性约束条件下，使线性目标函数达到极值的问题。在数学建模中，最常用于资源分配、生产计划等决策问题。',
        formula: 'min/max c^T x, s.t. Ax ≤ b, x ≥ 0',
        example: '工厂生产A、B两种产品，消耗不同原材料，利润不同。如何在原料限制下安排生产使得总利润最大。',
        application: '利用MATLAB的 linprog 函数或 Python 的 scipy.optimize.linprog 可以直接求解此类问题。',
        takeaway: '所有关系都是线性的，且变量通常要求非负。寻找最优解就是寻找可行域（多面体）的顶点。',
        quiz: { question: '线性规划的最优解一定出现在可行域的什么地方？', options: ['内部', '顶点（或边界上）', '原点'], answer: 1 }
      }
    ]
  },
  {
    id: 2,
    title: '第二章：整数规划',
    pages: [
      {
        title: '引入离散变量的规划',
        explanation: '在很多实际问题中，变量必须是整数。例如机器的台数、人员的个数。如果变量只能取0或1，就称为0-1规划。',
        formula: 'x_i \\in \\mathbb{Z}',
        example: '背包问题：给定一组物品，每个物品有重量和价值，在不超过背包最大承重的前提下，选择物品使得总价值最大。',
        application: '0-1规划极其适合解决指派问题（人员分配）、选址问题以及网络设计问题。',
        takeaway: '增加整数约束会使得求解难度大幅增加，常用的求解算法包括分支定界法和割平面法。',
        quiz: { question: '求解整数规划问题最经典且常用的精确算法是什么？', options: ['单纯形法', '分支定界法', '牛顿法'], answer: 1 }
      }
    ]
  },
  {
    id: 3,
    title: '第三章：非线性规划',
    pages: [
      {
        title: '目标或约束中包含非线性',
        explanation: '如果目标函数或约束条件中至少有一个是非线性函数，则该问题为非线性规划问题。现实世界中，成本常常是平方关系，收益常常是对数关系。',
        formula: '\\min f(x), s.t. h_i(x) = 0, g_j(x) \\le 0',
        example: '投资组合优化（Markowitz模型）中，目标是最小化风险（方差，即二次型），同时要求期望收益达到某个下限。',
        application: '使用二次规划（Quadratic Programming）或者序列二次规划（SQP）方法求解。在MATLAB中常用 fmincon。',
        takeaway: '非线性规划可能会陷入局部最优，凸优化（Convex Optimization）是其研究的核心，因为凸问题保证了局部最优即全局最优。',
        quiz: { question: '什么样的非线性规划问题可以保证找到的局部最优解就是全局最优解？', options: ['整数规划', '凸规划', '无约束规划'], answer: 1 }
      }
    ]
  },
  {
    id: 4,
    title: '第四章：图与网络模型',
    pages: [
      {
        title: '节点与边的关系',
        explanation: '图论模型将实体抽象为节点，实体间的关系抽象为边。它能极好地模拟交通网络、通信网络以及社交网络。',
        formula: 'G = (V, E)',
        example: '寻找两个城市之间的最短路径，或者在多个仓库与客户之间寻找运费最低的运输方案。',
        application: '经典算法如 Dijkstra 算法求最短路，Kruskal 算法求最小生成树。网络流算法(最大流最小割)也是其核心。',
        takeaway: '当问题可以画成点和连线的形态时，首先考虑能否转化为最短路、最小生成树或最大流问题。',
        quiz: { question: '常用于求解两个节点之间最短路径的经典算法是？', options: ['Dijkstra算法', 'Kruskal算法', 'PCA算法'], answer: 0 }
      }
    ]
  },
  {
    id: 5,
    title: '第五章：插值与拟合',
    pages: [
      {
        title: '从散点到连续函数',
        explanation: '当我们只拥有一组离散的数据点时，我们需要构造一个连续函数来预测未知点的值。插值要求曲线必须经过所有已知点，拟合只要求曲线整体上最接近这些点。',
        formula: '\\min \\sum (y_i - f(x_i))^2',
        example: '已知某地区过去5年的GDP数据，预测下一年的GDP。如果数据存在噪声，通常使用最小二乘拟合。',
        application: '样条插值（如三次样条）可以得到平滑的曲线。多项式拟合或指数拟合常用于发现数据背后的宏观规律。',
        takeaway: '不能盲目追求高阶多项式，否则会产生“龙格现象”（过拟合），导致预测能力极差。',
        quiz: { question: '拟合最常用的优化准则是什么？', options: ['最大似然', '最小二乘法', '拉格朗日乘数'], answer: 1 }
      }
    ]
  },
  {
    id: 6,
    title: '第六章：微分方程模型',
    pages: [
      {
        title: '刻画动态演变',
        explanation: '对于复杂系统的动态演变过程，微分方程可以通过反映变量与其变化率之间的关系来进行建模。',
        formula: '\\frac{dx}{dt} = f(x, t)',
        example: '著名的SIR传染病模型，将人群分为易感者(S)、感染者(I)和恢复者(R)，通过常微分方程组描述三者数量的动态转化。',
        application: '微分方程往往难以求得解析解，因此在建模时常使用欧拉法或龙格-库塔法（Runge-Kutta）进行计算机数值求解（如 MATLAB 的 ode45）。',
        takeaway: '微分方程是物理、生物工程最基础的建模语言，关键在于确定各变量之间的“变化率”关系。',
        quiz: { question: '在MATLAB中，最常用的求解常微分方程组(ODE)数值解的函数是？', options: ['fmincon', 'ode45', 'linprog'], answer: 1 }
      }
    ]
  },
  {
    id: 7,
    title: '第七章：综合评价方法',
    pages: [
      {
        title: '多指标的客观量化评判',
        explanation: '评价一个对象（如水质好坏、员工绩效）往往需要考察多个指标。综合评价通过赋予指标权重并进行聚合，得出一个综合得分。',
        formula: 'S = \\sum_{i=1}^n w_i x_i',
        example: '评选最优供应商，需要考虑价格、质量、交货期、售后服务等维度。',
        application: '常用方法包括：层次分析法(AHP)、模糊综合评价法(FCE)、数据包络分析(DEA)和逼近理想解排序法(TOPSIS)。',
        takeaway: '评价的核心是“权重”的确定。AHP是主观确权，而熵权法或PCA是客观确权。主客观结合往往更有说服力。',
        quiz: { question: '在层次分析法(AHP)中，为保证判断矩阵逻辑不矛盾，必须进行什么检验？', options: ['显著性检验', '一致性检验', '独立性检验'], answer: 1 }
      }
    ]
  },
  {
    id: 8,
    title: '第八章：启发式算法',
    pages: [
      {
        title: '模拟自然的智能寻优',
        explanation: '对于NP-Hard问题（如大规模的TSP问题），精确算法需要的时间随规模呈指数爆炸。启发式算法模仿自然规律，能在可接受的时间内找到一个近似最优解。',
        formula: 'P = \\exp(-\\Delta E / T)',
        example: '模拟退火（模拟金属冷却）、遗传算法（模拟生物进化法则）、蚁群算法（模拟蚂蚁寻找食物路径）。',
        application: '在极为复杂的调度问题、路由问题、神经网络超参数搜索中有着不可替代的作用。',
        takeaway: '启发式算法不保证能找到全局最优解，但它是解决极度复杂问题的最后杀手锏。',
        quiz: { question: '“依靠交叉(Crossover)和变异(Mutation)来产生新解”是哪种算法的核心机制？', options: ['遗传算法', '模拟退火', '粒子群算法'], answer: 0 }
      }
    ]
  }
];

export default function BookAlgorithmScreen({ navigate }: any) {
  // State
  const [view, setView] = useState<'toc' | 'reader'>('toc');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // within chap
  
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [quizAnswered, setQuizAnswered] = useState<Record<string, number>>({});
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Settings state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showSettings, setShowSettings] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem('algobook_completed');
    const savedBookmarks = localStorage.getItem('algobook_bookmarks');
    const savedChapter = localStorage.getItem('algobook_chapter');
    const savedPage = localStorage.getItem('algobook_page');
    const savedQuizzes = localStorage.getItem('algobook_quizzes');
    
    if (savedCompleted) setCompletedChapters(JSON.parse(savedCompleted));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedChapter) setCurrentChapter(Number(savedChapter));
    if (savedPage) setCurrentPage(Number(savedPage));
    if (savedQuizzes) setQuizAnswered(JSON.parse(savedQuizzes));
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('algobook_completed', JSON.stringify(completedChapters));
    localStorage.setItem('algobook_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('algobook_chapter', String(currentChapter));
    localStorage.setItem('algobook_page', String(currentPage));
    localStorage.setItem('algobook_quizzes', JSON.stringify(quizAnswered));
  }, [completedChapters, bookmarks, currentChapter, currentPage, quizAnswered]);

  const getCurrentProgressKey = () => `${currentChapter}-${currentPage}`;

  // Handlers
  const openChapter = (chapIndex: number) => {
    setCurrentChapter(chapIndex);
    setCurrentPage(0);
    setView('reader');
  };

  const markCurrentChapterCompleted = () => {
    if (!completedChapters.includes(currentChapter)) {
      setCompletedChapters([...completedChapters, currentChapter]);
    }
  };

  const nextPage = () => {
    const chap = CHAPTERS[currentChapter];
    if (currentPage < chap.pages.length - 1) {
      setCurrentPage(c => c + 1);
      window.scrollTo(0, 0);
    } else if (currentChapter < CHAPTERS.length - 1) {
      markCurrentChapterCompleted();
      setCurrentChapter(c => c + 1);
      setCurrentPage(0);
      window.scrollTo(0, 0);
    } else {
      markCurrentChapterCompleted();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(c => c - 1);
      window.scrollTo(0, 0);
    } else if (currentChapter > 0) {
      setCurrentChapter(c => c - 1);
      setCurrentPage(CHAPTERS[currentChapter - 1].pages.length - 1);
      window.scrollTo(0, 0);
    }
  };

  const toggleBookmark = () => {
    const key = getCurrentProgressKey();
    if (bookmarks.includes(key)) {
      setBookmarks(bookmarks.filter(b => b !== key));
    } else {
      setBookmarks([...bookmarks, key]);
    }
  };

  const handleQuizAnswer = (chapIdx: number, pageIdx: number, answerIdx: number) => {
    const key = `${chapIdx}-${pageIdx}`;
    if (quizAnswered[key] === undefined) {
      setQuizAnswered(prev => ({ ...prev, [key]: answerIdx }));
      const correctAns = CHAPTERS[chapIdx].pages[pageIdx].quiz.answer;
      if (answerIdx === correctAns) {
        if (pageIdx === CHAPTERS[chapIdx].pages.length - 1) {
          markCurrentChapterCompleted();
        }
      }
    }
  };

  const currentBookChapter = CHAPTERS[currentChapter];
  const currentPageData = currentBookChapter.pages[currentPage];
  const progressPercent = Math.round((completedChapters.length / CHAPTERS.length) * 100);

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-sm leading-relaxed';
    if (fontSize === 'large') return 'text-lg leading-loose';
    return 'text-base leading-loose';
  };

  if (view === 'toc') {
    return (
      <div className="min-h-screen pt-20 pb-24 px-4 font-sans bg-background">
        <TopBar title="智能教材系统" onBack={() => navigate('learn')} />
        
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-dim/30 mt-4 h-full min-h-[70vh]">
          {/* Header */}
          <div className="text-center mb-8 border-b border-surface-dim/50 pb-6 relative">
            <h1 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              《数学建模算法与应用》
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 font-medium">作者：司守奎、孙兆亮 / 国防工业出版社</p>
            
            {/* Progress Badge */}
            <div className="mt-4 flex flex-col items-center">
               <div className="w-full max-w-[200px] h-2 bg-surface-dim rounded-full overflow-hidden">
                 <div className="h-full bg-secondary" style={{ width: `${progressPercent}%` }}></div>
               </div>
               <span className="text-xs text-on-surface-variant mt-2">阅读进度 {progressPercent}% ({completedChapters.length}/{CHAPTERS.length})</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-6">
              <button 
                onClick={() => setView('reader')}
                className="bg-secondary hover:bg-secondary-hover text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" /> 继续阅读
              </button>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="space-y-3">
             <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold flex items-center gap-2"><Layout className="w-5 h-5"/> 目录 (Chapters)</h2>
                <button className="p-1"><Search className="w-4 h-4 text-on-surface-variant" /></button>
             </div>

             {CHAPTERS.map((ch, idx) => {
               const isCompleted = completedChapters.includes(idx);
               const isCurrent = currentChapter === idx;

               return (
                 <div 
                   key={ch.id} 
                   onClick={() => openChapter(idx)}
                   className={`p-4 rounded-xl flex items-center justify-between cursor-pointer border transition-all ${
                     isCurrent ? 'bg-secondary/5 border-secondary/30 ring-1 ring-secondary/20' : 
                     'bg-surface-container-low hover:bg-surface-container border-transparent'
                   }`}
                 >
                   <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-green-100 text-green-600' : 
                        isCurrent ? 'bg-secondary text-white' : 'bg-surface-container-high text-on-surface-variant'
                      }`}>
                         {isCompleted ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-bold">{ch.id}</span>}
                      </div>
                      <span className={`font-medium ${isCurrent ? 'text-secondary' : 'text-on-surface'}`}>
                        {ch.title}
                      </span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-outline" />
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    );
  }

  const isDark = isDarkMode;
  const currentKey = getCurrentProgressKey();
  const qAns = quizAnswered[currentKey];

  return (
    <div className={`min-h-screen pt-16 pb-24 font-serif transition-colors duration-300 ${isDark ? 'bg-[#121212] text-gray-200' : 'bg-[#FAFAFA] text-gray-800'}`}>
      
      {/* Reader Navbar */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 flex items-center justify-between px-4 h-16 border-b transition-colors ${
        isDark ? 'bg-[#1a1a1a]/95 border-gray-800' : 'bg-white/95 border-gray-200'
      } backdrop-blur-md`}>
         <div className="flex items-center gap-4">
           <button onClick={() => setView('toc')} className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div className="flex flex-col">
             <span className="text-xs font-sans font-bold text-secondary">
               {currentBookChapter.title}
             </span>
             <span className="text-[10px] font-sans font-medium opacity-60">
               第 {currentPage + 1} 页, 共 {currentBookChapter.pages.length} 页
             </span>
           </div>
         </div>
         <div className="flex items-center gap-2">
           <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <Type className="w-5 h-5" />
           </button>
           <button onClick={toggleBookmark} className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <Bookmark className={`w-5 h-5 ${bookmarks.includes(currentKey) ? 'fill-secondary text-secondary' : ''}`} />
           </button>
         </div>
      </div>

      {/* Settings Modal overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)}>
          <div 
            className={`absolute top-16 right-4 p-4 rounded-2xl shadow-xl w-64 border ${
              isDark ? 'bg-[#2a2a2a] border-gray-700' : 'bg-white border-gray-100'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4">
              <span className="text-xs font-sans font-bold uppercase opacity-50 mb-2 block">主题外观</span>
              <div className="flex bg-black/5 p-1 rounded-xl">
                <button onClick={() => setIsDarkMode(false)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-sans font-medium ${!isDark ? 'bg-white shadow text-black' : 'text-gray-500'}`}><Sun className="w-4 h-4"/> 浅色</button>
                <button onClick={() => setIsDarkMode(true)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-sans font-medium ${isDark ? 'bg-[#1e1e1e] shadow text-white' : 'text-gray-500'}`}><Moon className="w-4 h-4"/> 深色</button>
              </div>
            </div>
            <div>
              <span className="text-xs font-sans font-bold uppercase opacity-50 mb-2 block">字体大小</span>
              <div className="flex justify-between items-center bg-black/5 p-1 rounded-xl">
                <button onClick={() => setFontSize('small')} className={`flex-1 py-1.5 rounded-lg text-sm ${fontSize === 'small' ? (isDark ? 'bg-[#1e1e1e] shadow text-white' : 'bg-white shadow text-black') : 'opacity-60'}`}>A-</button>
                <button onClick={() => setFontSize('medium')} className={`flex-1 py-1.5 rounded-lg text-base ${fontSize === 'medium' ? (isDark ? 'bg-[#1e1e1e] shadow text-white' : 'bg-white shadow text-black') : 'opacity-60'}`}>A</button>
                <button onClick={() => setFontSize('large')} className={`flex-1 py-1.5 rounded-lg text-lg ${fontSize === 'large' ? (isDark ? 'bg-[#1e1e1e] shadow text-white' : 'bg-white shadow text-black') : 'opacity-60'}`}>A+</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reader Content */}
      <div className="px-6 py-8 max-w-[600px] mx-auto min-h-screen">
         <h1 className="text-2xl font-bold mb-6 font-sans">
           {currentPageData.title}
         </h1>

         <article className={`space-y-6 ${getFontSizeClass()} text-justify tracking-wide`}>
            <p className="indent-8 opacity-90">{currentPageData.explanation}</p>
         </article>

         {/* Interactive Components */}
         <div className="mt-10 space-y-6 font-sans">
            
            {/* Core Idea */}
            <div className={`p-5 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-indigo-50/80 border border-indigo-100'}`}>
              <h4 className={`font-bold flex items-center gap-2 mb-2 ${isDark ? 'text-indigo-400' : 'text-indigo-800'}`}>
                <Brain className="w-5 h-5" /> 核心结论 (Takeaway)
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-indigo-900/80'} font-medium`}>
                {currentPageData.takeaway}
              </p>
            </div>

            {/* Application & Formula */}
            <div className={`p-5 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-purple-50/80 border border-purple-100'}`}>
              <h4 className={`font-bold flex items-center gap-2 mb-3 ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>
                <Sparkles className="w-5 h-5" /> 概念扩展与示例
              </h4>
              <div className="space-y-3">
                {currentPageData.formula && (
                  <div>
                    <span className={`text-xs font-bold uppercase block mb-1 ${isDark ? 'text-purple-500/70' : 'text-purple-800/50'}`}>相关公式</span>
                    <code className={`px-2 py-1 rounded text-sm inline-block ${isDark ? 'bg-[#1a1a1a] text-purple-300' : 'bg-white text-purple-700 shadow-sm'}`}>{currentPageData.formula}</code>
                  </div>
                )}
                <div>
                  <span className={`text-xs font-bold uppercase block mb-1 ${isDark ? 'text-purple-500/70' : 'text-purple-800/50'}`}>简单示例</span>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-purple-900/90'}`}>{currentPageData.example}</p>
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase block mb-1 ${isDark ? 'text-purple-500/70' : 'text-purple-800/50'}`}>在数学建模中的应用</span>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-purple-900/90'} font-medium`}>{currentPageData.application}</p>
                </div>
              </div>
            </div>

            {/* Quiz Section */}
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200 shadow-sm'} mt-8`}>
               <h4 className="font-bold flex items-center gap-2 mb-4 text-base">
                 🎯 检查理解
               </h4>
               <p className="text-sm mb-4 font-medium opacity-90">{currentPageData.quiz.question}</p>
               
               <div className="space-y-3">
                 {currentPageData.quiz.options.map((option, idx) => {
                   const isSelected = qAns === idx;
                   const isCorrect = idx === currentPageData.quiz.answer;
                   const showStatus = qAns !== undefined;
                   
                   let buttonClass = isDark ? 'bg-[#2a2a2a] hover:bg-[#333]' : 'bg-surface-container-low hover:bg-surface-container';
                   
                   if (showStatus) {
                     if (isCorrect) buttonClass = 'bg-green-100 text-green-800 border-green-200 border shadow-sm';
                     else if (isSelected && !isCorrect) buttonClass = 'bg-red-100 text-red-800 border-red-200 border shadow-sm';
                   }

                   return (
                     <button
                       key={idx}
                       disabled={showStatus}
                       onClick={() => handleQuizAnswer(currentChapter, currentPage, idx)}
                       className={`w-full text-left p-3 rounded-xl text-sm transition-all ${buttonClass}`}
                     >
                       {option}
                       {showStatus && isCorrect && <CheckCircle className="w-4 h-4 inline float-right text-green-600" />}
                     </button>
                   );
                 })}
               </div>
               
               {qAns !== undefined && qAns === currentPageData.quiz.answer && (
                 <div className="mt-4 p-3 bg-secondary/10 text-secondary rounded-xl text-sm font-bold flex justify-center items-center gap-2">
                   <Sparkles className="w-4 h-4" /> 回答正确！你可以继续学习了。
                 </div>
               )}
            </div>

            {/* AI Action Buttons */}
            <div className="flex gap-3 pt-4 pb-12">
              <button 
                onClick={() => setIsAIChatOpen(true)}
                className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                isDark ? 'bg-secondary/20 text-secondary hover:bg-secondary/30' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
              }`}>
                <Brain className="w-4 h-4" /> AI 解释这段话
              </button>
              <button className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                isDark ? 'bg-surface-container-high text-gray-300 hover:bg-surface-dim' : 'bg-surface-dim text-gray-700 hover:bg-surface-dim/80'
              }`}>
                 <Type className="w-4 h-4" /> 生成更多例子
              </button>
            </div>
         </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 flex justify-between gap-4 border-t z-40 backdrop-blur-md ${
        isDark ? 'bg-[#1a1a1a]/95 border-gray-800' : 'bg-white/95 border-gray-200'
      }`}>
         <button 
           onClick={prevPage}
           disabled={currentChapter === 0 && currentPage === 0}
           className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 font-sans text-sm outline-none disabled:opacity-30 disabled:cursor-not-allowed bg-transparent hover:bg-black/5 transition-colors"
         >
           <ChevronLeft className="w-4 h-4" /> 上一节
         </button>
         <button 
           onClick={nextPage}
           disabled={currentChapter === CHAPTERS.length - 1 && currentPage === CHAPTERS[CHAPTERS.length - 1].pages.length - 1}
           className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 font-sans text-sm shadow-md transition-transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
         >
           下一节 <ChevronRight className="w-4 h-4" />
         </button>
      </div>

      <AIChatModal 
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        feature="Code explanation"
        context={`当前学习内容：${currentPageData.title}\n\n介绍：${currentPageData.explanation}\n公式：${currentPageData.formula}\n例子：${currentPageData.example}`}
        initialPrompt="请帮我总结并通俗易懂地解释这段话的含义，特别是如何用代码来实现它："
      />
    </div>
  );
}
