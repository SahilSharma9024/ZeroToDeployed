import { GymVenue, ClientProfile, GymBuddyBeacon, CompletePlan } from '../types/fitness';

export const INITIAL_GYMS: GymVenue[] = [
  {
    id: 'gym_1',
    name: 'IronForge Barbell & Strength Club',
    rating: 4.9,
    reviewCount: 520,
    category: 'Strength & Conditioning',
    distanceKm: 1.2,
    location: 'Koramangala 4th Block, 80ft Rd',
    priceMonthly: 2800,
    freeTrialAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    amenities: ['Eleiko Olympic Plates', '6 Power Racks & Deadlift Platforms', 'Chalk Allowed', 'Dumbbells up to 60kg', 'Cold Plunge & Sauna'],
    equipmentHighlights: ['Hammer Strength Iso-Lateral', 'Concept2 Rowers & SkiErgs', 'Belt Squat Machine'],
    trainerCount: 8,
    operatingHours: '05:30 AM - 11:00 PM'
  },
  {
    id: 'gym_2',
    name: 'Aura Pilates & Movement Sanctuary',
    rating: 4.9,
    reviewCount: 380,
    category: 'Yoga & Pilates Studio',
    distanceKm: 2.1,
    location: 'Indiranagar 12th Main',
    priceMonthly: 3500,
    freeTrialAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    amenities: ['Reformer Pilates Beds', 'Aerial Yoga Silks', 'Infrared Sauna', 'Detox Smoothie Bar', 'Showers with Dyson Dryers'],
    equipmentHighlights: ['Balanced Body Studio Reformers', 'Cadillac & Wunda Chairs'],
    trainerCount: 6,
    operatingHours: '06:30 AM - 09:00 PM'
  },
  {
    id: 'gym_3',
    name: 'Velocity CrossFit & Functional Arena',
    rating: 4.8,
    reviewCount: 410,
    category: 'CrossFit Box',
    distanceKm: 3.4,
    location: 'HSR Layout Sector 3',
    priceMonthly: 3200,
    freeTrialAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    amenities: ['Rogue Rig 50ft', 'Gymnastic Rings & Pegboards', 'Air Bikes & Sled Tracks', 'Shower Facilities', 'Community WODs'],
    equipmentHighlights: ['Assault Fitness Echo Bikes', 'Bumper Plates & Competition KBs'],
    trainerCount: 5,
    operatingHours: '06:00 AM - 10:00 PM'
  },
  {
    id: 'gym_4',
    name: 'Olympus Health & Wellness Complex',
    rating: 4.7,
    reviewCount: 650,
    category: 'Premium Gym',
    distanceKm: 2.8,
    location: 'Koramangala 7th Block',
    priceMonthly: 2400,
    freeTrialAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    amenities: ['Heated Indoor Swimming Pool', 'Steam Room & Jacuzzi', 'Spinning Studio', 'Dedicated Stretching Zone', 'Free Valet Parking'],
    equipmentHighlights: ['Technogym BioDrive Machines', 'Cardio Deck with Netflix Screens'],
    trainerCount: 12,
    operatingHours: '24/7 Access'
  }
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'cl_1',
    name: 'Riya Sen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    age: 26,
    goal: 'Fat Loss & Athletic Conditioning',
    currentWeightKg: 64.2,
    targetWeightKg: 58.0,
    planDurationWeeks: 8,
    adherenceRate: 92,
    assignedDietPlanId: 'diet_fatloss_1',
    assignedWorkoutPlanId: 'workout_upperlower_1',
    notesFromTrainer: 'Great consistency on macros this week! Increased incline walking to 20 mins post workout.',
    lastCheckIn: 'Today, 08:30 AM'
  },
  {
    id: 'cl_2',
    name: 'Karan Varma',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    age: 29,
    goal: 'Hypertrophy & Lean Bulk',
    currentWeightKg: 71.0,
    targetWeightKg: 76.0,
    planDurationWeeks: 12,
    adherenceRate: 85,
    assignedDietPlanId: 'diet_hypertrophy_1',
    assignedWorkoutPlanId: 'workout_ppl_1',
    notesFromTrainer: 'Bench press progressive overload reached 80kg x 6 reps. Increase carbs by 30g on leg day.',
    lastCheckIn: 'Yesterday'
  },
  {
    id: 'cl_3',
    name: 'Ananya Gupta',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    age: 32,
    goal: 'Postural Rehabilitation & Core Strength',
    currentWeightKg: 59.5,
    targetWeightKg: 57.0,
    planDurationWeeks: 6,
    adherenceRate: 96,
    assignedDietPlanId: 'diet_clean_maintenance_1',
    assignedWorkoutPlanId: 'workout_core_mobility_1',
    notesFromTrainer: 'Lumbar stability exercises showed zero back pain this week. Ready to add goblet squats.',
    lastCheckIn: '2 days ago'
  }
];

export const INITIAL_GYM_BUDDIES: GymBuddyBeacon[] = [
  {
    id: 'buddy_1',
    userName: 'Sameer Joshi',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    gymName: 'IronForge Barbell Club, Koramangala',
    preferredTime: '06:30 AM - 08:00 AM (Mon - Fri)',
    workoutSplit: 'Push Pull Legs',
    fitnessGoal: 'Hypertrophy & Powerbuilding',
    experienceLevel: 'Intermediate (2+ yrs)',
    daysPerWeek: 5,
    lookingFor: 'A spotter for heavy bench & squats, keeps each other accountable for early morning sessions.',
    contactHandle: '@sameer_lifts'
  },
  {
    id: 'buddy_2',
    userName: 'Pooja Hegde',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    gymName: 'Velocity CrossFit, HSR',
    preferredTime: '06:00 PM - 07:15 PM',
    workoutSplit: 'CrossFit / HIIT',
    fitnessGoal: 'Cardiovascular Endurance & Toning',
    experienceLevel: 'Beginner / Friendly',
    daysPerWeek: 4,
    lookingFor: 'A buddy to partner up for CrossFit WODs and weekend outdoor running trails.',
    contactHandle: '@pooja_runs'
  },
  {
    id: 'buddy_3',
    userName: 'Arjun Nambiar',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    gymName: 'Olympus Health Club',
    preferredTime: '08:00 PM - 09:30 PM',
    workoutSplit: 'Bro Split',
    fitnessGoal: 'Weight Loss & Healthy Habits',
    experienceLevel: 'Beginner',
    daysPerWeek: 4,
    lookingFor: 'Someone who struggles with post-work gym laziness like me so we motivate each other to never skip!',
    contactHandle: '@arjun_fitlife'
  }
];

export const PRESET_SAMPLE_PLANS: Record<string, CompletePlan> = {
  fat_loss: {
    id: 'sample_fat_loss',
    title: '8-Week High-Metabolic Shred & Sculpt',
    durationWeeks: 8,
    goal: 'Fat Loss & Lean Muscle Definition',
    dailyCaloricTarget: 1950,
    macros: { protein: 160, carbs: 175, fats: 55 },
    weeklyWorkouts: [
      {
        dayName: 'Day 1: Upper Body Push & HIIT',
        focus: 'Chest, Shoulders, Triceps, 12m Metabolic Finisher',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', restSeconds: 60, notes: 'Focus on 3-second eccentric stretch' },
          { name: 'Standing Overhead Barbell Press', sets: 3, reps: '8-10', restSeconds: 75 },
          { name: 'Cable Lateral Raises', sets: 4, reps: '12-15', restSeconds: 45 },
          { name: 'Dual Rope Tricep Extensions', sets: 3, reps: '12-15', restSeconds: 45 },
          { name: 'Assault Bike Sprint Intervals', sets: 6, reps: '20s ON / 40s OFF', restSeconds: 40 }
        ]
      },
      {
        dayName: 'Day 2: Lower Body Quad & Glute Focus',
        focus: 'Barbell Squats, Lunges & Hamstring Curls',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Maintain neutral spine, deep parallel' },
          { name: 'Romanian Dumbbell Deadlifts', sets: 4, reps: '10-12', restSeconds: 75 },
          { name: 'Walking Dumbbell Lunges', sets: 3, reps: '12 steps/leg', restSeconds: 60 },
          { name: 'Seated Calf Raises', sets: 4, reps: '15-20', restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 3: Rest & Active Recovery',
        focus: '7,000 brisk steps & foam rolling',
        exercises: [
          { name: 'Zone 2 Outdoor Walk', sets: 1, reps: '40 mins', restSeconds: 0 },
          { name: 'Full Body Mobility Routine', sets: 1, reps: '15 mins', restSeconds: 0 }
        ]
      },
      {
        dayName: 'Day 4: Upper Body Pull & Core',
        focus: 'Lats, Rhomboids, Biceps & Hanging Knee Raises',
        exercises: [
          { name: 'Wide Grip Lat Pulldown', sets: 4, reps: '10-12', restSeconds: 60 },
          { name: 'Chest Supported Dumbbell Rows', sets: 4, reps: '10-12', restSeconds: 60 },
          { name: 'Face Pulls with External Rotation', sets: 3, reps: '15', restSeconds: 45 },
          { name: 'Incline Dumbbell Bicep Curls', sets: 3, reps: '12', restSeconds: 45 },
          { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', restSeconds: 45 }
        ]
      }
    ],
    dailyMeals: [
      {
        mealType: 'Breakfast',
        items: ['3 Whole Eggs Scramble with spinach & cherry tomatoes', '2 slices Multigrain Sourdough toast', 'Black Coffee or Green Tea'],
        calories: 460,
        proteinGrams: 28,
        carbsGrams: 36,
        fatsGrams: 22
      },
      {
        mealType: 'Lunch',
        items: ['Grilled Herb Chicken Breast or Pan-Seared Paneer (150g)', '1 Cup Brown Basmati Rice', 'Steamed Broccoli, Carrots & Zucchini Bowl with Olive Oil dressing'],
        calories: 550,
        proteinGrams: 42,
        carbsGrams: 58,
        fatsGrams: 14
      },
      {
        mealType: 'Pre-Workout',
        items: ['1 Banana with 1 tbsp Natural Peanut Butter', '1 Scoop Whey Protein with Water'],
        calories: 320,
        proteinGrams: 27,
        carbsGrams: 35,
        fatsGrams: 8
      },
      {
        mealType: 'Dinner',
        items: ['Grilled Fish Fillet or Tofu Stir-Fry (180g)', 'Large mixed leafy green salad with apple cider vinaigrette', 'Small baked sweet potato'],
        calories: 480,
        proteinGrams: 38,
        carbsGrams: 42,
        fatsGrams: 12
      }
    ],
    tips: [
      'Drink at least 3.5 Liters of water daily to maintain metabolic efficiency.',
      'Aim for 8,000 to 10,000 total daily steps outside the gym.',
      'Sleep 7.5 - 8 hours: growth hormone and fat oxidation peak during stage 3 & REM sleep.'
    ]
  }
};

