import { VirtualGymExercise } from '../data/virtualGymDataset';

export type GymGoalType =
  | 'fat_loss'
  | 'muscle_gain'
  | 'strength'
  | 'endurance'
  | 'recomposition';

export type AvatarArchetype = 'titan' | 'ninja' | 'berserker' | 'champion';

export type BodyFrame = 'masculine' | 'feminine' | 'heroic';

export interface AvatarCustomization {
  archetype: AvatarArchetype;
  bodyFrame: BodyFrame;
  skinTone: string;
  hairStyle: 'buzz' | 'spiky' | 'long' | 'bun' | 'headband';
  hairColor: string;
  gearOutfit: 'cyber' | 'stealth' | 'crimson' | 'gold' | 'neon';
  hasLiftingBelt: boolean;
  hasWristWraps: boolean;
  hasGlowingAura: boolean;
  pose: 'idle' | 'flex' | 'lift';
}

export interface VirtualGymUserStats {
  heightCm: number;
  weightKg: number;
  goal: GymGoalType;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  avatar: AvatarCustomization;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalWorkoutsCompleted: number;
  totalSetsCompleted: number;
  earnedBadges: string[];
}

export interface WorkoutStepPlan {
  phaseNumber: number;
  phaseName: string;
  phaseTag: string;
  description: string;
  recommendedSets: number;
  recommendedReps: string;
  restSeconds: number;
  exercise: VirtualGymExercise;
}

export interface MacroNutrientRecommendation {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  waterLiters: number;
  guidelines: string[];
}
