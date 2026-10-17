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
  clients: ClientProfile[];
  gymBuddies: GymBuddyBeacon[];
  updateClientNotes: (clientId: string, notes: string) => void;
  assignPlanToClient: (clientId: string, dietPlanId: string, workoutPlanId: string) => void;
  addGymBuddy: (buddy: Omit<GymBuddyBeacon, 'id'>) => void;
  
  // Modals & Triggers
  autoRegisterTarget: AutoRegisterTarget | null;
  openAutoRegister: (target: AutoRegisterTarget) => void;
  closeAutoRegister: () => void;
  confirmAutoRegister: () => RegistrationPass;
  
  activeQrPass: RegistrationPass | null;
  setActiveQrPass: (pass: RegistrationPass | null) => void;
  
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mode toggle: Sports or Fitness
  const [mode, setModeState] = useState<AppMode>('sports');

  // Active page navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Desktop sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('kinetix_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('kinetix_sidebar_collapsed', JSON.stringify(next));
      return next;
    });
  };

  // Theme: light / dark
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('kinetix_theme');
    return (saved as ThemeMode) || 'light';
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('kinetix_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Passes
  const [passes, setPasses] = useState<RegistrationPass[]>(() => {
    const saved = localStorage.getItem('kinetix_passes');
    return saved ? JSON.parse(saved) : INITIAL_PASSES;
  });

  // Geolocation
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({
    lat: 12.9345, // default Koramangala, Bengaluru
    lng: 77.6265,
  });
  const [isLocating, setIsLocating] = useState(false);

  // Sports items
  const [events] = useState<SportsEvent[]>(INITIAL_EVENTS);
  const [turfs] = useState<TurfVenue[]>(INITIAL_TURFS);
  const [ghostSubs, setGhostSubs] = useState<GhostSubBeacon[]>(INITIAL_GHOST_SUBS);
  const [matchRequests, setMatchRequests] = useState<MatchScheduleRequest[]>(INITIAL_MATCH_REQUESTS);

  // Fitness items
  const [gyms] = useState<GymVenue[]>(INITIAL_GYMS);
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [gymBuddies, setGymBuddies] = useState<GymBuddyBeacon[]>(INITIAL_GYM_BUDDIES);

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
    localStorage.setItem('kinetix_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    // When switching mode, change active page to that mode's overview
    setActivePage(newMode === 'sports' ? 'sports-overview' : 'fitness-overview');
  };

  useEffect(() => {
    localStorage.setItem('kinetix_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kinetix_passes', JSON.stringify(passes));
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
      alert('Geolocation is not supported by your browser. Using Bangalore coordinates.');
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

    const newPass: RegistrationPass = {
      id: `pass_${Date.now()}`,
      type: autoRegisterTarget.type,
      title: autoRegisterTarget.title,
      category: autoRegisterTarget.category,
      date: autoRegisterTarget.dateOrTime,
      time: 'Standard Slot',
      venue: autoRegisterTarget.venue,
      registeredAt: new Date().toISOString().split('T')[0],
      ticketCode: `KNX-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      athleteName: user.name,
      status: 'Confirmed',
      cost: autoRegisterTarget.cost,
    };

    setPasses((prev) => [newPass, ...prev]);
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
        clients,
        gymBuddies,
        updateClientNotes,
        assignPlanToClient,
        addGymBuddy,
        autoRegisterTarget,
        openAutoRegister,
        closeAutoRegister,
        confirmAutoRegister,
        activeQrPass,
        setActiveQrPass,
        isProfileOpen,
        setIsProfileOpen,
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
