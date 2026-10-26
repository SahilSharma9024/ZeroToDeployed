import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Navigation,
  Compass,
  Star,
  Zap,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface VenueMapProps {
  type: 'sports' | 'fitness';
}

// Haversine formula to compute distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

interface VenueItem {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  categoryTag: string;
  displayPrice: string;
  type: 'turf' | 'gym_pass';
  liveDist?: number;
}

export const VenueMap: React.FC<VenueMapProps> = ({ type }) => {
  const { userLocation, requestUserLocation, isLocating, turfs, gyms, openAutoRegister } =
    useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedVenue, setSelectedVenue] = useState<VenueItem | null>(null);
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(15);

  // Real verified venues to display
  const venues: VenueItem[] = useMemo(() => {
    return type === 'sports'
      ? turfs.map((t) => ({
          id: t.id,
          name: t.name,
          rating: t.rating,
          reviewCount: t.reviewCount,
          lat: t.lat,
          lng: t.lng,
          location: t.location,
          imageUrl: t.imageUrl,
          amenities: t.amenities,
          categoryTag: t.venueType,
          displayPrice: `₹${t.pricePerHour}/hr`,
          type: 'turf' as const,
        }))
      : gyms.map((g) => ({
          id: g.id,
          name: g.name,
          rating: g.rating,
          reviewCount: g.reviewCount,
          lat: g.lat,
          lng: g.lng,
          location: g.location,
          imageUrl: g.imageUrl,
          amenities: g.amenities,
          categoryTag: g.category,
          displayPrice: `₹${g.priceMonthly}/mo`,
          type: 'gym_pass' as const,
        }));
  }, [type, turfs, gyms]);

  // Calculate live distances from user's current GPS location or default verified city hub
  const venuesWithLiveDist = useMemo(() => {
    return venues
      .map((v) => {
        const liveDist = userLocation
          ? calculateDistanceKm(userLocation.lat, userLocation.lng, v.lat, v.lng)
          : calculateDistanceKm(12.9345, 77.6265, v.lat, v.lng);
        return { ...v, liveDist };
      })
      .filter((v) => (v.liveDist ?? 0) <= maxRadiusKm);
  }, [venues, userLocation, maxRadiusKm]);

  // Initialize or update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const centerLat = userLocation?.lat || 12.9450;
    const centerLng = userLocation?.lng || 77.6350;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Clean OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([centerLat, centerLng], 12);
    }

    // Refresh markers
    if (markersLayerRef.current && mapInstanceRef.current) {
      markersLayerRef.current.clearLayers();

      // 1. User Live Location Marker (Pulsing Blue Pin)
      if (userLocation) {
        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: `
            <div style="position:relative; width:24px; height:24px; display:flex; align-items:center; justify-content:center;">
              <span style="position:absolute; width:100%; height:100%; border-radius:50%; background:#6366f1; opacity:0.6; animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>
              <span style="position:relative; width:14px; height:14px; border-radius:50%; background:#4338ca; border:2px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.3);"></span>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .bindPopup('<b>Your Live GPS Location</b><br>Coordinates Detected')
          .addTo(markersLayerRef.current);
      }

      // 2. Real Venue Pins
      venuesWithLiveDist.forEach((venue) => {
        const pinColor = type === 'sports' ? '#7c3aed' : '#f43f5e';
        const venueIcon = L.divIcon({
          className: 'custom-venue-marker',
          html: `
            <div style="background:${pinColor}; color:white; padding:5px 9px; border-radius:12px; font-weight:800; font-size:11px; box-shadow:0 4px 12px rgba(0,0,0,0.25); border:2px solid white; display:flex; align-items:center; gap:4px; white-space:nowrap; cursor:pointer;">
              <span>${type === 'sports' ? '🏟️' : '🏋️'}</span>
              <span>${venue.name.length > 18 ? venue.name.substring(0, 16) + '...' : venue.name}</span>
            </div>
          `,
          iconSize: [140, 30],
          iconAnchor: [70, 30],
        });

        const marker = L.marker([venue.lat, venue.lng], { icon: venueIcon });
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 170px;">
            <strong style="display:block; font-size: 13px; color: #0f172a; margin-bottom: 2px;">${venue.name}</strong>
            <span style="color:#64748b; font-size: 11px; display:block; margin-bottom: 4px;">📍 ${venue.location}</span>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 6px;">
              <span style="color:#4f46e5; font-weight:800; font-size:11px;">${venue.liveDist} km away</span>
              <span style="font-weight:700; font-size:11px; color:#059669;">${venue.displayPrice}</span>
            </div>
          </div>
        `);

        marker.on('click', () => {
          setSelectedVenue(venue);
        });
        marker.addTo(markersLayerRef.current!);
      });
    }
  }, [userLocation, venuesWithLiveDist, type]);

  const handleRegisterFromMap = (venue: VenueItem) => {
    openAutoRegister({
      id: venue.id,
      type: venue.type,
      title: venue.name,
      subtitle: `${venue.categoryTag} • Verified Location`,
      venue: venue.location,
      dateOrTime: type === 'sports' ? 'Standard 1-Hr Slot' : 'Free 3-Day Trial Pass',
      cost: type === 'sports' ? venue.displayPrice : 'FREE Pass',
      category: type === 'sports' ? 'Turf Booking' : 'Gym Trial',
    });
  };

  return (
    <div className="space-y-6">
      {/* Geolocation Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              Live Geolocation Radar
            </span>

            {userLocation ? (
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live GPS Active ({userLocation.lat.toFixed(3)}°, {userLocation.lng.toFixed(3)}°)
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                Verified Bengaluru Hub coordinates (GPS optional)
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {type === 'sports'
              ? 'Explore Real Sports Turfs & Arenas'
              : 'Explore Real Verified Gyms & Fitness Centers'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Geographically accurate coordinates with OpenStreetMap integration. Select any pin for live slots and navigation.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Radius selector */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-500">Radius:</span>
            {[5, 10, 15, 25].map((km) => (
              <button
                key={km}
                onClick={() => setMaxRadiusKm(km)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                  maxRadiusKm === km
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {km}km
              </button>
            ))}
          </div>

          {/* Live GPS Trigger Button */}
          <button
            onClick={requestUserLocation}
            disabled={isLocating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95 cursor-pointer"
          >
            <Navigation
              className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`}
            />
            <span>{isLocating ? 'Detecting GPS...' : 'Use My Live GPS'}</span>
          </button>
        </div>
      </div>

      {/* Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Canvas */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden">
          <div
            ref={mapContainerRef}
            className="w-full h-[450px] sm:h-[480px] rounded-2xl overflow-hidden z-10"
          />
        </div>

        {/* Selected or Nearest Venue Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col justify-between h-[474px] sm:h-[504px]">
            {selectedVenue ? (
              <div className="space-y-4 overflow-y-auto pr-1">
                <div className="relative h-36 w-full rounded-2xl overflow-hidden">
                  <img
                    src={selectedVenue.imageUrl}
                    alt={selectedVenue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md">
                    {selectedVenue.categoryTag}
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{selectedVenue.rating}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Verified Geographic Location
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedVenue.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{selectedVenue.location}</span>
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                      📍 {selectedVenue.liveDist} km away
                    </span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedVenue.lat},${selectedVenue.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Directions</span>
                    </a>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                    Coords: {selectedVenue.lat.toFixed(4)}° N, {selectedVenue.lng.toFixed(4)}° E
                  </span>
                </div>

                {/* Amenities */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Venue Amenities
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedVenue.amenities?.slice(0, 4).map((a: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Register CTA */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">
                      Rate
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {selectedVenue.displayPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRegisterFromMap(selectedVenue)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    1-Click Auto Book
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Select a Venue on the Map
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Click any pin on the map to inspect real verified street address, live distances, and directions via Google Maps.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
