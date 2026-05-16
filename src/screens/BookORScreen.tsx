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
    title: '第一章：线性规划与单纯形法',
    pages: [
      {
        title: '运筹学的基石',
        explanation: '线性规划是运筹学中理论最成熟、应用最广泛的分支。单纯形法（Simplex Method）通过在多面体的顶点间迭代，寻找最优解。',
        formula: 'max Z = CX, s.t. AX = b, X ≥ 0',
        example: '生产安排：使用有限的机床时长和原材料，生产不同利润水平的多个产品，以求总利润最大。',
        application: '在求解算法中，只要检验数（Reduced Cost）全部满足最优性条件（例如求极大值时检验数均不为正），即可判定当前即为最优解。',
        takeaway: '理解基本可行解、检验数和主元消去过程，是掌握各种规划算法的钥匙。',
        quiz: { question: '单纯形法的迭代过程对应着解在几何上的什么运动？', options: ['在可行域内部滑动', '在可行域边界的面上运动', '在可行域的顶点之间移动'], answer: 2 }
      }
    ]
  },
  {
    id: 2,
    title: '第二章：对偶理论与灵敏度分析',
    pages: [
      {
        title: '问题的另一面',
        explanation: '每一个线性规划问题（原问题）都伴随一个对偶问题（Dual Problem）。原问题如果是最大化收益，对偶问题就是最小化资源的影子价格（Shadow Price）。',
        formula: 'min W = Yb, s.t. YA ≥ C, Y ≥ 0',
        example: '如果多买一个单位的原材料，我的利润能增加多少？这个增加额就是该资源的“影子价格”。',
        application: '灵敏度分析研究：当市场价格（目标函数系数）变化，或资源上限波动时，当前的最优生产方案是否会改变。',
        takeaway: '对偶理论深刻揭示了资源的潜在价值，是指导企业定价和产能扩充的核心理论。',
        quiz: { question: '如果某个资源的影子价格大于0，说明当前该资源处于什么状态？', options: ['未被完全利用（有剩余）', '被完全耗尽（是瓶颈约束）', '不重要'], answer: 1 }
      }
    ]
  },
  {
    id: 3,
    title: '第三章：运输问题',
    pages: [
      {
        title: '特殊的线性规划',
        explanation: '运输问题研究把某种物资从若干个产地运往若干个销地，使得总运费最小。它有特殊的数据结构，可以用更简单的“表上作业法”求解。',
        formula: '\\min \\sum_{i} \\sum_{j} c_{ij} x_{ij}',
        example: '3个工厂生产大米，需要运往4个城市的超市，各段运费不同，如何调配最省钱。',
        application: '初值可由西北角法或沃格尔法（Vogel）获得，随后用闭回路法或位势法检验和优化。',
        takeaway: '当产销不平衡时（供大于求或供不应求），需要引入虚拟产地或销地转化为平衡问题。',
        quiz: { question: '在用表上作业法求解运输问题时，哪种方法求出的初始基本可行解通常更接近最优解？', options: ['西北角法', '沃格尔法(Vogel)', '最小元素法'], answer: 1 }
      }
    ]
  },
  {
    id: 4,
    title: '第四章：目标规划',
    pages: [
      {
        title: '多目标的妥协艺术',
        explanation: '现实中很少只有一个目标。企业不仅要利润最大（硬目标），还要保证产品多样性并且污染排放尽可能少。目标规划允许设定目标的优先级和允许偏差。',
        formula: '\\min \\sum P_k (d^+_k + d^-_k)',
        example: '首先必须完成政府规定的环保指标（优先级P1），在此前提下尽量让利润达到100万（优先级P2）。',
        application: '通过引入正负偏差变量（d+, d-），将不可调和的多目标转化为在不同优先级下最小化与目标的偏差。',
        takeaway: '目标规划没有绝对的“最优解”，只有在指定偏好下的“满意解”。',
        quiz: { question: '目标规划中，为了让实际结果尽可能不超过目标值，应该优先最小化哪个变量？', options: ['正偏差变量 d+', '负偏差变量 d-', '决策变量 x'], answer: 0 }
      }
    ]
  },
  {
    id: 5,
    title: '第五章：动态规划',
    pages: [
      {
        title: '多阶段决策过程最优',
        explanation: '将一个大问题分解为相互关联的若干阶段，每个阶段做出决策，且当前阶段的决策只受上一个阶段状态的影响（无后效性）。',
        formula: 'f_k(s_k) = \\max / \\min [ v(s_k, u_k) + f_{k+1}(s_{k+1}) ]',
        example: '背包问题、最短路径选线问题、资源合理分配问题等。',
        application: '运用贝尔曼最优化原理（Bellman Principle of Optimality）：不论过去的状态和决策如何，对前面的决策所形成的状态而言，余下的决策必须构成最优策略。',
        takeaway: '动态规划不是一种具体的算法框架（如单纯形法），而是一种解决问题的思维方法。',
        quiz: { question: '动态规划问题必须满足的基本性质是什么？', options: ['线性特性', '无后效性', '连续性'], answer: 1 }
      }
    ]
  },
  {
    id: 6,
    title: '第六章：图与网络分析',
    pages: [
      {
        title: '网络流最优化',
        explanation: '研究网络上流的优化问题，包含最短路、最大流、最小费用最大流以及项目计划PERT/CPM。',
        formula: 'f_{ij} \\le c_{ij}',
        example: '施工进度网络图：确定哪些工序必须按时完成（关键路径），哪些工序有富余时间可以延后。',
        application: 'Dijkstra算法求单源最短路，Ford-Fulkerson增广路算法求网络最大流。',
        takeaway: '最大流最小割定理是网络流理论的基石：一个网络的最大流量，等于切断源点与汇点之间联系所需的最小“代价”。',
        quiz: { question: '在项目管理的CPM（关键路径法）中，关键路线上的工序的“总时差”必然是？', options: ['大于0', '等于0', '小于0'], answer: 1 }
      }
    ]
  },
  {
    id: 7,
    title: '第七章：排队论',
    pages: [
      {
        title: '权衡等待与服务成本',
        explanation: '研究拥挤现象的科学。排队系统的三大要素：输入过程（顾客如何来）、排队规则（先到先服务等）、服务机构（几个窗口）。',
        formula: 'L = \\lambda W \\quad (Little定理)',
        example: '银行应该开放几个服务窗口？多开窗口服务好但成本高，少开窗口成本低但顾客流失率高。',
        application: '经典的 M/M/1 和 M/M/c 模型。顾客到达服从泊松分布(Poisson)，服务时间服从指数分布(Exponential)。',
        takeaway: '只要系统中平均到达率(λ)大于总体服务率(μ)，队伍必然无限变长。因此 λ/μ 必须小于1。',
        quiz: { question: '用来描述“顾客前后到达的时间间隔”的最佳概率分布通常是？', options: ['正态分布', '指数分布', '均匀分布'], answer: 1 }
      }
    ]
  },
  {
    id: 8,
    title: '第八章：存储论',
    pages: [
      {
        title: '库存管理的数学逻辑',
        explanation: '什么时候进货？每次进多少货？存储论的核心在于平衡“订货费用”（每次采购的花费）与“存储费用”（占用仓库和资金的成本）。',
        formula: 'EOQ = \\sqrt{\\frac{2DK}{h}}',
        example: '网店卖某种商品，一年能卖1200件。是一次性进1200件（无订货费但仓储极高），还是每个月进100件更好？',
        application: '经典经济订货批量模型(EOQ)，其最优点出现在“年订货总成本”恰好等于“年存储总成本”之时。',
        takeaway: '复杂的存储模型会引入缺货惩罚、价格折扣以及需求随机等现实因素。',
        quiz: { question: '经典的EOQ（经济订货批量）公式中，经济批量与年总需求量D的关系成：', options: ['正比', '反比', '平方根成正比'], answer: 2 }
      }
    ]
  }
];

export default function BookORScreen({ navigate }: any) {
  // State
  const [view, setView] = useState<'toc' | 'reader'>('toc');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [quizAnswered, setQuizAnswered] = useState<Record<string, number>>({});
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Settings state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedCompleted = localStorage.getItem('orbook_completed');
    const savedBookmarks = localStorage.getItem('orbook_bookmarks');
    const savedChapter = localStorage.getItem('orbook_chapter');
    const savedPage = localStorage.getItem('orbook_page');
    const savedQuizzes = localStorage.getItem('orbook_quizzes');
    
    if (savedCompleted) setCompletedChapters(JSON.parse(savedCompleted));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedChapter) setCurrentChapter(Number(savedChapter));
    if (savedPage) setCurrentPage(Number(savedPage));
    if (savedQuizzes) setQuizAnswered(JSON.parse(savedQuizzes));
  }, []);

  useEffect(() => {
    localStorage.setItem('orbook_completed', JSON.stringify(completedChapters));
    localStorage.setItem('orbook_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('orbook_chapter', String(currentChapter));
    localStorage.setItem('orbook_page', String(currentPage));
    localStorage.setItem('orbook_quizzes', JSON.stringify(quizAnswered));
  }, [completedChapters, bookmarks, currentChapter, currentPage, quizAnswered]);

  const getCurrentProgressKey = () => `${currentChapter}-${currentPage}`;

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
          <div className="text-center mb-8 border-b border-surface-dim/50 pb-6 relative">
            <h1 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              《运筹学》(清华大学出版社)
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 font-medium">主编：钱颂迪 / 第四版</p>
            
            <div className="mt-4 flex flex-col items-center">
               <div className="w-full max-w-[200px] h-2 bg-surface-dim rounded-full overflow-hidden">
                 <div className="h-full bg-secondary" style={{ width: `${progressPercent}%` }}></div>
               </div>
               <span className="text-xs text-on-surface-variant mt-2">阅读进度 {progressPercent}% ({completedChapters.length}/{CHAPTERS.length})</span>
            </div>
            
            <div className="flex gap-3 justify-center mt-6">
              <button 
                onClick={() => setView('reader')}
                className="bg-secondary hover:bg-secondary-hover text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" /> 继续阅读
              </button>
            </div>
          </div>

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
        feature="Optimization Models AI Q&A"
        context={`当前学习内容：${currentPageData.title}\n\n介绍：${currentPageData.explanation}\n公式：${currentPageData.formula}\n例子：${currentPageData.example}`}
        initialPrompt="请帮我总结并通俗易懂地解释这段话的运筹学优化模型含义："
      />
    </div>
  );
}
