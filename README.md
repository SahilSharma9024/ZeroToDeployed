# 🏆 PulsePlay — Sports & Fitness Integrated Ecosystem
*HackSprint Prototype • React + TypeScript + Vite + Tailwind CSS + Lucide Icons*

A unified, modern web application designed with a sleek **white theme and pastel color palette** (`rose`, `lavender`, `purple`, `peach`, `light green`), soft shadows, and clean cards.

---

## 🚀 Quick Start

From the project root:

```bash
# 1. Install dependencies (if not already installed)
cd sports-fitness-app
npm install

# 2. Run the Vite development server
npm run dev
```

Or directly from `D:\HackSprint`:
```bash
npm run dev
```

Visit the local server link (e.g. `http://localhost:5173/`).

---

## 👥 Modular Team Architecture (2 Members per Module)

The codebase is strictly organized so 2 team members can work on **Sports** and 2 team members can work on **Fitness** without merge conflicts:

```
src/
├── types/
│   ├── sports.ts            <-- ⚽ Team Sports Types (Events, Turfs, Ghost Subs)
│   └── fitness.ts           <-- 🏋️ Team Fitness Types (Gyms, Trainers, Plans, Exercises)
├── data/
│   ├── sportsData.ts        <-- ⚽ Sports Datasets
│   ├── fitnessData.ts       <-- 🏋️ Fitness & Gym Datasets
│   └── exerciseDatabase.ts  <-- 🏋️ Rich Exercise Tutorials with YouTube Embeds
├── features/
│   ├── sports/              <-- ⚽ TEAM 1 (SPORTS MODULE)
│   │   ├── SportsDashboard.tsx
│   │   ├── EventCard.tsx
│   │   ├── TurfCard.tsx
│   │   ├── GhostSubSection.tsx    # SOS Ghost Sub & Squad Partner/Matchmaker
│   │   └── EventFilterBar.tsx     # Indoor/Outdoor & Sports Filters
│   └── fitness/             <-- 🏋️ TEAM 2 (FITNESS MODULE)
│       ├── FitnessDashboard.tsx
│       ├── GymFinderSection.tsx   # Top Rated Gyms & Free Trial Passes
│       ├── TrainerPortal.tsx      # Coach view: Prescribe diets & track clients
│       ├── ClientPortal.tsx       # Athlete view: Daily logs & assigned workouts
│       ├── HealthCalculators.tsx  # Interactive BMI, BMR (Mifflin-St Jeor), TDEE
│       ├── AiPersonalTrainer.tsx  # Dynamic AI Workout Split & Meal Planner
│       ├── GymBuddyFinder.tsx     # Gym Motivation Partner Matchmaker
│       └── ExerciseLibrary.tsx    # Step-by-Step guides & YouTube video modal
```

---

## ✨ Implemented Features

### 1. 🔄 Top-Level Sports & Fitness Mode Toggle
- Instant switch in the navigation bar between **Sports Arena** and **Fitness & Wellness**.

### 2. ⚡ 1-Click Smart Auto-Registration (Universal Athlete Passport)
- Single pre-filled athlete passport (Age, Gender, Height, Weight, Phone, Medical Waiver, Jersey Size, Emergency Contact).
- When clicking **Auto-Register** on any Event, Turf slot, or Gym Trial, all fields are auto-verified with green badges, and a **Digital QR Athlete Pass** is issued instantly with celebratory confetti!

### 3. 🚨 "Ghost Sub" & Sports Partner/Team Matchmaker
- Real-time SOS Beacons for missing players when someone cancels last minute.
- Tennis sparring partner finder & Box cricket squad builder.
- Schedule friendly squad matches against other teams.

### 4. 🏋️ Client & Trainer Portals
- **Trainer Mode**: View athlete roster, track compliance/adherence rates, prescribe customized nutrition and training splits, and leave coaching notes.
- **Client Mode**: View coach notes, log daily water intake, track morning weigh-in, and check off workout sessions.

### 5. 📍 High-Rated Gyms & Sports Turfs
- Filter between **Indoor and Outdoor** venues.
- Check amenities (FIFA astroturf, floodlights, sauna, power racks, cold plunge).
- 1-click booking / 3-day free gym trial pass.

### 6. 📊 Biometric Analytics Suite (BMI, BMR, TDEE)
- Visual BMI gauge with health categories (Underweight, Normal, Overweight, Obese).
- Clinical BMR calculation (Mifflin-St Jeor formula).
- TDEE expenditure multiplier with Fat Loss (-500 kcal) and Lean Bulk (+300 kcal) targets.
- Daily water and protein distribution calculator.
- 1-click sync from user profile.

### 7. 🤖 AI Personal Trainer
- Users pick duration (4, 8, 12 weeks), biometrics, goal (Fat Loss, Muscle Gain, Strength, Endurance), and diet (Veg / Non-Veg / Vegan).
- Synthesizes a personalized **Day-by-Day Training Split** and **Structured Daily Meal Plan** with exact calorie and macro distribution.

### 8. 🎥 Exercise Tutorials Video Academy
- Filterable by muscle group (Chest, Back, Legs, Shoulders, Arms, Core).
- Biomechanical execution steps and "Mistakes to Avoid" callouts.
- Embedded interactive YouTube video modal for real form demonstration.

### 9. 🤝 Gym Motivation Partner Finder
- Connect with workout buddies training on the same split (Push-Pull-Legs, Bro Split, CrossFit) during the same time window.

