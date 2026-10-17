import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Dumbbell, ShieldCheck, Heart, Sparkles, MapPin, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setMode, setActivePage } = useApp();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-soft">
                <span className="font-extrabold text-sm">⚡</span>
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                KINETIX
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The unified athletic operating system connecting amateur tournaments, sports turfs, premium gyms, and AI-driven training.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All systems online • Live GPS Active
            </div>
          </div>

          {/* Sports Discovery */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Sports & Arena Network
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => { setMode('sports'); setActivePage('sports-events'); }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Upcoming Tournaments
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMode('sports'); setActivePage('sports-turfs'); }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Indoor & Outdoor Turfs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMode('sports'); setActivePage('sports-map'); }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Live Geolocation Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMode('sports'); setActivePage('sports-ghost'); }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Ghost Sub & Partner Finder
                </button>
              </li>
            </ul>
          </div>

          {/* Fitness Suite */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Fitness & Intelligence
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => { setMode('fitness'); setActivePage('fitness-gyms'); }}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  Top-Rated Gyms & Studios
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMode('fitness'); setActivePage('fitness-ai'); }}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  AI Personal Trainer
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMode('fitness'); setActivePage('fitness-calculators'); }}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  BMI & BMR Clinical Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMode('fitness'); setActivePage('fitness-exercises'); }}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  Exercise Video Academy
                </button>
              </li>
            </ul>
          </div>

          {/* Universal Athlete Security */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Athlete ID & Fair Play
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>1-Click Universal Auto-Register</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Verified Medical Fitness Waivers</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Grassroots Turf ELO Ranking</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} KINETIX Athletic Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">Fair Play Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

