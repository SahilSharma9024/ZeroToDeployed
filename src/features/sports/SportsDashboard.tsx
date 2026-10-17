import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EventFilterBar } from './EventFilterBar';
import { EventCard } from './EventCard';
import { TurfCard } from './TurfCard';
import { GhostSubSection } from './GhostSubSection';
import { VenueType } from '../../types/sports';
import { CloudRain, ShieldCheck, Trophy, MapPin, Users, ArrowRight } from 'lucide-react';

interface SportsDashboardProps {
  initialSubTab?: 'events' | 'turfs' | 'ghostSub';
}

export const SportsDashboard: React.FC<SportsDashboardProps> = ({ initialSubTab = 'events' }) => {
  const { events, turfs, ghostSubs, user, setActivePage } = useApp();

  // Tab State
  const [activeTab, setActiveTab] = useState<'events' | 'turfs' | 'ghostSub'>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Filter State
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedVenueType, setSelectedVenueType] = useState<VenueType | 'All'>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter logic
  const filteredEvents = events.filter((ev) => {
    if (selectedSport !== 'All' && ev.sport !== selectedSport) return false;
    if (selectedVenueType !== 'All' && ev.venueType !== selectedVenueType) return false;
    if (onlyFree && !ev.isFree) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchVenue = ev.venueName.toLowerCase().includes(q);
      const matchSport = ev.sport.toLowerCase().includes(q);
      if (!matchTitle && !matchVenue && !matchSport) return false;
    }
    return true;
  });

  const filteredTurfs = turfs.filter((turf) => {
    if (selectedSport !== 'All' && !turf.sportsSupported.includes(selectedSport as any)) return false;
    if (selectedVenueType !== 'All' && turf.venueType !== selectedVenueType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return turf.name.toLowerCase().includes(q) || turf.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Weather-Adaptive Intelligence Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-sky-300/80 dark:border-sky-800 shadow-md ring-1 ring-sky-500/20 relative overflow-hidden flex items-center justify-between gap-4">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-sky-400 to-indigo-600" />
        <div className="flex items-center gap-3.5 pl-1.5">
          <div className="w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-sm border border-sky-200 dark:border-sky-800 shrink-0">
            <CloudRain className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700/50">
                Weather Intelligence • City Forecast
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Updated 5m ago</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              Passing light showers expected around 05:30 PM.
              <span className="font-normal text-slate-600 dark:text-slate-300 ml-1">
                Recommend filtering for <strong className="text-indigo-600 dark:text-indigo-400">Indoor Arenas</strong> or covered turfs today.
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setActivePage('sports-map');
          }}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap"
        >
          <span>View Map Radar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hero Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3.5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500" />
          <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white block leading-tight">{events.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Active Tournaments</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3.5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
          <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white block leading-tight">{ghostSubs.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">SOS Ghost Subs</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3.5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
          <div className="w-11 h-11 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white block leading-tight">{turfs.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Verified Turfs</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3.5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white block leading-tight">{user.turfElo}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Your Turf ELO</span>
          </div>
        </div>

      </div>


      {/* Active Tab Content */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <EventFilterBar
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            selectedVenueType={selectedVenueType}
            setSelectedVenueType={setSelectedVenueType}
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            onlyFree={onlyFree}
            setOnlyFree={setOnlyFree}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No events found matching your filters.</p>
              <button
                onClick={() => {
                  setSelectedSport('All');
                  setSelectedVenueType('All');
                  setOnlyFree(false);
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'turfs' && (
        <div className="space-y-6">
          <EventFilterBar
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            selectedVenueType={selectedVenueType}
            setSelectedVenueType={setSelectedVenueType}
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            onlyFree={onlyFree}
            setOnlyFree={setOnlyFree}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTurfs.map((turf) => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ghostSub' && (
        <GhostSubSection />
      )}

    </div>
  );
};
