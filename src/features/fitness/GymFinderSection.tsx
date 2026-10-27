import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MapPin, Check, Zap, Clock, Navigation, RefreshCw, Database, Search, ShieldCheck } from 'lucide-react';

const METRO_CITIES = [
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, area: 'Banjara Hills / Hitec' },
  { name: 'Bengaluru', lat: 12.9345, lng: 77.6265, area: 'Koramangala / Indiranagar' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, area: 'Bandra / Andheri' },
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090, area: 'Connaught Pl / Gurgaon' },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, area: 'Koregaon Park / Baner' },
];

export const GymFinderSection: React.FC = () => {
  const { gyms, openAutoRegister, fetchVenues, userLocation, requestUserLocation, isLocating } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleCityChange = async (city: typeof METRO_CITIES[0]) => {
    setSelectedCity(city.name);
    setIsFetching(true);
    await fetchVenues('gym', city.lat, city.lng);
    setIsFetching(false);
  };

  const handleUseGps = async () => {
    setSelectedCity('My Live GPS');
    requestUserLocation();
    if (userLocation) {
      setIsFetching(true);
      await fetchVenues('gym', userLocation.lat, userLocation.lng);
      setIsFetching(false);
    }
  };

  const handleClaimTrial = (gym: typeof gyms[0]) => {
    openAutoRegister({
      id: gym.id,
      type: 'gym_pass',
      title: `${gym.name} - Free All-Access Pass`,
      subtitle: `${gym.category} • Free 3-Day Trial`,
      venue: gym.location,
      dateOrTime: `Valid from today (${gym.operatingHours})`,
      cost: 'FREE Trial Pass',
      category: 'Gym & Studio Membership',
    });
  };

  const filteredGyms = gyms.filter((g) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.location.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.amenities.some((a) => a.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-amber-50 dark:from-rose-950/40 dark:via-purple-950/40 dark:to-slate-900 rounded-3xl p-6 border border-rose-100 dark:border-rose-900/40 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-pastel-rose">
              ⭐ Top-Rated Fitness Clubs
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <Database className="w-3 h-3" />
              Live OpenStreetMap Overpass & SQLite
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find High-Rated Gyms & Premium Studios Near You
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Real fitness centers loaded dynamically from OpenStreetMap with live Haversine distance calculation. Claim your 3-day guest trial with 1-click cryptographically signed pass.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft text-right">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase">Nearby Clubs</span>
            <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">{filteredGyms.length} Active</span>
          </div>
        </div>
      </div>

      {/* City & Live GPS Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              Select City / Location Center:
            </span>
          </div>

          <button
            onClick={() => fetchVenues('gym')}
            disabled={isFetching}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-rose-500' : ''}`} />
            <span>{isFetching ? 'Syncing OSM...' : 'Refresh Live Venues'}</span>
          </button>
        </div>

        {/* City Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleUseGps}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              selectedCity === 'My Live GPS'
                ? 'bg-rose-600 text-white shadow-rose-200'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>📍 My Live GPS</span>
          </button>

          {METRO_CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCityChange(city)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCity === city.name
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-soft'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{city.name}</span>
              <span className="text-[10px] opacity-75 ml-1 hidden sm:inline">({city.area})</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Filter by gym name, amenity (e.g. CrossFit, Sauna, Free Weights) or locality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Gym Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGyms.map((gym) => (
          <div
            key={gym.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
          >
            {/* Gym Photo */}
            <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src={gym.imageUrl}
                alt={gym.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white backdrop-blur-md">
                  {gym.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white font-bold text-xs backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{gym.rating}</span>
                <span className="text-[10px] text-slate-400">({gym.reviewCount})</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-semibold flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  {gym.location} • <strong className="text-rose-300">{gym.distanceKm} km</strong> away
                </p>
              </div>
            </div>

            {/* Gym Body Content */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{gym.name}</h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  Hours: {gym.operatingHours} • {gym.trainerCount} Coaches on floor
                </p>

                {/* Equipment Highlights */}
                <div className="mt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Equipment Highlights
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {gym.equipmentHighlights.map((eq, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {gym.amenities.slice(0, 4).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-1"
                    >
                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & 1-Click Trial CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Membership</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    ₹{gym.priceMonthly}<span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">/mo</span>
                  </span>
                </div>

                <button
                  onClick={() => handleClaimTrial(gym)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  Claim Free 3-Day Pass
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
