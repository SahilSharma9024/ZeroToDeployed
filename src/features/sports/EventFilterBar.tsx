import React from 'react';
import { SportType, VenueType } from '../../types/sports';
import { Filter, Sun, CloudRain, Sparkles } from 'lucide-react';

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
  selectedSkill,
  setSelectedSkill,
  onlyFree,
  setOnlyFree,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100/90 space-y-4">
      
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search events, turfs, or venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all"
          />
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Indoor / Outdoor Segmented Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/70 w-full sm:w-auto">
          {(['All', 'Indoor', 'Outdoor'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVenueType(v)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedVenueType === v
                  ? 'bg-white text-purple-700 shadow-sm border border-purple-100'
                  : 'text-slate-600 hover:text-slate-900'
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
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
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
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {sport === 'All' ? '⚡ All Sports' : sport}
          </button>
        ))}
      </div>

    </div>
  );
};

