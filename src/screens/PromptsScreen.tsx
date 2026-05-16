import React, { useState, useEffect, useMemo } from 'react';
import { Search, Copy, Heart, Plus, BookOpen, Star, Sparkles, X, Activity, Bookmark, Eye, Play, BarChart3, Edit2, Trash2, Edit3 } from 'lucide-react';
import TopBar from '../components/TopBar';
import { OFFICIAL_PROMPTS, PromptItem, PromptCategory, PromptDifficulty } from '../data/prompts';

const CATEGORIES: (PromptCategory | '全部')[] = [
  '全部',
  '问题分析',
  '模型选择',
  '数据处理',
  '假设与公式',
  '各类模型 (预测/评价/优化)',
  '代码生成',
  '图表与可视化',
  '论文与分析',
  '答辩与展示',
  '自定义'
];

const DIFFICULTIES: (PromptDifficulty | '所有难度')[] = ['所有难度', '初级', '中级', '高级'];

export default function PromptsScreen({ navigate, initialCategory, initialSearch }: any) {
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | '全部'>(initialCategory || '全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState<PromptDifficulty | '所有难度'>('所有难度');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showOnlyRecent, setShowOnlyRecent] = useState(false);

  const [customPrompts, setCustomPrompts] = useState<PromptItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentUsages, setRecentUsages] = useState<Record<string, number>>({});
  
  const [modalMode, setModalMode] = useState<'none' | 'blank' | 'customize' | 'edit'>('none');
  const [tagsInput, setTagsInput] = useState('');
  const [newPrompt, setNewPrompt] = useState<Partial<PromptItem>>({
    title: '', category: '自定义', difficulty: '初级', description: '', content: '', tags: []
  });

  useEffect(() => {
    const savedCustom = localStorage.getItem('mm_custom_prompts');
    if (savedCustom) setCustomPrompts(JSON.parse(savedCustom));
    const savedFavs = localStorage.getItem('mm_prompt_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    const savedRecent = localStorage.getItem('mm_prompt_recent');
    if (savedRecent) setRecentUsages(JSON.parse(savedRecent));
  }, []);

  const saveCustom = (items: PromptItem[]) => {
    setCustomPrompts(items);
    localStorage.setItem('mm_custom_prompts', JSON.stringify(items));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newFavs;
    if (favorites.includes(id)) {
      newFavs = favorites.filter(fid => fid !== id);
    } else {
      newFavs = [...favorites, id];
    }
    setFavorites(newFavs);
    localStorage.setItem('mm_prompt_favs', JSON.stringify(newFavs));
  };

  const handleCopy = (prompt: PromptItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    
    // Update recent
    const now = new Date().toISOString();
    const newRecent = { ...recentUsages, [prompt.id]: Date.now() };
    setRecentUsages(newRecent);
    localStorage.setItem('mm_prompt_recent', JSON.stringify(newRecent));
    
    alert('提示词已复制到剪贴板');
  };

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(window.confirm('确定要删除这个自定义提示词吗？')) {
      const newCustoms = customPrompts.filter(p => p.id !== id);
      saveCustom(newCustoms);
      
      if (favorites.includes(id)) {
        const newFavs = favorites.filter(fid => fid !== id);
        setFavorites(newFavs);
        localStorage.setItem('mm_prompt_favs', JSON.stringify(newFavs));
      }
    }
  };

  const handleEditCustom = (prompt: PromptItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewPrompt(prompt);
    setTagsInput((prompt.tags || []).join(', '));
    setModalMode('edit');
  };

  const handleCustomize = (prompt: PromptItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewPrompt({
      title: `${prompt.title} (自定义)`,
      category: '自定义',
      difficulty: prompt.difficulty,
      description: prompt.description,
      content: prompt.content,
      tags: [...(prompt.tags || [])]
    });
    setTagsInput((prompt.tags || []).join(', '));
    setModalMode('customize');
  };

  const handleCreateBlank = () => {
    setNewPrompt({ title: '', category: '自定义', difficulty: '初级', description: '', content: '', tags: [] });
    setTagsInput('');
    setModalMode('blank');
  };

  const handleSaveCustom = () => {
    if (!newPrompt.title || !newPrompt.content) {
      alert("请填写标题和内容");
      return;
    }

    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    
    if (modalMode === 'edit' && newPrompt.id) {
       // Edit
       const updated = customPrompts.map(p => p.id === newPrompt.id ? { ...p, ...newPrompt, tags: tagsArray } as PromptItem : p);
       saveCustom(updated);
    } else {
       // Create
       const item: PromptItem = {
         ...(newPrompt as PromptItem),
         id: 'custom-' + Date.now().toString(),
         userCreated: true,
         sourceType: modalMode === 'customize' ? 'customizedFromBuiltIn' : 'blankCreated',
         tags: tagsArray
       };
       saveCustom([item, ...customPrompts]);
    }
    
    setModalMode('none');
    setNewPrompt({ title: '', category: '自定义', difficulty: '初级', description: '', content: '', tags: [] });
    setTagsInput('');
  };

  const allPrompts = useMemo(() => {
    return [...OFFICIAL_PROMPTS, ...customPrompts];
  }, [customPrompts]);

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter(p => {
      if (selectedCategory !== '全部' && p.category !== selectedCategory) return false;
      if (selectedDifficulty !== '所有难度' && p.difficulty !== selectedDifficulty) return false;
      if (showOnlyFavorites && !favorites.includes(p.id)) return false;
      if (showOnlyRecent && !recentUsages[p.id]) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => {
      if (showOnlyRecent) {
        return (recentUsages[b.id] || 0) - (recentUsages[a.id] || 0);
      }
      return 0;
    });
  }, [allPrompts, selectedCategory, selectedDifficulty, showOnlyFavorites, showOnlyRecent, searchQuery, favorites, recentUsages]);


  // Category Guides
  const renderCategoryGuide = () => {
    if (selectedCategory === '全部' || selectedCategory === '自定义') return null;
    
    const guides: Record<string, string> = {
      '问题分析': '帮助分析赛题背景、确定方向。适合拿到赛题的第一阶段。避免让AI直接吐出所有答案，而应该引导其按逻辑拆解。',
      '模型选择': '对比模型优缺点，结合题意进行筛选。建议向AI提供数据量大小、变量连续性等信息。',
      '图表与可视化': '当不知道如何展示特定结果时，向AI提问寻求建议。描述数据维度是关键。可以生成各类热力图、条形图、交互式网络图的代码。',
      '代码生成': '生成数据清洗预处理(Python)和求解微分方程等(MATLAB)的代码框架。需要指明所用的库和版本要求。',
      '各类模型 (预测/评价/优化)': '引导构建核心数学模型。例如启发式算法的步骤、AHP矩阵的一致性检验。',
      '论文与分析': '模型跑出结果后，用这段提示词让AI协助写出具有深度的物理或经济学意义讨论。',
      '答辩与展示': '梳理答辩逻辑、结构化PPT内容。'
    };

    return guides[selectedCategory] ? (
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
        <h4 className="font-bold text-primary text-sm flex items-center gap-1.5 mb-1"><BookOpen className="w-4 h-4" /> 新手指南 ({selectedCategory})</h4>
        <p className="text-secondary text-xs font-medium leading-relaxed">{guides[selectedCategory]}</p>
      </div>
    ) : null;
  };

  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-background">
      <TopBar title="智能提示词库" onBack={() => navigate('models')} />
      
      <p className="text-sm text-on-surface-variant font-medium mb-4 mt-2">专为数学建模优化的 AI 交互口诀，涵盖从赛题解析到论文润色的全链路。</p>

      {/* 创建空白提示词按钮 */}
      <button 
        onClick={handleCreateBlank}
        className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-colors mb-4"
      >
        <Plus className="w-5 h-5" /> + New Blank Prompt
      </button>

      {/* 搜索栏 */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none" />
        <input 
          type="text" 
          placeholder="搜索提示词名称或内容..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface-container-lowest border border-surface-dim/50 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-primary/50 shadow-sm transition-colors"
        />
      </div>

      {/* 过滤器 */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 snap-x">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap snap-start shadow-sm transition-colors ${
                selectedCategory === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
           <select 
             value={selectedDifficulty} 
             onChange={(e) => setSelectedDifficulty(e.target.value as any)}
             className="bg-surface-container-lowest border border-surface-dim/50 text-on-surface-variant text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none"
           >
             {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
           </select>
           
           <button 
             onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
               showOnlyFavorites ? 'bg-red-50 border-red-200 text-red-600' : 'bg-surface-container-lowest border-surface-dim/50 text-on-surface-variant hover:bg-surface-dim/30'
             }`}
           >
             <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-red-600' : ''}`} /> 收藏
           </button>

           <button 
             onClick={() => setShowOnlyRecent(!showOnlyRecent)}
             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
               showOnlyRecent ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-surface-container-lowest border-surface-dim/50 text-on-surface-variant hover:bg-surface-dim/30'
             }`}
           >
             <Sparkles className="w-3.5 h-3.5" /> 最近使用
           </button>
        </div>
      </div>

      {renderCategoryGuide()}

      {/* 提示词列表 */}
      <div className="space-y-4">
        {filteredPrompts.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-6 text-center border border-surface-dim/30 shadow-sm mt-4">
             <Bookmark className="w-8 h-8 text-outline mb-2 mx-auto" />
             <p className="text-sm font-medium text-on-surface-variant">在此分类下没有找到对应的提示词。</p>
          </div>
        ) : (
          filteredPrompts.map(prompt => (
            <div key={prompt.id} className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 relative flex flex-col">
               <div className="flex justify-between items-start mb-2 gap-2">
                 <div className="flex flex-wrap gap-1.5">
                   <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold">{prompt.category}</span>
                   <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary rounded text-[10px] font-bold">{prompt.difficulty}</span>
                   {prompt.userCreated && <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary rounded text-[10px] font-bold">我的自定义</span>}
                 </div>
                 <button onClick={(e) => toggleFavorite(prompt.id, e)} className="p-1 -mr-1">
                   <Heart className={`w-5 h-5 transition-colors ${favorites.includes(prompt.id) ? 'text-red-500 fill-red-500' : 'text-outline hover:text-red-400'}`} />
                 </button>
               </div>
               
               <h3 className="font-bold text-base mb-1">{prompt.title}</h3>
               <p className="text-xs text-on-surface-variant font-medium mb-3">{prompt.description}</p>
               
               <div className="mb-4 bg-surface rounded-xl border border-surface-dim/30 overflow-hidden">
                  <div className="bg-surface-container-high px-3 py-1.5 flex items-center justify-between border-b border-surface-dim/30">
                     <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-bold">
                        <Star className="w-3 h-3 text-secondary" /> Prompt Preview
                     </div>
                  </div>
                  <p className="text-xs italic font-serif text-on-surface font-medium leading-relaxed p-3 break-words whitespace-pre-wrap">
                    "{prompt.content}"
                  </p>
               </div>
               
               <div className="flex gap-2 mt-auto pt-2">
                 <button 
                   onClick={(e) => handleCopy(prompt, e)}
                   className="flex-[2] bg-secondary text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-secondary/90 transition-colors text-xs"
                 >
                   <Copy className="w-3.5 h-3.5" /> 复制
                 </button>
                 <button 
                   onClick={() => navigate('ai', { initialText: prompt.content })}
                   className="flex-[2] bg-surface-container-high text-on-surface py-2.5 rounded-xl font-bold border border-surface-dim/30 flex items-center justify-center gap-1.5 hover:bg-surface-dim transition-colors text-xs"
                 >
                   <Play className="w-3.5 h-3.5 text-primary" /> AI
                 </button>
                 
                 {!prompt.userCreated ? (
                   <button 
                     onClick={(e) => handleCustomize(prompt, e)}
                     className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-xl font-bold border border-surface-dim/30 flex items-center justify-center hover:bg-surface-dim transition-colors text-xs"
                     title="Customize"
                   >
                     Customize
                   </button>
                 ) : (
                   <>
                     <button 
                       onClick={(e) => handleEditCustom(prompt, e)}
                       className="flex-[0.8] bg-tertiary/10 text-tertiary py-2.5 rounded-xl font-bold flex items-center justify-center hover:bg-tertiary/20 transition-colors"
                       title="编辑"
                     >
                       <Edit2 className="w-4 h-4" />
                     </button>
                     <button 
                       onClick={(e) => handleDeleteCustom(prompt.id, e)}
                       className="flex-[0.8] bg-red-50 text-red-600 py-2.5 rounded-xl font-bold flex items-center justify-center hover:bg-red-100 transition-colors"
                       title="删除"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </>
                 )}
               </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={handleCreateBlank}
        className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform z-30"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {modalMode !== 'none' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                {modalMode === 'edit' ? '编辑提示词' : modalMode === 'customize' ? '自定义内置提示词' : '创建新空白提示词'} <Sparkles className="w-5 h-5 text-secondary" />
              </h3>
              <button onClick={() => setModalMode('none')} className="p-1 hover:bg-surface-dim/50 rounded-full">
                <X className="w-5 h-5 text-outline" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">标题 (Title)</label>
                <input 
                  type="text" 
                  value={newPrompt.title}
                  onChange={e => setNewPrompt({...newPrompt, title: e.target.value})}
                  placeholder="例如：生成模糊综合评价权重..."
                  className="w-full bg-surface border border-surface-dim/40 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  maxLength={50}
                />
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">分类 (Category)</label>
                  <select 
                    value={newPrompt.category}
                    onChange={e => setNewPrompt({...newPrompt, category: e.target.value as any})}
                    className="w-full bg-surface border border-surface-dim/40 rounded-xl px-2 py-2 text-sm focus:outline-none focus:border-primary/50"
                  >
                    {CATEGORIES.filter(c => c !== '全部').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">难度 (Difficulty)</label>
                  <select 
                    value={newPrompt.difficulty}
                    onChange={e => setNewPrompt({...newPrompt, difficulty: e.target.value as any})}
                    className="w-full bg-surface border border-surface-dim/40 rounded-xl px-2 py-2 text-sm focus:outline-none focus:border-primary/50"
                  >
                    {DIFFICULTIES.filter(d => d !== '所有难度').map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">使用场景说明 (Description)</label>
                <input 
                  type="text" 
                  value={newPrompt.description}
                  onChange={e => setNewPrompt({...newPrompt, description: e.target.value})}
                  placeholder="一句话说明该提示词适用于什么情况..."
                  className="w-full bg-surface border border-surface-dim/40 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">标签 (Tags，用逗号分隔)</label>
                <input 
                  type="text" 
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="如：图论, 代码, 可视化..."
                  className="w-full bg-surface border border-surface-dim/40 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  maxLength={80}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">核心口诀内容 (Prompt Content) *</label>
                <textarea 
                  rows={5}
                  value={newPrompt.content}
                  onChange={e => setNewPrompt({...newPrompt, content: e.target.value})}
                  placeholder="在此输入你要发给 AI 的指令内容，可以使用 [占位符] 以便日后替换..."
                  className="w-full bg-surface border border-surface-dim/40 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 resize-none font-serif"
                />
              </div>

              <div className="flex gap-2 mt-6">
                <button 
                  onClick={() => setModalMode('none')}
                  className="flex-1 bg-surface-container text-on-surface-variant py-3.5 rounded-xl font-bold flex items-center justify-center transition-colors hover:bg-surface-dim"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveCustom}
                  className="flex-[2] bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center shadow-md active:scale-95 transition-transform"
                >
                  {modalMode === 'edit' ? '保存修改' : '创建并保存'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


