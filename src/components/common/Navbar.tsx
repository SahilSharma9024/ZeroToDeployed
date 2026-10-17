import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Dumbbell, Ticket, User, Sparkles, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { mode, setMode, user, updateUser, passes, setActiveQrPass, setIsProfileOpen } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-100 via-rose-100 to-indigo-100 border border-purple-200/60 flex items-center justify-center shadow-soft">
              {mode === 'sports' ? (
                <Trophy className="w-6 h-6 text-purple-600" />
              ) : (
                <Dumbbell className="w-6 h-6 text-rose-500" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">Pulse<span className="text-purple-600">Play</span></span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Prototype
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Integrated Sports & Fitness Hub</p>
            </div>
          </div>

          {/* Core Mode Toggle: Sports vs Fitness */}
          <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner flex items-center">
            <button
              onClick={() => setMode('sports')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === 'sports'
                  ? 'bg-white text-purple-700 shadow-soft border border-purple-100 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Trophy className={`w-4 h-4 ${mode === 'sports' ? 'text-purple-600' : 'text-slate-400'}`} />
              <span>Sports Arena</span>
              {mode === 'sports' && (
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setMode('fitness')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === 'fitness'
                  ? 'bg-white text-rose-600 shadow-soft border border-rose-100 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Dumbbell className={`w-4 h-4 ${mode === 'fitness' ? 'text-rose-500' : 'text-slate-400'}`} />
              <span>Fitness & Wellness</span>
              {mode === 'fitness' && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Right Actions: Role Switcher, My Passes & Profile */}
          <div className="flex items-center gap-3">
            
            {/* Quick Role Switcher (Athlete vs Trainer) for Fitness Mode */}
            {mode === 'fitness' && (
              <div className="hidden md:flex items-center gap-1 bg-amber-50/70 border border-amber-200/70 px-2.5 py-1 rounded-xl text-xs">
                <span className="text-amber-800 font-medium">Role:</span>
                <button
                  onClick={() => updateUser({ role: user.role === 'trainer' ? 'athlete' : 'trainer' })}
                  className="font-bold text-amber-900 underline hover:text-amber-950 transition-colors cursor-pointer"
                  title="Click to toggle Client / Trainer view"
                >
                  {user.role === 'trainer' ? '👨‍🏫 Trainer Mode' : '🏃‍♂️ Client / Athlete'}
                </button>
              </div>
            )}

            {/* Passes & Tickets Pill */}
            <button
              onClick={() => {
                if (passes.length > 0) {
                  setActiveQrPass(passes[0]);
                } else {
                  alert('No passes yet! Auto-register for an event or gym trial to generate your first pass.');
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100/70 border border-purple-200/60 text-purple-700 text-xs font-semibold transition-all shadow-sm"
              title="View my active event & gym passes"
            >
              <Ticket className="w-3.5 h-3.5 text-purple-600" />
              <span>My Passes</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                {passes.length}
              </span>
            </button>

            {/* User Profile Trigger */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 shadow-soft transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                  {user.name}
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                </p>
                <p className="text-[10px] text-slate-500 font-medium capitalize">
                  {user.role === 'trainer' ? 'Certified Coach' : `${user.experienceLevel} • ${user.jerseySize}`}
                </p>
              </div>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

