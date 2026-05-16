import { Bell, ArrowLeft } from 'lucide-react';

export default function TopBar({ onBack, title, onProfile, rightElement }: any) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 py-3 bg-surface/80 backdrop-blur-md border-b border-surface-dim/40 flex justify-between items-center transition-all">
      <div className="flex items-center gap-2 text-on-surface">
        {onBack && (
          <button onClick={onBack} className="p-1 -ml-1 mr-1 hover:bg-surface-dim/40 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {!onBack && onProfile && (
           <button onClick={onProfile} className="w-8 h-8 rounded-full border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" className="w-full h-full object-cover" />
           </button>
        )}
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
          {title || "ModelMate"}
        </h1>
      </div>
      {rightElement || (
        <button className="text-on-surface-variant hover:text-primary transition-colors p-2">
          <Bell className="w-5 h-5" />
        </button>
      )}
    </header>
  );
}
