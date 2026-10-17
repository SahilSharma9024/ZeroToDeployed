import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Dumbbell, Ticket, Menu, Sun, Moon, Flame } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    mode,
    setMode,
    setActivePage,
    user,
    passes,
    setActiveQrPass,
    setIsProfileOpen,
    theme,
    toggleTheme,
    setIsMobileSidebarOpen
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Clickable Brand Logo to return Home */}
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2.5 text-left group"
              title="Return to Home Dashboard"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-sm sm:text-base">⚡</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  KINETIX
                </span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold uppercase block tracking-wider">
                  Sports & Fitness OS
                </span>
              </div>
            </button>
          </div>

          {/* Center: Primary Domain Switcher (Sports vs Fitness) */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 sm:p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-inner flex items-center">
            <button
              onClick={() => setMode('sports')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'sports'
                  ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-soft border border-purple-100 dark:border-purple-900/50 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Trophy className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${mode === 'sports' ? 'text-purple-600' : 'text-slate-400'}`} />
              <span>Sports Arena</span>
            </button>

            <button
              onClick={() => setMode('fitness')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'fitness'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-soft border border-rose-100 dark:border-rose-900/50 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Dumbbell className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${mode === 'fitness' ? 'text-rose-500' : 'text-slate-400'}`} />
              <span>Fitness & Wellness</span>
            </button>
          </div>

          {/* Right: Passes, Theme & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Daily Streak Pill */}
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{user.streakDays}d Streak</span>
            </div>

            {/* Passes & Tickets Pill */}
            <button
              onClick={() => {
                if (passes.length > 0) {
                  setActiveQrPass(passes[0]);
                } else {
                  alert('No passes yet! Auto-register for an event or gym trial to generate your first pass.');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold transition-all shadow-sm"
              title="View my active event & gym passes"
            >
              <Ticket className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="hidden sm:inline">My Passes</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                {passes.length}
              </span>
            </button>

            {/* Dark Mode Icon Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-1 pr-2 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-soft transition-all"
              title="View & Edit Digital Athlete ID & Settings"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium capitalize">
                  {user.role === 'trainer' ? 'Certified Coach' : 'Athlete'}
                </p>
              </div>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
