import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, UserPlus, ArrowRight, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // If email confirmation is disabled, we can navigate directly
      // If enabled, we should show a message
      if (data.session) {
        navigate('/app');
      } else {
        alert('注册成功，请检查邮箱进行确认！');
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-surface-container-lowest p-8 rounded-3xl shadow-xl border border-surface-dim/30"
      >
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">创建账号</h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            加入数模 AI 工作台，开启智能建模
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="bg-error/10 text-error text-xs p-3 rounded-xl border border-error/20">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-11 pr-4 py-3.5 bg-surface-container text-on-surface border border-surface-dim/50 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                placeholder="真实姓名"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-11 pr-4 py-3.5 bg-surface-container text-on-surface border border-surface-dim/50 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                placeholder="邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-11 pr-4 py-3.5 bg-surface-container text-on-surface border border-surface-dim/50 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                placeholder="密码 (至少 6 位)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-primary-dim focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                立即注册
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant">
          已有账号？{' '}
          <Link to="/login" className="font-bold text-primary hover:text-primary-dim">
            返回登录
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
