import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutGrid, FolderRoot, MessageSquare, LogOut, PlusCircle, Sparkles, Loader2, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import CreateProjectModal from '../../components/CreateProjectModal';
import { projectService, Project } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';

export default function WorkbenchHome() {
  const { user, signOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (project: Project) => {
    setProjects([project, ...projects]);
    // Optionally navigate to project detail immediately
    navigate(`/app/projects/${project.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="pt-8 px-6 pb-32 min-h-screen bg-background">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">工作台</h1>
          <p className="text-sm text-on-surface-variant">欢迎回来，{user?.user_metadata?.full_name || '建模者'}</p>
        </div>
        <button 
          onClick={handleSignOut}
          className="p-2 rounded-full bg-surface-container hover:bg-surface-dim transition-colors text-on-surface-variant"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <section className="grid grid-cols-1 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white p-6 rounded-3xl shadow-lg shadow-primary/20 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-1">开始新项目</h2>
            <p className="text-white/80 text-sm mb-4">使用 AI 辅助分析题目并建立数学模型</p>
            <PlusCircle className="w-8 h-8" />
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-dim/30 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center mb-3">
              <FolderRoot className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-bold text-on-surface">我的项目</h3>
            <p className="text-xs text-on-surface-variant mt-1">{projects.length} 个建模项目</p>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-dim/30 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5 text-tertiary" />
            </div>
            <h3 className="font-bold text-on-surface">AI 对话</h3>
            <p className="text-xs text-on-surface-variant mt-1">智能对话助理</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-on-surface">最近项目</h2>
          {projects.length > 0 && (
            <button className="text-xs text-primary font-bold hover:underline">查看全部</button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-outline">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">加载中...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 bg-surface-container-lowest rounded-3xl border border-dashed border-surface-dim/50 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mb-4">
               <LayoutGrid className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-on-surface">暂无项目</h4>
            <p className="text-xs text-on-surface-variant mt-1">开始您的第一个数学建模挑战吧！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ x: 4 }}
                onClick={() => navigate(`/app/projects/${project.id}`)}
                className="p-4 bg-surface-container-lowest rounded-2xl border border-surface-dim/30 flex items-center gap-4 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                   <LayoutGrid className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{project.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                      <Clock className="w-3 h-3" />
                      {formatDate(project.created_at)}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${project.status === 'draft' ? 'bg-outline-variant/30 text-outline' : 'bg-primary/10 text-primary'}`}>
                      {project.status === 'draft' ? '草稿' : '进行中'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-outline" />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreated={handleProjectCreated} 
      />
    </div>
  );
}
