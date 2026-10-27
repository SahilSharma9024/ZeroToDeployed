import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UnitSystem } from '../../types';
import { X, Check, Phone, Scale, Flame, Droplet, Activity, CheckCircle2 } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+91', country: 'India (IN)' },
  { code: '+1', country: 'United States & Canada (US/CA)' },
  { code: '+44', country: 'United Kingdom (UK)' },
  { code: '+61', country: 'Australia (AU)' },
  { code: '+971', country: 'United Arab Emirates (UAE)' },
  { code: '+49', country: 'Germany (DE)' },
  { code: '+65', country: 'Singapore (SG)' },
];

export const ProfileModal: React.FC = () => {
  const { user, updateUser, isProfileOpen, setIsProfileOpen } = useApp();

  const [unitSystem, setUnitSystem] = useState<UnitSystem>(user.unitSystem || 'metric');

  // Display values based on active unit system
  const displayWeight = unitSystem === 'metric'
    ? user.weightKg
    : Number((user.weightKg * 2.20462).toFixed(1));

  const displayHeight = unitSystem === 'metric'
    ? user.heightCm
    : Number((user.heightCm * 0.393701).toFixed(1));

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneCountryCode: user.phoneCountryCode || '+91',
    phone: user.phone,
    age: user.age,
    gender: user.gender,
    weightInput: displayWeight,
    heightInput: displayHeight,
    fitnessGoal: user.fitnessGoal,
    experienceLevel: user.experienceLevel,
    jerseySize: user.jerseySize,
    emergencyName: user.emergencyContact.name,
    emergencyPhone: user.emergencyContact.phone,
    bloodGroup: user.bloodGroup,
    medicalClearance: user.medicalClearance,
    role: user.role,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Live Clinical BMI & Metabolic Calculations
  const calcWeightKg = unitSystem === 'metric'
    ? Number(formData.weightInput) || 70
    : (Number(formData.weightInput) || 154) / 2.20462;

  const calcHeightCm = unitSystem === 'metric'
    ? Number(formData.heightInput) || 175
    : (Number(formData.heightInput) || 69) / 0.393701;

  const heightM = calcHeightCm > 0 ? calcHeightCm / 100 : 1.75;
  const liveBmi = heightM > 0 && calcWeightKg > 0 ? Number((calcWeightKg / (heightM * heightM)).toFixed(1)) : 22.9;

  const getBmiCategory = (val: number) => {
    if (val <= 0) return { label: 'Enter Biometrics', color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200' };
    if (val < 18.5) return { label: 'Underweight', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-950/60', border: 'border-amber-200 dark:border-amber-800' };
    if (val <= 24.9) return { label: 'Normal / Healthy Weight', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-950/60', border: 'border-emerald-200 dark:border-emerald-800' };
    if (val <= 29.9) return { label: 'Overweight', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-950/60', border: 'border-amber-200 dark:border-amber-800' };
    return { label: 'Obese Class', color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-950/60', border: 'border-rose-200 dark:border-rose-800' };
  };

  const bmiCat = getBmiCategory(liveBmi);
  const minHealthyWeight = Number((18.5 * heightM * heightM).toFixed(1));
  const maxHealthyWeight = Number((24.9 * heightM * heightM).toFixed(1));

  const liveBmr = Math.round(
    formData.gender === 'Female'
      ? 10 * calcWeightKg + 6.25 * calcHeightCm - 5 * Number(formData.age || 25) - 161
      : 10 * calcWeightKg + 6.25 * calcHeightCm - 5 * Number(formData.age || 25) + 5
  );

  const liveHydrationLiters = (calcWeightKg * 0.035).toFixed(1);

  // Escape key to dismiss profile modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProfileOpen, setIsProfileOpen]);

  if (!isProfileOpen) return null;

  // Handle switching unit system inside the modal
  const handleUnitToggle = (newUnit: UnitSystem) => {
    if (newUnit === unitSystem) return;
    if (newUnit === 'imperial') {
      setFormData((prev) => ({
        ...prev,
        weightInput: Number((prev.weightInput * 2.20462).toFixed(1)),
        heightInput: Number((prev.heightInput * 0.393701).toFixed(1)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        weightInput: Number((prev.weightInput / 2.20462).toFixed(1)),
        heightInput: Number((prev.heightInput / 0.393701).toFixed(1)),
      }));
    }
    setUnitSystem(newUnit);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedWeightKg = unitSystem === 'metric'
      ? Number(formData.weightInput)
      : Number((Number(formData.weightInput) / 2.20462).toFixed(1));

    const normalizedHeightCm = unitSystem === 'metric'
      ? Number(formData.heightInput)
      : Number((Number(formData.heightInput) / 0.393701).toFixed(1));

    updateUser({
      name: formData.name,
      email: formData.email,
      phoneCountryCode: formData.phoneCountryCode,
      phone: formData.phone,
      age: Number(formData.age),
      gender: formData.gender as any,
      unitSystem: unitSystem,
      heightCm: normalizedHeightCm,
      weightKg: normalizedWeightKg,
      fitnessGoal: formData.fitnessGoal as any,
      experienceLevel: formData.experienceLevel as any,
      jerseySize: formData.jerseySize as any,
      bloodGroup: formData.bloodGroup,
      medicalClearance: formData.medicalClearance,
      role: formData.role as any,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: 'Emergency Guardian',
      },
    });

    // Sync to SQLite backend in background
    const token = localStorage.getItem('kinetix_token');
    if (token) {
      fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          age: Number(formData.age),
          gender: formData.gender,
          height_cm: normalizedHeightCm,
          weight_kg: normalizedWeightKg,
          fitness_goal: formData.fitnessGoal,
        }),
      }).catch(() => {});
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsProfileOpen(false);
    }, 800);
  };

  return (
    <div
      onClick={() => setIsProfileOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-100 via-rose-50 to-amber-50 dark:from-purple-950/60 dark:via-rose-950/40 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-soft"
            />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Personal Details & Athlete ID</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-600 text-white">
                  SQLite Synced
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Update your biometrics to recalculate BMI, metabolic burn, and competition waivers
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-800 hover:bg-white text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          
          {/* Top Options Bar: Role Switcher & Unit Exchange */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Persona Switcher */}
            <div className="p-3 bg-purple-50/70 dark:bg-purple-950/40 rounded-2xl border border-purple-200/80 dark:border-purple-800/50 space-y-1.5">
              <span className="text-[10px] font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider block">
                Account Persona
              </span>
              <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-purple-200 dark:border-purple-800">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'athlete' })}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                    formData.role === 'athlete'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Athlete / Client
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'trainer' })}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                    formData.role === 'trainer'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Coach / Trainer
                </button>
              </div>
            </div>

            {/* Unit Exchange (kg/lbs and cm/inches) */}
            <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/50 space-y-1.5">
              <span className="text-[10px] font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider block flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Measurement Unit System
              </span>
              <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <button
                  type="button"
                  onClick={() => handleUnitToggle('metric')}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                    unitSystem === 'metric'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Metric (kg / cm)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle('imperial')}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                    unitSystem === 'imperial'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Imperial (lbs / in)
                </button>
              </div>
            </div>

          </div>

          {/* Core Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            {/* Phone with Country Code */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Contact Phone</label>
              <div className="flex gap-1.5">
                <select
                  value={formData.phoneCountryCode}
                  onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                  className="w-28 px-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Height with unit indication */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.heightInput}
                onChange={(e) => setFormData({ ...formData, heightInput: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-300 dark:border-purple-700 bg-purple-50/30 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                required
              />
            </div>

            {/* Weight with unit indication */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.weightInput}
                onChange={(e) => setFormData({ ...formData, weightInput: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-300 dark:border-purple-700 bg-purple-50/30 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                required
              />
            </div>
          </div>

          {/* ================================================================= */}
          {/* LIVE CLINICAL BMI & METABOLIC SCORECARD (UPDATES IN REAL-TIME) */}
          {/* ================================================================= */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-purple-50/80 to-emerald-50/70 dark:from-slate-800 dark:via-purple-950/40 dark:to-slate-800/90 border border-purple-200 dark:border-purple-800/60 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Live Clinical BMI & Metabolic Gauge
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${bmiCat.bg} ${bmiCat.color} border ${bmiCat.border}`}>
                {bmiCat.label}
              </span>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Calculated BMI</span>
                <span className="text-xl font-black text-purple-700 dark:text-purple-300">{liveBmi}</span>
                <span className="text-[9px] text-slate-400 block">kg/m²</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 text-rose-500 inline" />
                  Resting BMR
                </span>
                <span className="text-xl font-black text-rose-600 dark:text-rose-400">{liveBmr}</span>
                <span className="text-[9px] text-slate-400 block">kcal/day</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block flex items-center justify-center gap-0.5">
                  <Droplet className="w-3 h-3 text-sky-500 inline" />
                  Hydration
                </span>
                <span className="text-xl font-black text-sky-600 dark:text-sky-400">{liveHydrationLiters} L</span>
                <span className="text-[9px] text-slate-400 block">daily minimum</span>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1">
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                <div className="bg-amber-400 h-full" style={{ width: '20%' }} title="Underweight (<18.5)" />
                <div className="bg-emerald-500 h-full" style={{ width: '35%' }} title="Normal (18.5 - 24.9)" />
                <div className="bg-amber-500 h-full" style={{ width: '25%' }} title="Overweight (25 - 29.9)" />
                <div className="bg-rose-500 h-full" style={{ width: '20%' }} title="Obese (30+)" />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 dark:text-slate-400 font-semibold px-0.5">
                <span>&lt; 18.5 Under</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">18.5 - 24.9 Healthy</span>
                <span>25 - 29.9 Over</span>
                <span>30+ Obese</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 pt-1">
              <span>Healthy Weight Range for your height:</span>
              <strong className="text-emerald-700 dark:text-emerald-300 font-extrabold">
                {minHealthyWeight} kg — {maxHealthyWeight} kg
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jersey / Uniform Size</label>
              <select
                value={formData.jerseySize}
                onChange={(e) => setFormData({ ...formData, jerseySize: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="S">S (Small - 36)</option>
                <option value="M">M (Medium - 38)</option>
                <option value="L">L (Large - 40)</option>
                <option value="XL">XL (Extra Large - 42)</option>
                <option value="XXL">XXL (44)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Blood Group</label>
              <input
                type="text"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              Emergency Contact (Used in Event Waivers)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Contact Name & Relation"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Emergency Phone Number"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Medical Fitness Waiver */}
          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.medicalClearance}
              onChange={(e) => setFormData({ ...formData, medicalClearance: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <div>
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-300 block">
                Digital Physical Fitness & Medical Clearance Certificate
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed block mt-0.5">
                I declare that I am physically fit to participate in sports and high-intensity activities. This enables 1-click auto-registration without repeated paperwork.
              </span>
            </div>
          </label>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Saved & Synced to SQLite!
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsProfileOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-soft transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Athlete ID & Biometrics
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
