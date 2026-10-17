import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GymFinderSection } from './GymFinderSection';
import { TrainerPortal } from './TrainerPortal';
import { ClientPortal } from './ClientPortal';
import { HealthCalculators } from './HealthCalculators';
import { AiPersonalTrainer } from './AiPersonalTrainer';
import { GymBuddyFinder } from './GymBuddyFinder';
import { ExerciseLibrary } from './ExerciseLibrary';
import { Dumbbell, Users, Calculator, Bot, Video, Award, Sparkles, Flame, Droplet } from 'lucide-react';

export const FitnessDashboard: React.FC = () => {
  const { user, updateUser, gyms, gymBuddies } = useApp();
  const [activeTab, setActiveTab] = useState<'gyms' | 'portal' | 'calculators' | 'aiTrainer' | 'buddies' | 'exercises'>('gyms');

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Role Switcher Pill Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-amber-50 rounded-3xl p-4 sm:p-5 border border-rose-200/70 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-rose-500 flex items-center justify-center shadow-soft border border-rose-100 shrink-0 font-bold">
            {user.role === 'trainer' ? <Award className="w-5 h-5 text-amber-600" /> : <Dumbbell className="w-5 h-5 text-rose-500" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-200 text-rose-800">
                Persona: {user.role === 'trainer' ? 'Certified Coach / Trainer' : 'Active Client / Athlete'}
              </span>
              <span className="text-xs text-slate-500">Toggle roles anytime for testing</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
              {user.role === 'trainer'
                ? 'Trainer Mode: You can prescribe diet plans, training splits, and monitor client adherence.'
                : 'Client Mode: Access your personalized routines, log water, check-in, and view coach advice.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => updateUser({ role: user.role === 'trainer' ? 'athlete' : 'trainer' })}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <span>Switch to {user.role === 'trainer' ? 'Athlete/Client' : 'Trainer'} Mode</span>
        </button>
      </div>

      {/* Fitness Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-4 border border-rose-100 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 block leading-tight">{gyms.length}</span>
            <span className="text-xs text-slate-500 font-medium">Top Gyms Nearby</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-amber-100 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 block leading-tight">1,950</span>
            <span className="text-xs text-slate-500 font-medium">Daily Calorie Target</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 block leading-tight">3.2 L</span>
            <span className="text-xs text-slate-500 font-medium">Hydration Goal</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 block leading-tight">{gymBuddies.length}</span>
            <span className="text-xs text-slate-500 font-medium">Gym Buddies Live</span>
          </div>
        </div>
      </div>

      {/* Fitness Sub-tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('gyms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'gyms'
              ? 'bg-white text-rose-600 shadow-sm border border-rose-100'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Nearby High-Rated Gyms ({gyms.length})
        </button>

        <button
          onClick={() => setActiveTab('portal')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'portal'
              ? 'bg-white text-purple-700 shadow-sm border border-purple-100'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {user.role === 'trainer' ? '👨‍🏫 Trainer Portal' : '📋 My Plan & Check-in'}
        </button>

        <button
          onClick={() => setActiveTab('calculators')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'calculators'
              ? 'bg-white text-emerald-700 shadow-sm border border-emerald-100'
              : 'text-slate-600 hover:text-slate-900'
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
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          AI Personal Trainer
        </button>

        <button
          onClick={() => setActiveTab('buddies')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'buddies'
              ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Gym Motivation Buddy
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'exercises'
              ? 'bg-white text-rose-600 shadow-sm border border-rose-100'
              : 'text-slate-600 hover:text-slate-900'
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

