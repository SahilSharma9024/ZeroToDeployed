import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Sparkles, Dumbbell, Utensils, CheckCircle2, ArrowRight, Zap, RefreshCw, Calendar, Flame } from 'lucide-react';

export const AiPersonalTrainer: React.FC = () => {
  const { user } = useApp();

  // Inputs
  const [durationWeeks, setDurationWeeks] = useState<number>(8);
  const [heightCm, setHeightCm] = useState<number>(user.heightCm);
  const [weightKg, setWeightKg] = useState<number>(user.weightKg);
  const [age, setAge] = useState<number>(user.age);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [goal, setGoal] = useState<'fat_loss' | 'muscle_gain' | 'strength' | 'endurance'>('fat_loss');
  const [dietaryPref, setDietaryPref] = useState<'non_veg' | 'veg' | 'vegan'>('non_veg');

  // Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Dynamic calculations based on user input
      const bmr = Math.round(
        gender === 'Male'
          ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
          : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
      );
      const maintenance = Math.round(bmr * 1.55);

      let targetCalories = maintenance;
      let proteinG = Math.round(weightKg * 2.0);
      let fatG = Math.round((targetCalories * 0.25) / 9);
      let carbG = 200;

      if (goal === 'fat_loss') {
        targetCalories = maintenance - 500;
        proteinG = Math.round(weightKg * 2.2);
        fatG = Math.round((targetCalories * 0.25) / 9);
        carbG = Math.round((targetCalories - (proteinG * 4 + fatG * 9)) / 4);
      } else if (goal === 'muscle_gain') {
        targetCalories = maintenance + 350;
        proteinG = Math.round(weightKg * 2.0);
        fatG = Math.round((targetCalories * 0.25) / 9);
        carbG = Math.round((targetCalories - (proteinG * 4 + fatG * 9)) / 4);
      }

      const generated = {
        title: `${durationWeeks}-Week AI Precision Transformation`,
        goalLabel: goal === 'fat_loss' ? 'Fat Loss & High Definition' : goal === 'muscle_gain' ? 'Lean Hypertrophy & Bulk' : 'Athletic Conditioning',
        calories: targetCalories,
        macros: {
          protein: proteinG,
          carbs: carbG,
          fats: fatG,
        },
        workouts: [
          {
            day: 'Day 1: Upper Body Push & Core',
            exercises: [
              { name: 'Incline Dumbbell Press', sets: '4 sets × 10 reps', rest: '75s' },
              { name: 'Overhead Barbell Press', sets: '3 sets × 8 reps', rest: '90s' },
              { name: 'Cable Lateral Raises', sets: '4 sets × 15 reps', rest: '45s' },
              { name: 'Rope Tricep Pushdown', sets: '3 sets × 12 reps', rest: '60s' },
              { name: 'Hanging Knee Raises', sets: '3 sets × 15 reps', rest: '45s' },
            ],
          },
          {
            day: 'Day 2: Lower Body Quad & Glute Dominant',
            exercises: [
              { name: 'Barbell Back Squats', sets: '4 sets × 8 reps', rest: '120s' },
              { name: 'Romanian Dumbbell Deadlifts', sets: '4 sets × 10 reps', rest: '90s' },
              { name: 'Walking Dumbbell Lunges', sets: '3 sets × 12 steps/leg', rest: '60s' },
              { name: 'Standing Calf Raises', sets: '4 sets × 15 reps', rest: '45s' },
            ],
          },
          {
            day: 'Day 3: Active Recovery & Cardio Mobility',
            exercises: [
              { name: 'Zone-2 Steady Incline Treadmill Walk', sets: '35 mins', rest: 'Continuous' },
              { name: 'Cat-Cow, World’s Greatest Stretch & Thoracic Rotations', sets: '15 mins', rest: 'Smooth' },
            ],
          },
          {
            day: 'Day 4: Upper Body Pull & Posterior Chain',
            exercises: [
              { name: 'Wide Grip Lat Pulldown', sets: '4 sets × 10 reps', rest: '75s' },
              { name: 'Chest Supported Dumbbell Rows', sets: '4 sets × 10 reps', rest: '75s' },
              { name: 'Face Pulls for Rear Delts', sets: '3 sets × 15 reps', rest: '45s' },
              { name: 'Incline Dumbbell Bicep Curls', sets: '3 sets × 12 reps', rest: '60s' },
            ],
          },
        ],
        meals: dietaryPref === 'veg'
          ? [
              { meal: 'Breakfast', desc: '300g Low-fat Paneer bhurji with spinach & 2 multigrain rotis, green tea', cal: 480 },
              { meal: 'Lunch', desc: '1.5 cups cooked dal/lentils, 1 cup brown rice, cucumber & tomato salad with 1 tbsp olive oil', cal: 560 },
              { meal: 'Pre-Workout Snack', desc: '1 Banana + 1 scoop Plant Protein Shake + 10 almonds', cal: 320 },
              { meal: 'Dinner', desc: 'Grilled Tofu & bell peppers stir fry with quinoa bowl', cal: 450 },
            ]
          : [
              { meal: 'Breakfast', desc: '3 Whole Eggs scrambled with cherry tomatoes & 2 slices sourdough toast', cal: 460 },
              { meal: 'Lunch', desc: '180g Grilled Herb Chicken Breast with 1 cup jasmine rice & steamed broccoli', cal: 550 },
              { meal: 'Pre-Workout Snack', desc: '1 Apple with 1 tbsp natural peanut butter + 1 scoop whey protein', cal: 310 },
              { meal: 'Dinner', desc: '180g Pan-seared White Fish / Salmon fillet with roasted sweet potato & green asparagus', cal: 490 },
            ],
        coachTips: [
          `Target ${Math.round(weightKg * 0.035 * 10) / 10} Liters of water daily to maintain metabolic rate and cellular hydration.`,
          `Prioritize hitting your daily protein target of ${proteinG}g above all else.`,
          `Sleep 7 to 8 hours consistently; growth hormone release and fat oxidation peak during deep sleep cycles.`,
        ],
      };

      setGeneratedPlan(generated);
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-rose-50 to-indigo-50 rounded-3xl p-6 border border-purple-200/60 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-soft flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              AI Precision Personal Trainer
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
              Personalized Algorithm
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Generate Your Tailored Diet & Training Split in Seconds
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Input your timeline, biometrics, fitness goal, and dietary preference. The AI computes your energy expenditure and generates a structured weekly split with customized meals.
          </p>
        </div>

        <button
          onClick={() => {
            setHeightCm(user.heightCm);
            setWeightKg(user.weightKg);
            setAge(user.age);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-purple-700 border border-purple-200 font-bold text-xs shadow-soft transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Import Athlete Stats
        </button>
      </div>

      {/* Generator Form Card */}
      <form onSubmit={handleGenerate} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-5">
        
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Step 1: Configure Your Parameters
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Program Duration</label>
            <select
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800"
            >
              <option value={4}>4 Weeks (Kickstarter Sprint)</option>
              <option value={8}>8 Weeks (Transformation Block)</option>
              <option value={12}>12 Weeks (Total Recomp Mastery)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-purple-700"
            >
              <option value="fat_loss">🔥 Fat Loss & Definition</option>
              <option value="muscle_gain">💪 Lean Muscle & Bulk</option>
              <option value="strength">🏋️ Strength & Powerbuilding</option>
              <option value="endurance">🏃 Endurance & Mobility</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Dietary Preference</label>
            <select
              value={dietaryPref}
              onChange={(e) => setDietaryPref(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800"
            >
              <option value="non_veg">🥩 Non-Vegetarian (Eggs, Chicken, Fish)</option>
              <option value="veg">🌱 Vegetarian (Paneer, Tofu, Dal)</option>
              <option value="vegan">🥗 100% Plant-Based Vegan</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Weight & Height</label>
            <div className="flex gap-1.5">
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-1/2 px-2.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-center"
                placeholder="kg"
              />
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-1/2 px-2.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-center"
                placeholder="cm"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-500 hover:opacity-95 text-white font-extrabold text-sm shadow-soft transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Synthesizing Bio-Metabolic Blueprint...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate My AI Training & Diet Blueprint
            </span>
          )}
        </button>

      </form>

      {/* Generated Output Showcase */}
      {generatedPlan && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Target Macro Summary */}
          <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-soft-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                  Personalized AI Output
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {generatedPlan.title}
                </h3>
                <p className="text-xs text-slate-500">{generatedPlan.goalLabel}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-purple-50 rounded-2xl border border-purple-100 text-center">
                  <span className="text-[10px] text-purple-600 font-bold block uppercase">Daily Caloric Target</span>
                  <span className="text-lg font-extrabold text-purple-950">{generatedPlan.calories} kcal</span>
                </div>
              </div>
            </div>

            {/* Macros Breakdown */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
                <span className="text-[10px] text-rose-600 font-bold uppercase block">Daily Protein</span>
                <span className="text-base font-extrabold text-rose-900">{generatedPlan.macros.protein}g</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-[10px] text-amber-600 font-bold uppercase block">Daily Carbs</span>
                <span className="text-base font-extrabold text-amber-900">{generatedPlan.macros.carbs}g</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-[10px] text-emerald-600 font-bold uppercase block">Healthy Fats</span>
                <span className="text-base font-extrabold text-emerald-900">{generatedPlan.macros.fats}g</span>
              </div>
            </div>
          </div>

          {/* Meals & Workout Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Meal Blueprint */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Structured Daily Meals</h4>
                  <p className="text-xs text-slate-500">Optimized for nutrient timing and satiety</p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {generatedPlan.meals.map((m: any, idx: number) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{m.meal}</span>
                      <span className="font-extrabold text-purple-600">{m.cal} kcal</span>
                    </div>
                    <p className="text-xs text-slate-600">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Training Split */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Periodized Workout Routine</h4>
                  <p className="text-xs text-slate-500">Progressive overload framework</p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {generatedPlan.workouts.map((w: any, idx: number) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-indigo-900 block">{w.day}</span>
                    <div className="space-y-1.5">
                      {w.exercises.map((ex: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-100">
                          <span className="font-semibold text-slate-800">{ex.name}</span>
                          <span className="text-[11px] text-purple-700 font-bold px-2 py-0.5 rounded bg-purple-50">
                            {ex.sets}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Coach Tips */}
          <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
              💡 Essential Lifestyle Directives
            </span>
            <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
              {generatedPlan.coachTips.map((tip: string, idx: number) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};

