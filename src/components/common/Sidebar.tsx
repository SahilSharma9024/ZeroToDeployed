import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActivePage } from '../../types';
import {
  Home,
  Trophy,
  MapPin,
  Map,
  Users,
  AlertCircle,
  Ticket,
  Dumbbell,
  Calculator,
  Bot,
  Video,
  Flame,
  Sun,
  Moon,
  X,
  Compass,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    mode,
    activePage,
    setActivePage,
    theme,
    toggleTheme,
    user,
    passes,
    ghostSubs,
    gymBuddies,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    incrementStreak,
  } = useApp();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileSidebarOpen(false);
  };

  const sportsNav = [
    { id: 'sports-overview' as ActivePage, label: 'Sports Overview', icon: Compass },
    { id: 'sports-events' as ActivePage, label: 'Tournaments & Events', icon: Trophy, badge: '6 Live' },
    { id: 'sports-turfs' as ActivePage, label: 'Turfs & Arenas', icon: MapPin },
    { id: 'sports-map' as ActivePage, label: 'Interactive Venue Map', icon: Map, highlight: true },
    { id: 'sports-ghost' as ActivePage, label: 'Ghost Sub & SOS', icon: AlertCircle, badge: `${ghostSubs.length} SOS`, badgeColor: 'bg-rose-500 text-white' },
    { id: 'sports-passes' as ActivePage, label: 'My Sports Passes', icon: Ticket, badge: `${passes.filter(p => p.type !== 'gym_pass').length}` },
  ];

  const fitnessNav = [
    { id: 'fitness-overview' as ActivePage, label: 'Fitness Overview', icon: Compass },
    { id: 'fitness-gyms' as ActivePage, label: 'High-Rated Gyms', icon: Dumbbell, badge: 'Top Rated' },
    { id: 'fitness-map' as ActivePage, label: 'Interactive Gym Map', icon: Map, highlight: true },
    { id: 'fitness-calculators' as ActivePage, label: 'BMI & BMR Suite', icon: Calculator },
    { id: 'fitness-ai' as ActivePage, label: 'AI Personal Trainer', icon: Bot, badge: 'AI Gen', badgeColor: 'bg-purple-600 text-white' },
    { id: 'fitness-portal' as ActivePage, label: user.role === 'trainer' ? 'Coach Client HQ' : 'My Workout & Meals', icon: CalendarCheck },
    { id: 'fitness-buddy' as ActivePage, label: 'Motivation Buddy', icon: Users, badge: `${gymBuddies.length} Live` },
    { id: 'fitness-exercises' as ActivePage, label: 'Video Academy', icon: Video },
    { id: 'fitness-passes' as ActivePage, label: 'My Free Trial Passes', icon: Ticket, badge: `${passes.filter(p => p.type === 'gym_pass').length}` },
  ];

  const currentNav = mode === 'sports' ? sportsNav : fitnessNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          
          {/* Top Brand & Close on Mobile */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left group"
              title="Return to Home"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-base">⚡</span>
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  KINETIX
                </h1>
                <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  Sports & Fitness OS
                </p>
              </div>
            </button>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Pill Badge */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className={`p-3 rounded-2xl border transition-colors ${
              mode === 'sports'
                ? 'bg-purple-50/80 dark:bg-purple-950/30 border-purple-200/60 dark:border-purple-800/40'
                : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200/60 dark:border-rose-800/40'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Active Domain
                </span>
                <span className={`w-2 h-2 rounded-full animate-ping ${
                  mode === 'sports' ? 'bg-purple-500' : 'bg-rose-500'
                }`} />
              </div>
              <p className={`text-xs font-extrabold mt-0.5 ${
                mode === 'sports' ? 'text-purple-700 dark:text-purple-300' : 'text-rose-600 dark:text-rose-300'
              }`}>
                {mode === 'sports' ? '⚽ Sports & Turf Network' : '🏋️ Fitness & Wellness Suite'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5 flex-1">
            
            {/* Global Home Link */}
            <button
              onClick={() => handleNav('home')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activePage === 'home'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-soft'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Global Dashboard</span>
              </div>
            </button>

            <div className="pt-3 pb-1">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3">
                {mode === 'sports' ? 'Sports Navigation' : 'Fitness Navigation'}
              </span>
            </div>

            {/* Dynamic Section Links */}
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? mode === 'sports'
                        ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/40 shadow-sm'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${
                      isActive
                        ? mode === 'sports' ? 'text-purple-600 dark:text-purple-400' : 'text-rose-500 dark:text-rose-400'
                        : 'text-slate-400'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Area: Daily Streak & Theme Toggle */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
            
            {/* Daily Streak Card */}
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-soft space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {user.streakDays} Day Streak!
                  </span>
                </div>
                <button
                  onClick={incrementStreak}
                  className="px-2 py-1 bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-[10px] font-extrabold rounded-lg hover:bg-orange-200 transition-colors"
                  title="Check in today"
                >
                  + Check In
                </button>
              </div>

              {/* 7-day dot progress */}
              <div className="flex justify-between items-center pt-1 px-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-slate-400 font-bold">{day}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      idx < 6 ? 'bg-orange-500 shadow-pastel-rose' : 'bg-slate-200 dark:bg-slate-700'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                Theme
              </span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>

          </div>

        </div>
      </aside>
    </>
  );
};

