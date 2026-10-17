import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientProfile } from '../../types/fitness';
import { Users, TrendingUp, CheckCircle, FileText, Send, Sparkles, Dumbbell, Utensils, Award } from 'lucide-react';

export const TrainerPortal: React.FC = () => {
  const { clients, updateClientNotes, assignPlanToClient, user } = useApp();
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [noteText, setNoteText] = useState('');
  const [dietTemplate, setDietTemplate] = useState('High-Protein Shred (1850 kcal)');
  const [workoutTemplate, setWorkoutTemplate] = useState('4-Day Upper / Lower Strength Split');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;
    updateClientNotes(selectedClient.id, noteText || selectedClient.notesFromTrainer || '');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleAssignPlan = () => {
    if (!selectedClient) return;
    assignPlanToClient(selectedClient.id, dietTemplate, workoutTemplate);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 rounded-3xl p-6 border border-amber-200/70 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow-soft flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Coach & Trainer HQ
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
              Active Client Roster
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Manage Client Goals, Prescribe Nutrition & Review Progress
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            You are logged in as Coach. Track your athletes, assign structured training splits, and monitor weekly check-in compliance.
          </p>
        </div>

        <div className="px-4 py-2.5 bg-white rounded-2xl border border-amber-200 shadow-soft flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            {clients.length}
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Active Athletes</span>
            <span className="text-xs font-extrabold text-slate-800">100% Adherence Target</span>
          </div>
        </div>
      </div>

      {showSuccessToast && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Client plan & training notes successfully updated and pushed to athlete!</span>
        </div>
      )}

      {/* Main Roster & Client Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Client List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Athletes Under Your Supervision
          </h3>

          <div className="space-y-2.5">
            {clients.map((client) => {
              const isSelected = client.id === selectedClientId;
              const weightDiff = (client.currentWeightKg - client.targetWeightKg).toFixed(1);

              return (
                <div
                  key={client.id}
                  onClick={() => {
                    setSelectedClientId(client.id);
                    setNoteText(client.notesFromTrainer || '');
                  }}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-purple-300 shadow-soft-lg ring-2 ring-purple-100'
                      : 'bg-white/70 hover:bg-white border-slate-100 hover:border-slate-200 shadow-soft'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{client.name}</h4>
                      <p className="text-[11px] text-slate-500">{client.goal}</p>
                      <p className="text-[10px] text-purple-600 font-semibold mt-0.5">
                        Last check-in: {client.lastCheckIn}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 block">
                      {client.currentWeightKg} kg
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Target: {client.targetWeightKg} kg
                    </span>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {client.adherenceRate}% Adherence
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Client Management Panel */}
        {selectedClient && (
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-6">
            
            {/* Client Header Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedClient.avatar}
                  alt={selectedClient.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedClient.name}</h3>
                  <p className="text-xs text-slate-500">
                    Age {selectedClient.age} • Program: {selectedClient.planDurationWeeks} Weeks
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Goal</span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-100 inline-block">
                  {selectedClient.goal}
                </span>
              </div>
            </div>

            {/* Adherence & Progress Bar */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">Program Compliance / Adherence Rate</span>
                <span className="font-extrabold text-emerald-600">{selectedClient.adherenceRate}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedClient.adherenceRate}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1">
                <span>Start: {selectedClient.currentWeightKg + 3} kg</span>
                <span>Current: {selectedClient.currentWeightKg} kg</span>
                <span>Target: {selectedClient.targetWeightKg} kg</span>
              </div>
            </div>

            {/* Plan Prescription Controls */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-purple-600" />
                Prescribe Training Split & Nutrition Plan
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Workout Protocol</label>
                  <select
                    value={workoutTemplate}
                    onChange={(e) => setWorkoutTemplate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="4-Day Upper / Lower Strength Split">4-Day Upper / Lower Strength</option>
                    <option value="Push-Pull-Legs (PPL) Hypertrophy">Push-Pull-Legs (PPL) Hypertrophy</option>
                    <option value="Full Body Metabolic Conditioning (3x/wk)">Full Body Metabolic Conditioning</option>
                    <option value="Postural Rehabilitation & Core Stability">Postural Rehabilitation & Core</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Nutrition Protocol</label>
                  <select
                    value={dietTemplate}
                    onChange={(e) => setDietTemplate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="High-Protein Shred (1850 kcal)">High-Protein Shred (1,850 kcal)</option>
                    <option value="Clean Lean Bulk (2600 kcal)">Clean Lean Bulk (2,600 kcal)</option>
                    <option value="Mediterranean Longevity Maintenance (2100 kcal)">Mediterranean Maintenance (2,100 kcal)</option>
                    <option value="Plant-Based Athletic Fuel (2000 kcal)">Plant-Based Athletic (2,000 kcal)</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAssignPlan}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-soft transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Assign Protocols to {selectedClient.name}
              </button>
            </div>

            {/* Trainer Notes & Feedback */}
            <form onSubmit={handleSaveNotes} className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Coach Notes & Week Guidance
              </label>
              <textarea
                rows={3}
                placeholder="Write specific feedback, form corrections, or macro adjustment notes for this athlete..."
                value={noteText || selectedClient.notesFromTrainer || ''}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  Save & Send Note
                </button>
              </div>
            </form>

          </div>
        )}

      </div>

    </div>
  );
};

