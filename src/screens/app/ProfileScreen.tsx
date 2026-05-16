import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  ArrowLeft, 
  ChevronRight, 
  Settings, 
  Bell, 
  CreditCard,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ProfileScreen() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (authLoading || (loading && !profile)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-6 px-6 pb-32 min-h-screen bg-background">
      <header className="flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate('/app')}
          className="p-2 rounded-full bg-surface-container hover:bg-surface-dim transition-colors text-on-surface-variant"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-on-surface">个人中心</h1>
        <button className="p-2 rounded-full bg-surface-container hover:bg-surface-dim transition-colors text-on-surface-variant">
           <Settings className="w-5 h-5" />
        </button>
      </header>

      <section className="flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border-4 border-surface-container shadow-xl">
             {profile?.avatar_url ? (
               <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
             ) : (
               <User className="w-12 h-12 text-primary" />
             )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-background rounded-full flex items-center justify-center">
             <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-on-surface">{profile?.full_name || '未设置姓名'}</h2>
        <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-1.5">
           <Mail className="w-3.5 h-3.5" />
           {user?.email}
        </p>
      </section>

      <div className="space-y-3 mb-8">
        <MenuButton icon={<CreditCard />} label="我的权益" subLabel="当前方案：专业版" color="primary" />
        <MenuButton icon={<Bell />} label="消息通知" subLabel="3 条未读消息" color="secondary" />
        <MenuButton icon={<Calendar />} label="加入时间" subLabel={new Date(profile?.created_at || '').toLocaleDateString()} color="tertiary" />
      </div>

      <button 
        onClick={handleSignOut}
        className="w-full py-4 px-6 rounded-2xl bg-error/10 text-error font-bold flex items-center justify-between hover:bg-error/20 transition-all group"
      >
        <div className="flex items-center gap-3">
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </div>
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[10px] text-outline mt-12 uppercase tracking-widest font-bold">
        ModelMate AI v1.0.0
      </p>
    </div>
  );
}

function MenuButton({ icon, label, subLabel, color }: any) {
  const colorMap: any = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
  };

  return (
    <button className="w-full p-4 rounded-2xl bg-surface-container-lowest border border-surface-dim/30 flex items-center gap-4 hover:shadow-md transition-all group">
      <div className={`w-10 h-10 rounded-xl ${colorMap[color]} flex items-center justify-center shrink-0`}>
        {React.cloneElement(icon, { className: 'w-5 h-5' })}
      </div>
      <div className="flex-1 text-left">
        <div className="font-bold text-sm text-on-surface">{label}</div>
        <div className="text-xs text-on-surface-variant">{subLabel}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-outline transition-transform group-hover:translate-x-1" />
    </button>
  );
}
