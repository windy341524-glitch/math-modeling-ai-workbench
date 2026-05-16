import { ArrowLeft, LayoutDashboard, LogIn, LogOut, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function TopBar({ onBack, title, rightElement }: any) {
  const { session, user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'User';

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 py-3 bg-surface/80 backdrop-blur-md border-b border-surface-dim/40 flex justify-between items-center transition-all">
      <div className="flex items-center gap-2 text-on-surface min-w-0">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1 -ml-1 mr-1 hover:bg-surface-dim/40 rounded-full shrink-0"
            aria-label="返回"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight truncate">
          {title || 'ModelMate'}
        </h1>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {rightElement || (
          session ? (
            <>
              <button
                onClick={() => navigate('/app')}
                className="h-9 px-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5"
                aria-label="进入工作台"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-bold">工作台</span>
              </button>
              <button
                onClick={() => navigate('/app/profile')}
                className="h-9 max-w-[112px] px-2 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center gap-1.5 overflow-hidden"
                aria-label="个人资料"
                title={displayName}
              >
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-primary shrink-0" />
                )}
                <span className="hidden sm:block text-xs font-bold text-on-surface truncate">{displayName}</span>
              </button>
              <button
                onClick={handleSignOut}
                className="h-9 w-9 rounded-xl bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center justify-center"
                aria-label="退出登录"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="h-9 px-3 rounded-xl bg-primary text-white hover:bg-primary-dim transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                <LogIn className="w-4 h-4" />
                登录
              </button>
              <button
                onClick={() => navigate('/register')}
                className="h-9 px-3 rounded-xl bg-surface-container text-on-surface border border-surface-dim/50 hover:bg-surface-dim/50 transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                <UserPlus className="w-4 h-4" />
                注册
              </button>
            </>
          )
        )}
      </div>
    </header>
  );
}
