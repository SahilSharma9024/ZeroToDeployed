import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { AutoRegisterModal } from './components/common/AutoRegisterModal';
import { QrPassModal } from './components/common/QrPassModal';
import { ProfileModal } from './components/common/ProfileModal';
import { SportsDashboard } from './features/sports/SportsDashboard';
import { FitnessDashboard } from './features/fitness/FitnessDashboard';
import { Trophy, Dumbbell, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { mode } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between selection:bg-purple-100 selection:text-purple-900">
      
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Body Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {mode === 'sports' ? <SportsDashboard /> : <FitnessDashboard />}
      </main>

      {/* Modern Clean Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-100 to-rose-100 border border-purple-200 flex items-center justify-center text-purple-700 shadow-soft">
              ⚡
            </span>
            <span>PulsePlay • Sports & Fitness Integrated Ecosystem</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 1-Click Universal Passport
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-purple-500" /> Indoor/Outdoor Sports
            </span>
            <span className="flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-rose-500" /> AI Coach & Workout Engine
            </span>
          </div>

          <p className="text-xs text-slate-400">
            HackSprint Prototype • Made with React & TypeScript
          </p>
        </div>
      </footer>

      {/* Global Interactive Modals */}
      <AutoRegisterModal />
      <QrPassModal />
      <ProfileModal />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
