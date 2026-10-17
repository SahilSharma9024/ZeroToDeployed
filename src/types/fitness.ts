export interface GymVenue {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  category: 'Premium Gym' | 'CrossFit Box' | 'Strength & Conditioning' | 'Yoga & Pilates Studio';
  distanceKm: number;
  lat: number;
  lng: number;
  location: string;
  priceMonthly: number;
  freeTrialAvailable: boolean;
  imageUrl: string;
  amenities: string[];
  equipmentHighlights: string[];
  trainerCount: number;
  operatingHours: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  goal: string;
  currentWeightKg: number;
  targetWeightKg: number;
  planDurationWeeks: number;
  adherenceRate: number;
  assignedDietPlanId?: string;
  assignedWorkoutPlanId?: string;
  notesFromTrainer?: string;
  lastCheckIn: string;
}

export interface WorkoutDayPlan {
  dayName: string;
  focus: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    restSeconds: number;
    notes?: string;
  }[];
}

export interface DietMeal {
  mealType: 'Breakfast' | 'Morning Snack' | 'Lunch' | 'Pre-Workout' | 'Dinner';
  items: string[];
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
}

export interface CompletePlan {
  id: string;
  title: string;
  durationWeeks: number;
  goal: string;
  dailyCaloricTarget: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  weeklyWorkouts: WorkoutDayPlan[];
  dailyMeals: DietMeal[];
  tips: string[];
}

export interface ExerciseItem {
  id: string;
  title: string;
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Cardio & Mobility';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetMuscles: string[];
  secondaryMuscles?: string[];
  equipment: string;
  steps: string[];
  commonMistakes: string[];
  youtubeVideoId: string;
  thumbnailUrl: string;
}

export interface GymBuddyBeacon {
  id: string;
  userName: string;
  userAvatar: string;
  gymName: string;
  preferredTime: string;
  workoutSplit: 'Push Pull Legs' | 'Bro Split' | 'Full Body' | 'Cardio & Abs' | 'CrossFit / HIIT';
  fitnessGoal: string;
  experienceLevel: string;
  daysPerWeek: number;
  lookingFor: string;
  contactHandle: string;
}
