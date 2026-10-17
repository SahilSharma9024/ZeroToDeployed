# ⚡ KINETIQ — Athletic Intelligence & Sports Operating System
*A unified, multi-page platform bridging amateur sports tournaments, turf venues, elite gyms, and AI-powered athletic training.*

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

---

## 📖 Overview

**KinetiQ** is a full-featured, production-ready web application engineered for both grassroots athletes and fitness enthusiasts. It harmonizes two complementary athletic domains—**Sports Arena** and **Fitness & Wellness**—under a single, cohesive operating system.

Built with a sleek white/dark theme, modern pastel color system (`rose`, `lavender`, `purple`, `peach`, `emerald`, `sky`), soft elevation cards, and a formal geometric identity, KinetiQ delivers a structured and frictionless user experience across desktop, tablet, and mobile.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn / pnpm

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ZeroToDeployed.git
cd ZeroToDeployed

# 2. Install dependencies
npm install

# 3. Launch the Vite development server
npm run dev
```

Open your browser at `http://localhost:5173/` (or the port specified by Vite).

### Production Build & Verification

```bash
npm run build
npm run preview
```

---

## 🏛️ Application Architecture & Project Structure

The project is architected with clear domain boundaries, modular feature folders, and a centralized application state context with local storage persistence:

```
ZeroToDeployed/
├── public/                  # Static assets and favicons
├── src/
│   ├── components/
│   │   └── common/          # Global UI infrastructure
│   │       ├── AutoRegisterModal.tsx  # 1-Click passport auto-fill modal
│   │       ├── Footer.tsx             # Semantic footer with site map
│   │       ├── Logo.tsx               # Geometric KinetiQ vector mark & badge
│   │       ├── Navbar.tsx             # Domain switcher, pass counter, profile flyout
│   │       ├── ProfileModal.tsx       # Personal details, biometrics, units & phone codes
│   │       ├── QrPassModal.tsx        # Viewport-constrained scannable QR ticket
│   │       └── Sidebar.tsx            # Pinned collapsable sidebar (Ctrl+B)
│   ├── context/
│   │   └── AppContext.tsx   # Centralized state, theme, passes, roles, and storage
│   ├── data/
│   │   ├── exerciseDatabase.ts  # Rich tutorials with step guides and YouTube embeds
│   │   ├── fitnessData.ts       # Gyms, coach rosters, client prescriptions
│   │   ├── initialUserData.ts   # Default athlete biometrics and contact info
│   │   └── sportsData.ts        # Tournaments, turfs, and SOS beacons
│   ├── features/
│   │   ├── fitness/         # 🏋️ FITNESS & WELLNESS MODULE
│   │   │   ├── AiPersonalTrainer.tsx   # Goal-based split & macro generator
│   │   │   ├── ClientPortal.tsx        # Athlete daily log, water, and workout splits
│   │   │   ├── ExerciseLibrary.tsx     # Biomechanical form academy & video modal
│   │   │   ├── GymBuddyFinder.tsx      # Workout split & schedule partner matching
│   │   │   ├── GymFinderSection.tsx    # High-rated gyms & 1-click free trial passes
│   │   │   ├── HealthCalculators.tsx   # BMI gauge, clinical BMR, TDEE multipliers
│   │   │   └── TrainerPortal.tsx       # Coach client roster & prescription writer
│   │   ├── home/            # 🏠 UNIFIED COMMAND CENTER
│   │   │   └── HomePage.tsx            # High-level overview, quick actions, stats
│   │   ├── map/             # 🗺️ INTERACTIVE VENUE MAP
│   │   │   └── VenueMap.tsx            # Leaflet map with live GPS & radius filters
│   │   ├── passes/          # 🎟️ PASS WALLET
│   │   │   └── PassesPage.tsx          # Ticket management & QR inspection
│   │   ├── sports/          # ⚽ SPORTS ARENA MODULE
│   │   │   ├── EventCard.tsx           # Tournament card with auto-fill trigger
│   │   │   ├── EventFilterBar.tsx      # Indoor/outdoor & sports category filters
│   │   │   ├── GhostSubSection.tsx     # SOS Ghost Sub & Squad matchmaker
│   │   │   ├── SportsEventsPage.tsx    # Dedicated tournament listings
│   │   │   ├── SportsTurfsPage.tsx     # Turf & arena directory
│   │   │   └── TurfCard.tsx            # Turf slot booking & amenities
│   │   └── virtualGym/      # 🎮 VIRTUAL GYM 3D RPG
│   │       ├── AvatarCustomizer.tsx    # Character customization & gear loadouts
│   │       ├── AvatarRenderer.tsx      # 2D/3D visual canvas avatar
│   │       └── VirtualGymPage.tsx      # Gamified XP, rep counter & quest rewards
│   └── types/
│       ├── fitness.ts       # Strong TypeScript interfaces for gyms and coaches
│       ├── index.ts         # Navigation and shared application types
│       └── sports.ts        # Strong TypeScript interfaces for tournaments and turfs
├── index.html               # Entry HTML with custom SVG favicon and web fonts
├── package.json             # Project dependencies and npm scripts
├── tailwind.config.js       # Custom pastel theme and typography configuration
├── tsconfig.json            # Strict TypeScript configuration
└── vite.config.ts           # Vite build tooling and plugins
```

---

## 🌟 Core Features & Capabilities

### 1. 🔄 Multi-Page Domain Switcher
- Seamless toggle in the top bar between **Sports Arena** and **Fitness & Wellness**.
- Automatically adapts the sidebar navigation and content scope while preserving user state.

### 2. 📌 Fixed Navigation Sidebar with Keyboard Shortcut
- Desktop collapsable sidebar with `Ctrl+B` / `Cmd+B` keyboard toggle.
- Pinned to the left viewport while only the main right content panel scrolls independently.
- Colorful pastel icon tiles for rapid cognitive scanning.
- Single, authoritative Home navigation via clickable brand header.

### 3. 👤 Athlete Profile, Biometrics & International Standards
- **Metric ↔ Imperial Unit Exchange**: 1-click conversion between kilograms / pounds and centimeters / inches.
- **International Country Codes**: Dropdown support for `+91` (IN), `+1` (US/CA), `+44` (UK), `+61` (AU), `+971` (UAE), etc.
- **Account Persona Toggle**: Quick switch between **Athlete** and **Coach/Trainer** roles.
- **Safety Data**: Blood group, emergency guardian contact, and verified medical clearance waiver.

### 4. 🌙 Appearance & Dark Mode Support
- Clean dark/light theme toggle nested neatly inside the profile dropdown menu.
- Persisted automatically to `localStorage` across user sessions.

### 5. ⚡ 1-Click Smart Auto-Registration (Universal Athlete Passport)
- Universal pre-population of age, category, medical waivers, jersey size, and contact details.
- Confetti celebration upon registration with immediate generation of a digital access pass.

### 6. 🎟️ Viewport-Constrained QR Pass Modal & Pass Wallet
- Digital scannable QR ticket modal constrained to 88vh with internal scrolling.
- Closes seamlessly via:
  - Top header `X` icon
  - Bottom action bar **"Close"** button
  - Clicking the backdrop overlay
  - Keyboard **Escape (`Esc`)** key
- One-click PDF download and shareable link generator.

### 7. 🚨 "Ghost Sub" & Squad Matchmaking
- **SOS Beacons**: Real-time broadcast for missing teammates when someone cancels last minute.
- **Sparring Partner Finder**: Connect with players of similar skill level for tennis, badminton, and squash.
- **Box Cricket & Turf Squad Builder**: Schedule friendly weekend fixtures against rival squads.

### 8. 🗺️ Geolocation-Based Interactive Venue Map
- Integrated Leaflet map utilizing the browser's Geolocation API.
- Live distance calculation, custom map markers, radius search (5km, 10km, 25km), and venue amenity filters (FIFA astroturf, indoor AC, floodlights).

### 9. 🏋️ Coach Client HQ & Athlete Portals
- **Trainer View**: Manage client rosters, track workout compliance, prescribe tailored nutrition and exercise splits, and provide feedback.
- **Client View**: Log daily hydration, morning weigh-ins, track active streaks, and check off completed sets.

### 10. 📊 Biometric Analytics Suite
- **Visual BMI Gauge**: Instant health classification (Underweight, Normal, Overweight, Obese).
- **Clinical BMR Engine**: Formulated using the Mifflin-St Jeor equation.
- **TDEE & Caloric Targeter**: Activity multipliers with auto-calculated targets for Fat Loss (-500 kcal) and Lean Bulk (+300 kcal).

### 11. 🤖 AI Personal Trainer
- Synthesizes personalized multi-week training splits and structured meal plans based on athlete duration, fitness goals, and dietary choices (Veg, Non-Veg, Vegan).

### 12. 🎥 Exercise Tutorials Video Academy
- Comprehensive exercise library filtered by target muscle groups (Chest, Back, Legs, Shoulders, Arms, Core).
- Step-by-step biomechanical execution instructions and common mistakes callouts with embedded YouTube video players.

### 13. 🎮 Virtual Gym 3D Avatar RPG
- Gamified fitness progression: customize your avatar (skin, haircut, athletic gear), earn XP through workouts, level up, and unlock training badges.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI Component Architecture |
| **TypeScript** | Strict Type Safety & Domain Modeling |
| **Vite** | Fast Next-Gen Frontend Tooling |
| **Tailwind CSS** | Custom Design System, Pastel Colorways & Dark Mode |
| **Lucide React** | Clean, Modern Iconography |
| **Leaflet & React-Leaflet** | Interactive Venue Map & Geolocation |
| **Canvas Confetti** | Visual Feedback for Athlete Registrations |

---