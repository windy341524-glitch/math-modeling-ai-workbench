import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService, Project } from '../../services/projectService';
import { 
  ArrowLeft, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Settings, 
  Trash2, 
  Loader2, 
  ChevronRight,
  LayoutGrid,
  Sparkles,
  BarChart3,
  Workflow,
  Sigma
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchProject(id);
  }, [id]);

  const fetchProject = async (projectId: string) => {
    setLoading(true);
    try {
      const data = await projectService.getProjectById(projectId);
      setProject(data);
    } catch (err) {
      console.error('Failed to fetch project:', err);
      navigate('/app');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !window.confirm('确定要删除这个项目吗？所有对话记录和产出都将被永久删除。')) return;
    
    setDeleting(true);
    try {
      await projectService.deleteProject(project.id);
      navigate('/app');
    } catch (err) {
      alert('删除失败');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="pt-6 px-6 pb-32 min-h-screen bg-background">
      <header className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/app')}
          className="p-2 rounded-full bg-surface-container hover:bg-surface-dim transition-colors text-on-surface-variant"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-surface-container hover:bg-surface-dim transition-colors text-on-surface-variant">
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 rounded-full bg-error/10 hover:bg-error/20 transition-colors text-error"
          >
            {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">{project.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(project.created_at).toLocaleDateString()}
              </span>
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-bold uppercase tracking-wider">
                {project.status}
              </span>
            </div>
          </div>
        </div>
        {project.description && (
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {project.description}
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <button 
          onClick={() => navigate(`/app/projects/${project.id}/chat`)}
          className="w-full bg-primary text-white p-5 rounded-3xl flex items-center justify-between shadow-lg shadow-primary/20 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold">继续 AI 建模对话</div>
              <div className="text-xs text-white/70">向 AI 提问、生成公式或代码</div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <section>
        <h2 className="text-lg font-bold text-on-surface mb-4">建模进展</h2>
        <div className="grid grid-cols-2 gap-4">
          <ProgressCard icon={<BarChart3 />} label="问题分析" count={0} color="secondary" />
          <ProgressCard icon={<Sigma />} label="数学模型" count={0} color="primary" />
          <ProgressCard icon={<Workflow />} label="算法流程" count={0} color="tertiary" />
          <ProgressCard icon={<FileText />} label="求解代码" count={0} color="outline" />
        </div>
      </section>

      <div className="mt-8 p-6 bg-surface-container-lowest rounded-3xl border border-surface-dim/30 flex flex-col items-center text-center">
        <Sparkles className="w-10 h-10 text-primary/30 mb-3" />
        <h3 className="font-bold text-on-surface text-sm">还没有保存的结果</h3>
        <p className="text-xs text-on-surface-variant mt-1">在 AI 对话中生成的内容可以保存到这里</p>
      </div>
    </div>
  );
}

function ProgressCard({ icon, label, count, color }: any) {
  const colorMap: any = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
    outline: 'bg-surface-container text-on-surface-variant'
  };

  return (
    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-dim/30 shadow-sm flex flex-col">
      <div className={`w-8 h-8 rounded-xl ${colorMap[color]} flex items-center justify-center mb-3`}>
        {React.cloneElement(icon, { className: 'w-4 h-4' })}
      </div>
      <div className="font-bold text-sm text-on-surface">{label}</div>
      <div className="text-[10px] text-on-surface-variant mt-1">{count} 个条目</div>
    </div>
  );
}
