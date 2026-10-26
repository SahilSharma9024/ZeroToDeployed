import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, Shield, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Dumbbell, Trophy, Eye, EyeOff } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, isAuthenticated, user, logout } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'athlete' | 'trainer'>('athlete');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('22');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          setSuccessMessage('Welcome back! Authentication verified.');
          setTimeout(() => {
            setIsAuthModalOpen(false);
            setSuccessMessage(null);
          }, 900);
        } else {
          setErrorMessage(res.message || 'Login failed. Please verify credentials.');
        }
      } else {
        const res = await register({
          name,
          email,
          password,
          role,
          phone,
          age: Number(age),
          gender,
        });

        if (res.success) {
          setSuccessMessage('Account registered successfully! Welcome to KinetiQ.');
          setTimeout(() => {
            setIsAuthModalOpen(false);
            setSuccessMessage(null);
          }, 900);
        } else {
          setErrorMessage(res.message || 'Registration failed.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoRole: 'athlete' | 'trainer') => {
    setErrorMessage(null);
    setIsLoading(true);
    const demoEmail = demoRole === 'athlete' ? 'athlete@kinetix.com' : 'trainer@kinetix.com';
    const demoPass = 'kinetix123';

    setEmail(demoEmail);
    setPassword(demoPass);

    const res = await login(demoEmail, demoPass);
    setIsLoading(false);
    if (res.success) {
      setSuccessMessage(`Logged in as Demo ${demoRole === 'athlete' ? 'Athlete (Aarav)' : 'Coach (Rahul)'}`);
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setSuccessMessage(null);
      }, 700);
    } else {
      setErrorMessage(res.message || 'Quick login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-white" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-purple-200">
              KINETIX SECURE PASSPORT AUTH
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {isAuthenticated ? 'Authenticated Account' : mode === 'login' ? 'Sign in to KinetiQ' : 'Join the Athletic OS'}
          </h2>
          <p className="text-xs text-purple-100/90 mt-1">
            {isAuthenticated 
              ? `Signed in as ${user.name} (${user.role.toUpperCase()})` 
              : 'Verified sports identity, synced training logs & live venue access'}
          </p>
        </div>

        {/* If already authenticated, show account manager & switch role / logout */}
        {isAuthenticated ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60">
              <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500 shadow-sm" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{user.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    user.role === 'trainer'
                      ? 'bg-purple-600 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
                <div className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> JWT Verified Session • {user.city}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quick Switch Demo Accounts:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('athlete')}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20"
                >
                  <Trophy className="w-4 h-4 text-emerald-500" /> Switch to Athlete
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('trainer')}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-600 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all hover:bg-purple-50/50 dark:hover:bg-purple-950/20"
                >
                  <Dumbbell className="w-4 h-4 text-purple-500" /> Switch to Coach
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setSuccessMessage('Logged out successfully');
                  setTimeout(() => setSuccessMessage(null), 1500);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 transition-colors mt-2"
              >
                Log Out of Session
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-soft'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMessage(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-soft'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Quick Demo Logins for Judges/Recruiters */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 border border-slate-200/70 dark:border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 1-Click Judge / Demo Login:
                </span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400">Pass: kinetix123</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('athlete')}
                  className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Demo Athlete</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('trainer')}
                  className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-purple-500 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Dumbbell className="w-3.5 h-3.5 text-purple-500" />
                  <span>Demo Coach</span>
                </button>
              </div>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <>
                  {/* Role Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Select Your Profile Role
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRole('athlete')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          role === 'athlete'
                            ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Athlete
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Tournaments & Turfs</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRole('trainer')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          role === 'trainer'
                            ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <Dumbbell className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Coach / Trainer
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Manage Client Rosters</div>
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="athlete@kinetix.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="12"
                      max="90"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-soft hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Authenticate & Enter' : 'Create Athletic Passport'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
