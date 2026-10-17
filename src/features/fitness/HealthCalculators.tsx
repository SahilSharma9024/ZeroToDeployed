import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Heart, Flame, Droplet, Activity, RefreshCw, Sparkles, Scale } from 'lucide-react';

export const HealthCalculators: React.FC = () => {
  const { user } = useApp();

  const [heightCm, setHeightCm] = useState<number>(user.heightCm);
  const [weightKg, setWeightKg] = useState<number>(user.weightKg);
  const [age, setAge] = useState<number>(user.age);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // Moderate

  // Sync from profile
  const handleSyncProfile = () => {
    setHeightCm(user.heightCm);
    setWeightKg(user.weightKg);
    setAge(user.age);
    setGender(user.gender === 'Female' ? 'Female' : 'Male');
  };

  // 1. BMI Calculation
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' };
    if (val <= 24.9) return { label: 'Normal / Healthy Weight', color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-200' };
    if (val <= 29.9) return { label: 'Overweight', color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-200' };
    return { label: 'Obese Class', color: 'text-rose-700', bg: 'bg-rose-100', border: 'border-rose-200' };
  };

  const bmiCat = getBmiCategory(bmi);
  const minHealthyWeight = Number((18.5 * heightM * heightM).toFixed(1));
  const maxHealthyWeight = Number((24.9 * heightM * heightM).toFixed(1));

  // 2. BMR (Mifflin-St Jeor formula)
  // Men: BMR = 10W + 6.25H - 5A + 5
  // Women: BMR = 10W + 6.25H - 5A - 161
  const bmr = Math.round(
    gender === 'Male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  );

  // 3. TDEE (Total Daily Energy Expenditure)
  const tdee = Math.round(bmr * activityLevel);
  const fatLossCalories = Math.round(tdee - 500);
  const muscleGainCalories = Math.round(tdee + 300);

  // 4. Hydration & Protein targets
  const dailyWaterLiters = (weightKg * 0.035).toFixed(1);
  const dailyProteinMin = Math.round(weightKg * 1.6);
  const dailyProteinMax = Math.round(weightKg * 2.2);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 rounded-3xl p-6 border border-purple-100 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-soft flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Physiological Analytics
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
              Mifflin-St Jeor Clinical Formula
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Metabolic & Body Composition Suite
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Real-time biometric intelligence calculating your BMI, resting BMR, and daily caloric breakdown based on athletic expenditure.
          </p>
        </div>

        <button
          onClick={handleSyncProfile}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-purple-700 border border-purple-200 font-bold text-xs shadow-soft transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Sync from My Profile
        </button>
      </div>

      {/* Input Controls Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Biometric Calibration Inputs
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Height (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Biological Sex</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="font-bold text-slate-700 block mb-1">Activity Multiplier</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            >
              <option value={1.2}>Sedentary (Desk Job)</option>
              <option value={1.375}>Lightly Active (1-3 days)</option>
              <option value={1.55}>Moderately Active (3-5 days)</option>
              <option value={1.725}>Very Active (6-7 days)</option>
              <option value={1.9}>Elite Athlete / 2x daily</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. BMI Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-purple-600" />
                Body Mass Index (BMI)
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${bmiCat.bg} ${bmiCat.color} border ${bmiCat.border}`}>
                {bmiCat.label}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900">{bmi}</span>
              <span className="text-xs text-slate-400 font-semibold">kg/m²</span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-amber-300 h-full" style={{ width: '25%' }} title="Underweight (<18.5)" />
                <div className="bg-emerald-400 h-full" style={{ width: '35%' }} title="Normal (18.5 - 24.9)" />
                <div className="bg-amber-400 h-full" style={{ width: '25%' }} title="Overweight (25 - 29.9)" />
                <div className="bg-rose-400 h-full" style={{ width: '15%' }} title="Obese (30+)" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30+</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Healthy Weight Target:</span>
            <span>{minHealthyWeight} kg — {maxHealthyWeight} kg</span>
          </div>
        </div>

        {/* 2. BMR & TDEE Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Basal Metabolism (BMR)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
                At Complete Rest
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900">{bmr}</span>
              <span className="text-xs text-slate-400 font-semibold">kcal / day</span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Calories your body burns just staying alive (breathing, organs, cellular repair).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-purple-50 border border-rose-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Total Expenditure (TDEE):</span>
              <span className="font-extrabold text-purple-700 text-sm">{tdee} kcal</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 bg-white rounded-xl text-center border border-rose-100">
                <span className="text-slate-500 block">Fat Loss (-500)</span>
                <span className="font-bold text-rose-600">{fatLossCalories} kcal</span>
              </div>
              <div className="p-2 bg-white rounded-xl text-center border border-purple-100">
                <span className="text-slate-500 block">Lean Bulk (+300)</span>
                <span className="font-bold text-purple-600">{muscleGainCalories} kcal</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Hydration & Protein Synthesis Targets */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                Daily Athletic Fuel
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                Optimal Recovery
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-sky-500" />
                  <div>
                    <span className="text-xs font-bold text-sky-950 block">Hydration Target</span>
                    <span className="text-[10px] text-sky-700">Based on 35ml per kg body weight</span>
                  </div>
                </div>
                <span className="text-base font-extrabold text-sky-700">{dailyWaterLiters} L</span>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <div>
                    <span className="text-xs font-bold text-purple-950 block">Protein Requirement</span>
                    <span className="text-[10px] text-purple-700">1.6 - 2.2g per kg (Active)</span>
                  </div>
                </div>
                <span className="text-base font-extrabold text-purple-700">
                  {dailyProteinMin}-{dailyProteinMax}g
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
            💡 <em>Tip: Distribute your {dailyProteinMin}g protein across 3 to 4 meals (roughly 30-40g per meal) to optimize Muscle Protein Synthesis (MPS).</em>
          </div>
        </div>

      </div>

    </div>
  );
};

