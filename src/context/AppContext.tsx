import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppMode, UserProfile, RegistrationPass } from '../types';
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
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  passes: RegistrationPass[];
  
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
  const [mode, setMode] = useState<AppMode>('sports');

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('pulseplay_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Passes
  const [passes, setPasses] = useState<RegistrationPass[]>(() => {
    const saved = localStorage.getItem('pulseplay_passes');
    return saved ? JSON.parse(saved) : INITIAL_PASSES;
  });

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

  useEffect(() => {
    localStorage.setItem('pulseplay_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pulseplay_passes', JSON.stringify(passes));
  }, [passes]);

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
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
    } catch {
      // ignore
    }
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
      ticketCode: `PP-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      athleteName: user.name,
      status: 'Confirmed',
      cost: autoRegisterTarget.cost,
    };

    setPasses((prev) => [newPass, ...prev]);
    setAutoRegisterTarget(null);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#c084fc', '#86efac', '#38bdf8', '#fde047'],
      });
    } catch {
      // ignore
    }

    return newPass;
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        user,
        updateUser,
        passes,
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

