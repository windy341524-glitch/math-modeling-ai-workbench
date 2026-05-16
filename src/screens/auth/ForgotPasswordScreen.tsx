import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Mail, Loader2, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
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
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">找回密码</h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            我们将向您的邮箱发送重置链接
          </p>
        </div>

        {success ? (
          <div className="mt-8 text-center space-y-6">
            <div className="bg-primary/10 text-primary p-4 rounded-2xl border border-primary/20">
              重置邮件已发送！请查看您的收件箱。
            </div>
            <Link to="/login" className="flex items-center justify-center gap-2 text-primary font-bold">
              <ArrowLeft className="h-4 w-4" /> 返回登录
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleReset}>
            {error && (
              <div className="bg-error/10 text-error text-xs p-3 rounded-xl border border-error/20">
                {error}
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-11 pr-4 py-3.5 bg-surface-container text-on-surface border border-surface-dim/50 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                placeholder="注册时的邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                  发送重置链接
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-on-surface-variant">
              想起密码了？{' '}
              <Link to="/login" className="font-bold text-primary hover:text-primary-dim">
                返回登录
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
