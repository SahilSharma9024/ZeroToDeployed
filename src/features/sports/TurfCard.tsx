import React from 'react';
import { TurfVenue } from '../../types/sports';
import { useApp } from '../../context/AppContext';
import { Star, MapPin, Zap, Check, Clock } from 'lucide-react';

interface TurfCardProps {
  turf: TurfVenue;
}

export const TurfCard: React.FC<TurfCardProps> = ({ turf }) => {
  const { openAutoRegister } = useApp();

  const handleBookSlot = (slot: string) => {
    openAutoRegister({
      id: turf.id,
      type: 'turf',
      title: turf.name,
      subtitle: `${turf.sportsSupported.join(', ')} • ${turf.venueType}`,
      venue: turf.location,
      dateOrTime: `Today at ${slot}`,
      cost: `₹${turf.pricePerHour}/hr`,
      category: `Turf Booking • ${turf.venueType}`,
    });
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      
      {/* Turf Image */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img
          src={turf.imageUrl}
          alt={turf.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-md">
            {turf.venueType} Arena
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-slate-900 font-bold text-xs backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{turf.rating}</span>
          <span className="text-[10px] text-slate-400">({turf.reviewCount})</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-xs font-semibold flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            {turf.location} • {turf.distanceKm} km away
          </p>
        </div>
      </div>

      {/* Turf Content */}
      <div className="p-5 space-y-4">
        
        <div>
          <h3 className="text-base font-bold text-slate-900">{turf.name}</h3>
          
          {/* Sports Supported */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {turf.sportsSupported.map((sport) => (
              <span
                key={sport}
                className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-100"
              >
                {sport}
              </span>
            ))}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {turf.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-[10px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100 flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Slot Selection */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-500" /> Open Slots Today
            </span>
            <span className="text-xs font-extrabold text-slate-900">
              ₹{turf.pricePerHour}<span className="text-[10px] font-normal text-slate-500">/hr</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {turf.availableSlotsToday.slice(0, 3).map((slot) => (
              <button
                key={slot}
                onClick={() => handleBookSlot(slot)}
                className="py-1.5 px-2 rounded-xl text-center text-[11px] font-bold bg-slate-50 hover:bg-purple-600 hover:text-white text-slate-700 border border-slate-200 transition-colors"
                title="1-Click Auto Book Slot"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

