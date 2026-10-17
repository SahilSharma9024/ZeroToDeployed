import React from 'react';
import {
  AvatarCustomization,
  GymGoalType,
  AvatarArchetype,
  BodyFrame,
} from '../../types/virtualGym';
import {
  Flame,
  Zap,
  Shield,
  Trophy,
  Dumbbell,
  Sparkles,
  HeartPulse,
} from 'lucide-react';

interface AvatarCustomizerProps {
  heightCm: number;
  setHeightCm: (h: number) => void;
  weightKg: number;
  setWeightKg: (w: number) => void;
  goal: GymGoalType;
  setGoal: (g: GymGoalType) => void;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  setExperienceLevel: (lvl: 'Beginner' | 'Intermediate' | 'Advanced') => void;
  customization: AvatarCustomization;
  setCustomization: React.Dispatch<React.SetStateAction<AvatarCustomization>>;
}

const SKIN_TONES = [
  { label: 'Light', color: '#F9D5B5' },
  { label: 'Warm Bronze', color: '#E2A781' },
  { label: 'Olive Tan', color: '#B88258' },
  { label: 'Deep Espresso', color: '#68452B' },
  { label: 'Golden Cyber', color: '#FBBF24' },
];

const HAIR_COLORS = [
  { label: 'Midnight Black', color: '#0F172A' },
  { label: 'Chestnut Brown', color: '#59341B' },
  { label: 'Platinum Blonde', color: '#FDE047' },
  { label: 'Cyber Blue', color: '#06B6D4' },
  { label: 'Ruby Crimson', color: '#EF4444' },
  { label: 'Silver White', color: '#E2E8F0' },
];

const OUTFITS: { id: AvatarCustomization['gearOutfit']; name: string; color: string; desc: string }[] = [
  { id: 'cyber', name: 'Cyber Neon', color: 'from-cyan-500 to-blue-600', desc: 'Futuristic high-spec gear' },
  { id: 'stealth', name: 'Stealth Void', color: 'from-slate-700 to-slate-900', desc: 'Tactical matte performance' },
  { id: 'crimson', name: 'Crimson Warrior', color: 'from-rose-500 to-red-700', desc: 'High intensity powerhouse' },
  { id: 'gold', name: 'Golden Titan', color: 'from-amber-400 to-yellow-600', desc: 'Elite champion prestige' },
  { id: 'neon', name: 'Emerald Volt', color: 'from-emerald-400 to-teal-600', desc: 'Stamina endurance weave' },
];

const GOAL_OPTIONS: { id: GymGoalType; label: string; icon: React.FC<{ className?: string }>; desc: string; color: string }[] = [
  {
    id: 'fat_loss',
    label: 'Fat Shred & Lean Out',
    icon: Flame,
    desc: 'High metabolic burn, HIIT calisthenics & core toning',
    color: 'from-orange-500 to-rose-500',
  },
  {
    id: 'muscle_gain',
    label: 'Muscle Hypertrophy & Bulk',
    icon: Dumbbell,
    desc: 'Heavy mechanical tension, volume splits & mass building',
    color: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'strength',
    label: 'Raw Strength & Power',
    icon: Shield,
    desc: 'Maximal load barbell compounds, explosive drive & CNS power',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'endurance',
    label: 'Athletic Agility & Stamina',
    icon: Zap,
    desc: 'Cardiovascular output, high-rep circuits & functional stamina',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'recomposition',
    label: 'Body Recomposition',
    icon: HeartPulse,
    desc: 'Simultaneous fat reduction and lean muscle definition',
    color: 'from-pink-500 to-purple-600',
  },
];

export const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({
  heightCm,
  setHeightCm,
  weightKg,
  setWeightKg,
  goal,
  setGoal,
  experienceLevel,
  setExperienceLevel,
  customization,
  setCustomization,
}) => {
  // Height & Weight units display
  const [useImperial, setUseImperial] = React.useState(false);

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  const getBmiBadge = () => {
    if (bmi < 18.5) return { label: 'Lean / Slim', color: 'bg-sky-500 text-white' };
    if (bmi < 24.9) return { label: 'Optimal Athletic', color: 'bg-emerald-500 text-white' };
    if (bmi < 29.9) return { label: 'Solid Heavy Build', color: 'bg-amber-500 text-white' };
    return { label: 'Titan Power Build', color: 'bg-purple-600 text-white' };
  };

  const bmiBadge = getBmiBadge();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-soft space-y-6">
      
      {/* Header & Metric toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              ⚡
            </span>
            Avatar Biometrics & Goal Setup
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Morphs your avatar shape, combat stats, and generates your custom exercise path.
          </p>
        </div>

        <button
          onClick={() => setUseImperial(!useImperial)}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
        >
          Units: {useImperial ? 'Imperial (ft/lbs)' : 'Metric (cm/kg)'}
        </button>
      </div>

      {/* 1. Height & Weight Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Height Slider */}
        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Height
            </label>
            <span className="text-sm font-extrabold text-purple-600 dark:text-purple-400">
              {useImperial
                ? `${Math.floor(heightCm / 30.48)}' ${Math.round((heightCm % 30.48) / 2.54)}"`
                : `${heightCm} cm`}
            </span>
          </div>

          <input
            type="range"
            min="130"
            max="215"
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full accent-purple-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>130 cm</span>
            <span>175 cm (Avg)</span>
            <span>215 cm</span>
          </div>
        </div>

        {/* Weight Slider */}
        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Weight
            </label>
            <span className="text-sm font-extrabold text-rose-500 dark:text-rose-400">
              {useImperial ? `${Math.round(weightKg * 2.20462)} lbs` : `${weightKg} kg`}
            </span>
          </div>

          <input
            type="range"
            min="40"
            max="150"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full accent-rose-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>40 kg</span>
            <span>75 kg</span>
            <span>150 kg</span>
          </div>
        </div>
      </div>

      {/* Live Calculated BMI Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-rose-500/10 border border-purple-200/60 dark:border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
            BMI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-slate-900 dark:text-white">
                {bmi.toFixed(1)}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${bmiBadge.color}`}>
                {bmiBadge.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Avatar body proportions dynamically morph to reflect this build
            </p>
          </div>
        </div>

        {/* Experience Level Selector */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700">
          {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setExperienceLevel(lvl)}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all ${
                experienceLevel === lvl
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Fitness Goal Selector */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>🎯 Primary Fitness Quest & Goal</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GOAL_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = goal === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setGoal(opt.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'border-purple-500 dark:border-purple-400 bg-purple-50/70 dark:bg-purple-950/30 shadow-md ring-2 ring-purple-500/30'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-tr ${opt.color} shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                      {opt.label}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Avatar Style & RPG Customization */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Avatar Appearance & Gear Forge</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Archetype */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Class Archetype</span>
            <select
              value={customization.archetype}
              onChange={(e) =>
                setCustomization((prev) => ({ ...prev, archetype: e.target.value as AvatarArchetype }))
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="titan">🛡️ Iron Titan (Strength)</option>
              <option value="ninja">⚡ Agile Ninja (Agility)</option>
              <option value="berserker">🔥 Berserker (Endurance)</option>
              <option value="champion">👑 Mythic Champion (Elite)</option>
            </select>
          </div>

          {/* Body Frame */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Body Silhouette</span>
            <select
              value={customization.bodyFrame}
              onChange={(e) =>
                setCustomization((prev) => ({ ...prev, bodyFrame: e.target.value as BodyFrame }))
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="masculine">Broad V-Taper (Masculine)</option>
              <option value="feminine">Hourglass Toned (Feminine)</option>
              <option value="heroic">Colossal Tank (Heroic)</option>
            </select>
          </div>

          {/* Hair Style */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Hairstyle</span>
            <select
              value={customization.hairStyle}
              onChange={(e) =>
                setCustomization((prev) => ({ ...prev, hairStyle: e.target.value as any }))
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="buzz">Buzz Cut / Clean</option>
              <option value="spiky">Anime Spiky</option>
              <option value="headband">Athletic Headband</option>
              <option value="bun">Topknot Bun</option>
              <option value="long">Flowing Mane</option>
            </select>
          </div>

          {/* Gear Outfit Scheme */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Gym Armor Theme</span>
            <select
              value={customization.gearOutfit}
              onChange={(e) =>
                setCustomization((prev) => ({ ...prev, gearOutfit: e.target.value as any }))
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {OUTFITS.map((outfit) => (
                <option key={outfit.id} value={outfit.id}>
                  {outfit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Color Palette Picks & Equipment Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          
          {/* Skin Tone Palette */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Skin:</span>
            <div className="flex items-center gap-1.5">
              {SKIN_TONES.map((st) => (
                <button
                  key={st.color}
                  onClick={() => setCustomization((prev) => ({ ...prev, skinTone: st.color }))}
                  style={{ backgroundColor: st.color }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    customization.skinTone === st.color
                      ? 'border-purple-600 scale-110 shadow-sm'
                      : 'border-white dark:border-slate-700 hover:scale-105'
                  }`}
                  title={st.label}
                />
              ))}
            </div>
          </div>

          {/* Hair Color Palette */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Hair:</span>
            <div className="flex items-center gap-1.5">
              {HAIR_COLORS.map((hc) => (
                <button
                  key={hc.color}
                  onClick={() => setCustomization((prev) => ({ ...prev, hairColor: hc.color }))}
                  style={{ backgroundColor: hc.color }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    customization.hairColor === hc.color
                      ? 'border-purple-600 scale-110 shadow-sm'
                      : 'border-white dark:border-slate-700 hover:scale-105'
                  }`}
                  title={hc.label}
                />
              ))}
            </div>
          </div>

          {/* Equipment Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCustomization((prev) => ({ ...prev, hasLiftingBelt: !prev.hasLiftingBelt }))
              }
              className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border transition-all ${
                customization.hasLiftingBelt
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent'
              }`}
            >
              🏋️ Lifting Belt
            </button>

            <button
              onClick={() =>
                setCustomization((prev) => ({ ...prev, hasWristWraps: !prev.hasWristWraps }))
              }
              className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border transition-all ${
                customization.hasWristWraps
                  ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent'
              }`}
            >
              ⚡ Wrist Straps
            </button>

            <button
              onClick={() =>
                setCustomization((prev) => ({ ...prev, hasGlowingAura: !prev.hasGlowingAura }))
              }
              className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border transition-all ${
                customization.hasGlowingAura
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent'
              }`}
            >
              ✨ Mystic Aura
            </button>
          </div>

          {/* Pose Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['idle', 'flex', 'lift'] as const).map((pose) => (
              <button
                key={pose}
                onClick={() => setCustomization((prev) => ({ ...prev, pose }))}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                  customization.pose === pose
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {pose === 'idle' ? 'Stance' : pose === 'flex' ? '💪 Flex' : '🏋️ Lift'}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
