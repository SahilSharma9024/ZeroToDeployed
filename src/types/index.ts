export type AppMode = 'sports' | 'fitness';

export type UserRole = 'athlete' | 'trainer';

export type ThemeMode = 'light' | 'dark';

export type UnitSystem = 'metric' | 'imperial';

export type ActivePage =
  | 'home'
  | 'sports-overview'
  | 'sports-events'
  | 'sports-turfs'
  | 'sports-map'
  | 'sports-ghost'
  | 'sports-passes'
  | 'fitness-overview'
  | 'fitness-gyms'
  | 'fitness-map'
  | 'fitness-calculators'
  | 'fitness-ai'
  | 'fitness-portal'
  | 'fitness-buddy'
  | 'fitness-exercises'
  | 'fitness-passes';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneCountryCode: string; // e.g. "+91"
  phone: string;
  avatar: string;
  role: UserRole;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  unitSystem: UnitSystem;
  heightCm: number;
  weightKg: number;
  fitnessGoal: 'fat_loss' | 'muscle_gain' | 'endurance' | 'general_fitness';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  primarySports: string[];
  jerseySize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  medicalClearance: boolean;
  bloodGroup: string;
  city: string;
  turfElo: number;
  streakDays: number;
  lastCheckInDate: string;
}

export interface RegistrationPass {
  id: string;
  type: 'event' | 'turf' | 'gym_pass';
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  registeredAt: string;
  ticketCode: string;
  athleteName: string;
  status: 'Confirmed' | 'Active' | 'Completed';
  cost: string;
}
