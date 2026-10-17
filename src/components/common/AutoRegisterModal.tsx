import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldCheck, Zap, X, MapPin, Sparkles } from 'lucide-react';

export const AutoRegisterModal: React.FC = () => {
  const { autoRegisterTarget, closeAutoRegister, confirmAutoRegister, user, setActiveQrPass } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!autoRegisterTarget) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const pass = confirmAutoRegister();
      setActiveQrPass(pass);
    }, 600);
  };

  const displayWeight = user.unitSystem === 'imperial'
    ? `${(user.weightKg * 2.20462).toFixed(1)} lbs`
    : `${user.weightKg} kg`;

  const displayHeight = user.unitSystem === 'imperial'
    ? `${(user.heightCm * 0.393701).toFixed(1)} in`
    : `${user.heightCm} cm`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-purple-100 via-rose-50 to-indigo-100 dark:from-purple-950/60 dark:via-rose-950/40 dark:to-slate-900 border-b border-purple-200/40 dark:border-slate-800">
          <button
            onClick={closeAutoRegister}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/80 dark:bg-slate-800 hover:bg-white text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-white" />
              1-Click Smart Registration
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {autoRegisterTarget.category}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {autoRegisterTarget.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-purple-600" />
            {autoRegisterTarget.venue}
          </p>
        </div>

        {/* Auto Form Filling Verification */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800 flex items-start gap-3">
            <div className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                Universal Athlete & Fitness ID Synced
              </h4>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed mt-0.5">
                All mandatory participant documents, medical waivers, and category qualifications are pre-filled automatically from your KINETIX Profile.
              </p>
            </div>
          </div>

          {/* Pre-filled Fields Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Auto-Populated Participant Details
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Full Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user.name}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Age & Biometrics</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user.age} Yrs • {displayWeight}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Contact Number</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user.phoneCountryCode || '+91'} {user.phone}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Jersey / Kit Size</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user.jerseySize} (Adult Fit)</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700 flex items-center justify-between col-span-2">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Emergency Contact</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user.emergencyContact.name} ({user.emergencyContact.phone})</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700 flex items-center justify-between col-span-2">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Digital Medical Fitness Certification</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">Verified & Acknowledged (Blood Group: {user.bloodGroup})</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Pricing & Timing summary */}
          <div className="p-3.5 bg-purple-50/70 dark:bg-purple-950/40 rounded-2xl border border-purple-100 dark:border-purple-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Registration Slot</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{autoRegisterTarget.dateOrTime}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Pass Fee</p>
              <p className="text-sm font-extrabold text-purple-900 dark:text-purple-200">{autoRegisterTarget.cost}</p>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={closeAutoRegister}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-500 hover:opacity-95 text-white font-bold text-sm shadow-soft transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating Pass...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Confirm 1-Click Registration & Get Pass
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
