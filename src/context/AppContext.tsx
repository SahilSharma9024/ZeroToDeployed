import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppMode, UserProfile, RegistrationPass, ThemeMode, ActivePage } from '../types';
import { SportsEvent, TurfVenue, GhostSubBeacon, MatchScheduleRequest } from '../types/sports';
import { ClientProfile, GymBuddyBeacon, GymVenue } from '../types/fitness';
import { INITIAL_USER, INITIAL_PASSES } from '../data/initialUserData';
import { INITIAL_EVENTS, INITIAL_TURFS, INITIAL_GHOST_SUBS, INITIAL_MATCH_REQUESTS } from '../data/sportsData';
import { INITIAL_GYMS, INITIAL_CLIENTS, INITIAL_GYM_BUDDIES } from '../data/fitnessData';
import confetti from 'canvas-confetti';

interface AutoRegisterTarget {
  id: string;
  type: 'event' | 'turf' | 'gym_pass';
  title: string;
  subtitle: string;
  venue: string;
  dateOrTime: string;
  cost: string;
  category: string;
  ageRequirement?: string;
}

interface AppContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  passes: RegistrationPass[];
  
  // Daily Streak
  incrementStreak: () => void;
  
  // Geolocation
  userLocation: { lat: number; lng: number } | null;
  requestUserLocation: () => void;
  isLocating: boolean;
  
  // Mobile UI & Sidebar Collapse
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapse: () => void;
  
  // Sports State
  events: SportsEvent[];
  turfs: TurfVenue[];
  ghostSubs: GhostSubBeacon[];
  matchRequests: MatchScheduleRequest[];
  addGhostSub: (beacon: Omit<GhostSubBeacon, 'id' | 'acceptedUsers'>) => void;
  acceptGhostSub: (beaconId: string) => void;
  addMatchRequest: (req: Omit<MatchScheduleRequest, 'id' | 'status'>) => void;
  
  // Fitness State
  gyms: GymVenue[];
  setGyms: React.Dispatch<React.SetStateAction<GymVenue[]>>;
  clients: ClientProfile[];
  gymBuddies: GymBuddyBeacon[];
  updateClientNotes: (clientId: string, notes: string) => void;
  assignPlanToClient: (clientId: string, dietPlanId: string, workoutPlanId: string) => void;
  addGymBuddy: (buddy: Omit<GymBuddyBeacon, 'id'>) => void;

  // Real-Time Venues & City Selector
  fetchVenues: (type?: 'all' | 'gym' | 'turf', lat?: number, lng?: number, city?: string) => Promise<void>;
  activeCity: string;
  setActiveCity: (city: string) => void;
  
  // Modals & Triggers
  autoRegisterTarget: AutoRegisterTarget | null;
  openAutoRegister: (target: AutoRegisterTarget) => void;
  closeAutoRegister: () => void;
  confirmAutoRegister: () => RegistrationPass;
  
  activeQrPass: RegistrationPass | null;
  setActiveQrPass: (pass: RegistrationPass | null) => void;
  
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;

  // Authentication State
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mode toggle: Sports or Fitness
  const [mode, setModeState] = useState<AppMode>('sports');

  // Authentication State
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('KinetiQ_token');
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Active page navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Desktop sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('KinetiQ_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('KinetiQ_sidebar_collapsed', JSON.stringify(next));
      return next;
    });
  };

  // Theme: light / dark
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('KinetiQ_theme');
    return (saved as ThemeMode) || 'light';
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('KinetiQ_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Sync auth profile on mount
  useEffect(() => {
    const token = localStorage.getItem('KinetiQ_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser((prev) => ({
              ...prev,
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              phone: data.user.phone || prev.phone,
              role: data.user.role || prev.role,
              age: data.user.age || prev.age,
              gender: data.user.gender || prev.gender,
              heightCm: data.user.height_cm || prev.heightCm,
              weightKg: data.user.weight_kg || prev.weightKg,
              fitnessGoal: data.user.fitness_goal || prev.fitnessGoal,
              bloodGroup: data.user.blood_group || prev.bloodGroup
            }));
          }
        })
        .catch(() => {});
    }
  }, [authToken]);

  const logout = () => {
    localStorage.removeItem('KinetiQ_token');
    localStorage.removeItem('KinetiQ_auth_user');
    setAuthToken(null);
    setUser(INITIAL_USER);
  };

  // Passes
  const [passes, setPasses] = useState<RegistrationPass[]>(() => {
    const saved = localStorage.getItem('KinetiQ_passes');
    return saved ? JSON.parse(saved) : INITIAL_PASSES;
  });

  // Load real passes from SQLite backend
  useEffect(() => {
    if (user?.id) {
      fetch(`/api/passes/my-passes/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.passes && data.passes.length > 0) {
            const mapped: RegistrationPass[] = data.passes.map((p: any) => ({
              id: p.id,
              type: p.category === 'fitness' ? 'gym_pass' : 'turf',
              title: p.title,
              category: p.category,
              date: p.event_date,
              time: 'Standard Slot',
              venue: p.venue_name,
              registeredAt: p.created_at ? p.created_at.split('T')[0] : '2026-10-27',
              ticketCode: p.ticket_code,
              athleteName: user.name,
              status: p.status,
              cost: p.cost,
            }));
            setPasses(mapped);
          }
        })
        .catch(() => {});
    }
  }, [user.id, authToken]);

  // Geolocation
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({
    lat: 17.3850, // default Hyderabad
    lng: 78.4867,
  });
  const [isLocating, setIsLocating] = useState(false);

  // Sports items
  const [events] = useState<SportsEvent[]>(INITIAL_EVENTS);
  const [turfs, setTurfs] = useState<TurfVenue[]>(INITIAL_TURFS);
  const [ghostSubs, setGhostSubs] = useState<GhostSubBeacon[]>(INITIAL_GHOST_SUBS);
  const [matchRequests, setMatchRequests] = useState<MatchScheduleRequest[]>(INITIAL_MATCH_REQUESTS);

  // Fitness items
  const [gyms, setGyms] = useState<GymVenue[]>(INITIAL_GYMS);
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [gymBuddies, setGymBuddies] = useState<GymBuddyBeacon[]>(INITIAL_GYM_BUDDIES);
  const [activeCity, setActiveCity] = useState<string>('Hyderabad');

  // Live Venues Fetcher from OpenStreetMap & SQLite
  const fetchVenues = async (type: 'all' | 'gym' | 'turf' = 'all', lat?: number, lng?: number, city?: string) => {
    const queryLat = lat ?? userLocation?.lat ?? 17.3850;
    const queryLng = lng ?? userLocation?.lng ?? 78.4867;
    try {
      const res = await fetch(`/api/venues?type=${type}&lat=${queryLat}&lng=${queryLng}&radius=12000`);
      const data = await res.json();
      if (data.venues && Array.isArray(data.venues) && data.venues.length > 0) {
        if (type === 'all' || type === 'gym') {
          const gymList = data.venues.filter((v: any) => v.type === 'gym');
          if (gymList.length > 0) {
            const mappedGyms: GymVenue[] = gymList.map((v: any, idx: number) => ({
              id: v.id || `gym-${idx}`,
              name: v.name,
              rating: v.rating || 4.7,
              reviewCount: 35 + ((idx * 11) % 65),
              category: (['Premium Gym', 'CrossFit Box', 'Strength & Conditioning', 'Yoga & Pilates Studio'] as const)[idx % 4],
              distanceKm: v.distanceKm || 1.2,
              lat: v.latitude,
              lng: v.longitude,
              location: v.address || 'Central Fitness Zone',
              priceMonthly: v.priceMonthly || (1999 + ((idx * 350) % 1500)),
              freeTrialAvailable: true,
              imageUrl: v.imageUrl || [
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
              ][idx % 4],
              amenities: v.amenities?.length ? v.amenities : ['Cardio Zone', 'Strength Equipment', 'Air Conditioned', 'Lockers'],
              equipmentHighlights: ['Olympic Barbells', 'Dumbbells up to 50kg', 'Power Racks', 'Cable Cross'],
              trainerCount: 4 + (idx % 3),
              operatingHours: '06:00 AM - 10:30 PM',
            }));
            setGyms(mappedGyms);
          }
        }

        if (type === 'all' || type === 'turf') {
          const turfList = data.venues.filter((v: any) => v.type === 'turf');
          if (turfList.length > 0) {
            const mappedTurfs: TurfVenue[] = turfList.map((v: any, idx: number) => ({
              id: v.id || `turf-${idx}`,
              name: v.name,
              sportsSupported: [v.sport || 'Football', 'Cricket'],
              venueType: v.isIndoor ? 'Indoor' : 'Outdoor',
              surfaceType: 'FIFA Grade Synthetic 50mm',
              rating: v.rating || 4.8,
              reviewCount: 42 + ((idx * 7) % 50),
              distanceKm: v.distanceKm || 1.5,
              lat: v.latitude,
              lng: v.longitude,
              location: v.address || 'Sports Park',
              pricePerHour: 900 + ((idx * 200) % 800),
              imageUrl: [
                'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
              ][idx % 3],
              amenities: v.amenities?.length ? v.amenities : ['LED Floodlights', 'Bibs & Balls', 'Dugouts', 'Changing Rooms'],
              availableSlotsToday: ['06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'],
              isInstantBooking: true,
            }));
            setTurfs(mappedTurfs);
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch live venues from /api/venues:', err);
    }
  };

  // Auto-fetch venues on mount
  useEffect(() => {
    fetchVenues('all');
  }, []);

  // Modals
  const [autoRegisterTarget, setAutoRegisterTarget] = useState<AutoRegisterTarget | null>(null);
  const [activeQrPass, setActiveQrPass] = useState<RegistrationPass | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Synchronize Dark Theme class on <html> document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('KinetiQ_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    setActivePage(newMode === 'sports' ? 'sports-overview' : 'fitness-overview');
  };

  useEffect(() => {
    localStorage.setItem('KinetiQ_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('KinetiQ_passes', JSON.stringify(passes));
  }, [passes]);

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Streak Action
  const incrementStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (user.lastCheckInDate === today) {
      alert(`Awesome! You've already checked in today. Your streak is ${user.streakDays} days! 🔥`);
      return;
    }

    const updatedStreak = user.streakDays + 1;
    updateUser({
      streakDays: updatedStreak,
      lastCheckInDate: today,
    });

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ef4444', '#eab308'],
      });
    } catch {}
  };

  // Real Geolocation
  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser. Using city coordinates.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setIsLocating(false);
        alert('Could not access live location. Using default city coordinates.');
      },
      { timeout: 8000 }
    );
  };

  const addGhostSub = (beacon: Omit<GhostSubBeacon, 'id' | 'acceptedUsers'>) => {
    const newBeacon: GhostSubBeacon = {
      ...beacon,
      id: `ghost_${Date.now()}`,
      acceptedUsers: [],
    };
    setGhostSubs((prev) => [newBeacon, ...prev]);
  };

  const acceptGhostSub = (beaconId: string) => {
    setGhostSubs((prev) =>
      prev.map((sub) => {
        if (sub.id === beaconId) {
          return {
            ...sub,
            acceptedUsers: [...sub.acceptedUsers, user.name],
            playersNeeded: Math.max(0, sub.playersNeeded - 1),
          };
        }
        return sub;
      })
    );
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  const addMatchRequest = (req: Omit<MatchScheduleRequest, 'id' | 'status'>) => {
    const newReq: MatchScheduleRequest = {
      ...req,
      id: `match_${Date.now()}`,
      status: 'Open',
    };
    setMatchRequests((prev) => [newReq, ...prev]);
  };

  const updateClientNotes = (clientId: string, notes: string) => {
    setClients((prev) =>
      prev.map((cl) => (cl.id === clientId ? { ...cl, notesFromTrainer: notes } : cl))
    );
  };

  const assignPlanToClient = (clientId: string, dietPlanId: string, workoutPlanId: string) => {
    setClients((prev) =>
      prev.map((cl) =>
        cl.id === clientId
          ? { ...cl, assignedDietPlanId: dietPlanId, assignedWorkoutPlanId: workoutPlanId }
          : cl
      )
    );
  };

  const addGymBuddy = (buddy: Omit<GymBuddyBeacon, 'id'>) => {
    const newBuddy: GymBuddyBeacon = {
      ...buddy,
      id: `buddy_${Date.now()}`,
    };
    setGymBuddies((prev) => [newBuddy, ...prev]);
  };

  const openAutoRegister = (target: AutoRegisterTarget) => {
    setAutoRegisterTarget(target);
  };

  const closeAutoRegister = () => {
    setAutoRegisterTarget(null);
  };

  const confirmAutoRegister = (): RegistrationPass => {
    if (!autoRegisterTarget) throw new Error('No target selected');

    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const cityCode = autoRegisterTarget.venue.toLowerCase().includes('hyderabad') ? 'HYD' : 'BLR';
    const ticketCode = `KTX-2026-${cityCode}-${randomHex}`;

    const newPass: RegistrationPass = {
      id: `pass_${Date.now()}`,
      type: autoRegisterTarget.type,
      title: autoRegisterTarget.title,
      category: autoRegisterTarget.category,
      date: autoRegisterTarget.dateOrTime,
      time: 'Standard Slot',
      venue: autoRegisterTarget.venue,
      registeredAt: new Date().toISOString().split('T')[0],
      ticketCode,
      athleteName: user.name,
      status: 'Confirmed',
      cost: autoRegisterTarget.cost,
    };

    setPasses((prev) => [newPass, ...prev]);

    // Commit pass to SQLite backend
    fetch('/api/passes/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id || 'usr-aarav-demo',
        venueName: autoRegisterTarget.venue,
        category: autoRegisterTarget.type === 'gym_pass' ? 'fitness' : 'sports',
        title: autoRegisterTarget.title,
        cost: autoRegisterTarget.cost
      })
    }).catch(() => {});

    setAutoRegisterTarget(null);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#c084fc', '#86efac', '#38bdf8', '#fde047'],
      });
    } catch {}

    return newPass;
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        activePage,
        setActivePage,
        theme,
        toggleTheme,
        user,
        updateUser,
        passes,
        incrementStreak,
        userLocation,
        requestUserLocation,
        isLocating,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebarCollapse,
        events,
        turfs,
        ghostSubs,
        matchRequests,
        addGhostSub,
        acceptGhostSub,
        addMatchRequest,
        gyms,
        setGyms,
        clients,
        gymBuddies,
        updateClientNotes,
        assignPlanToClient,
        addGymBuddy,
        fetchVenues,
        activeCity,
        setActiveCity,
        autoRegisterTarget,
        openAutoRegister,
        closeAutoRegister,
        confirmAutoRegister,
        activeQrPass,
        setActiveQrPass,
        isProfileOpen,
        setIsProfileOpen,
        authToken,
        setAuthToken,
        isAuthOpen,
        setIsAuthOpen,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
