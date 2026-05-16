import React from 'react';
import {
  Activity,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  LayoutDashboard,
  Lightbulb,
  LogIn,
  Navigation2,
  PlayCircle,
  Target,
  UserPlus,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { RECENTLY_STUDIED, RecentItem } from '../data/recentLearning';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigate }: any) {
  const { session } = useAuth();

  const handleRecentClick = (item: RecentItem) => {
    if (!item.targetPage) {
      alert('This learning item is not available yet. Please choose another lesson.');
      return;
    }
    navigate(item.targetPage, item.targetParams);
  };

  return (
    <div className="pt-20 px-4 pb-24 min-h-screen bg-surface">
      <TopBar title="数模 AI 工作台" hideBack />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-dim/30 flex flex-col items-center justify-center relative">
          <div className="relative w-20 h-20 mb-2">
            <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
              <path
                className="text-surface-dim/50"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary"
                strokeDasharray="65, 100"
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">65%</span>
            </div>
          </div>
          <span className="text-xs font-medium text-on-surface-variant">学习进度</span>
        </div>

        <div className="bg-primary text-white rounded-2xl p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-medium tracking-wider opacity-80 uppercase mb-1">MCM/ICM 倒计时</div>
            <div className="text-xl font-bold leading-tight flex flex-wrap gap-1">
              <span>12天</span><span className="opacity-50 text-sm">/</span><span>14时</span><span className="opacity-50 text-sm">/</span><span>05分</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 bg-white/20 w-max px-2 py-1 rounded-full border border-white/20">
            <Target className="w-3 h-3" />
            <span className="text-[10px] font-medium">需要准备</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-secondary/10 to-primary/5 rounded-2xl p-4 mb-6 border border-secondary/20 flex gap-3 items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="bg-secondary/20 p-2 rounded-xl text-secondary z-10 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="z-10">
          <div className="text-xs font-bold text-secondary mb-1">AI 导航提示</div>
          <p className="text-sm text-on-surface font-medium">登录后可进入工作台，保存项目并继续使用 AI 建模对话。</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <ActionBtn icon={<Activity className="text-primary" />} label="问题分析" onClick={() => navigate('ai')} />
        <ActionBtn icon={<Database className="text-secondary" />} label="模型库" onClick={() => navigate('models')} />
        <ActionBtn icon={<Lightbulb className="text-secondary" />} label="提示词库" onClick={() => navigate('prompts')} />
        <ActionBtn icon={<Navigation2 className="text-primary" />} label="案例练习" onClick={() => navigate('cases')} />
      </div>

      <div className="flex gap-4 mb-8">
        {session ? (
          <>
            <button
              onClick={() => navigate('/app')}
              className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              进入工作台
            </button>
            <button
              onClick={() => navigate('/app/profile')}
              className="flex-1 bg-surface-container-highest text-on-surface py-4 rounded-2xl font-bold border border-surface-dim/30 hover:bg-surface-dim/50 transition-all"
            >
              个人资料
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              立即登录
            </button>
            <button
              onClick={() => navigate('/register')}
              className="flex-1 bg-surface-container-highest text-on-surface py-4 rounded-2xl font-bold border border-surface-dim/30 hover:bg-surface-dim/50 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              注册账号
            </button>
          </>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-lg font-bold">推荐路径</h3>
          <button className="text-primary text-xs font-medium" onClick={() => navigate('learn')}>查看全部</button>
        </div>
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-primary to-secondary cursor-pointer" onClick={() => navigate('learn')}>
          <div className="bg-surface-container-lowest rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant mb-0.5">下一步</div>
                <div className="text-sm font-bold">线性规划基础</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-outline" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">最近学习</h3>
        {RECENTLY_STUDIED.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
            {RECENTLY_STUDIED.map((item) => (
              <RecentCard
                key={item.id}
                item={item}
                onClick={() => handleRecentClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl p-6 text-center border border-surface-dim/30 shadow-sm flex flex-col items-center justify-center">
            <Bookmark className="w-8 h-8 text-outline mb-2" />
            <p className="text-sm font-medium text-on-surface-variant mb-4">No recent learning yet. Start your first lesson.</p>
            <button
              className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-colors"
              onClick={() => navigate('learn')}
            >
              Explore Learning Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
      <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest border border-surface-dim/40 shadow-sm flex items-center justify-center hover:bg-surface-container transition-colors">
        {icon}
      </div>
      <span className="text-xs text-on-surface-variant font-medium">{label}</span>
    </button>
  );
}

const RecentCard: React.FC<{ item: RecentItem; onClick: () => void }> = ({ item, onClick }) => {
  const isCompleted = item.progress >= 100;

  return (
    <div
      onClick={onClick}
      className="min-w-[240px] max-w-[280px] bg-surface-container-lowest rounded-2xl p-4 border border-surface-dim/30 shadow-sm flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow snap-start flex flex-col h-full relative group"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 items-center">
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold">
            {item.category}
          </span>
          {item.tags.slice(0, 1).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded text-[10px] font-medium hidden sm:inline-block">
              {tag}
            </span>
          ))}
        </div>
        <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center shrink-0">
          <Bookmark className="w-3.5 h-3.5 text-outline group-hover:text-primary transition-colors" />
        </div>
      </div>

      <h4 className="text-sm font-bold mb-1 line-clamp-1">{item.title}</h4>
      <p className="text-xs text-on-surface-variant mb-4 line-clamp-2 font-medium flex-grow flex-shrink">
        {item.description}
      </p>

      <div className="mt-auto">
        <div className="flex justify-between items-center text-[10px] mb-1.5">
          <span className={`font-bold ${isCompleted ? 'text-green-600' : 'text-primary'}`}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </span>
          <span className="text-on-surface-variant font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> {item.lastOpenedAt}
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}
            style={{ width: `${Math.max(5, item.progress)}%` }}
          />
        </div>
        <button
          className="w-full py-2 bg-surface-container text-on-surface-variant rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 group-hover:bg-primary group-hover:text-white transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            onClick();
          }}
        >
          {isCompleted ? (
            <><CheckCircle2 className="w-3.5 h-3.5" /> Review Again</>
          ) : (
            <><PlayCircle className="w-3.5 h-3.5" /> Continue Learning</>
          )}
        </button>
      </div>
    </div>
  );
};
