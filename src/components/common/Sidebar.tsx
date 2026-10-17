import React, { useEffect } from 'react';
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
  X,
  Compass,
  CalendarCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Gamepad2,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    mode,
    activePage,
    setActivePage,
    user,
    passes,
    ghostSubs,
    gymBuddies,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    toggleSidebarCollapse,
  } = useApp();

  // Keyboard shortcut Ctrl+B / Cmd+B to toggle sidebar collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebarCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebarCollapse]);

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileSidebarOpen(false);
  };

  const sportsNav = [
    {
      id: 'sports-overview' as ActivePage,
      label: 'Sports Overview',
      icon: Compass,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      id: 'sports-events' as ActivePage,
      label: 'Tournaments & Events',
      icon: Trophy,
      badge: '6 Live',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: 'sports-turfs' as ActivePage,
      label: 'Turfs & Arenas',
      icon: MapPin,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'sports-map' as ActivePage,
      label: 'Interactive Venue Map',
      icon: Map,
      highlight: true,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/60',
    },
    {
      id: 'sports-ghost' as ActivePage,
      label: 'Ghost Sub & SOS',
      icon: AlertCircle,
      badge: `${ghostSubs.length} SOS`,
      badgeColor: 'bg-rose-500 text-white',
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/60',
    },
    {
      id: 'sports-passes' as ActivePage,
      label: 'My Sports Passes',
      icon: Ticket,
      badge: `${passes.filter((p) => p.type !== 'gym_pass').length}`,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/60',
    },
  ];

  const fitnessNav = [
    {
      id: 'fitness-overview' as ActivePage,
      label: 'Fitness Overview',
      icon: Compass,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/60',
    },
    {
      id: 'fitness-gyms' as ActivePage,
      label: 'High-Rated Gyms',
      icon: Dumbbell,
      badge: 'Top Rated',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      id: 'fitness-map' as ActivePage,
      label: 'Interactive Gym Map',
      icon: Map,
      highlight: true,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/60',
    },
    {
      id: 'fitness-calculators' as ActivePage,
      label: 'BMI & BMR Suite',
      icon: Calculator,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: 'fitness-ai' as ActivePage,
      label: 'AI Personal Trainer',
      icon: Bot,
      badge: 'AI Gen',
      badgeColor: 'bg-purple-600 text-white',
      color: 'text-fuchsia-600 dark:text-fuchsia-400',
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/60',
    },
    {
      id: 'fitness-portal' as ActivePage,
      label: user.role === 'trainer' ? 'Coach Client HQ' : 'My Workout & Meals',
      icon: CalendarCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'fitness-buddy' as ActivePage,
      label: 'Motivation Buddy',
      icon: Users,
      badge: `${gymBuddies.length} Live`,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-950/60',
    },
    {
      id: 'fitness-exercises' as ActivePage,
      label: 'Video Academy',
      icon: Video,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/60',
    },
    {
      id: 'fitness-passes' as ActivePage,
      label: 'My Free Trial Passes',
      icon: Ticket,
      badge: `${passes.filter((p) => p.type === 'gym_pass').length}`,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
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

      {/* Sidebar Container: Fixed to viewport height, doesn't scroll with main content */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out lg:static lg:h-screen lg:shrink-0 ${
          isMobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-72'} w-72`}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* Top Brand & Collapse/Close Actions */}
          <div className={`p-4 border-b border-slate-100 dark:border-slate-800 flex items-center ${
            isSidebarCollapsed ? 'lg:justify-center' : 'justify-between'
          }`}>
            {!isSidebarCollapsed ? (
              <>
                <button
                  onClick={() => handleNav('home')}
                  className="flex items-center gap-3 text-left group min-w-0"
                  title="Return to Home"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform flex-shrink-0">
                    <span className="font-extrabold text-base">⚡</span>
                  </div>
                  <div className="truncate">
                    <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
                      KINETIX
                    </h1>
                    <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider truncate">
                      Sports & Fitness OS
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-1">
                  {/* Desktop Collapse Button */}
                  <button
                    onClick={toggleSidebarCollapse}
                    className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Collapse sidebar (Ctrl+B)"
                    aria-label="Collapse sidebar"
                  >
                    <PanelLeftClose className="w-5 h-5" />
                  </button>

                  {/* Mobile Close Button */}
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
                    title="Close sidebar"
                    aria-label="Close sidebar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              /* Collapsed Header (Desktop) */
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleNav('home')}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-soft hover:scale-105 transition-transform"
                  title="KINETIX Home"
                >
                  <span className="font-extrabold text-base">⚡</span>
                </button>

                <button
                  onClick={toggleSidebarCollapse}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors"
                  title="Expand sidebar (Ctrl+B)"
                  aria-label="Expand sidebar"
                >
                  <PanelLeftOpen className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mode Indicator Pill */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800/80">
            {!isSidebarCollapsed ? (
              <div className={`p-2.5 rounded-2xl border transition-colors ${
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
            ) : (
              <div
                className={`p-2 rounded-2xl border flex flex-col items-center justify-center transition-colors ${
                  mode === 'sports'
                    ? 'bg-purple-50/80 dark:bg-purple-950/30 border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300'
                    : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200/60 dark:border-rose-800/40 text-rose-600 dark:text-rose-300'
                }`}
                title={mode === 'sports' ? 'Active: Sports & Turf Network' : 'Active: Fitness & Wellness Suite'}
              >
                <span className={`w-2 h-2 rounded-full ${
                  mode === 'sports' ? 'bg-purple-500 animate-pulse' : 'bg-rose-500 animate-pulse'
                }`} />
              </div>
            )}
          </div>

          {/* Navigation Links with Colorful Logos & Icons */}
          <div className={`p-3 space-y-1.5 flex-1 ${isSidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
            
            {/* Global Home Link */}
            <button
              onClick={() => handleNav('home')}
              title="Global Dashboard"
              className={`w-full flex items-center ${
                isSidebarCollapsed ? 'justify-center p-2 w-11 h-11' : 'justify-between px-3 py-2'
              } rounded-2xl text-xs font-bold transition-all ${
                activePage === 'home'
                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                  activePage === 'home'
                    ? 'bg-purple-600 text-white shadow-soft scale-105'
                    : 'bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400'
                }`}>
                  <Home className="w-4 h-4" />
                </div>
                {!isSidebarCollapsed && <span>Global Dashboard</span>}
              </div>
            </button>

            {/* Section Divider or Label */}
            {!isSidebarCollapsed ? (
              <div className="pt-2 pb-0.5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3">
                  {mode === 'sports' ? 'Sports Navigation' : 'Fitness Navigation'}
                </span>
              </div>
            ) : (
              <div className="w-8 h-px bg-slate-200 dark:bg-slate-800 my-1.5" />
            )}

            {/* Dynamic Section Links with Colorful Icons */}
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  title={item.label}
                  className={`w-full flex items-center ${
                    isSidebarCollapsed ? 'justify-center p-2 w-11 h-11 relative' : 'justify-between px-3 py-2'
                  } rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? mode === 'sports'
                        ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/40 shadow-sm'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/40 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                      isActive
                        ? mode === 'sports'
                          ? 'bg-purple-600 text-white shadow-soft scale-105'
                          : 'bg-rose-600 text-white shadow-soft scale-105'
                        : `${item.bg} ${item.color}`
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {/* Badge */}
                  {item.badge && (
                    !isSidebarCollapsed ? (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex-shrink-0 ${
                        item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    ) : (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                    )
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </aside>
    </>
  );
};
