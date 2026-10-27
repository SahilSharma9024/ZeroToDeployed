import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GymGoalType,
  AvatarCustomization,
  VirtualGymUserStats,
} from '../../types/virtualGym';
import { VirtualGymExercise } from '../../data/virtualGymDataset';
import { AvatarRenderer } from './AvatarRenderer';
import { AvatarCustomizer } from './AvatarCustomizer';
import { StepByStepWorkoutPlan } from './StepByStepWorkoutPlan';
import { ExerciseDatasetBrowser } from './ExerciseDatasetBrowser';
import { WorkoutArenaModal } from './WorkoutArenaModal';
import {
  Gamepad2,
  Trophy,
  Flame,
  Zap,
  Target,
  Shield,
  Layers,
  Sparkles,
  Award,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'KinetiQ_virtual_gym_stats_v1';

const INITIAL_CUSTOMIZATION: AvatarCustomization = {
  archetype: 'titan',
  bodyFrame: 'masculine',
  skinTone: '#E2A781',
  hairStyle: 'buzz',
  hairColor: '#0F172A',
  gearOutfit: 'cyber',
  hasLiftingBelt: true,
  hasWristWraps: false,
  hasGlowingAura: false,
  pose: 'idle',
};

export const VirtualGymPage: React.FC = () => {
  const { user, updateUser } = useApp();

  // Load or initialize user stats
  const [stats, setStats] = useState<VirtualGymUserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      heightCm: user.heightCm || 175,
      weightKg: user.weightKg || 74,
      goal: (user.fitnessGoal as GymGoalType) || 'muscle_gain',
      experienceLevel: 'Intermediate',
      avatar: INITIAL_CUSTOMIZATION,
      level: 1,
      currentXp: 80,
      xpToNextLevel: 200,
      totalWorkoutsCompleted: 3,
      totalSetsCompleted: 14,
      earnedBadges: ['Welcome Warrior', 'First Rep'],
    };
  });

  // Save to localStorage and sync back to user profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Sync height/weight/goal changes with global app profile
  const handleHeightChange = (h: number) => {
    setStats((prev) => ({ ...prev, heightCm: h }));
    updateUser({ heightCm: h });
  };

  const handleWeightChange = (w: number) => {
    setStats((prev) => ({ ...prev, weightKg: w }));
    updateUser({ weightKg: w });
  };

  const handleGoalChange = (g: GymGoalType) => {
    setStats((prev) => ({ ...prev, goal: g }));
    updateUser({ fitnessGoal: g as any });
  };

  const [activeTab, setActiveTab] = useState<'roadmap' | 'avatar' | 'dataset' | 'achievements'>('roadmap');

  // Interactive Workout Modal state
  const [activeModalExercise, setActiveModalExercise] = useState<VirtualGymExercise | null>(null);
  const [activeModalSets, setActiveModalSets] = useState<number>(4);
  const [activeModalReps, setActiveModalReps] = useState<string>('10-12 reps');
  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>([]);

  // Calculate RPG Stats derived from body and level
  const heightM = stats.heightCm / 100;
  const bmi = +(stats.weightKg / (heightM * heightM)).toFixed(1);
  const strengthRating = Math.round(stats.weightKg * 0.9 + stats.level * 8);
  const enduranceRating = Math.round(100 - Math.abs(bmi - 22) * 4 + stats.level * 6);
  const agilityRating = Math.round(Math.max(40, 110 - (stats.weightKg * 0.5)) + stats.level * 5);
  const combatPower = Math.round((strengthRating + enduranceRating + agilityRating) * 1.5);

  // Handle XP gain & Level up
  const handleGainXp = (amount: number) => {
    setStats((prev) => {
      let newXp = prev.currentXp + amount;
      let newLevel = prev.level;
      let xpThreshold = prev.xpToNextLevel;
      let newSets = prev.totalSetsCompleted + 1;
      let newBadges = [...prev.earnedBadges];

      if (newXp >= xpThreshold) {
        newLevel += 1;
        newXp -= xpThreshold;
        xpThreshold = Math.round(xpThreshold * 1.4);

        if (!newBadges.includes(`Level ${newLevel} Titan`)) {
          newBadges.push(`Level ${newLevel} Titan`);
        }

        // Trigger big celebration
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#F59E0B', '#8B5CF6', '#EC4899', '#10B981'],
        });
      }

      return {
        ...prev,
        level: newLevel,
        currentXp: newXp,
        xpToNextLevel: xpThreshold,
        totalSetsCompleted: newSets,
        earnedBadges: newBadges,
      };
    });
  };

  const handleExerciseCompleted = (earnedXp: number) => {
    if (activeModalExercise && !completedExerciseIds.includes(activeModalExercise.id)) {
      setCompletedExerciseIds((prev) => [...prev, activeModalExercise.id]);
    }
    handleGainXp(earnedXp);

    // Flex avatar on victory
    setStats((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, pose: 'flex', hasGlowingAura: true },
    }));

    setTimeout(() => {
      setStats((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, pose: 'idle' },
      }));
    }, 4000);
  };

  const xpProgressPercent = Math.min(
    100,
    Math.round((stats.currentXp / stats.xpToNextLevel) * 100)
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner & XP HUD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50">
        
        {/* Holographic background particles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-wider text-amber-300">
              <Gamepad2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Virtual Gym Arena • RPG Fitness OS</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Level Up Your Avatar Through Real Reps
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              Enter your biometrics, morph your character in real-time, and execute step-by-step workout protocols powered by{' '}
              <a
                href="https://github.com/hasaneyldrm/exercises-dataset"
                target="_blank"
                rel="noreferrer"
                className="underline text-purple-300 hover:text-white font-bold"
              >
                hasaneyldrm/exercises-dataset
              </a>.
            </p>
          </div>

          {/* Gamified Player Level & XP HUD Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 min-w-[280px] sm:min-w-[320px] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                  ⚡
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    Player Tier
                  </span>
                  <div className="text-sm font-black text-white">
                    Level {stats.level} Gladiator
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-purple-200">
                  {stats.currentXp} / {stats.xpToNextLevel} XP
                </span>
                <span className="text-[10px] block text-slate-300">
                  {stats.xpToNextLevel - stats.currentXp} XP to Lvl {stats.level + 1}
                </span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 pt-0.5">
              <span>Combat Power: <strong className="text-amber-300">{combatPower} PWR</strong></span>
              <span>Sets Done: <strong className="text-emerald-300">{stats.totalSetsCompleted}</strong></span>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Interactive Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'roadmap' as const, label: 'Step-by-Step Training Protocol', icon: Target, badge: `${stats.goal.replace('_', ' ')}` },
          { id: 'avatar' as const, label: 'Avatar Forge & Biometrics', icon: Sparkles },
          { id: 'dataset' as const, label: 'Exercises Dataset Browser', icon: Layers, badge: '1,324+' },
          { id: 'achievements' as const, label: 'RPG Stats & Badges', icon: Trophy, badge: `${stats.earnedBadges.length}` },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold capitalize ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Main Stage Layout: Left Avatar Hero Stage + Right Active Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Avatar Stage & RPG Character Sheet (Takes 4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-soft flex flex-col items-center relative overflow-hidden">
            
            {/* Top Tag */}
            <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live Avatar Stage
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                BMI: {bmi}
              </span>
            </div>

            {/* Dynamic Avatar Render */}
            <div className="py-2">
              <AvatarRenderer
                customization={stats.avatar}
                heightCm={stats.heightCm}
                weightKg={stats.weightKg}
                level={stats.level}
                isAnimated={true}
              />
            </div>

            {/* Quick Action Poses */}
            <div className="mt-3 flex items-center justify-center gap-2 w-full pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() =>
                  setStats((prev) => ({
                    ...prev,
                    avatar: {
                      ...prev.avatar,
                      pose: prev.avatar.pose === 'flex' ? 'idle' : 'flex',
                    },
                  }))
                }
                className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-extrabold hover:bg-purple-200 transition-colors"
              >
                💪 Flex
              </button>
              <button
                onClick={() =>
                  setStats((prev) => ({
                    ...prev,
                    avatar: {
                      ...prev.avatar,
                      pose: prev.avatar.pose === 'lift' ? 'idle' : 'lift',
                    },
                  }))
                }
                className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold hover:bg-amber-200 transition-colors"
              >
                🏋️ Lift
              </button>
              <button
                onClick={() =>
                  setStats((prev) => ({
                    ...prev,
                    avatar: {
                      ...prev.avatar,
                      hasGlowingAura: !prev.avatar.hasGlowingAura,
                    },
                  }))
                }
                className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-extrabold hover:bg-rose-200 transition-colors"
              >
                ✨ Aura
              </button>
            </div>

            {/* RPG Attribute Radar / Stat Bars */}
            <div className="w-full mt-4 space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Combat Attributes
              </span>

              {/* STR */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-purple-600 dark:text-purple-400">Strength (STR)</span>
                  <span className="text-slate-800 dark:text-slate-200">{strengthRating}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${Math.min(100, strengthRating * 0.8)}%` }}
                  />
                </div>
              </div>

              {/* END */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-rose-500 dark:text-rose-400">Endurance (END)</span>
                  <span className="text-slate-800 dark:text-slate-200">{enduranceRating}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${Math.min(100, enduranceRating * 0.8)}%` }}
                  />
                </div>
              </div>

              {/* AGI */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-emerald-500 dark:text-emerald-400">Agility (AGI)</span>
                  <span className="text-slate-800 dark:text-slate-200">{agilityRating}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, agilityRating * 0.8)}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Biometrics Quick Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-soft space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Height:</span>
              <span className="font-black text-slate-900 dark:text-white">{stats.heightCm} cm</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Weight:</span>
              <span className="font-black text-slate-900 dark:text-white">{stats.weightKg} kg</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Current Goal:</span>
              <span className="font-black text-purple-600 dark:text-purple-400 capitalize">
                {stats.goal.replace('_', ' ')}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('avatar')}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black transition-colors"
            >
              Modify Biometrics & Gear
            </button>
          </div>

        </div>

        {/* Right Column: Active Tab Content (Takes 8 cols on desktop) */}
        <div className="lg:col-span-8">
          
          {/* TAB 1: Step-by-Step Training Protocol */}
          {activeTab === 'roadmap' && (
            <StepByStepWorkoutPlan
              heightCm={stats.heightCm}
              weightKg={stats.weightKg}
              goal={stats.goal}
              experienceLevel={stats.experienceLevel}
              onSelectExercise={(ex, sets, reps) => {
                setActiveModalExercise(ex);
                setActiveModalSets(sets);
                setActiveModalReps(reps);
              }}
              completedExerciseIds={completedExerciseIds}
            />
          )}

          {/* TAB 2: Avatar & Biometric Forge */}
          {activeTab === 'avatar' && (
            <AvatarCustomizer
              heightCm={stats.heightCm}
              setHeightCm={handleHeightChange}
              weightKg={stats.weightKg}
              setWeightKg={handleWeightChange}
              goal={stats.goal}
              setGoal={handleGoalChange}
              experienceLevel={stats.experienceLevel}
              setExperienceLevel={(lvl) => setStats((p) => ({ ...p, experienceLevel: lvl }))}
              customization={stats.avatar}
              setCustomization={(val) =>
                setStats((p) => ({
                  ...p,
                  avatar: typeof val === 'function' ? val(p.avatar) : val,
                }))
              }
            />
          )}

          {/* TAB 3: Exercise Dataset Explorer */}
          {activeTab === 'dataset' && (
            <ExerciseDatasetBrowser
              onSelectExercise={(ex) => {
                setActiveModalExercise(ex);
                setActiveModalSets(3);
                setActiveModalReps('10-12 reps');
              }}
            />
          )}

          {/* TAB 4: RPG Badges & History */}
          {activeTab === 'achievements' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-soft space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>Gladiator Trophies & Milestones</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Unlock achievements as you complete sets, exercises, and level up your avatar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { title: 'Welcome Warrior', desc: 'Joined the Virtual Gym Arena', unlocked: true, icon: '🛡️' },
                  { title: 'First Rep', desc: 'Completed your first training set', unlocked: true, icon: '⚡' },
                  { title: 'Level 2 Titan', desc: 'Ascended past Level 1', unlocked: stats.level >= 2, icon: '👑' },
                  { title: 'Hypertrophy Master', desc: 'Completed a full compound lift quest', unlocked: completedExerciseIds.length >= 1, icon: '💪' },
                  { title: 'Century Club', desc: 'Complete 100 total sets', unlocked: stats.totalSetsCompleted >= 100, icon: '🔥' },
                  { title: 'Dataset Scholar', desc: 'Practiced 5 different exercises from dataset', unlocked: completedExerciseIds.length >= 5, icon: '📜' },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      badge.unlocked
                        ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {badge.desc}
                    </p>
                    <span
                      className={`inline-block mt-2 text-[10px] font-black px-2 py-0.5 rounded-md ${
                        badge.unlocked
                          ? 'bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {badge.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 4. Global Interactive Workout Arena Modal */}
      {activeModalExercise && (
        <WorkoutArenaModal
          exercise={activeModalExercise}
          onClose={() => setActiveModalExercise(null)}
          targetSets={activeModalSets}
          targetReps={activeModalReps}
          onExerciseCompleted={handleExerciseCompleted}
        />
      )}

    </div>
  );
};
