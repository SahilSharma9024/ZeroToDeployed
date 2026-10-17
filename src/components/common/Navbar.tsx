import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Dumbbell,
  Ticket,
  Menu,
  Sun,
  Moon,
  Flame,
  ChevronDown,
  Sliders,
  Award,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    mode,
    setMode,
    setActivePage,
    user,
    updateUser,
    passes,
    setActiveQrPass,
    setIsProfileOpen,
    theme,
    toggleTheme,
    setIsMobileSidebarOpen,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  // Quick unit calculation for preview
  const weightDisplay = user.unitSystem === 'imperial'
    ? `${Math.round(user.weightKg * 2.20462)} lbs`
    : `${user.weightKg} kg`;

  const heightDisplay = user.unitSystem === 'imperial'
    ? `${Math.round(user.heightCm * 0.393701)} in`
    : `${user.heightCm} cm`;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Mobile Menu Button ONLY (App name and collapser are on the left sidebar panel) */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
              aria-label="Open sidebar"
              title="Open menu"
            >
              <Menu className="w-5 h-5" />
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
              <Trophy className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${mode === 'sports' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
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
              <Dumbbell className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${mode === 'fitness' ? 'text-rose-500 dark:text-rose-400' : 'text-slate-400'}`} />
              <span>Fitness & Wellness</span>
            </button>
          </div>

          {/* Right: Passes, Streak & Profile with Flyout Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Daily Streak Pill */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{user.streakDays}d Streak</span>
            </div>

            {/* Passes & Tickets Pill */}
            <button
              onClick={() => {
                if (passes.length > 0) {
                  setActiveQrPass(passes[0]);
                } else {
                  setActivePage(mode === 'sports' ? 'sports-passes' : 'fitness-passes');
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold transition-all shadow-sm"
              title="View my active event & gym passes"
            >
              <Ticket className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="hidden sm:inline">Passes</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                {passes.length}
              </span>
            </button>

            {/* Profile Menu Trigger & Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center gap-2 p-1 pr-2 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border transition-all cursor-pointer focus:outline-none ${
                  isProfileMenuOpen
                    ? 'border-purple-300 dark:border-purple-600 ring-2 ring-purple-100 dark:ring-purple-900/40'
                    : 'border-slate-200/80 dark:border-slate-700 shadow-soft'
                }`}
                title="Account, Profile & Appearance Settings"
                aria-expanded={isProfileMenuOpen}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium capitalize">
                    {user.role === 'trainer' ? 'Coach' : 'Athlete'}
                  </p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180 text-purple-600' : ''}`} />
              </button>

              {/* Profile Menu Popover */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-soft-xl border border-slate-200/90 dark:border-slate-800 p-3 space-y-3 z-50 animate-fadeIn">
                  
                  {/* User Profile Card Header */}
                  <div className="p-3 bg-gradient-to-r from-purple-50 via-rose-50 to-indigo-50 dark:from-purple-950/40 dark:via-rose-950/30 dark:to-indigo-950/40 rounded-2xl border border-purple-100 dark:border-purple-900/40 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-11 h-11 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-soft"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                            {user.name}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            user.role === 'trainer'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                          }`}>
                            {user.role === 'trainer' ? 'Coach' : 'Athlete'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 pt-1 border-t border-purple-100/80 dark:border-purple-900/40">
                      <span>{weightDisplay} • {heightDisplay}</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold capitalize">
                        {user.fitnessGoal ? user.fitnessGoal.replace('_', ' ') : 'General'}
                      </span>
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="space-y-1">
                    
                    {/* Theme Mode Toggle Row */}
                    <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-900/50'
                            : 'bg-amber-100/70 text-amber-600 border border-amber-200'
                        }`}>
                          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Appearance
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">
                            {theme === 'dark' ? 'Dark theme active' : 'Light theme active'}
                          </p>
                        </div>
                      </div>

                      {/* Pill toggle button */}
                      <button
                        onClick={toggleTheme}
                        className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                          theme === 'dark' ? 'bg-indigo-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                        }`}
                        title="Switch theme"
                        aria-label="Toggle dark mode"
                      >
                        <div className="bg-white w-5 h-5 rounded-full shadow-md flex items-center justify-center text-[10px]">
                          {theme === 'dark' ? '🌙' : '☀️'}
                        </div>
                      </button>
                    </div>

                    {/* Personal Details Option */}
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsProfileOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                            Personal Details
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">
                            Edit biometrics, units (kg/lbs, cm/in), phone & ID
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    {/* Role Quick Toggle */}
                    <button
                      onClick={() => {
                        updateUser({ role: user.role === 'athlete' ? 'trainer' : 'athlete' });
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Switch to {user.role === 'athlete' ? 'Coach' : 'Athlete'}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">
                            {user.role === 'athlete' ? 'Access Coach Client HQ & Prescriptions' : 'Access Athlete Workout Splits & Check-in'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-lg border border-purple-200 dark:border-purple-800">
                        Toggle
                      </span>
                    </button>

                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
