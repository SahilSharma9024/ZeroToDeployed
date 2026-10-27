import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Dumbbell, ShieldCheck, Zap, Lock, Mail, User, Phone, ArrowRight, Activity, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AuthScreen: React.FC = () => {
  const { setAuthToken, updateUser } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('register');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: 24,
    gender: 'Male',
    height_cm: 178,
    weight_kg: 74,
    fitness_goal: 'muscle_gain',
    blood_group: 'O+',
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('KinetiQ_token', data.token);
      localStorage.setItem('KinetiQ_auth_user', JSON.stringify(data.user));
      setAuthToken(data.token);

      updateUser({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
        age: data.user.age,
        gender: data.user.gender,
        heightCm: data.user.height_cm,
        weightKg: data.user.weight_kg,
        fitnessGoal: data.user.fitness_goal,
        bloodGroup: data.user.blood_group,
      });

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('KinetiQ_token', data.token);
      localStorage.setItem('KinetiQ_auth_user', JSON.stringify(data.user));
      setAuthToken(data.token);

      updateUser({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
        age: data.user.age,
        gender: data.user.gender,
        heightCm: data.user.height_cm,
        weightKg: data.user.weight_kg,
        fitnessGoal: data.user.fitness_goal,
        bloodGroup: data.user.blood_group,
      });

      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
      } catch {}
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Login
  const handleDemoLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'aarav@KinetiQ.io',
          password: 'KinetiQ123',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Demo login failed');
      }

      localStorage.setItem('KinetiQ_token', data.token);
      localStorage.setItem('KinetiQ_auth_user', JSON.stringify(data.user));
      setAuthToken(data.token);

      updateUser({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
        age: data.user.age,
        gender: data.user.gender,
        heightCm: data.user.height_cm,
        weightKg: data.user.weight_kg,
        fitnessGoal: data.user.fitness_goal,
        bloodGroup: data.user.blood_group,
      });

      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {}
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not log in as demo athlete.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 shadow-lg shadow-purple-500/30 mb-2">
            <Dumbbell className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>KinetiQ</span>
            <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Sports & Fitness
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Log in or create your athlete profile to enter the live ecosystem, access real OpenStreetMap venues, and activate HindSight AI personal trainer.
          </p>
        </div>

        {/* Tab Toggle: Sign Up vs Login */}
        <div className="grid grid-cols-2 p-1 bg-slate-800/80 rounded-2xl border border-slate-700/60 mb-6">
          <button
            type="button"
            onClick={() => { setTab('register'); setErrorMsg(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'register'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create New Account
          </button>
          <button
            type="button"
            onClick={() => { setTab('login'); setErrorMsg(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'login'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In Existing
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 1: REGISTER WITH BASIC ATHLETE DETAILS */}
        {/* ================================================================= */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* Name */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sahil Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="athlete@KinetiQ.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Age</label>
                <input
                  type="number"
                  required
                  min={12}
                  max={90}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  required
                  min={100}
                  max={240}
                  value={formData.height_cm}
                  onChange={(e) => setFormData({ ...formData, height_cm: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min={30}
                  max={250}
                  value={formData.weight_kg}
                  onChange={(e) => setFormData({ ...formData, weight_kg: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Primary Goal */}
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-300 block mb-1">Primary Fitness Goal</label>
                <select
                  value={formData.fitness_goal}
                  onChange={(e) => setFormData({ ...formData, fitness_goal: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-purple-500"
                >
                  <option value="muscle_gain">💪 Hypertrophy & Muscle Gain</option>
                  <option value="fat_loss">🔥 Fat Loss & Caloric Deficit</option>
                  <option value="strength">🏋️ Pure Power & Strength</option>
                  <option value="endurance">🏃 Sports Endurance & Stamina</option>
                  <option value="functional_mobility">🧘 Mobility & Joint Health</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Create Account & Unlock</span>
                </>
              )}
            </button>

          </form>
        )}

        {/* ================================================================= */}
        {/* TAB 2: SIGN IN EXISTING */}
        {/* ================================================================= */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            <div>
              <label className="font-bold text-slate-300 text-xs block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="athlete@KinetiQ.io"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 text-xs block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>Sign In & Open Application</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

