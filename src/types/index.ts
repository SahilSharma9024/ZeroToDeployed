export type AppMode = 'sports' | 'fitness';

export type UserRole = 'athlete' | 'trainer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
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

