import { Heart, Code2, BookOpen, Calculator, Share2, Info, ArrowLeft, ArrowRight, Play, Bot } from 'lucide-react';
import TopBar from '../components/TopBar';
import { EVALUATION_MODELS, OPTIMIZATION_MODELS } from '../data/modelCourses';
import { useState, useMemo } from 'react';

const CATEGORIES: Record<string, any> = {
  'evaluation': EVALUATION_MODELS,
  'optimization': OPTIMIZATION_MODELS
};

export default function ModelLessonScreen({ navigate, categoryId, lessonId }: any) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const category = CATEGORIES[categoryId] || EVALUATION_MODELS;
  const currentLessonIndex = lessonId 
    ? category.lessons.findIndex((l: any) => l.id === lessonId)
    : 0;
  
  const lesson = category.lessons[currentLessonIndex] || category.lessons[0];

  const handleNext = () => {
    if (lesson.nextLessonId) {
      navigate('model_lesson', { categoryId, lessonId: lesson.nextLessonId });
    }
  };

  const handlePrev = () => {
    if (lesson.previousLessonId) {
      navigate('model_lesson', { categoryId, lessonId: lesson.previousLessonId });
    }
  };

  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-surface">
      <TopBar title={category.title} onBack={() => navigate('models')} />

      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-dim/30 mb-6 relative mt-4">
         <div className="flex justify-between items-start mb-3">
           <div>
             <h2 className="text-2xl font-bold mb-1">{lesson.title}</h2>
             <div className="text-sm font-medium text-on-surface-variant italic">第 {currentLessonIndex + 1} 课 / 共 {category.lessons.length} 课</div>
           </div>
           <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-dim/50">
             <Heart className="w-5 h-5 text-outline hover:text-red-500 hover:fill-red-500 transition-colors" />
           </button>
         </div>
         
         <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">{category.title.split(' ')[0]}</span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold">核心学习</span>
         </div>

         <h3 className="font-bold text-base mb-2">模型简介</h3>
         <p className="text-sm text-on-surface-variant leading-relaxed font-medium mb-6">
           {lesson.description}
         </p>

         <div className="grid grid-cols-1 gap-3 mb-6">
           {lesson.example && (
             <div className="bg-surface-container-high rounded-xl p-4 flex gap-3">
               <Info className="w-5 h-5 text-primary shrink-0" />
               <div>
                 <h4 className="font-bold text-sm mb-1">应用案例</h4>
                 <p className="text-xs text-on-surface-variant font-medium">{lesson.example}</p>
               </div>
             </div>
           )}
           
           {lesson.steps && lesson.steps.length > 0 && (
             <div className="bg-surface-container-high rounded-xl p-4 flex gap-3">
               <Calculator className="w-5 h-5 text-secondary shrink-0" />
               <div>
                 <h4 className="font-bold text-sm mb-1">算法步骤</h4>
                 <ol className="text-xs text-on-surface-variant font-medium list-decimal pl-4 space-y-1">
                   {lesson.steps.map((step: string, index: number) => (
                     <li key={index}>{step}</li>
                   ))}
                 </ol>
               </div>
             </div>
           )}

           {lesson.formulas && lesson.formulas.length > 0 && (
             <div className="bg-surface-container-high rounded-xl p-4 flex gap-3">
               <BookOpen className="w-5 h-5 text-tertiary shrink-0" />
               <div className="w-full">
                 <h4 className="font-bold text-sm mb-1">核心公式</h4>
                 <div className="text-xs text-on-surface-variant font-medium space-y-1 overflow-x-auto">
                   {lesson.formulas.map((formula: string, index: number) => (
                     <div key={index} className="bg-surface-container-highest p-2 rounded text-center whitespace-nowrap overflow-x-auto">
                       {formula}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}
         </div>

         <div className="mt-8 pt-6 border-t border-surface-dim/30">
            <h3 className="text-sm font-bold mb-4">代码实践</h3>
            <div className="flex gap-3 mb-4">
              <button 
                className={`flex-1 bg-surface-container py-3 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-colors text-xs border border-surface-dim/50 ${lesson.pythonTemplateId ? 'text-on-surface-variant hover:bg-surface-dim/50 active:scale-95' : 'text-on-surface-variant/30 opacity-50 cursor-not-allowed'}`}
                disabled={!lesson.pythonTemplateId}
                onClick={() => navigate('playground', { initialTab: 'python', initialTemplateId: lesson.pythonTemplateId })}
              >
                <Code2 className={`w-4 h-4 ${lesson.pythonTemplateId ? 'text-primary' : 'text-outline/40'}`} /> Python 模板
              </button>
              <button 
                className={`flex-1 bg-surface-container py-3 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-colors text-xs border border-surface-dim/50 ${lesson.matlabTemplateId ? 'text-on-surface-variant hover:bg-surface-dim/50 active:scale-95' : 'text-on-surface-variant/30 opacity-50 cursor-not-allowed'}`}
                disabled={!lesson.matlabTemplateId}
                onClick={() => navigate('playground', { initialTab: 'matlab', initialTemplateId: lesson.matlabTemplateId })}
              >
                <Code2 className={`w-4 h-4 ${lesson.matlabTemplateId ? 'text-[#e65100]' : 'text-outline/40'}`} /> MATLAB 模板
              </button>
            </div>
            {lesson.practiceId && (
              <button 
                className="w-full bg-secondary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors mb-4" 
                onClick={() => navigate('cases', { highlightId: lesson.practiceId })}
              >
                <Play className="w-4 h-4" /> 案例实战练习 (Practice)
              </button>
            )}
         </div>

         <div className="mt-6 flex flex-col gap-3">
             <button 
               onClick={() => setIsAIChatOpen(true)}
               className="w-full bg-secondary/10 text-secondary border border-secondary/20 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/20 transition-colors active:scale-95 text-sm" 
             >
               <Bot className="w-4 h-4" /> 向 AI 询问关于此模型的疑问
             </button>
             
             <div className="flex gap-3">
               {lesson.previousLessonId ? (
                 <button 
                   onClick={handlePrev}
                   className="flex-1 bg-surface-container-high py-3 rounded-xl font-bold flex items-center justify-center gap-1 hover:bg-surface-dim transition-colors text-sm" 
                 >
                   <ArrowLeft className="w-4 h-4" /> 上一步
                 </button>
               ) : (
                 <div className="flex-1"></div>
               )}
               {lesson.nextLessonId ? (
                 <button 
                   onClick={handleNext}
                   className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-1 shadow-md hover:bg-primary/90 transition-colors text-sm" 
                 >
                   下一步 <ArrowRight className="w-4 h-4" />
                 </button>
               ) : (
                 <button 
                   onClick={() => navigate('models')}
                   className="flex-1 bg-[#10b981] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-1 shadow-md hover:bg-[#10b981]/90 transition-colors text-sm" 
                 >
                   完成分类 <Heart className="w-4 h-4 fill-white" />
                 </button>
               )}
             </div>
             
             <button 
               className="w-full bg-surface-container text-on-surface-variant py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-dim transition-colors text-sm" 
               onClick={() => navigate('models')}
             >
               返回模型库 (Back to Library)
             </button>
         </div>
      </div>
    </div>
  );
}
