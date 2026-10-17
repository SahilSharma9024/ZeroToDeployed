import React, { useMemo } from 'react';
import {
  GymGoalType,
  WorkoutStepPlan,
  MacroNutrientRecommendation,
} from '../../types/virtualGym';
import {
  CURATED_EXERCISES,
  VirtualGymExercise,
  getExerciseImageUrl,
} from '../../data/virtualGymDataset';
import {
  Flame,
  CheckCircle2,
  Play,
  Dumbbell,
  Apple,
  Droplets,
  Zap,
  Target,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

interface StepByStepWorkoutPlanProps {
  heightCm: number;
  weightKg: number;
  goal: GymGoalType;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  onSelectExercise: (exercise: VirtualGymExercise, sets: number, reps: string) => void;
  completedExerciseIds: string[];
}

export const StepByStepWorkoutPlan: React.FC<StepByStepWorkoutPlanProps> = ({
  heightCm,
  weightKg,
  goal,
  experienceLevel,
  onSelectExercise,
  completedExerciseIds,
}) => {
  // 1. Calculate Custom Nutrition Macros based on Height, Weight & Goal
  const macroPlan = useMemo<MacroNutrientRecommendation>(() => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // Baseline BMR using Mifflin-St Jeor formula approximation
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5;
    const tdee = Math.round(bmr * 1.45); // Moderate activity factor

    let calories = tdee;
    let proteinGrams = Math.round(weightKg * 2.0); // 2g per kg
    let guidelines: string[] = [];

    switch (goal) {
      case 'fat_loss':
        calories = Math.round(tdee - 450);
        proteinGrams = Math.round(weightKg * 2.2); // higher protein to preserve lean muscle
        guidelines = [
          'Maintain a moderate 400-500 kcal deficit without starving your metabolism.',
          `Aim for at least ${proteinGrams}g of protein daily to preserve muscle mass.`,
          'Perform resistance training before cardio for maximum glycogen depletion.',
          'Eat high-fiber vegetables with every meal to maintain satiety.',
        ];
        break;

      case 'muscle_gain':
        calories = Math.round(tdee + 350);
        proteinGrams = Math.round(weightKg * 2.0);
        guidelines = [
          'Surplus of 300-400 kcal supports progressive mechanical hypertrophy.',
          `Consume ${proteinGrams}g protein distributed across 4-5 meals.`,
          'Focus on progressive overload: increase weight or reps every 1-2 weeks.',
          'Get 7.5 to 8.5 hours of sleep for optimum growth hormone release.',
        ];
        break;

      case 'strength':
        calories = Math.round(tdee + 250);
        proteinGrams = Math.round(weightKg * 2.1);
        guidelines = [
          'Eat complex carbohydrates 90 minutes prior to heavy compound lifting.',
          'Rest 2 to 3.5 minutes between heavy sets to allow full ATP resynthesis.',
          'Brace core with diaphragmatic breathing (Valsalva maneuver) on all lifts.',
          'Supplement with 5g creatine monohydrate daily for explosive power.',
        ];
        break;

      case 'endurance':
        calories = tdee;
        proteinGrams = Math.round(weightKg * 1.8);
        guidelines = [
          'Prioritize glycogen stores with slow-burning complex carbs (oats, brown rice, sweet potatoes).',
          'Keep rest intervals brief (30-45 seconds) to elevate VO2 max and anaerobic threshold.',
          'Stay hydrated with electrolytes during prolonged sessions.',
        ];
        break;

      case 'recomposition':
      default:
        calories = tdee;
        proteinGrams = Math.round(weightKg * 2.1);
        guidelines = [
          'Caloric balance around maintenance enables fat oxidation alongside muscle synthesis.',
          'Focus heavily on compound movements (Squat, Deadlift, Press, Row).',
          'Ensure high-protein intake immediately post-workout.',
        ];
        break;
    }

    const waterLiters = +(Math.round(weightKg * 0.038 * 10) / 10).toFixed(1);
    const fatCalories = calories * 0.25;
    const fatsGrams = Math.round(fatCalories / 9);
    const proteinCalories = proteinGrams * 4;
    const carbsGrams = Math.round((calories - proteinCalories - fatCalories) / 4);

    return {
      calories,
      proteinGrams,
      carbsGrams,
      fatsGrams,
      waterLiters,
      guidelines,
    };
  }, [heightCm, weightKg, goal]);

  // 2. Select Tailored Exercises from Dataset based on Goal
  const workoutPlan = useMemo<WorkoutStepPlan[]>(() => {
    // Helper finder
    const findEx = (nameQuery: string, fallbackCategory: string): VirtualGymExercise => {
      const match = CURATED_EXERCISES.find((ex) =>
        ex.name.toLowerCase().includes(nameQuery.toLowerCase())
      );
      if (match) return match;
      return (
        CURATED_EXERCISES.find((ex) => ex.category === fallbackCategory) ||
        CURATED_EXERCISES[0]
      );
    };

    switch (goal) {
      case 'fat_loss':
        return [
          {
            phaseNumber: 1,
            phaseName: 'Dynamic Warmup & Mobility',
            phaseTag: 'Phase 1 • Cardio Ignition',
            description: 'Elevates core body temperature and mobilizes hip/shoulder joints.',
            recommendedSets: 3,
            recommendedReps: '45 seconds',
            restSeconds: 30,
            exercise: findEx('jumping jack', 'cardio'),
          },
          {
            phaseNumber: 2,
            phaseName: 'Compound Met-Con Driver',
            phaseTag: 'Phase 2 • Full Body Mechanical Burn',
            description: 'Recruits massive quad and glute musculature to trigger post-exercise oxygen consumption (EPOC).',
            recommendedSets: 4,
            recommendedReps: '12-15 reps',
            restSeconds: 45,
            exercise: findEx('squat', 'upper legs'),
          },
          {
            phaseNumber: 3,
            phaseName: 'Upper Body Muscular Endurance',
            phaseTag: 'Phase 3 • Pectoral & Tricep Sculpt',
            description: 'Bodyweight pressing to tone chest and arms without bulky spinal compression.',
            recommendedSets: 3,
            recommendedReps: '12-15 reps',
            restSeconds: 45,
            exercise: findEx('push-up', 'chest'),
          },
          {
            phaseNumber: 4,
            phaseName: 'Metabolic & Core Finisher',
            phaseTag: 'Phase 4 • Calorie Crusher',
            description: 'Explosive high-intensity full body finish that shreds abdominal wall.',
            recommendedSets: 3,
            recommendedReps: '15 reps or 30s',
            restSeconds: 30,
            exercise: findEx('burpee', 'cardio'),
          },
        ];

      case 'muscle_gain':
        return [
          {
            phaseNumber: 1,
            phaseName: 'Scapular & Joint Priming',
            phaseTag: 'Phase 1 • Neural Warmup',
            description: 'Warms rotator cuff, shoulder stabilizers, and primes chest motor units.',
            recommendedSets: 2,
            recommendedReps: '12 reps',
            restSeconds: 45,
            exercise: findEx('push-up', 'chest'),
          },
          {
            phaseNumber: 2,
            phaseName: 'Primary Mass Builder',
            phaseTag: 'Phase 2 • Heavy Mechanical Tension',
            description: 'The golden chest foundation lift for pec hypertrophy and tricep thickness.',
            recommendedSets: 4,
            recommendedReps: '8-10 reps',
            restSeconds: 90,
            exercise: findEx('barbell bench press', 'chest'),
          },
          {
            phaseNumber: 3,
            phaseName: 'Vertical Lat Width Expansion',
            phaseTag: 'Phase 3 • V-Taper Back Pull',
            description: 'Broadens latissimus dorsi to forge the classic superhero V-taper physique.',
            recommendedSets: 4,
            recommendedReps: '8-10 reps',
            restSeconds: 90,
            exercise: findEx('pull-up', 'back'),
          },
          {
            phaseNumber: 4,
            phaseName: 'Peak Hypertrophy Arm Finisher',
            phaseTag: 'Phase 4 • Bicep Long-Head Isolation',
            description: 'Deep stretch at bottom and maximal peak contraction at top of movement.',
            recommendedSets: 3,
            recommendedReps: '10-12 reps',
            restSeconds: 60,
            exercise: findEx('dumbbell biceps curl', 'upper arms'),
          },
        ];

      case 'strength':
        return [
          {
            phaseNumber: 1,
            phaseName: 'Posterior Chain Activation',
            phaseTag: 'Phase 1 • Hip Hinge Mobility',
            description: 'Wakes up hamstrings, glutes, and lower back erectors before maximal loads.',
            recommendedSets: 2,
            recommendedReps: '10 reps',
            restSeconds: 60,
            exercise: findEx('romanian deadlift', 'upper legs'),
          },
          {
            phaseNumber: 2,
            phaseName: 'Maximal Central Nervous System Lift',
            phaseTag: 'Phase 2 • The King of Lifts',
            description: 'Total body recruitment from floor to lockout. Build raw immutable power.',
            recommendedSets: 5,
            recommendedReps: '5 reps',
            restSeconds: 150,
            exercise: findEx('barbell deadlift', 'back'),
          },
          {
            phaseNumber: 3,
            phaseName: 'Overhead Pressing Power',
            phaseTag: 'Phase 3 • Shoulder & Core Pillar',
            description: 'Strict vertical barbell press overhead with locked glutes and braced core.',
            recommendedSets: 4,
            recommendedReps: '6 reps',
            restSeconds: 120,
            exercise: findEx('barbell standing overhead press', 'shoulders'),
          },
          {
            phaseNumber: 4,
            phaseName: 'Antagonist Pull Support',
            phaseTag: 'Phase 4 • Upper Back Thickness',
            description: 'Reinforces rhomboids and rear delts to support heavy spinal bracing.',
            recommendedSets: 3,
            recommendedReps: '8 reps',
            restSeconds: 90,
            exercise: findEx('barbell bent over row', 'back'),
          },
        ];

      case 'endurance':
        return [
          {
            phaseNumber: 1,
            phaseName: 'Dynamic Plyometric Warmup',
            phaseTag: 'Phase 1 • Dynamic Flow',
            description: 'Light on balls of feet, raising heart rate smoothly.',
            recommendedSets: 2,
            recommendedReps: '60 seconds',
            restSeconds: 30,
            exercise: findEx('jumping jack', 'cardio'),
          },
          {
            phaseNumber: 2,
            phaseName: 'Unilateral Leg Stamina',
            phaseTag: 'Phase 2 • Quad & Glute Balance',
            description: 'Builds single-leg stability, hip mobility, and cardiovascular stamina.',
            recommendedSets: 3,
            recommendedReps: '14 reps / leg',
            restSeconds: 45,
            exercise: findEx('dumbbell lunge', 'upper legs'),
          },
          {
            phaseNumber: 3,
            phaseName: 'Core Aerobic Engine',
            phaseTag: 'Phase 3 • Core Pace Driver',
            description: 'Maintains flat spine while rapidly driving knees to challenge oxygen uptake.',
            recommendedSets: 3,
            recommendedReps: '40 seconds',
            restSeconds: 30,
            exercise: findEx('mountain climber', 'waist'),
          },
          {
            phaseNumber: 4,
            phaseName: 'Isometric Core Stamina',
            phaseTag: 'Phase 4 • Solid Trunk Lockout',
            description: 'Braces deep transverse abdominis under fatigued breathing.',
            recommendedSets: 3,
            recommendedReps: '60 seconds',
            restSeconds: 45,
            exercise: findEx('plank', 'waist'),
          },
        ];

      case 'recomposition':
      default:
        return [
          {
            phaseNumber: 1,
            phaseName: 'Hip & Lower Body Primer',
            phaseTag: 'Phase 1 • Squat Patterning',
            description: 'Opens hip adductors and engages quad stabilizers.',
            recommendedSets: 2,
            recommendedReps: '12 reps',
            restSeconds: 45,
            exercise: findEx('dumbbell goblet squat', 'upper legs'),
          },
          {
            phaseNumber: 2,
            phaseName: 'Upper Incline Press',
            phaseTag: 'Phase 2 • Upper Clavicular Pec',
            description: 'Builds upper chest shelf and anterior delts with dumbbell safety.',
            recommendedSets: 4,
            recommendedReps: '10 reps',
            restSeconds: 75,
            exercise: findEx('incline dumbbell bench press', 'chest'),
          },
          {
            phaseNumber: 3,
            phaseName: 'Latissimus Lat Pulldown',
            phaseTag: 'Phase 3 • Back Sculpting',
            description: 'Controlled descent bringing bar to upper collarbone with scapular depression.',
            recommendedSets: 3,
            recommendedReps: '10-12 reps',
            restSeconds: 60,
            exercise: findEx('lat pulldown', 'back'),
          },
          {
            phaseNumber: 4,
            phaseName: 'Hanging Core Sculpt',
            phaseTag: 'Phase 4 • Lower Abdominal Curl',
            description: 'Hanging pelvic rotation without pendulum swing for defined midsection.',
            recommendedSets: 3,
            recommendedReps: '12 reps',
            restSeconds: 45,
            exercise: findEx('hanging leg raise', 'waist'),
          },
        ];
    }
  }, [goal]);

  return (
    <div className="space-y-6">
      
      {/* 1. Step-by-Step Exercise Roadmap */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-soft space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Target className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Step-by-Step Recommended Protocol
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calibrated for your {heightCm} cm height, {weightKg} kg bodyweight, and{' '}
              <strong className="text-purple-600 dark:text-purple-400 capitalize">{goal.replace('_', ' ')}</strong> goal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800">
              {completedExerciseIds.length} / {workoutPlan.length} Quests Done
            </span>
          </div>
        </div>

        {/* List of Steps */}
        <div className="space-y-4">
          {workoutPlan.map((step) => {
            const isCompleted = completedExerciseIds.includes(step.exercise.id);
            const thumbUrl = getExerciseImageUrl(step.exercise.image);

            return (
              <div
                key={step.phaseNumber}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-800/60'
                    : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800 hover:border-purple-400/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  {/* Left: Phase Badge & Exercise Details */}
                  <div className="flex items-start gap-4 min-w-0">
                    
                    {/* Thumbnail Image from Dataset */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-700 flex-shrink-0 shadow-sm">
                      <img
                        src={thumbUrl}
                        alt={step.exercise.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isCompleted && (
                        <div className="absolute inset-0 bg-emerald-600/80 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                          {step.phaseTag}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 capitalize">
                          {step.exercise.equipment}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white capitalize truncate">
                        {step.exercise.name}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {step.description}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <span className="flex items-center gap-1">
                          <Dumbbell className="w-3.5 h-3.5 text-purple-500" />
                          <span>{step.recommendedSets} Sets</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3.5 h-3.5 text-rose-500" />
                          <span>{step.recommendedReps}</span>
                        </span>
                        <span>•</span>
                        <span className="text-slate-400 text-[11px]">
                          Rest: {step.restSeconds}s
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action: Launch Arena / Start Quest */}
                  <div className="flex items-center gap-2 sm:self-center w-full sm:w-auto justify-end">
                    <button
                      onClick={() =>
                        onSelectExercise(
                          step.exercise,
                          step.recommendedSets,
                          step.recommendedReps
                        )
                      }
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                        isCompleted
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white hover:scale-102'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'Repeat Quest' : 'Start in Arena'}</span>
                    </button>
                  </div>

                </div>

                {/* Step Preview Snippets */}
                {step.exercise.instruction_steps && step.exercise.instruction_steps.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Step 1:</span>
                    <span className="italic line-clamp-1">{step.exercise.instruction_steps[0]}</span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Personalized Nutrition & Fueling Blueprint */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-soft space-y-6">
        
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <span className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Apple className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Phase 5 • Personalized Fueling & Recovery Blueprint
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Precise nutrition calculated to support your {weightKg} kg build and avatar progression.
            </p>
          </div>
        </div>

        {/* Macro KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Daily Caloric Target */}
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/50 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>Target Energy</span>
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {macroPlan.calories} <span className="text-xs font-bold text-slate-400">kcal/d</span>
            </div>
          </div>

          {/* Daily Protein Target */}
          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/50 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <Dumbbell className="w-3 h-3" />
              <span>Daily Protein</span>
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {macroPlan.proteinGrams} <span className="text-xs font-bold text-slate-400">grams</span>
            </div>
          </div>

          {/* Carbs & Fats */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Carbs / Fats</span>
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {macroPlan.carbsGrams}g <span className="text-xs font-bold text-slate-400">/ {macroPlan.fatsGrams}g</span>
            </div>
          </div>

          {/* Hydration */}
          <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/50 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              <span>Daily Hydration</span>
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {macroPlan.waterLiters} <span className="text-xs font-bold text-slate-400">Liters</span>
            </div>
          </div>

        </div>

        {/* Nutritional Rule of Thumb List */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
            Key Execution Guidelines for Your Goal:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {macroPlan.guidelines.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
