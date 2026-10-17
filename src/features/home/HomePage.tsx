import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Dumbbell,
  Flame,
  MapPin,
  Map,
  Users,
  AlertCircle,
  Calculator,
  Bot,
  Video,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CloudRain
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    user,
    setMode,
    setActivePage,
    events,
    turfs,
    gyms,
    ghostSubs,
    incrementStreak,
  } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Hero Banner with Daily Streak */}
      <div className="bg-gradient-to-r from-purple-100 via-rose-50 to-indigo-100 dark:from-purple-950/60 dark:via-rose-950/40 dark:to-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-200/60 dark:border-purple-800/40 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-600 text-white shadow-soft flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Unified Athlete Platform
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Welcome back, {user.name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Elevate Your Game & Fitness with Precision Intelligence
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            One-click automated registrations for tournaments and turfs, AI-generated nutrition and training splits, instant SOS substitute matchmaker, and live venue geolocation radar.
          </p>
        </div>

        {/* Daily Streak Highlight Card */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft-lg flex flex-col items-center justify-center text-center shrink-0 min-w-[200px]">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold mb-2">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {user.streakDays} Days
          </span>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Daily Athlete Streak
          </span>
          <button
            onClick={incrementStreak}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-soft transition-colors"
          >
            Check-In Today 🔥
          </button>
        </div>
      </div>

      {/* Weather-Adaptive Intelligence Notice */}
      <div className="bg-sky-50 dark:bg-sky-950/40 rounded-3xl p-4 sm:p-5 border border-sky-200/80 dark:border-sky-800/50 shadow-soft flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 text-sky-600 flex items-center justify-center shadow-soft shrink-0">
            <CloudRain className="w-5 h-5 text-sky-500" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block">
              Weather Intelligence • City Forecast
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              Clear morning with passing light showers expected at 05:30 PM.
              <span className="font-normal text-slate-600 dark:text-slate-300 ml-1">
                Indoor turf slots and badminton arenas are prioritized for evening bookings.
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMode('sports');
            setActivePage('sports-map');
          }}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 font-bold text-xs border border-sky-200 dark:border-sky-700 shadow-sm hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors whitespace-nowrap"
        >
          <span>Open Turf Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Two Pillars Grid: Sports vs Fitness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SPORTS PILLAR */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Sports & Arena Network
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {events.length} Upcoming Tournaments • {turfs.length} Verified Turfs
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMode('sports');
                setActivePage('sports-overview');
              }}
              className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sports Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            <div
              onClick={() => {
                setMode('sports');
                setActivePage('sports-events');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50/60 dark:hover:bg-purple-950/30 border border-slate-100 dark:border-slate-800 hover:border-purple-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  <Trophy className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
                  Indoor & Outdoor
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                Tournaments & Events
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                1-click auto-registration with verified waivers, skill tiers, and prize pools.
              </p>
            </div>

            <div
              onClick={() => {
                setMode('sports');
                setActivePage('sports-ghost');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 border border-slate-100 dark:border-slate-800 hover:border-rose-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300">
                  <AlertCircle className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md animate-pulse">
                  {ghostSubs.length} Active SOS
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                Ghost Sub & Partner Finder
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Last-minute substitute player radar and tennis/badminton partner matchmaker.
              </p>
            </div>

            <div
              onClick={() => {
                setMode('sports');
                setActivePage('sports-turfs');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                  Slots Today
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Turfs & Multi-Sport Arenas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                FIFA certified astroturfs, lighting, amenities, and hourly booking slots.
              </p>
            </div>

            <div
              onClick={() => {
                setMode('sports');
                setActivePage('sports-map');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  <Map className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  Live GPS
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                Interactive Venue Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Pinpoint turfs and arenas nearest to your live coordinates with distance calculation.
              </p>
            </div>

          </div>
        </div>

        {/* FITNESS PILLAR */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Fitness & Wellness Suite
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {gyms.length} Top Rated Gyms • Biometric Health Analytics
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMode('fitness');
                setActivePage('fitness-overview');
              }}
              className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fitness Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            <div
              onClick={() => {
                setMode('fitness');
                setActivePage('fitness-ai');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50/60 dark:hover:bg-purple-950/30 border border-slate-100 dark:border-slate-800 hover:border-purple-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  <Bot className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
                  AI Engine
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                AI Personal Trainer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Generates complete periodized training splits and meal plans tailored to biometrics.
              </p>
            </div>

            <div
              onClick={() => {
                setMode('fitness');
                setActivePage('fitness-calculators');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  <Calculator className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  Clinical Math
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                BMI & BMR Suite
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Interactive BMI gauge, Mifflin-St Jeor BMR, TDEE, and daily hydration breakdown.
              </p>
            </div>

            <div
              onClick={() => {
                setMode('fitness');
                setActivePage('fitness-gyms');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 border border-slate-100 dark:border-slate-800 hover:border-rose-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300">
                  <Dumbbell className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md">
                  Free Trial
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                High-Rated Gyms & Studios
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Equipped gyms, CrossFit boxes, recovery saunas, and 1-click free trial passes.
              </p>
            </div>

            <div
              onClick={() => {
                setMode('fitness');
                setActivePage('fitness-exercises');
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                  <Video className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                  Video Guides
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Exercise Video Academy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Step-by-step form execution cues and embedded YouTube tutorials.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

