import React from 'react';
import { BookOpen, LogIn, UserPlus } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { session } = useAuth();
  const navigate = useNavigate();

  if (session) {
    return <Navigate to="/app/profile" replace />;
  }

  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-surface">
      <TopBar title="个人中心" onBack={() => navigate('/')} />

      <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-dim/30 mb-6 flex flex-col items-center mt-8">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <UserPlus className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2">尚未登录</h2>
        <p className="text-sm text-on-surface-variant text-center mb-8 font-medium leading-relaxed">
          登录后可以保存建模进度、管理项目，并使用完整的 AI Workbench。
        </p>

        <div className="w-full space-y-4">
          <button
            onClick={() => navigate('/login?redirect=/app')}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary-dim transition-all"
          >
            <LogIn className="w-5 h-5" />
            立即登录
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full py-4 bg-surface-container text-on-surface rounded-2xl font-bold border border-surface-dim/30 flex items-center justify-center gap-2 hover:bg-surface-dim transition-all"
          >
            <UserPlus className="w-5 h-5" />
            注册账号
          </button>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-dim/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">访客模式限制</h4>
            <p className="text-[10px] text-on-surface-variant font-medium">当前仅可浏览公开学习内容</p>
          </div>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            无法保存学习进度
          </li>
          <li className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            无法创建建模项目
          </li>
          <li className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            AI Workbench 需要登录后使用
          </li>
        </ul>
      </section>
    </div>
  );
}
