import React from 'react';
import { SportsEvent } from '../../types/sports';
import { useApp } from '../../context/AppContext';
import { Calendar, MapPin, Zap, Trophy } from 'lucide-react';

interface EventCardProps {
  event: SportsEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { openAutoRegister } = useApp();

  const handleRegisterClick = () => {
    openAutoRegister({
      id: event.id,
      type: 'event',
      title: event.title,
      subtitle: `${event.sport} • ${event.venueType}`,
      venue: event.venueName,
      dateOrTime: `${event.date} (${event.time})`,
      cost: event.isFree ? 'FREE Entry' : `₹${event.entryFee}`,
      category: `${event.sport} • ${event.skillTier}`,
      ageRequirement: event.ageGroup,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-md ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
      
      {/* Event Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 shadow-sm">
            {event.sport}
          </span>
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-sm ${
              event.venueType === 'Indoor'
                ? 'bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                : 'bg-amber-100/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            }`}
          >
            {event.venueType}
          </span>
        </div>

        {/* Spots Left Pill */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-pastel-rose animate-pulse">
            🔥 {event.spotsLeft} spots left
          </span>
        </div>

        {/* Bottom Banner on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-[11px] font-medium text-slate-200 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-purple-300" />
            {event.date} • {event.time}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
              {event.skillTier}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {event.distanceKm} km away
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{event.venueName}</span>
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {event.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Prize Pool if available */}
          {event.prizes && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/50 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <p className="text-[11px] font-semibold text-amber-900 dark:text-amber-200 truncate">
                {event.prizes}
              </p>
            </div>
          )}
        </div>

        {/* Footer & Auto-Registration CTA */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Entry Fee</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {event.isFree ? (
                <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
              ) : (
                `₹${event.entryFee}`
              )}
            </span>
          </div>

          <button
            onClick={handleRegisterClick}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            Auto-Register
          </button>
        </div>

      </div>

    </div>
  );
};
