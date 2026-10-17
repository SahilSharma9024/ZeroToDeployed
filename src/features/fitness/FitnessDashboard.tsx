import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GymFinderSection } from './GymFinderSection';
import { TrainerPortal } from './TrainerPortal';
import { ClientPortal } from './ClientPortal';
import { HealthCalculators } from './HealthCalculators';
import { AiPersonalTrainer } from './AiPersonalTrainer';
import { GymBuddyFinder } from './GymBuddyFinder';
import { ExerciseLibrary } from './ExerciseLibrary';
import { Dumbbell, Users, Calculator, Bot, Video, Award, Flame, Droplet } from 'lucide-react';

interface FitnessDashboardProps {
  initialSubTab?: 'gyms' | 'portal' | 'calculators' | 'aiTrainer' | 'buddies' | 'exercises';
}

export const FitnessDashboard: React.FC<FitnessDashboardProps> = ({ initialSubTab = 'gyms' }) => {
  const { user, gyms, gymBuddies, setIsProfileOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'gyms' | 'portal' | 'calculators' | 'aiTrainer' | 'buddies' | 'exercises'>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Persona Banner - Clean status without duplicate role switch button */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-amber-50 dark:from-rose-950/40 dark:via-purple-950/40 dark:to-slate-900 rounded-3xl p-4 sm:p-5 border border-rose-200/70 dark:border-rose-800/50 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 text-rose-500 flex items-center justify-center shadow-soft border border-rose-100 dark:border-rose-800 shrink-0 font-bold">
            {user.role === 'trainer' ? <Award className="w-5 h-5 text-amber-600" /> : <Dumbbell className="w-5 h-5 text-rose-500" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
                Persona: {user.role === 'trainer' ? 'Certified Coach / Trainer' : 'Active Client / Athlete'}
              </span>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                (Change in Profile)
              </button>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {user.role === 'trainer'
                ? 'Trainer Mode: You can prescribe diet plans, training splits, and monitor client adherence.'
                : 'Client Mode: Access your personalized routines, log water, check-in, and view coach advice.'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-800/70 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <span>Target: <strong>{user.fitnessGoal.replace('_', ' ')}</strong></span>
        </div>
      </div>

      {/* Fitness Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-rose-100 dark:border-rose-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">{gyms.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Top Gyms Nearby</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-amber-100 dark:border-amber-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">1,950</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily Calorie Target</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-sky-100 dark:border-sky-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">3.2 L</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hydration Goal</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-indigo-100 dark:border-indigo-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">{gymBuddies.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gym Buddies Live</span>
          </div>
        </div>
      </div>

      {/* Fitness Sub-tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('gyms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'gyms'
              ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-300 shadow-sm border border-rose-100 dark:border-rose-900/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Nearby High-Rated Gyms ({gyms.length})
        </button>

        <button
          onClick={() => setActiveTab('portal')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'portal'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-sm border border-purple-100 dark:border-purple-900/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {user.role === 'trainer' ? '👨‍🏫 Trainer Portal' : '📋 My Plan & Check-in'}
        </button>

        <button
          onClick={() => setActiveTab('calculators')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'calculators'
              ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-100 dark:border-emerald-900/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          BMI & BMR Calculators
        </button>

        <button
          onClick={() => setActiveTab('aiTrainer')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'aiTrainer'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          AI Personal Trainer
        </button>

        <button
          onClick={() => setActiveTab('buddies')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'buddies'
              ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-900/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Gym Motivation Buddy
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'exercises'
              ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-300 shadow-sm border border-rose-100 dark:border-rose-900/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          Exercise Video Library
        </button>
      </div>

      {/* Render Active Fitness Tab Content */}
      {activeTab === 'gyms' && <GymFinderSection />}
      {activeTab === 'portal' && (user.role === 'trainer' ? <TrainerPortal /> : <ClientPortal />)}
      {activeTab === 'calculators' && <HealthCalculators />}
      {activeTab === 'aiTrainer' && <AiPersonalTrainer />}
      {activeTab === 'buddies' && <GymBuddyFinder />}
      {activeTab === 'exercises' && <ExerciseLibrary />}

    </div>
  );
};
