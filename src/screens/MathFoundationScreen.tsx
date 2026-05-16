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
    title: '第一章：函数与图像',
    pages: [
      {
        title: '函数的基础概念',
        explanation: '函数是描述两个变量之间关系的基本数学工具。在数学建模中，函数用于表示一个系统的输入和输出之间的确定性关系。理解基本函数（如线性、对数、指数、三角函数）的图像走势是分析问题的第一步。',
        formula: 'y = f(x)',
        example: '假设一辆汽车以恒定速度行驶，距离（y）与时间（x）成正比，即 y = kx，这是一条穿过原点的直线。',
        application: '在人口增长建模中，如果人口不受限制地增长，我们通常用指数函数 N(t) = N_0 * e^{rt} 来表示，其图像呈爆炸式上升。',
        takeaway: '所有数学模型的最底层构建块就是函数，认清数据形态对应什么函数至关重要。',
        quiz: { question: '哪种函数常用来描述“开头增长快，后期增长放缓并趋于饱和”的现象？', options: ['指数函数', '线性函数', 'Logistic(对数几率)函数'], answer: 2 }
      }
    ]
  },
  {
    id: 2,
    title: '第二章：极限与连续',
    pages: [
      {
        title: '极限思维与连续性',
        explanation: '极限研究的是当变量无限逼近某个值时，函数值的变化趋势。连续则保证了系统不会出现突变。在建模中，我们往往假设事物的发展是连续的，从而得以使用微积分工具。',
        formula: 'lim_{x \\to a} f(x) = L',
        example: '考虑一根弹簧的拉伸，拉力逐渐增大，形变也逐渐变大，这就是一个连续的过程。如果拉力超过极限导致弹簧断裂，这就是不连续点。',
        application: '在交通流模型中，我们通常假设车流密度是一个连续函数，这样就能用极限推导出连续性方程，分析交通拥堵波的传播。',
        takeaway: '极限是连接高等数学与初等数学的桥梁，也是从离散到连续的跨越。',
        quiz: { question: '在建立种群模型时，为什么要将种群数量视为连续变量（假设数量很大）？', options: ['为了使用微积分工具求解', '因为动物数量本身就是连续的小数', '为了让看起来更复杂'], answer: 0 }
      }
    ]
  },
  {
    id: 3,
    title: '第三章：导数及其应用',
    pages: [
      {
        title: '变化率的刻画',
        explanation: '导数反映了函数在某一点处的瞬时变化率。在数学建模中，任何涉及到“速度”、“变化率”或“边际”的概念，本质上都是导数。',
        formula: 'f\'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}',
        example: '位置对时间的导数是速度，速度对时间的导数是加速度。在经济中，成本对产量的导数是边际成本。',
        application: '在传染病模型（SIR）中，S（易感者）数量相对于时间的变化率 dS/dt 与S和I的乘积成正比，这就是用导数建立的动态关系。',
        takeaway: '导数用于寻找极值（令导数为0），这是最优化模型的核心原理之一。',
        quiz: { question: '如果在某个区间内，函数的导数始终大于0，说明函数在这个区间：', options: ['单调递减', '保持常数', '单调递增'], answer: 2 }
      }
    ]
  },
  {
    id: 4,
    title: '第四章：积分及其应用',
    pages: [
      {
        title: '累积效应与面积',
        explanation: '积分是导数的逆运算，它代表了某个变量在一段区间上的累积效应或总体量。在图形上表现为曲线下方的面积。',
        formula: '\\int_a^b f(x) dx',
        example: '如果已知汽车在每个时刻的速度 v(t)，那么在一段时间内速度的积分就是这段时间行驶的总路程。',
        application: '在人口模型中，如果已知出生率与死亡率之差随时间的变化情况，通过积分就可以算出在未来某时刻的总人口数。',
        takeaway: '只要问题涉及“总量”、“累积”或“连续求和”，就应该考虑使用积分。',
        quiz: { question: '水箱中水排出的速率随时间变化，求10分钟内排出的总水量，应该用什么数学工具？', options: ['求导', '定积分', '矩阵乘法'], answer: 1 }
      }
    ]
  },
  {
    id: 5,
    title: '第五章：线性代数基础',
    pages: [
      {
        title: '向量与空间',
        explanation: '线性代数是处理多维数据的语言。向量可以代表空间中的一个点，或者一个有大小和方向的量。对于建模中的多变量数据（如10个不同的指标），可以看作是一个10维向量。',
        formula: '\\vec{v} = (v_1, v_2, ..., v_n)',
        example: '一个班级学生的成绩单，每个学生有语文、数学、英语三门成绩，可以用一个3维向量表示该学生的状态。',
        application: '在机器学习的聚类（如 K-Means）中，我们首先要把所有的样本转化成向量，然后通过计算向量之间的距离来判断它们的相似度。',
        takeaway: '将现实的多指标问题抽象为向量，是进行高维数据分析的前提。',
        quiz: { question: '要计算两个向量之间的相似度或夹角，通常使用下列哪种运算？', options: ['向量的叉乘', '向量的点积', '矩阵的逆'], answer: 1 }
      }
    ]
  },
  {
    id: 6,
    title: '第六章：矩阵与矩阵运算',
    pages: [
      {
        title: '数据的收纳盒与线性变换',
        explanation: '矩阵就是数字排列成的矩形阵列，它是线性方程组的系数集合。在建模中，矩阵常被用来表示网络、概率转移或者处理成批的线性变换。',
        formula: 'A X = B',
        example: '图像在计算机中本质上是一个大矩阵，每个元素代表一个像素的颜色强度。',
        application: '在马尔可夫链模型中，我们使用状态转移矩阵来预测系统下一时刻的状态分布。Google的PageRank算法核心就是求解一个庞大链接矩阵的特征向量。',
        takeaway: '特征值和特征向量（Eigenvalues & Eigenvectors）是矩阵最核心的属性，常常代表系统的稳定状态或主要趋势。',
        quiz: { question: '主成分分析(PCA)降维过程中，起决定作用的是协方差矩阵的什么？', options: ['行列式', '逆矩阵', '特征值与特征向量'], answer: 2 }
      }
    ]
  },
  {
    id: 7,
    title: '第七章：概率论基础',
    pages: [
      {
        title: '随机性与事件',
        explanation: '现实世界充满了不确定性。概率论是用来研究随机现象规律的数学工具。在建模中，我们引入随机变量来描述不确定的参数或事件结果。',
        formula: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
        example: '抛硬币是离散随机变量，而每天的降雨量是连续随机变量。',
        application: '在排队论模型中（如银行窗口服务），顾客到达时间的间隔和服务时间通常被假设为服从泊松分布或指数分布，从而计算出平均排队时间。',
        takeaway: '当你的系统存在不可忽略的随机干扰时，就必须使用概率或随机过程模型，而非确定的微分方程模型。',
        quiz: { question: '正态分布的图像特征通常被描述为什么形状？', options: ['U型折线', '钟型曲线', '倾斜直线'], answer: 1 }
      }
    ]
  },
  {
    id: 8,
    title: '第八章：统计学基础',
    pages: [
      {
        title: '从数据中发现规律',
        explanation: '统计学是在概率论基础上，收集、处理和分析数据的科学。它的目的是在存在误差的情况下，依然能对总体做出推断。',
        formula: '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i',
        example: '通过抽取1000名消费者的调查问卷，来推断全国消费者的品牌偏好（假设检验与置信区间）。',
        application: '在线性回归模型中，我们寻找一条使所有数据点误差平方和最小的直线，这叫做“最小二乘法”估计，是统计学的核心方法之一。',
        takeaway: '统计不代表绝对的真相，它是关于在具有不确定性的情况下做出最佳猜测。',
        quiz: { question: '要衡量两个随机变量之间的线性相关程度，我们通常计算：', options: ['方差', '相关系数', '中位数'], answer: 1 }
      }
    ]
  },
  {
    id: 9,
    title: '第九章：最优化基础',
    pages: [
      {
        title: '寻找最佳决策',
        explanation: '最优化试图在满足一系列约束条件的范围内，找到能够使得某个目标函数（成本、时间等）最大或最小的变量组合。',
        formula: '\\min f(x) \\quad s.t. \\quad g(x) \\le 0',
        example: '一个工厂要在有限的劳动力和原材料下，决定生产不同产品的数量，以实现利润最大化。',
        application: '不仅是运筹学，如今火热的机器学习（如训练神经网络），其底层的基本操作也就是利用梯度下降法找到一种参数组合，使预测误差最小化！',
        takeaway: '几乎所有的建模题，最终都可以转化为一种在多目标和约束间的“优化”问题。',
        quiz: { question: '如果目标和约束条件中含有未知的概率分布，这属于哪种最优化？', options: ['线性规划', '随机规划', '整数规划'], answer: 1 }
      }
    ]
  },
  {
    id: 10,
    title: '第十章：微分方程基础',
    pages: [
      {
        title: '描述系统的动态随时间演化',
        explanation: '当一个物理量与它的变化率（导数）存在关系时，就构成了微分方程。它是描述动态系统演化最强大的工具。',
        formula: '\\frac{dy}{dt} = k y',
        example: '热量传导、放射性衰变、物种数量变化都涉及微分方程。',
        application: '经典的捕食者-猎物模型（Lotka-Volterra）用两个联立的非线性常微分方程描述了狼和羊数量的周期震荡规律。',
        takeaway: '自然界的法则是用微分方程写成的。建好方程后，通常使用计算机数值求解（如Runge-Kutta法）。',
        quiz: { question: '在数值求解微分方程中，最著名的算法是？', options: ['快速傅里叶变换', '龙格-库塔方法', '高斯消元法'], answer: 1 }
      }
    ]
  },
  {
    id: 11,
    title: '第十一章：常用公式大纲',
    pages: [
      {
        title: '工具箱概览',
        explanation: '在建模中一些公式会被高频使用，需要像工具箱一样随时能够取用。',
        formula: '标准化: Z = (X - \\mu)/\\sigma',
        example: '这包括拉格朗日乘数法（带约束的最优化）、泰勒展开式（复杂函数近似）、欧拉公式以及各种统计检验公式。',
        application: '在非线性规划中，经常用到拉格朗日函数构筑法来将有约束问题转化为无约束问题求解。',
        takeaway: '不需要死记硬背每个公式，但必须知道它们能解决什么问题，存在哪本书或哪行代码里。',
        quiz: { question: '用于将一个复杂函数在某一点展开成无穷级数多项式的公式是？', options: ['莱布尼茨公式', '欧拉公式', '泰勒展开式'], answer: 2 }
      }
    ]
  },
  {
    id: 12,
    title: '第十二章：数学基础练习',
    pages: [
      {
        title: '学以致用',
        explanation: '学习了以上概念，通过实际操作来巩固直觉。理解了变量关系后，还需要通过练习学会数学符号的形式化表达。',
        formula: 'Theory + Practice = Mastery',
        example: '尝试用数学语言描述以下场景：停车场有 N 个车位，到达率为 $\\lambda$，离开率为 $\\mu$。',
        application: '任何复杂的题目都可以拆解为多变量函数提取 -> 参数估计 -> 根据原理构建微分或最优化模型 -> 计算机数值求解。',
        takeaway: '数学基础的练习不是算微积分，而是“将大白话翻译为数学符号”的能力。',
        quiz: { question: '在数学建模比赛中遇到无法解析求解的复杂方程时，通常怎么做？', options: ['放弃该模型', '使用数值算法(如蒙特卡洛/牛顿法)进行近似求解', '伪造答案'], answer: 1 }
      }
    ]
  }
];

export default function MathFoundationScreen({ navigate, chapterId }: any) {
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
    if (chapterId !== undefined) {
      const idx =CHAPTERS.findIndex(c => c.id === Number(chapterId));
      if (idx !== -1) {
        setCurrentChapter(idx);
        setCurrentPage(0);
        setView('reader');
      }
    } else {
      const savedChapter = localStorage.getItem('math_found_chapter');
      const savedPage = localStorage.getItem('math_found_page');
      
      if (savedChapter) setCurrentChapter(Number(savedChapter));
      if (savedPage) setCurrentPage(Number(savedPage));
    }
    
    const savedCompleted = localStorage.getItem('math_found_completed');
    const savedBookmarks = localStorage.getItem('math_found_bookmarks');
    const savedQuizzes = localStorage.getItem('math_found_quizzes');
    
    if (savedCompleted) setCompletedChapters(JSON.parse(savedCompleted));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedQuizzes) setQuizAnswered(JSON.parse(savedQuizzes));
  }, [chapterId]);

  // Save state
  useEffect(() => {
    localStorage.setItem('math_found_completed', JSON.stringify(completedChapters));
    localStorage.setItem('math_found_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('math_found_chapter', String(currentChapter));
    localStorage.setItem('math_found_page', String(currentPage));
    localStorage.setItem('math_found_quizzes', JSON.stringify(quizAnswered));
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
      <div className="min-h-screen bg-background pt-20 pb-24 px-4 font-sans">
        <TopBar title="课正式系统" onBack={() => navigate('learn')} />
        
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-dim/30 mt-4 h-full min-h-[70vh]">
          {/* Header */}
          <div className="text-center mb-8 border-b border-surface-dim/50 pb-6 relative">
            <h1 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              数学模型基础教材
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 font-medium">Math Foundation for Mathematical Modeling</p>
            
            {/* Progress Badge */}
            <div className="mt-4 flex flex-col items-center">
               <div className="w-full max-w-[200px] h-2 bg-surface-dim rounded-full overflow-hidden">
                 <div className="h-full bg-secondary" style={{ width: `${progressPercent}%` }}></div>
               </div>
               <span className="text-xs text-on-surface-variant mt-2">课程掌握进度 {progressPercent}% ({completedChapters.length}/{CHAPTERS.length})</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-6">
              <button 
                onClick={() => setView('reader')}
                className="bg-secondary hover:bg-secondary-hover text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" /> 继续学习
              </button>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="space-y-3">
             <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold flex items-center gap-2"><Layout className="w-5 h-5"/> 教学大纲 (Contents)</h2>
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
                <Sparkles className="w-5 h-5" /> 建模应用与示例
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
        feature="Math Foundation AI explanation"
        context={`当前学习内容：${currentPageData.title}\n\n介绍：${currentPageData.explanation}\n公式：${currentPageData.formula}\n例子：${currentPageData.example}`}
        initialPrompt="请帮我总结并通俗易懂地解释这段话的数学基础概念："
      />
    </div>
  );
}
