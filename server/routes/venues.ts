import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const venuesRouter = Router();

// Dictionary of Major Indian and Global Metro Cities
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  hyderabad: { lat: 17.3850, lng: 78.4867 },
  bengaluru: { lat: 12.9716, lng: 77.5946 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  delhi: { lat: 28.6139, lng: 77.2090 },
  'delhi ncr': { lat: 28.6139, lng: 77.2090 },
  newdelhi: { lat: 28.6139, lng: 77.2090 },
  pune: { lat: 18.5204, lng: 73.8567 },
  chennai: { lat: 13.0827, lng: 80.2707 },
  kolkata: { lat: 22.5726, lng: 88.3639 },
  ahmedabad: { lat: 23.0225, lng: 72.5714 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
  lucknow: { lat: 26.8467, lng: 80.9462 },
  chandigarh: { lat: 30.7333, lng: 76.7794 },
  indore: { lat: 22.7196, lng: 75.8577 },
  kochi: { lat: 9.9312, lng: 76.2673 },
  cochin: { lat: 9.9312, lng: 76.2673 },
  goa: { lat: 15.2993, lng: 74.1240 },
  surat: { lat: 21.1702, lng: 72.8311 },
  nagpur: { lat: 21.1458, lng: 79.0882 },
  visakhapatnam: { lat: 17.6868, lng: 83.2185 },
  vizag: { lat: 17.6868, lng: 83.2185 },
  noida: { lat: 28.5355, lng: 77.3910 },
  gurugram: { lat: 28.4595, lng: 77.0266 },
  gurgaon: { lat: 28.4595, lng: 77.0266 },
};

// Curated Athletic Photo Collections for Realistic Venue Cards
const GYM_IMAGES = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
];

const TURF_IMAGES = [
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=900&q=80',
];

// Haversine distance calculator (in kilometers)
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

// Fetch Venues (Gyms or Turfs) with live OpenStreetMap Overpass & distance calculations
venuesRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const type = (req.query.type as string) || 'all'; // 'gym', 'turf', 'all'
    const cityParam = ((req.query.city as string) || '').trim().toLowerCase();
    let lat = parseFloat(req.query.lat as string);
    let lon = parseFloat(req.query.lng as string);
    const radius = parseInt(req.query.radius as string) || 20000; // 20km

    // 1. Geocode city if provided
    if (cityParam && CITY_COORDINATES[cityParam]) {
      lat = CITY_COORDINATES[cityParam].lat;
      lon = CITY_COORDINATES[cityParam].lng;
    } else if (cityParam && (isNaN(lat) || isNaN(lon))) {
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityParam)}`, {
          headers: { 'User-Agent': 'KinetiQ-Sports-OS/2.0' }
        });
        if (geoRes.ok) {
          const geoData = (await geoRes.json()) as any[];
          if (geoData && geoData.length > 0) {
            lat = parseFloat(geoData[0].lat);
            lon = parseFloat(geoData[0].lon);
          }
        }
      } catch {
        // Fallback to default
      }
    }

    // Default coordinates to Hyderabad if still not resolved
    if (isNaN(lat) || isNaN(lon)) {
      lat = 17.3850;
      lon = 78.4867;
    }

    // 2. Query local SQLite database
    let query = 'SELECT * FROM venues';
    const params: any[] = [];
    if (type !== 'all') {
      query += ' WHERE type = ?';
      params.push(type);
    }

    const allDbVenues = db.prepare(query).all(...params) as any[];

    // Calculate distance for all cached venues
    const nearbyVenues = allDbVenues
      .map((v) => ({
        ...v,
        distanceKm: calculateDistanceKm(lat, lon, v.latitude, v.longitude),
      }))
      .filter((v) => v.distanceKm <= 35); // within 35km radius of user/city center

    // 3. If local database has fewer than 4 nearby venues, query OpenStreetMap Overpass live
    if (nearbyVenues.length < 4) {
      try {
        const osmTag = type === 'gym' ? 'leisure=fitness_centre' : 'leisure=pitch';
        const overpassQuery = `
          [out:json][timeout:6];
          (
            node["${osmTag}"](around:${radius},${lat},${lon});
            way["${osmTag}"](around:${radius},${lat},${lon});
          );
          out center 15;
        `;

        const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(overpassUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = (await response.json()) as any;
          if (data && Array.isArray(data.elements) && data.elements.length > 0) {
            const insertStmt = db.prepare(`
              INSERT OR IGNORE INTO venues (
                id, osm_id, name, type, sport, latitude, longitude,
                address, rating, is_indoor, amenities, pricing
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            data.elements.forEach((el: any, idx: number) => {
              const name = el.tags?.name || (type === 'gym' ? `Fitness Hub ${idx + 1}` : `Turf Arena ${idx + 1}`);
              const venueType = type === 'gym' ? 'gym' : 'turf';
              const sport = el.tags?.sport || (type === 'gym' ? 'Strength & Cardio' : 'Football & Cricket Pitch');
              const address = [el.tags?.['addr:street'], el.tags?.['addr:suburb'], el.tags?.['addr:city']]
                .filter(Boolean)
                .join(', ') || (cityParam ? `${cityParam.toUpperCase()} Center` : 'Central District');

              const pricingTier = type === 'gym'
                ? ['₹1,499 / mo', '₹1,999 / mo', '₹2,499 / mo', '₹3,200 / mo'][idx % 4]
                : ['₹800 / hr', '₹1,200 / hr', '₹1,500 / hr', '₹1,800 / hr'][idx % 4];

              insertStmt.run(
                `ven-osm-${el.id}`,
                `osm-${el.id}`,
                name,
                venueType,
                sport,
                el.lat || el.center?.lat || lat,
                el.lon || el.center?.lon || lon,
                address,
                4.5 + parseFloat((Math.random() * 0.4).toFixed(1)),
                type === 'gym' ? 1 : 0,
                JSON.stringify(['OpenStreetMap Verified', 'Equipped', 'Parking', 'Showers']),
                pricingTier
              );
            });
          }
        }
      } catch (osmErr) {
        console.warn('Overpass API query fallback active:', (osmErr as any).message);
      }
    }

    // 4. Reload matching venues and attach images and pricing
    const reloaded = db.prepare(query).all(...params) as any[];

    const formatted = reloaded.map((v, idx) => {
      const distanceKm = calculateDistanceKm(lat, lon, v.latitude, v.longitude);
      let amenitiesList = [];
      try {
        amenitiesList = JSON.parse(v.amenities);
      } catch {
        amenitiesList = ['Equipped', 'Verified Access'];
      }

      const imageUrl = v.type === 'gym'
        ? GYM_IMAGES[idx % GYM_IMAGES.length]
        : TURF_IMAGES[idx % TURF_IMAGES.length];

      const priceMonthly = v.pricing
        ? parseInt(v.pricing.replace(/[^\d]/g, ''), 10) || 1999
        : 1999;

      return {
        ...v,
        distanceKm,
        amenities: amenitiesList,
        isIndoor: Boolean(v.is_indoor),
        imageUrl,
        pricing: v.pricing || (v.type === 'gym' ? '₹1,999 / mo' : '₹1,200 / hr'),
        priceMonthly,
      };
    });

    // Sort by closest distance
    formatted.sort((a, b) => a.distanceKm - b.distanceKm);

    res.json({
      venues: formatted,
      meta: {
        total: formatted.length,
        source: 'OpenStreetMap & KinetiQ Local SQLite Engine',
        queriedCoords: { lat, lon, city: cityParam || 'Detected Location' }
      }
    });
  } catch (error) {
    console.error('Venues query error:', error);
    res.status(500).json({ error: 'Failed to retrieve venues' });
  }
});
