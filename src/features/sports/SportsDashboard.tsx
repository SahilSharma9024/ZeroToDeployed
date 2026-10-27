import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EventFilterBar } from './EventFilterBar';
import { EventCard } from './EventCard';
import { TurfCard } from './TurfCard';
import { GhostSubSection } from './GhostSubSection';
import { VenueType } from '../../types/sports';
import { CloudRain, ShieldCheck, Trophy, MapPin, Users, ArrowRight, RefreshCw, Database, Navigation, Building2 } from 'lucide-react';

const METRO_CITIES = [
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, area: 'Jubilee Hills / Gachibowli' },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, area: 'Koramangala / Sarjapur' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, area: 'Bandra / Powai' },
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090, area: 'Siri Fort / CyberHub' },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, area: 'Viman Nagar / Balewadi' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, area: 'T Nagar / Anna Nagar' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, area: 'Salt Lake / New Town' },
];

interface SportsDashboardProps {
  initialSubTab?: 'events' | 'turfs' | 'ghostSub';
}

export const SportsDashboard: React.FC<SportsDashboardProps> = ({ initialSubTab = 'events' }) => {
  const { events, turfs, ghostSubs, user, setActivePage, fetchVenues, requestUserLocation, userLocation } = useApp();

  // Tab State
  const [activeTab, setActiveTab] = useState<'events' | 'turfs' | 'ghostSub'>(initialSubTab);
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad');
  const [customCityInput, setCustomCityInput] = useState<string>('');
  const [isFetchingTurfs, setIsFetchingTurfs] = useState<boolean>(false);

  const handleCityChange = async (city: typeof METRO_CITIES[0]) => {
    setSelectedCity(city.name);
    setIsFetchingTurfs(true);
    await fetchVenues('turf', city.lat, city.lng, city.name);
    setIsFetchingTurfs(false);
  };

  const handleCustomCitySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    const city = customCityInput.trim();
    setSelectedCity(city);
    setIsFetchingTurfs(true);
    await fetchVenues('turf', undefined, undefined, city);
    setIsFetchingTurfs(false);
  };

  const handleUseGps = () => {
    setSelectedCity('My Live GPS');
    if ('geolocation' in navigator) {
      setIsFetchingTurfs(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          await fetchVenues('turf', lat, lng);
          setIsFetchingTurfs(false);
        },
        async () => {
          setIsFetchingTurfs(false);
          if (userLocation) {
            await fetchVenues('turf', userLocation.lat, userLocation.lng);
          } else {
            alert('Location access was denied. You can enter your city in the search bar below.');
          }
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

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
            setActiveTab('turfs');
            setSelectedVenueType('Indoor');
          }}
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-sky-50 dark:bg-sky-900/50 hover:bg-sky-100 text-sky-700 dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-sky-700 transition-colors shrink-0"
        >
          <span>Filter Covered Turfs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shrink-0 ${
            activeTab === 'events'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Tournaments & Pickups</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white ml-1">
            {events.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('turfs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shrink-0 ${
            activeTab === 'turfs'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Real Turfs & Arenas</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white ml-1">
            {turfs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ghostSub')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shrink-0 ${
            activeTab === 'ghostSub'
              ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-soft'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Ghost Sub Emergency Matching</span>
          {ghostSubs.filter(g => g.playersNeeded > (g.acceptedUsers?.length || 0)).length > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping ml-1" />
          )}
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3.5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500" />
          <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white block leading-tight">{events.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Active Matches</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3.5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
          <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white block leading-tight">{ghostSubs.filter(g => g.playersNeeded > (g.acceptedUsers?.length || 0)).length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Urgent SOS Beacons</span>
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
          {/* Live OpenStreetMap & City Selector Toolbar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Live OpenStreetMap Overpass & SQLite
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Showing {filteredTurfs.length} Turfs • City: <strong className="text-slate-900 dark:text-white">{selectedCity}</strong>
                </span>
              </div>

              <button
                onClick={() => fetchVenues('turf')}
                disabled={isFetchingTurfs}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetchingTurfs ? 'animate-spin text-emerald-500' : ''}`} />
                <span>{isFetchingTurfs ? 'Querying Overpass...' : 'Refresh Real Venues'}</span>
              </button>
            </div>

            {/* Enter Custom City Form */}
            <form onSubmit={handleCustomCitySearch} className="flex gap-2">
              <div className="relative flex-1">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Enter any city name for sports pitches (e.g. Mumbai, Kolkata, Jaipur, Delhi)..."
                  value={customCityInput}
                  onChange={(e) => setCustomCityInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                disabled={!customCityInput.trim() || isFetchingTurfs}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0 active:scale-95 disabled:opacity-50"
              >
                Search City
              </button>
            </form>

            {/* City Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <button
                onClick={handleUseGps}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCity === 'My Live GPS'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Navigation className={`w-3.5 h-3.5 ${isFetchingTurfs && selectedCity === 'My Live GPS' ? 'animate-spin text-emerald-200' : ''}`} />
                <span>📍 My GPS Location</span>
              </button>

              {METRO_CITIES.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleCityChange(city)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCity === city.name
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{city.name}</span>
                </button>
              ))}
            </div>
          </div>

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
