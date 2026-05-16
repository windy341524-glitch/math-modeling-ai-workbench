import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Menu, Bookmark, CheckCircle, 
  ChevronLeft, ChevronRight, Play, Brain, 
  Sparkles, Moon, Sun, Type, Search
} from 'lucide-react';
import TopBar from '../components/TopBar';
import AIChatModal from '../components/AIChatModal';

const CHAPTERS = [
  {
    id: 1,
    title: '第一章：什么是数学建模',
    content: [
      '数学建模（Mathematical Model）是一种模拟，是用数学符号、数学式子、程序、图形等对实际课题本质属性的抽象而又简洁的刻画。它或能解释某些客观现象，或能预测未来的发展规律，或能为控制某一现象的发展提供某种意义下的最优策略或较好策略。',
      '建模过程通常包含：模型准备、模型假设、模型构成、模型求解、模型分析与检验。其中“假设”是最为关键的一步。没有合理的假设，就无法过滤系统中的噪声，得到可求解的方程体系。'
    ],
    summary: '建模是将现实问题抽象为数学公式的过程。',
    formula: 'dx/dt = r × x',
    example: '马尔萨斯(Malthus)模型假设人口增长率是常数 r，预言了指数爆炸。随后科学家提出了 Logistic 阻滞增长模型修正了这一假设。',
    quiz: { question: '建模最基础也是最关键的一步是什么？', options: ['模型假设', '模型求解', '写论文'], answer: 0 }
  },
  {
    id: 2,
    title: '第二章：比赛流程与时间规划',
    content: [
      '一般数学建模比赛为期3到4天，这是一场体力与智力的极限挑战。',
      '典型的时间节点如下：第1天：选题、阅读参考文献、确定大体思路；第2天：建立核心模型并开始编写代码求解；第3天：完善模型、补充计算结果、全面开展论文写作；第4天（如果适用）：打磨摘要、排版格式交卷。'
    ],
    summary: '合理的时间规划是完赛的基础，不要在某个细节死磕。',
    formula: null,
    example: '建议将三天比例分为：选题与思路(20%)、建模与编程(40%)、写作与制图(40%)。',
    quiz: { question: '全国大学生数学建模竞赛（国赛）通常时长是几天？', options: ['1天', '3天 (72小时)', '7天'], answer: 1 }
  },
  {
    id: 3,
    title: '第三章：团队角色分配',
    content: [
      '经典的三人小队通常分为三种职能偏向：建模手、编程手和写作手。',
      '建模手负责数学理论推导与模型设计；编程手负责将数学公式化为代码并跑出结果；写作手（论文手）负责将前两者的工作以极其规范和优雅的形式写进论文里。',
      '但是，真正的强队中，每个人都是“全栈”，必须能听懂彼此的逻辑才能有效配合。'
    ],
    summary: '团队协作大于个人能力的简单叠加，木桶效应在比赛中极为明显。',
    formula: 'Total Output = S(P1, P2, P3) + Synergy',
    example: '建模手推导方程，编程手马上验证数据，写手同步起草背景和假设，三线并行。',
    quiz: { question: '三人制数学建模队伍最经典的职能分工是？', options: ['全是编程手', '老板、秘书、会计', '建模、编程、写作'], answer: 2 }
  },
  {
    id: 4,
    title: '第四章：赛题类型与选题',
    content: [
      '国赛一般分为连续型、离散型、数据型题目。本科组通常选A题（物理力学/工程控制类）或B题（运筹优化/离散组合类）或C题（数据挖掘/统计分析类）。',
      '美赛则包括MCM（连续/离散）和ICM（交叉学科：环境/能源/政策等）。选题应当依据队员的专业优势和过去的经验。'
    ],
    summary: '选择合适的题目是成功的一半。',
    formula: null,
    example: '如果队伍最强的是数据分析和机器学习，毫不犹豫选数据类题目即可。',
    quiz: { question: '美赛ICM通常偏向于什么领域？', options: ['纯数学', '交叉学科', '文学写作'], answer: 1 }
  },
  {
    id: 5,
    title: '第五章：数据处理基础',
    content: [
      '拿到原始数据的第一步永远是预处理。比赛给的数据往往是有缺陷的，包含缺失值、异常值和不一致的格式。',
      '常用操作包括：异常值剔除、缺失值插补（如均值插补、拉格朗日插值）、数据标准化和归一化处理。',
      '缺失值和异常值的处理方法选择必须在论文中说明理由，不能随意丢弃。'
    ],
    summary: 'Garbage in, garbage out. (垃圾进，垃圾出)',
    formula: 'x_norm = (x - x_min) / (x_max - x_min)',
    example: '使用缺失值前后的数据进行均值插补，或通过三次样条插值预测空缺数据。',
    quiz: { question: '处理数据表格中个别缺失值最常用的简单方法是？', options: ['直接删除整行', '把整列都删掉', '插值或均值替补'], answer: 2 }
  },
  {
    id: 6,
    title: '第六章：评价类模型',
    content: [
      '评价模型用于给备选方案打分排行，找出最优秀的方案。常用的评价方法有：层次分析法(AHP)、TOPSIS(优劣解距离法)、模糊综合评价、主成分分析等。',
      'AHP属于主观赋权法，需要检验一致性；熵权法属于客观赋权法。这两者结合形成的“主客观综合赋权”是论文中的加分项。'
    ],
    summary: '万物皆可TOPSIS，但注意权重的合理与科学性。',
    formula: 'C_i = D_neg / (D_pos + D_neg)',
    example: '选拔最佳员工，使用AHP听取经理意见确定权重，再用TOPSIS对员工各维度的客观指标进行打分排行。',
    quiz: { question: '层次分析法(AHP)的步骤中，哪一步是必须计算以证明逻辑合理的？', options: ['画出好看的图', '计算一致性检验(CR<0.1)', '使用复杂的高等数学'], answer: 1 }
  },
  {
    id: 7,
    title: '第七章：预测类模型',
    content: [
      '预测模型试图利用已有数据推演未来。按时间维度分，短期预测可用灰色预测GM(1,1)、时间序列(ARIMA)。',
      '长期和复杂预测可用多元线性回归、BP神经网络或支持向量机。',
      '一定要留一部分已知数据作为测试集（Test Set）来检验你的预测模型的准确度，这就是“交叉经验”。'
    ],
    summary: '没有完美的预测，只有不断降低误差的逼近。',
    formula: 'y(t) = a + b * t + error',
    example: '只提供过去5年的少量数据预测第6年的产量时，优先选用灰色预测。',
    quiz: { question: '灰色预测模型最适合处理哪类数据？', options: ['千万级海量大数据', '小样本、贫信息数据', '完全随机抛硬币的数据'], answer: 1 }
  },
  {
    id: 8,
    title: '第八章：优化类模型',
    content: [
      '优化模型的目标是在若干约束条件下，寻找目标函数的最大值或最小值。',
      '典型的模型如：线性规划(LP)、非线性规划(NLP)、整数规划(IP)、动态规划(DP)。',
      '在面对NP难问题时，常规算法耗时太长，通常采用启发式算法寻找近似最优解，如遗传算法(GA)、模拟退火算法(SA)。'
    ],
    summary: '运筹帷幄之中，统筹规划，求极值。',
    formula: 'min f(x) s.t. g(x) <= 0',
    example: '经典的旅行商问题(TSP)：寻找遍历所有城市的一条最短闭合路径。',
    quiz: { question: '求解标准线性规划最经典的算法是什么？', options: ['深度学习', '单纯形法', '蒙特卡洛'], answer: 1 }
  },
  {
    id: 9,
    title: '第九章：分类与聚类模型',
    content: [
      '这是机器学习在数学建模中应用最广的领域。',
      '【无监督学习 - 聚类】：比如K-Means，用于事先不知道类别，让算法自动把相似的样本归为一类。',
      '【有监督学习 - 分类】：比如逻辑回归、支持向量机(SVM)、随机森林，事先知道一些样本的答案，训练模型去判断新样本。'
    ],
    summary: '物以类聚，人以群分。分类有监督，聚类无监督。',
    formula: 'Minimize: sum(||x_i - \mu_j||^2)',
    example: '将没有打标签的一大批用户切分成高价值、中风险、低价值三个群体（聚类）。',
    quiz: { question: 'K-Means 是属于分类还是聚类算法？', options: ['有监督的分类算法', '无监督的聚类算法', '强化学习'], answer: 1 }
  },
  {
    id: 10,
    title: '第十章：图论与网络模型',
    content: [
      '有些现实问题本质是点与边的关系。',
      '如最短路径问题（Dijkstra算法、Floyd算法），最小生成树（Kruskal算法），最大流与最小割。',
      '物流配送路线规划、城市管网铺设、网络信息传播，基本都离不开图论的知识。'
    ],
    summary: '结构决定性质，节点和连边映射关系。',
    formula: 'G = (V, E)',
    example: '导航软件从A地到B地的路线规划，后台运行的就是最短路径算法。',
    quiz: { question: '计算单源最短路径（且无负权边）最经典的算法是？', options: ['K-Means', 'Dijkstra 算法', 'AHP'], answer: 1 }
  },
  {
    id: 11,
    title: '第十一章：论文写作规范',
    content: [
      '国标/美赛论文是一篇严肃的学术论文，格式规范是最基本的要求。',
      '最重要的部分是“摘要(Abstract)”。评委看一篇论文往往只给几分钟，如果不看摘要，论文就已经挂了。摘要必须包含：目的、方法、结果和结论。',
      '论文公式推荐使用MathType或LaTeX排版。高清美观的图表可以极大增加评委的好感度。'
    ],
    summary: '一篇优秀的建模论文应当像讲一个有理有据的完整故事。',
    formula: '好论文 = 抓人摘要 + 合理模型 + 优美制图 + 清晰排版',
    example: '“本文针对[问题]建立[XX]模型，利用[XX]算法求解，最终得出[XX]结论”，是摘要的标准三段论句式之一。',
    quiz: { question: '评委在评审论文时，最看重哪一部分（甚至决定了生死）？', options: ['繁冗的附录代码', '论文摘要', '参考文献列表'], answer: 1 }
  },
  {
    id: 12,
    title: '第十二章：真题案例演练',
    content: [
      '纸上得来终觉浅，绝知此事要躬行。不练是永远出不来成绩的。',
      '建议系统复现历年O奖（或国奖）论文，体会他们的切入角度、假设的巧思以及图表的绘制。',
      '赛前至少完整地模拟一次3天比赛全流程。熟练使用各种代码模板。'
    ],
    summary: '所有技巧都需要在实战中打磨。',
    formula: 'Success = Practice * Time',
    example: '选取2021年国赛C题，组队做一遍并与优秀论文比对，找出自己的不足。',
    quiz: { question: '赛前备赛最有效的方式是？', options: ['只看书不实践', '背公式', '复现历年真实优秀论文并做全真模拟'], answer: 2 }
  }
];

export default function BookMathModelScreen({ navigate }: any) {
  // State
  const [view, setView] = useState<'toc' | 'reader'>('toc');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Settings state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showSettings, setShowSettings] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem('book_math_completed');
    const savedBookmarks = localStorage.getItem('book_math_bookmarks');
    const savedChapter = localStorage.getItem('book_math_chapter');
    
    if (savedCompleted) setCompletedChapters(JSON.parse(savedCompleted));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedChapter) setCurrentChapter(Number(savedChapter));
  }, []);

  // Save state to local storage when changed
  useEffect(() => {
    localStorage.setItem('book_math_completed', JSON.stringify(completedChapters));
    localStorage.setItem('book_math_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('book_math_chapter', String(currentChapter));
  }, [completedChapters, bookmarks, currentChapter]);

  // Handlers
  const openChapter = (index: number) => {
    setCurrentChapter(index);
    setQuizAnswered(null);
    setView('reader');
  };

  const nextChapter = () => {
    if (currentChapter < CHAPTERS.length - 1) {
      if (!completedChapters.includes(currentChapter)) {
        setCompletedChapters([...completedChapters, currentChapter]);
      }
      setCurrentChapter(c => c + 1);
      setQuizAnswered(null);
      window.scrollTo(0, 0);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(c => c - 1);
      setQuizAnswered(null);
      window.scrollTo(0, 0);
    }
  };

  const toggleBookmark = () => {
    if (bookmarks.includes(currentChapter)) {
      setBookmarks(bookmarks.filter(b => b !== currentChapter));
    } else {
      setBookmarks([...bookmarks, currentChapter]);
    }
  };

  const currentBookChapter = CHAPTERS[currentChapter];
  const progressPercent = Math.round((completedChapters.length / CHAPTERS.length) * 100);

  // Styling helpers
  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-sm leading-relaxed';
    if (fontSize === 'large') return 'text-lg leading-loose';
    return 'text-base leading-loose';
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswered === null) {
      setQuizAnswered(idx);
      if (idx === currentBookChapter.quiz.answer && !completedChapters.includes(currentChapter)) {
        setCompletedChapters([...completedChapters, currentChapter]);
      }
    }
  };

  if (view === 'toc') {
    return (
      <div className="min-h-screen bg-background pt-20 pb-24 px-4 font-sans">
        <TopBar title="智能阅读" onBack={() => navigate('learn')} />
        
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-dim/30 mt-4 h-full min-h-[70vh]">
          {/* Header */}
          <div className="text-center mb-8 border-b border-surface-dim/50 pb-6 relative">
            <h1 className="text-3xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              《数学模型》
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 font-medium">数学建模从入门到精通全指南</p>
            
            {/* Progress Badge */}
            <div className="mt-4 flex flex-col items-center">
               <div className="w-full max-w-[200px] h-2 bg-surface-dim rounded-full overflow-hidden">
                 <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }}></div>
               </div>
               <span className="text-xs text-on-surface-variant mt-2">阅读进度 {progressPercent}% ({completedChapters.length}/{CHAPTERS.length})</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-6">
              <button 
                onClick={() => setView('reader')}
                className="bg-primary hover:bg-primary-hover text-on-primary px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-on-primary" /> 继续阅读
              </button>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="space-y-3">
             <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold">目录 (Table of Contents)</h2>
                <Search className="w-4 h-4 text-on-surface-variant" />
             </div>

             {CHAPTERS.map((ch, idx) => {
               const isCompleted = completedChapters.includes(idx);
               const isCurrent = currentChapter === idx;
               const isBookmarked = bookmarks.includes(idx);

               return (
                 <div 
                   key={ch.id} 
                   onClick={() => openChapter(idx)}
                   className={`p-4 rounded-xl flex items-center justify-between cursor-pointer border transition-all ${
                     isCurrent ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20' : 
                     'bg-surface-container-low hover:bg-surface-container border-transparent'
                   }`}
                 >
                   <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-green-100 text-green-600' : 
                        isCurrent ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                      }`}>
                         {isCompleted ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-bold">{ch.id}</span>}
                      </div>
                      <span className={`font-medium ${isCurrent ? 'text-primary' : 'text-on-surface'}`}>
                        {ch.title}
                      </span>
                   </div>
                   {isBookmarked && <Bookmark className="w-4 h-4 text-secondary fill-secondary" />}
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 pb-24 font-serif transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] text-gray-200' : 'bg-[#F9F7F1] text-gray-800'}`}>
      
      {/* Reader Navbar */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 flex items-center justify-between px-4 h-16 border-b transition-colors ${
        isDarkMode ? 'bg-[#1a1a1a]/95 border-gray-800' : 'bg-[#F9F7F1]/95 border-gray-200'
      } backdrop-blur-md`}>
         <div className="flex items-center gap-4">
           <button onClick={() => setView('toc')} className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <span className="text-xs font-sans font-medium line-clamp-1 opacity-70">
             {currentBookChapter.title}
           </span>
         </div>
         <div className="flex items-center gap-2">
           <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <Type className="w-5 h-5" />
           </button>
           <button onClick={toggleBookmark} className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <Bookmark className={`w-5 h-5 ${bookmarks.includes(currentChapter) ? 'fill-secondary text-secondary' : ''}`} />
           </button>
         </div>
      </div>

      {/* Settings Modal overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)}>
          <div 
            className={`absolute top-16 right-4 p-4 rounded-2xl shadow-xl w-64 border ${
              isDarkMode ? 'bg-[#2a2a2a] border-gray-700' : 'bg-white border-gray-100'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4">
              <span className="text-xs font-sans font-bold uppercase opacity-50 mb-2 block">主题外观</span>
              <div className="flex bg-black/5 p-1 rounded-xl">
                <button onClick={() => setIsDarkMode(false)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-sans font-medium ${!isDarkMode ? 'bg-white shadow text-black' : 'text-gray-500'}`}><Sun className="w-4 h-4"/> 浅色</button>
                <button onClick={() => setIsDarkMode(true)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-sans font-medium ${isDarkMode ? 'bg-[#1e1e1e] shadow text-white' : 'text-gray-500'}`}><Moon className="w-4 h-4"/> 深色</button>
              </div>
            </div>
            <div>
              <span className="text-xs font-sans font-bold uppercase opacity-50 mb-2 block">字体大小</span>
              <div className="flex justify-between items-center bg-black/5 p-1 rounded-xl">
                <button onClick={() => setFontSize('small')} className={`flex-1 py-1.5 rounded-lg text-sm ${fontSize === 'small' ? (isDarkMode ? 'bg-[#1e1e1e] shadow text-white' : 'bg-white shadow text-black') : 'opacity-60'}`}>A-</button>
                <button onClick={() => setFontSize('medium')} className={`flex-1 py-1.5 rounded-lg text-base ${fontSize === 'medium' ? (isDarkMode ? 'bg-[#1e1e1e] shadow text-white' : 'bg-white shadow text-black') : 'opacity-60'}`}>A</button>
                <button onClick={() => setFontSize('large')} className={`flex-1 py-1.5 rounded-lg text-lg ${fontSize === 'large' ? (isDarkMode ? 'bg-[#1e1e1e] shadow text-white' : 'bg-white shadow text-black') : 'opacity-60'}`}>A+</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reader Content */}
      <div className="px-6 py-8 max-w-[600px] mx-auto min-h-screen">
         <h1 className="text-3xl font-bold mb-8 border-b-2 border-primary/20 pb-4 inline-block">
           {currentBookChapter.title}
         </h1>

         <article className={`space-y-6 ${getFontSizeClass()} text-justify tracking-wide`}>
            {currentBookChapter.content.map((paragraph, idx) => (
              <p key={idx} className="indent-8 opacity-90">{paragraph}</p>
            ))}
         </article>

         {/* Interactive Components */}
         <div className="mt-12 space-y-6 font-sans">
            
            {/* Info Cards */}
            <div className={`p-5 rounded-2xl ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-blue-50/80 border border-blue-100'}`}>
              <h4 className={`font-bold flex items-center gap-2 mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                <Brain className="w-5 h-5" /> 核心总结
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-900/80'}`}>
                {currentBookChapter.summary}
              </p>
            </div>

            {(currentBookChapter.formula || currentBookChapter.example) && (
              <div className={`p-5 rounded-2xl ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-amber-50/80 border border-amber-100'}`}>
                <h4 className={`font-bold flex items-center gap-2 mb-3 ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                  <Sparkles className="w-5 h-5" /> 拓展知识
                </h4>
                {currentBookChapter.formula && (
                  <div className="mb-3">
                    <span className={`text-xs font-bold uppercase block mb-1 ${isDarkMode ? 'text-amber-500/70' : 'text-amber-800/50'}`}>数学公式 / 符号</span>
                    <code className={`px-2 py-1 rounded text-sm ${isDarkMode ? 'bg-[#1a1a1a] text-amber-300' : 'bg-white text-orange-600'}`}>{currentBookChapter.formula}</code>
                  </div>
                )}
                {currentBookChapter.example && (
                  <div>
                    <span className={`text-xs font-bold uppercase block mb-1 ${isDarkMode ? 'text-amber-500/70' : 'text-amber-800/50'}`}>实际案例</span>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-amber-900/80'}`}>{currentBookChapter.example}</p>
                  </div>
                )}
              </div>
            )}

            {/* Quiz Section */}
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} shadow-sm mt-8`}>
               <h4 className="font-bold flex items-center gap-2 mb-4 text-base">
                 🎯 课后小测
               </h4>
               <p className="text-sm mb-4 font-medium opacity-90">{currentBookChapter.quiz.question}</p>
               
               <div className="space-y-3">
                 {currentBookChapter.quiz.options.map((option, idx) => {
                   const isSelected = quizAnswered === idx;
                   const isCorrect = idx === currentBookChapter.quiz.answer;
                   const showStatus = quizAnswered !== null;
                   
                   let buttonClass = isDarkMode ? 'bg-[#2a2a2a] hover:bg-[#333]' : 'bg-surface-container-low hover:bg-surface-container';
                   
                   if (showStatus) {
                     if (isCorrect) buttonClass = 'bg-green-100 text-green-800 border-green-200 border';
                     else if (isSelected && !isCorrect) buttonClass = 'bg-red-100 text-red-800 border-red-200 border';
                   }

                   return (
                     <button
                       key={idx}
                       disabled={showStatus}
                       onClick={() => handleQuizAnswer(idx)}
                       className={`w-full text-left p-3 rounded-xl text-sm transition-all ${buttonClass}`}
                     >
                       {option}
                       {showStatus && isCorrect && <CheckCircle className="w-4 h-4 inline float-right text-green-600" />}
                     </button>
                   );
                 })}
               </div>
               
               {quizAnswered !== null && quizAnswered === currentBookChapter.quiz.answer && (
                 <div className="mt-4 p-3 bg-primary/10 text-primary rounded-xl text-sm font-bold flex justify-center items-center gap-2">
                   <Sparkles className="w-4 h-4" /> 回答正确！探索下一章吧。
                 </div>
               )}
            </div>

            {/* AI Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setIsAIChatOpen(true)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                isDarkMode ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}>
                <Brain className="w-4 h-4" /> 让 AI 解释大意
              </button>
              <button className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                isDarkMode ? 'bg-surface-container-high hover:bg-surface-dim' : 'bg-surface-dim hover:bg-surface-dim/80'
              }`}>
                 <Type className="w-4 h-4" /> 更多案例
              </button>
            </div>
         </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 flex justify-between gap-4 border-t z-40 backdrop-blur-md ${
        isDarkMode ? 'bg-[#1a1a1a]/90 border-gray-800' : 'bg-[#F9F7F1]/90 border-gray-200'
      }`}>
         <button 
           onClick={prevChapter}
           disabled={currentChapter === 0}
           className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-30 disabled:cursor-not-allowed bg-transparent hover:bg-black/5 transition-colors"
         >
           <ChevronLeft className="w-4 h-4" /> 上一章
         </button>
         <button 
           onClick={nextChapter}
           disabled={currentChapter === CHAPTERS.length - 1}
           className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 font-sans text-sm shadow-md transition-transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
         >
           下一章 <ChevronRight className="w-4 h-4" />
         </button>
      </div>

      <AIChatModal 
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        feature="Formula explanation"
        context={`当前学习内容：${currentBookChapter.title}\n\n${currentBookChapter.content.join('\n')}\n核心总结：${currentBookChapter.summary}`}
        initialPrompt="请帮我总结并通俗易懂地解释这一章的内容的大意："
      />
    </div>
  );
}
