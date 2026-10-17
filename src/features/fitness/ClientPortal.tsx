import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRESET_SAMPLE_PLANS } from '../../data/fitnessData';
import { Dumbbell, Utensils, CheckCircle2, Droplet, Flame, Heart, Calendar, MessageSquare } from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const { user } = useApp();
  const samplePlan = PRESET_SAMPLE_PLANS.fat_loss;

  // Daily log state
  const [waterGlasses, setWaterGlasses] = useState(6);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [todayWeight, setTodayWeight] = useState(user.weightKg.toString());
  const [checkInSaved, setCheckInSaved] = useState(false);

  const handleSaveCheckIn = () => {
    setCheckInSaved(true);
    setTimeout(() => setCheckInSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Coach Feedback Highlight Card */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-rose-50 rounded-3xl p-5 border border-purple-200/60 shadow-soft flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-white text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 shadow-soft">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-200 text-purple-800">
              Assigned Coach Note • Coach Rahul
            </span>
            <span className="text-xs text-slate-400">Updated Today 07:00 AM</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
            "Tremendous effort on the bench press progression! For today’s leg session, focus on deep 3-second eccentrics on squats. Drink at least 3.5L water."
          </p>
        </div>
      </div>

      {/* Daily Check-In & Habit Tracker */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Today’s Athlete Check-in</h3>
            <p className="text-xs text-slate-500">Log your daily progress for your coach</p>
          </div>
          {checkInSaved && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-fadeIn flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Logged!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Water Tracker */}
          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
            <div className="flex items-center justify-between text-sky-900 font-bold">
              <span className="flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-sky-500" /> Water Intake
              </span>
              <span className="text-xs">{waterGlasses * 250} ml / 3000 ml</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-sky-200 text-sky-800 font-bold hover:bg-sky-100"
              >
                -
              </button>
              <div className="flex-1 bg-white h-2.5 rounded-full overflow-hidden border border-sky-200">
                <div
                  className="bg-sky-500 h-full transition-all"
                  style={{ width: `${Math.min(100, (waterGlasses / 12) * 100)}%` }}
                />
              </div>
              <button
                onClick={() => setWaterGlasses(waterGlasses + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-sky-200 text-sky-800 font-bold hover:bg-sky-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Today's Weight */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
            <span className="text-amber-900 font-bold block">Morning Weigh-in</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={todayWeight}
                onChange={(e) => setTodayWeight(e.target.value)}
                className="w-24 px-3 py-1.5 rounded-xl border border-amber-200 bg-white text-xs font-bold"
              />
              <span className="text-slate-600 font-semibold">kg</span>
            </div>
          </div>

          {/* Workout Done Button */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between">
            <span className="text-purple-900 font-bold">Daily Training Session</span>
            <button
              onClick={() => {
                setWorkoutCompleted(!workoutCompleted);
                handleSaveCheckIn();
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                workoutCompleted
                  ? 'bg-emerald-600 text-white shadow-pastel-mint'
                  : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {workoutCompleted ? 'Session Finished! 🎉' : 'Mark Session Done'}
            </button>
          </div>
        </div>
      </div>

      {/* Assigned Nutrition & Macro Blueprint */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Assigned Meal Plan</h3>
              <p className="text-xs text-slate-500">Target: {samplePlan.dailyCaloricTarget} kcal daily</p>
            </div>
          </div>

          {/* Macro Pills */}
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-bold">
              🥩 {samplePlan.macros.protein}g Protein
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 font-bold">
              🍚 {samplePlan.macros.carbs}g Carbs
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              🥑 {samplePlan.macros.fats}g Fats
            </span>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {samplePlan.dailyMeals.map((meal, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{meal.mealType}</span>
                <span className="text-xs font-extrabold text-purple-600">{meal.calories} kcal</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                {meal.items.map((item, i) => (
                  <li key={i} className="truncate">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Workout Routine */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Assigned Weekly Workout Split</h3>
            <p className="text-xs text-slate-500">{samplePlan.title}</p>
          </div>
        </div>

        <div className="space-y-3">
          {samplePlan.weeklyWorkouts.map((day, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900">{day.dayName}</span>
                <span className="text-[11px] font-semibold text-slate-500">{day.focus}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {day.exercises.map((ex, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{ex.name}</p>
                      {ex.notes && <p className="text-[10px] text-purple-600">{ex.notes}</p>}
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                      {ex.sets} × {ex.reps}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

