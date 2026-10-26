import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivePage } from '../../types';
import {
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
  PanelLeftClose,
  PanelLeftOpen,
  Gamepad2,
} from 'lucide-react';
import { KinetiQMark } from './Logo';

export const Sidebar: React.FC = () => {
  const {
    mode,
    activePage,
    setActivePage,
    passes,
    ghostSubs,
    gymBuddies,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    toggleSidebarCollapse,
  } = useApp();

  // Resizable sidebar width with local persistence
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = localStorage.getItem('KinetiQ_sidebar_width');
    const parsed = saved ? parseInt(saved, 10) : 288;
    return !isNaN(parsed) && parsed >= 240 && parsed <= 460 ? parsed : 288;
  });
  const [isResizing, setIsResizing] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('KinetiQ_sidebar_width', sidebarWidth.toString());
  }, [sidebarWidth]);

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileSidebarOpen(false);
  };

  // Draggable resize handler
  const handleResizeStart = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const newWidth = Math.min(Math.max(moveEvent.clientX, 240), 460);
      setSidebarWidth(newWidth);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Social Community Navigation Items (Active when Social is selected in Navbar)
  const socialNav = [
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
      id: 'fitness-buddy' as ActivePage,
      label: 'Motivation Buddy',
      icon: Users,
      badge: `${gymBuddies.length} Live`,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-950/60',
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

  // Personal Fitness & Individual Training Items (Active when Personal is selected in Navbar)
  const personalNav = [
    {
      id: 'virtual-gym' as ActivePage,
      label: 'Virtual Gym',
      icon: Gamepad2,
      badge: '🎮 3D Avatar',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm',
      color: 'text-fuchsia-600 dark:text-fuchsia-400',
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/60',
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
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/60',
    },
    {
      id: 'fitness-exercises' as ActivePage,
      label: 'Video Academy',
      icon: Video,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/60',
    },
  ];

  // Dynamic navigation switching based on navbar selection (Social vs Personal)
  const currentNav = mode === 'sports' ? socialNav : personalNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container: Resizable on desktop, fixed slide-over drawer on mobile */}
      <aside
        style={{
          width: isSidebarCollapsed ? undefined : `${sidebarWidth}px`,
        }}
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between lg:static lg:h-screen lg:shrink-0 relative ${
          isResizing ? 'transition-none select-none' : 'transition-all duration-200 ease-in-out'
        } ${
          isMobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'lg:w-20' : ''}`}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Top Brand & Collapse/Close Actions */}
          <div
            className={`p-4 border-b border-slate-100 dark:border-slate-800 flex items-center ${
              isSidebarCollapsed ? 'lg:justify-center' : 'justify-between'
            }`}
          >
            {!isSidebarCollapsed ? (
              <>
                <button
                  onClick={() => handleNav('home')}
                  className="flex items-center gap-3 text-left group min-w-0 cursor-pointer"
                  title="Return to Home"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-sm border border-slate-800 dark:border-slate-700/80 group-hover:border-purple-500/50 group-hover:scale-105 transition-all flex-shrink-0">
                    <KinetiQMark className="w-5 h-5 text-white" />
                  </div>
                  <div className="truncate">
                    <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
                      KinetiQ
                    </h1>
                    <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest truncate">
                      
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-1">
                  {/* Desktop Collapse Button */}
                  <button
                    onClick={toggleSidebarCollapse}
                    className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Collapse sidebar (Ctrl+B)"
                    aria-label="Collapse sidebar"
                  >
                    <PanelLeftClose className="w-5 h-5" />
                  </button>

                  {/* Mobile Close Button */}
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
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
                  className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-sm border border-slate-800 dark:border-slate-700/80 hover:border-purple-500/50 hover:scale-105 transition-all cursor-pointer"
                  title="KinetiQ Home"
                >
                  <KinetiQMark className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={toggleSidebarCollapse}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
                  title="Expand sidebar (Ctrl+B)"
                  aria-label="Expand sidebar"
                >
                  <PanelLeftOpen className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Category Container (Changes dynamically when switching Social/Personal in navbar) */}
          <div
            className={`p-3 space-y-1.5 flex-1 ${
              isSidebarCollapsed ? 'flex flex-col items-center' : ''
            }`}
          >
            {/* Category Header */}
            {!isSidebarCollapsed ? (
              <div className="pt-2 pb-1.5 px-3 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {mode === 'sports' ? 'Social Navigation' : 'Personal Navigation'}
                </span>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                    mode === 'sports'
                      ? 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-200/50 dark:border-purple-800/40'
                      : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200/50 dark:border-rose-800/40'
                  }`}
                >
                  {mode === 'sports' ? 'Social' : 'Personal'}
                </span>
              </div>
            ) : (
              <div
                className="w-8 h-px bg-slate-200 dark:bg-slate-800 my-2 mx-auto"
                title={mode === 'sports' ? 'Social Navigation' : 'Personal Navigation'}
              />
            )}

            {/* Active Items */}
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const activeStyle =
                mode === 'sports'
                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/40'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/40';
              const activeIconBg = mode === 'sports' ? 'bg-purple-600' : 'bg-rose-600';

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  title={item.label}
                  className={`w-full flex items-center ${
                    isSidebarCollapsed
                      ? 'justify-center p-2 w-11 h-11 relative'
                      : 'justify-between px-3 py-2'
                  } rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? `${activeStyle} shadow-sm`
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                        isActive
                          ? `${activeIconBg} text-white shadow-soft scale-105`
                          : `${item.bg} ${item.color}`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>

                  {/* Badge */}
                  {item.badge &&
                    (!isSidebarCollapsed ? (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex-shrink-0 ${
                          item.badgeColor ||
                          'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      <span
                        className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                          mode === 'sports' ? 'bg-purple-500' : 'bg-rose-500'
                        } ring-2 ring-white dark:ring-slate-900`}
                      />
                    ))}
                </button>
              );
            })}
          </div>
        </div>

        {/* Draggable Resize Handle along inner edge (Desktop only) */}
        {!isSidebarCollapsed && (
          <div
            onPointerDown={handleResizeStart}
            className="hidden lg:flex absolute top-0 right-0 bottom-0 w-3 -mr-1.5 z-40 cursor-col-resize items-center justify-center select-none touch-none group hover:bg-purple-500/10 active:bg-purple-500/20 transition-colors"
            title="Drag to resize sidebar width"
            aria-label="Resize sidebar width"
          >
            <div className="w-1 h-12 mx-auto rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-purple-500 group-hover:h-20 group-hover:w-1.5 active:bg-purple-600 transition-all shadow-sm" />
          </div>
        )}
      </aside>
    </>
  );
};
