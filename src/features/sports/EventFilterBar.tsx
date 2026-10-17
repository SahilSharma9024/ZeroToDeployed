import React from 'react';
import { SportType, VenueType } from '../../types/sports';
import { Filter, Sun, Sparkles } from 'lucide-react';

interface EventFilterBarProps {
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
  selectedVenueType: VenueType | 'All';
  setSelectedVenueType: (venue: VenueType | 'All') => void;
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
  onlyFree: boolean;
  setOnlyFree: (free: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SPORTS_LIST: (SportType | 'All')[] = [
  'All',
  'Football',
  'Cricket',
  'Badminton',
  'Tennis',
  'Running',
  'Pickleball',
  'Basketball',
];

export const EventFilterBar: React.FC<EventFilterBarProps> = ({
  selectedSport,
  setSelectedSport,
  selectedVenueType,
  setSelectedVenueType,
  onlyFree,
  setOnlyFree,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] border border-slate-200/90 dark:border-slate-800 space-y-4">
      
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search events, turfs, or venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400"
          />
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Indoor / Outdoor Segmented Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
          {(['All', 'Indoor', 'Outdoor'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVenueType(v)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedVenueType === v
                  ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-sm border border-purple-100 dark:border-purple-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {v === 'Indoor' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>}
              {v === 'Outdoor' && <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{v === 'All' ? 'All Venues' : v}</span>
            </button>
          ))}
        </div>

        {/* Free Events Toggle */}
        <button
          onClick={() => setOnlyFree(!onlyFree)}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
            onlyFree
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Free Entry Only</span>
        </button>

      </div>

      {/* Horizontal Sports Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        {SPORTS_LIST.map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedSport === sport
                ? 'bg-purple-600 text-white border-purple-600 shadow-soft scale-[1.02]'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {sport === 'All' ? '⚡ All Sports' : sport}
          </button>
        ))}
      </div>

    </div>
  );
};
