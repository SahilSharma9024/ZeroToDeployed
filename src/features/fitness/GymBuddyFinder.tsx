import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GymBuddyBeacon } from '../../types/fitness';
import { Users, PlusCircle, MapPin, Clock, Dumbbell, MessageCircle, Check, Sparkles } from 'lucide-react';

export const GymBuddyFinder: React.FC = () => {
  const { gymBuddies, addGymBuddy, user } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  // New buddy form
  const [gymName, setGymName] = useState('IronForge Barbell Club');
  const [preferredTime, setPreferredTime] = useState('06:30 AM - 08:00 AM');
  const [workoutSplit, setWorkoutSplit] = useState<GymBuddyBeacon['workoutSplit']>('Push Pull Legs');
  const [fitnessGoal, setFitnessGoal] = useState('Strength & Progressive Overload');
  const [lookingFor, setLookingFor] = useState('Spotter for heavy compound lifts & daily accountability');
  const [contactHandle, setContactHandle] = useState('@aarav_lifts');

  const handleConnect = (id: string) => {
    if (!connectedIds.includes(id)) {
      setConnectedIds([...connectedIds, id]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addGymBuddy({
      userName: user.name,
      userAvatar: user.avatar,
      gymName,
      preferredTime,
      workoutSplit,
      fitnessGoal,
      experienceLevel: user.experienceLevel,
      daysPerWeek: 5,
      lookingFor,
      contactHandle,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-rose-50 rounded-3xl p-6 border border-indigo-100 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-soft flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Accountability Matchmaker
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
              Zero Skipped Days
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Find Your Gym Motivation Partner & Spotter
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Never skip a workout again. Pair up with athletes hitting the same gym, training on your split, and pushing for similar hypertrophy or fat loss goals.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          Post Gym Buddy Beacon
        </button>
      </div>

      {/* Grid of Buddies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gymBuddies.map((buddy) => {
          const isConnected = connectedIds.includes(buddy.id);

          return (
            <div
              key={buddy.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-center gap-3">
                  <img
                    src={buddy.userAvatar}
                    alt={buddy.userName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{buddy.userName}</h3>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {buddy.workoutSplit}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{buddy.gymName}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>{buddy.preferredTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Goal: <strong>{buddy.fitnessGoal}</strong></span>
                  </div>
                </div>

                {/* What they are looking for */}
                <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed italic">
                  "{buddy.lookingFor}"
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  {buddy.contactHandle}
                </span>

                {isConnected ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Connected!
                  </span>
                ) : (
                  <button
                    onClick={() => handleConnect(buddy.id)}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to Post Beacon */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Find a Gym Motivation Partner
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Gym / Club</label>
                <input
                  type="text"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Preferred Gym Slot</label>
                <input
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Workout Split</label>
                  <select
                    value={workoutSplit}
                    onChange={(e) => setWorkoutSplit(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="Push Pull Legs">Push Pull Legs</option>
                    <option value="Bro Split">Bro Split</option>
                    <option value="Full Body">Full Body</option>
                    <option value="CrossFit / HIIT">CrossFit / HIIT</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Social / Contact Tag</label>
                  <input
                    type="text"
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">What are you looking for?</label>
                <textarea
                  rows={2}
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Publish Beacon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

