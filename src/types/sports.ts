export type SportType =
  | 'Football'
  | 'Cricket'
  | 'Badminton'
  | 'Tennis'
  | 'Basketball'
  | 'Pickleball'
  | 'Running'
  | 'Swimming'
  | 'Volleyball';

export type VenueType = 'Indoor' | 'Outdoor' | 'Both';

export interface SportsEvent {
  id: string;
  title: string;
  sport: SportType;
  venueType: VenueType;
  date: string;
  time: string;
  venueName: string;
  address: string;
  distanceKm: number;
  entryFee: number;
  isFree: boolean;
  totalSpots: number;
  spotsLeft: number;
  skillTier: 'All Levels' | 'Beginner' | 'Intermediate' | 'Competitive / Pro';
  ageGroup: 'Open (16+)' | 'Under 19' | 'Masters (35+)';
  prizes?: string;
  organizer: string;
  imageUrl: string;
  tags: string[];
  rules: string[];
}

export interface TurfVenue {
  id: string;
  name: string;
  sportsSupported: SportType[];
  venueType: VenueType;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  distanceKm: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  availableSlotsToday: string[];
  instantBookingAvailable: boolean;
}

export interface GhostSubBeacon {
  id: string;
  sport: SportType;
  title: string;
  venue: string;
  venueType: VenueType;
  scheduledTime: string;
  playersNeeded: number;
  rolesNeeded: string[];
  costPerPerson: number;
  hostName: string;
  hostAvatar: string;
  skillTier: 'Casual Fun' | 'Intermediate' | 'Competitive';
  urgency: 'Immediate (< 2 hrs)' | 'Today' | 'Tomorrow' | 'Weekend';
  acceptedUsers: string[];
  description: string;
  isPartnerFinder?: boolean; // For tennis/badminton partner or cricket squad builder
}

export interface MatchScheduleRequest {
  id: string;
  hostName: string;
  sport: SportType;
  opponentOrPartnerType: 'Solo Partner' | 'Opponent Team' | 'Full Squad';
  preferredDate: string;
  preferredTimeSlot: string;
  preferredVenue: string;
  notes: string;
  status: 'Open' | 'Matched' | 'Completed';
}

