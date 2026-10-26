import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { AutoRegisterModal } from './components/common/AutoRegisterModal';
import { QrPassModal } from './components/common/QrPassModal';
import { ProfileModal } from './components/common/ProfileModal';
import { AuthModal } from './components/common/AuthModal';
import { VenueMap } from './components/common/VenueMap';

// Feature Pages
import { HomePage } from './features/home/HomePage';
import { SportsDashboard } from './features/sports/SportsDashboard';
import { GhostSubSection } from './features/sports/GhostSubSection';
import { FitnessDashboard } from './features/fitness/FitnessDashboard';
import { GymFinderSection } from './features/fitness/GymFinderSection';
import { TrainerPortal } from './features/fitness/TrainerPortal';
import { ClientPortal } from './features/fitness/ClientPortal';
import { HealthCalculators } from './features/fitness/HealthCalculators';
import { AiPersonalTrainer } from './features/fitness/AiPersonalTrainer';
import { GymBuddyFinder } from './features/fitness/GymBuddyFinder';
import { ExerciseLibrary } from './features/fitness/ExerciseLibrary';
import { PassesPage } from './features/passes/PassesPage';
import { VirtualGymPage } from './features/virtualGym/VirtualGymPage';

const MainLayout: React.FC = () => {
  const { activePage, user } = useApp();

  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;

      // Sports Views
      case 'sports-overview':
        return <SportsDashboard initialSubTab="events" />;
      case 'sports-events':
        return <SportsDashboard initialSubTab="events" />;
      case 'sports-turfs':
        return <SportsDashboard initialSubTab="turfs" />;
      case 'sports-map':
        return <VenueMap type="sports" />;
      case 'sports-ghost':
        return <GhostSubSection />;
      case 'sports-passes':
        return <PassesPage filterCategory="sports" />;

      // Fitness Views
      case 'fitness-overview':
        return <FitnessDashboard initialSubTab="gyms" />;
      case 'fitness-gyms':
        return <GymFinderSection />;
      case 'fitness-map':
        return <VenueMap type="fitness" />;
      case 'fitness-calculators':
        return <HealthCalculators />;
      case 'fitness-ai':
        return <AiPersonalTrainer />;
      case 'fitness-portal':
        return user.role === 'trainer' ? <TrainerPortal /> : <ClientPortal />;
      case 'fitness-buddy':
        return <GymBuddyFinder />;
      case 'fitness-exercises':
        return <ExerciseLibrary />;
      case 'fitness-passes':
        return <PassesPage filterCategory="fitness" />;

      // Gamified Virtual Gym RPG View
      case 'virtual-gym':
        return <VirtualGymPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="h-screen bg-[#EDF2F7] dark:bg-[#0A0E17] text-slate-900 dark:text-slate-100 flex overflow-hidden transition-colors duration-200">
      
      {/* Persistent Left Sidebar Panel */}
      <Sidebar />

      {/* Main Right Content Area (Only this scrolls) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Multi-Page Router View */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
          {renderActiveView()}
        </main>

        {/* Improved Footer */}
        <Footer />
      </div>

      {/* Global Interactive Modals */}
      <AutoRegisterModal />
      <QrPassModal />
      <ProfileModal />
      <AuthModal />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
