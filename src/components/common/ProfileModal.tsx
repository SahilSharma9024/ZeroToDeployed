import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Heart, Shield, Award, Phone, Check, RefreshCw } from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { user, updateUser, isProfileOpen, setIsProfileOpen } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    age: user.age,
    gender: user.gender,
    heightCm: user.heightCm,
    weightKg: user.weightKg,
    fitnessGoal: user.fitnessGoal,
    experienceLevel: user.experienceLevel,
    jerseySize: user.jerseySize,
    emergencyName: user.emergencyContact.name,
    emergencyPhone: user.emergencyContact.phone,
    bloodGroup: user.bloodGroup,
    medicalClearance: user.medicalClearance,
    role: user.role,
  });

  if (!isProfileOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age),
      gender: formData.gender as any,
      heightCm: Number(formData.heightCm),
      weightKg: Number(formData.weightKg),
      fitnessGoal: formData.fitnessGoal as any,
      experienceLevel: formData.experienceLevel as any,
      jerseySize: formData.jerseySize as any,
      bloodGroup: formData.bloodGroup,
      medicalClearance: formData.medicalClearance,
      role: formData.role as any,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: 'Family / Guardian',
      },
    });
    setIsProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Pastel Header */}
        <div className="p-6 bg-gradient-to-r from-purple-100 via-rose-50 to-amber-50 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-soft"
            />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Universal Athlete & Fitness Passport</h2>
              <p className="text-xs text-slate-600">Your single identity for 1-click sports & gym auto-registrations</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Role selection pill */}
          <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-purple-900 block">Current Account Persona</span>
              <span className="text-[11px] text-purple-700">Switching role gives you the Trainer or Client management dashboard</span>
            </div>
            <div className="flex gap-1 bg-white p-1 rounded-xl border border-purple-200">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'athlete' })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  formData.role === 'athlete' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Athlete / Client
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'trainer' })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  formData.role === 'trainer' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Coach / Trainer
              </button>
            </div>
          </div>

          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={formData.heightCm}
                onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weightKg}
                onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Jersey / Uniform Size</label>
              <select
                value={formData.jerseySize}
                onChange={(e) => setFormData({ ...formData, jerseySize: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
              >
                <option value="S">S (Small - 36)</option>
                <option value="M">M (Medium - 38)</option>
                <option value="L">L (Large - 40)</option>
                <option value="XL">XL (Extra Large - 42)</option>
                <option value="XXL">XXL (44)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Blood Group</label>
              <input
                type="text"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              Emergency Contact (Used in Event Waivers)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Contact Name & Relation"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
              <input
                type="text"
                placeholder="Emergency Phone Number"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>

          {/* Digital Medical Clearance Checkbox */}
          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.medicalClearance}
              onChange={(e) => setFormData({ ...formData, medicalClearance: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <div>
              <span className="text-xs font-bold text-emerald-950 block">
                Digital Physical Fitness & Medical Clearance Waiver
              </span>
              <span className="text-[11px] text-emerald-700 leading-relaxed block mt-0.5">
                I declare that I am physically fit to participate in sports and fitness activities. This will be automatically attached to future tournament registrations.
              </span>
            </div>
          </label>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsProfileOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-soft transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Passport
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

