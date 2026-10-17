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
      <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 dark:from-sky-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 rounded-3xl p-4 sm:p-5 border border-sky-200/70 dark:border-sky-800/50 shadow-soft flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 text-sky-600 flex items-center justify-center shadow-soft border border-sky-100 dark:border-sky-800 shrink-0">
            <CloudRain className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200">
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
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-700 shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors whitespace-nowrap"
        >
          <span>View Map Radar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hero Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-purple-100 dark:border-purple-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">{events.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Tournaments</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-rose-100 dark:border-rose-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">{ghostSubs.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">SOS Ghost Subs</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-indigo-100 dark:border-indigo-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">{turfs.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Turfs</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-emerald-100 dark:border-emerald-900/40 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block leading-tight">{user.turfElo}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Your Turf ELO</span>
          </div>
        </div>

      </div>

      {/* Main Section Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 w-fit">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'events'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-sm border border-purple-100 dark:border-purple-900/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Upcoming Sports Events ({events.length})
        </button>

        <button
          onClick={() => setActiveTab('turfs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'turfs'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-sm border border-purple-100 dark:border-purple-900/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Nearby Turfs & Arenas ({turfs.length})
        </button>

        <button
          onClick={() => setActiveTab('ghostSub')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ghostSub'
              ? 'bg-rose-500 text-white shadow-pastel-rose'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Ghost Sub & Matchmaker</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 text-[10px]">
            {ghostSubs.length} Live
          </span>
        </button>
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
