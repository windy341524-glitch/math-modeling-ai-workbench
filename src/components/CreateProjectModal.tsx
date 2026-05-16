import React, { useState } from 'react';
import { X, Loader2, Sparkles, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectService } from '../services/projectService';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (project: any) => void;
}

export default function CreateProjectModal({ isOpen, onClose, onCreated }: CreateProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const project = await projectService.createProject(title, description);
      onCreated(project);
      onClose();
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || '创建项目失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-surface-dim/30"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-on-surface">开启新建模项目</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
                  <X className="w-5 h-5 text-outline" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-error/10 text-error text-xs p-3 rounded-xl border border-error/20">
                    {error}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-on-surface-variant ml-1">项目标题</label>
                  <input
                    type="text"
                    required
                    placeholder="例如：2024 国赛 A 题分析"
                    className="w-full px-4 py-3 bg-surface-container border border-surface-dim/50 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-on-surface-variant ml-1">项目简述 (可选)</label>
                  <textarea
                    placeholder="简单描述此建模项目的背景或目标..."
                    className="w-full px-4 py-3 bg-surface-container border border-surface-dim/50 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm min-h-[100px] resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !title.trim()}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        <LayoutGrid className="w-5 h-5" />
                        立即创建
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
