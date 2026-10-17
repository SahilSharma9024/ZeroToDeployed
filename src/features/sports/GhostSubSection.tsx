import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GhostSubBeacon, SportType } from '../../types/sports';
import { Users, AlertCircle, PlusCircle, Clock, MapPin, Check, Send, Sparkles, Trophy } from 'lucide-react';

export const GhostSubSection: React.FC = () => {
  const { ghostSubs, acceptGhostSub, addGhostSub, user, matchRequests, addMatchRequest } = useApp();
  
  const [filterType, setFilterType] = useState<'all' | 'subs' | 'partners'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  // New beacon form state
  const [newTitle, setNewTitle] = useState('');
  const [newSport, setNewSport] = useState<SportType>('Football');
  const [newVenue, setNewVenue] = useState('KickOff Arena, Indiranagar');
  const [newTime, setNewTime] = useState('Today • 07:30 PM');
  const [newPlayersNeeded, setNewPlayersNeeded] = useState(1);
  const [newRole, setNewRole] = useState('Any Player / Forward');
  const [newCost, setNewCost] = useState(150);
  const [newDescription, setNewDescription] = useState('');
  const [isPartnerReq, setIsPartnerReq] = useState(false);

  // Match scheduler form
  const [teamName, setTeamName] = useState('Bangalore Rebels');
  const [matchSport, setMatchSport] = useState<SportType>('Football');
  const [matchDate, setMatchDate] = useState('2026-10-28');
  const [matchNotes, setMatchNotes] = useState('Looking for 5v5 friendly against intermediate squad');

  const filteredSubs = ghostSubs.filter((sub) => {
    if (filterType === 'subs') return !sub.isPartnerFinder;
    if (filterType === 'partners') return sub.isPartnerFinder;
    return true;
  });

  const handleCreateBeacon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addGhostSub({
      title: newTitle,
      sport: newSport,
      venue: newVenue,
      venueType: 'Outdoor',
      scheduledTime: newTime,
      playersNeeded: Number(newPlayersNeeded),
      rolesNeeded: [newRole],
      costPerPerson: Number(newCost),
      hostName: user.name,
      hostAvatar: user.avatar,
      skillTier: 'Intermediate',
      urgency: 'Today',
      description: newDescription || `Looking for sport collaborator on ${newVenue}.`,
      isPartnerFinder: isPartnerReq,
    });

    setNewTitle('');
    setNewDescription('');
    setIsModalOpen(false);
  };

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    addMatchRequest({
      hostName: teamName,
      sport: matchSport,
      opponentOrPartnerType: 'Opponent Team',
      preferredDate: matchDate,
      preferredTimeSlot: '08:00 PM - 09:30 PM',
      preferredVenue: 'Indiranagar Urban Turf',
      notes: matchNotes,
    });
    setIsMatchModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 rounded-3xl p-6 border border-rose-100 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-pastel-rose flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Ghost Sub & Matchmaker Engine
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
              Live Standby Radar
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Never Let a Match Get Cancelled Due to Missing Players
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Someone dropped out last minute? Need a tennis sparring partner or extra cricket all-rounder? Broadcast an SOS beacon or 1-tap join a match!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Broadcast SOS Beacon
          </button>

          <button
            onClick={() => setIsMatchModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-purple-700 border border-purple-200 font-bold text-xs shadow-soft transition-all"
          >
            <Trophy className="w-4 h-4 text-purple-600" />
            Schedule Squad Match
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Live Requests ({ghostSubs.length})
          </button>

          <button
            onClick={() => setFilterType('subs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'subs'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ghost Subs (Turf Drops)
          </button>

          <button
            onClick={() => setFilterType('partners')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'partners'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Partners & Squad Builders
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          ⚡ Instant Push Notification to matched athletes
        </span>
      </div>

      {/* Grid of Ghost Sub Beacons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubs.map((sub) => {
          const isJoined = sub.acceptedUsers.includes(user.name);
          const isFull = sub.playersNeeded === 0;

          return (
            <div
              key={sub.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      {sub.sport}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.urgency.includes('Immediate')
                          ? 'bg-rose-100 text-rose-700 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {sub.urgency}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-800">
                    ₹{sub.costPerPerson} <span className="text-[10px] font-normal text-slate-500">/ person</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {sub.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {sub.description}
                </p>

                {/* Venue and Time */}
                <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{sub.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>{sub.scheduledTime}</span>
                  </div>
                </div>

                {/* Roles Needed */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {sub.rolesNeeded.map((role, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200"
                    >
                      Role: {role}
                    </span>
                  ))}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                    Tier: {sub.skillTier}
                  </span>
                </div>
              </div>

              {/* Host and Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={sub.hostAvatar}
                    alt={sub.hostName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{sub.hostName}</p>
                    <p className="text-[10px] text-slate-400">Host</p>
                  </div>
                </div>

                {isJoined ? (
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Spot Confirmed
                  </span>
                ) : isFull ? (
                  <span className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold">
                    Squad Full
                  </span>
                ) : (
                  <button
                    onClick={() => acceptGhostSub(sub.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-95 shadow-sm"
                  >
                    <span>Claim Spot ({sub.playersNeeded} left)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Broadcast SOS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                Broadcast Ghost Sub or Partner Beacon
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBeacon} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Beacon Title / Request</label>
                <input
                  type="text"
                  placeholder="e.g., Need 1 Goalkeeper for 7 PM turf football"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sport</label>
                  <select
                    value={newSport}
                    onChange={(e) => setNewSport(e.target.value as SportType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Pickleball">Pickleball</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Players Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newPlayersNeeded}
                    onChange={(e) => setNewPlayersNeeded(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Preferred Role / Position</label>
                  <input
                    type="text"
                    placeholder="e.g. Center Mid, Fast Bowler"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cost Share per Person (₹)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Venue / Location</label>
                <input
                  type="text"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Game Time</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isPartnerReq}
                  onChange={(e) => setIsPartnerReq(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="text-slate-700 font-medium">This is a Partner Search (Tennis/Badminton/Sparring)</span>
              </label>

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
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Broadcast SOS Radar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Match Scheduler Modal */}
      {isMatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                Schedule Squad Friendly Match
              </h3>
              <button
                onClick={() => setIsMatchModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMatch} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Sport</label>
                <select
                  value={matchSport}
                  onChange={(e) => setMatchSport(e.target.value as SportType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="Football">Football (5v5 / 7v7)</option>
                  <option value="Cricket">Box Cricket</option>
                  <option value="Badminton">Badminton Doubles</option>
                  <option value="Basketball">Basketball 3v3</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Notes / Stakes</label>
                <textarea
                  rows={2}
                  value={matchNotes}
                  onChange={(e) => setMatchNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Publish Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

