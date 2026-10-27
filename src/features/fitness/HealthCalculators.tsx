import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Flame, Droplet, Activity, RefreshCw, Sparkles, Scale, CheckCircle2, Database, User, ArrowRight, HeartPulse } from 'lucide-react';

export const HealthCalculators: React.FC = () => {
  const { user, updateUser } = useApp();

  // Input States (can be changed independently of saved profile)
  const [heightCm, setHeightCm] = useState<number>(user.heightCm || 178);
  const [weightKg, setWeightKg] = useState<number>(user.weightKg || 74);
  const [age, setAge] = useState<number>(user.age || 24);
  const [gender, setGender] = useState<'Male' | 'Female'>(user.gender === 'Female' ? 'Female' : 'Male');
  const [activityLevel, setActivityLevel] = useState<number>(1.55);

  // Explicit calculation results state
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);
  const [calcResult, setCalcResult] = useState(() => computeMetrics(heightCm, weightKg, age, gender, activityLevel));
  const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
  const [profileUpdatedToast, setProfileUpdatedToast] = useState<boolean>(false);
  const [logSaved, setLogSaved] = useState<boolean>(false);

  // Helper calculation function
  function computeMetrics(hCm: number, wKg: number, aYrs: number, sex: 'Male' | 'Female', act: number) {
    const hM = hCm > 0 ? hCm / 100 : 1.78;
    const bmiVal = hM > 0 ? Number((wKg / (hM * hM)).toFixed(1)) : 22.0;

    let catLabel = 'Normal / Healthy Weight';
    let catColor = 'text-emerald-700 dark:text-emerald-300';
    let catBg = 'bg-emerald-100 dark:bg-emerald-950/60';
    let catBorder = 'border-emerald-200 dark:border-emerald-800';

    if (bmiVal < 18.5) {
      catLabel = 'Underweight';
      catColor = 'text-amber-600 dark:text-amber-400';
      catBg = 'bg-amber-100 dark:bg-amber-950/60';
      catBorder = 'border-amber-200 dark:border-amber-800';
    } else if (bmiVal <= 24.9) {
      catLabel = 'Normal / Healthy Weight';
      catColor = 'text-emerald-700 dark:text-emerald-300';
      catBg = 'bg-emerald-100 dark:bg-emerald-950/60';
      catBorder = 'border-emerald-200 dark:border-emerald-800';
    } else if (bmiVal <= 29.9) {
      catLabel = 'Overweight';
      catColor = 'text-amber-700 dark:text-amber-300';
      catBg = 'bg-amber-100 dark:bg-amber-950/60';
      catBorder = 'border-amber-200 dark:border-amber-800';
    } else {
      catLabel = 'Obese Class';
      catColor = 'text-rose-700 dark:text-rose-300';
      catBg = 'bg-rose-100 dark:bg-rose-950/60';
      catBorder = 'border-rose-200 dark:border-rose-800';
    }

    const minWeight = Number((18.5 * hM * hM).toFixed(1));
    const maxWeight = Number((24.9 * hM * hM).toFixed(1));

    // Mifflin-St Jeor formula
    const bmrVal = Math.round(
      sex === 'Male'
        ? 10 * wKg + 6.25 * hCm - 5 * aYrs + 5
        : 10 * wKg + 6.25 * hCm - 5 * aYrs - 161
    );

    const tdeeVal = Math.round(bmrVal * act);
    const fatLossVal = Math.round(tdeeVal - 500);
    const muscleGainVal = Math.round(tdeeVal + 350);
    const waterLiters = (wKg * 0.035).toFixed(1);
    const proteinMin = Math.round(wKg * 1.6);
    const proteinMax = Math.round(wKg * 2.2);

    return {
      bmi: bmiVal,
      bmiCat: { label: catLabel, color: catColor, bg: catBg, border: catBorder },
      minHealthyWeight: minWeight,
      maxHealthyWeight: maxWeight,
      bmr: bmrVal,
      tdee: tdeeVal,
      fatLossCalories: fatLossVal,
      muscleGainCalories: muscleGainVal,
      dailyWaterLiters: waterLiters,
      dailyProteinMin: proteinMin,
      dailyProteinMax: proteinMax,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  // Saved Profile Metrics Baseline
  const profileMetrics = computeMetrics(user.heightCm, user.weightKg, user.age, user.gender === 'Female' ? 'Female' : 'Male', 1.55);

  // Sync / Load values from saved profile into inputs
  const handleLoadFromProfile = () => {
    setHeightCm(user.heightCm);
    setWeightKg(user.weightKg);
    setAge(user.age);
    setGender(user.gender === 'Female' ? 'Female' : 'Male');
    const res = computeMetrics(user.heightCm, user.weightKg, user.age, user.gender === 'Female' ? 'Female' : 'Male', activityLevel);
    setCalcResult(res);
    setHasCalculated(true);
  };

  // Explicit calculation button click
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = computeMetrics(heightCm, weightKg, age, gender, activityLevel);
    setCalcResult(res);
    setHasCalculated(true);
  };

  // Update permanent user profile with newly calculated inputs
  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || 'usr-aarav-demo',
          height_cm: heightCm,
          weight_kg: weightKg,
          age,
          gender
        }),
      });

      if (res.ok) {
        updateUser({
          heightCm,
          weightKg,
          age,
          gender
        });
        setProfileUpdatedToast(true);
        setTimeout(() => setProfileUpdatedToast(false), 3000);
      }
    } catch (err) {
      console.warn('Failed to update profile:', err);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Save daily health log to SQLite database
  const handleSaveToDatabase = async () => {
    try {
      await fetch('/api/health/daily-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || 'usr-aarav-demo',
          weightKg,
          waterLiters: Number(calcResult.dailyWaterLiters),
          caloriesConsumed: calcResult.tdee,
          caloriesBurned: calcResult.bmr,
          workoutCompleted: 1,
          notes: `BMI: ${calcResult.bmi} (${calcResult.bmiCat.label}), BMR: ${calcResult.bmr} kcal`,
        }),
      });
      setLogSaved(true);
      setTimeout(() => setLogSaved(false), 3000);
    } catch (err) {
      console.warn('Failed to commit log to SQLite:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-emerald-950/30 rounded-3xl p-6 border border-purple-100 dark:border-purple-900/40 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-soft flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Physiological Analytics
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Mifflin-St Jeor Clinical Formula
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Clinical BMI & Metabolic Scorecard
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Calculate your clinical Body Mass Index (BMI), Basal Metabolic Rate (BMR), and Total Daily Energy Expenditure (TDEE).
          </p>
        </div>

        <button
          onClick={handleLoadFromProfile}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-bold text-xs shadow-soft transition-all self-start sm:self-auto shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Load Saved Profile Stats</span>
        </button>
      </div>

      {/* Grid: Saved Profile Card vs Interactive Calculation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1. Saved Personal Profile Baseline (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    Saved Profile Baseline
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Permanent Database Records</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Active
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Athlete Name:</span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold">{user.name}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Saved Height:</span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold">{user.heightCm} cm</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Saved Weight:</span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold">{user.weightKg} kg</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Age & Biological Sex:</span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold">{user.age} yrs • {user.gender}</strong>
              </div>
            </div>

            {/* Profile Baseline Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/40">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Profile BMI</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black text-purple-700 dark:text-purple-300">{profileMetrics.bmi}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">kg/m²</span>
                </div>
                <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 mt-1 block">
                  {profileMetrics.bmiCat.label}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Profile BMR</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black text-amber-700 dark:text-amber-300">{profileMetrics.bmr}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">kcal</span>
                </div>
                <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-1 block">
                  Resting Burn
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleLoadFromProfile}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Copy Baseline Stats to Input Form</span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Calculator Form (8 cols) */}
        <form onSubmit={handleCalculate} className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Enter Biometric Requirements & Calculate</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Modify any value and click "Calculate BMI & BMR" to run the formula.
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs shadow-md shadow-purple-500/20 transition-all active:scale-95 shrink-0"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate BMI & BMR</span>
            </button>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                min={100}
                max={250}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                min={30}
                max={250}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min={10}
                max={120}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Biological Sex</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Activity Multiplier</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={1.2}>Sedentary (Desk Job)</option>
                <option value={1.375}>Lightly Active (1-3 d)</option>
                <option value={1.55}>Moderately Active (3-5 d)</option>
                <option value={1.725}>Very Active (6-7 d)</option>
                <option value={1.9}>Elite / 2x Daily</option>
              </select>
            </div>
          </div>

          {/* Action Row: Update Profile & Commit Log */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUpdateProfile}
                disabled={isUpdatingProfile}
                className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-bold transition-all"
              >
                {isUpdatingProfile ? 'Updating Profile...' : 'Save New Stats to My Profile'}
              </button>

              <button
                type="button"
                onClick={handleSaveToDatabase}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all flex items-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5 text-purple-600" />
                <span>Save to Daily Log</span>
              </button>
            </div>

            {profileUpdatedToast && (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                Permanent Profile Updated!
              </span>
            )}

            {logSaved && (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                Daily Log Recorded into KinetiQ.db!
              </span>
            )}
          </div>
        </form>

      </div>

      {/* Calculated Metric Cards Grid (Reveals or Updates on Calculate) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. BMI Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-purple-600" />
                Calculated BMI
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${calcResult.bmiCat.bg} ${calcResult.bmiCat.color} border ${calcResult.bmiCat.border}`}>
                {calcResult.bmiCat.label}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{calcResult.bmi}</span>
              <span className="text-xs text-slate-400 font-semibold">kg/m²</span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="bg-amber-300 h-full" style={{ width: '25%' }} title="Underweight (<18.5)" />
                <div className="bg-emerald-400 h-full" style={{ width: '35%' }} title="Normal (18.5 - 24.9)" />
                <div className="bg-amber-400 h-full" style={{ width: '20%' }} title="Overweight (25 - 29.9)" />
                <div className="bg-rose-500 h-full" style={{ width: '20%' }} title="Obese (≥30)" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>18.5</span>
                <span>24.9</span>
                <span>29.9</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>
              Ideal athletic weight range: <strong className="text-slate-800 dark:text-slate-200">{calcResult.minHealthyWeight} kg – {calcResult.maxHealthyWeight} kg</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              Calculated for height {heightCm} cm & weight {weightKg} kg.
            </p>
          </div>
        </div>

        {/* 2. BMR & TDEE Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Mifflin-St Jeor Metabolic Burn
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Resting Burn
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{calcResult.bmr}</span>
              <span className="text-xs text-slate-400 font-semibold">kcal / day</span>
            </div>

            <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs">
              <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                <span>Maintenance TDEE:</span>
                <span className="text-purple-600 dark:text-purple-400">{calcResult.tdee} kcal</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Lean Bulk (+350 kcal):</span>
                <span className="text-emerald-600 font-bold">{calcResult.muscleGainCalories} kcal</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Fat Cut (-500 kcal):</span>
                <span className="text-rose-600 font-bold">{calcResult.fatLossCalories} kcal</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            <span>Minimum energy expended at absolute rest in 24 hours.</span>
          </div>
        </div>

        {/* 3. Hydration & Protein Targets Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-sky-500" />
                Hydration & Macros
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                Clinical Target
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{calcResult.dailyWaterLiters}</span>
              <span className="text-xs text-slate-400 font-semibold">Liters water / day</span>
            </div>

            <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                <span>Daily Protein Range:</span>
                <span className="text-emerald-600 dark:text-emerald-400">{calcResult.dailyProteinMin}g – {calcResult.dailyProteinMax}g</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Scaled at 1.6g – 2.2g per kg bodyweight for progressive athletic recovery.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Water: 35ml per kg</span>
            <span className="text-emerald-600 font-bold">Calculated live</span>
          </div>
        </div>

      </div>

    </div>
  );
};
