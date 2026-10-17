import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MapPin, Check, Zap, Clock } from 'lucide-react';

export const GymFinderSection: React.FC = () => {
  const { gyms, openAutoRegister } = useApp();

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

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-amber-50 dark:from-rose-950/40 dark:via-purple-950/40 dark:to-slate-900 rounded-3xl p-6 border border-rose-100 dark:border-rose-900/40 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-pastel-rose">
              ⭐ Top-Rated Fitness Clubs
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Verified Amenities
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find High-Rated Gyms & Premium Studios Near You
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Auto-generate a 3-Day Free Trial pass with one click. Compare equipment, certified trainers, and sauna/recovery facilities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft text-right">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase">Nearby Centers</span>
            <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">{gyms.length} Clubs</span>
          </div>
        </div>
      </div>

      {/* Gym Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gyms.map((gym) => (
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
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white font-bold text-xs backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{gym.rating}</span>
                <span className="text-[10px] text-slate-400">({gym.reviewCount})</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-semibold flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  {gym.location} • {gym.distanceKm} km away
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
