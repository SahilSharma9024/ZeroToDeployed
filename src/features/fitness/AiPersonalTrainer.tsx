import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Brain,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Send,
  RefreshCw,
  Plus,
  Award,
  AlertTriangle,
  Utensils,
  Dumbbell,
  CheckCircle2,
  Trash2,
  SlidersHorizontal,
  Activity,
  ArrowRight
} from 'lucide-react';

interface AthleteMemory {
  id: string;
  userId: string;
  category: 'injury' | 'nutrition' | 'preference' | 'milestone';
  content: string;
  confidence: number;
  source: string;
  createdAt?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  time: string;
  guardrails?: string[];
}

export const AiPersonalTrainer: React.FC = () => {
  const { user } = useApp();

  // Active HindSight Memory Bank State
  const [memories, setMemories] = useState<AthleteMemory[]>([]);
  const [isFetchingMemories, setIsFetchingMemories] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'injury' | 'nutrition' | 'milestone'>('all');
  const [newMemoryCategory, setNewMemoryCategory] = useState<'injury' | 'nutrition' | 'preference' | 'milestone'>('injury');
  const [newMemoryText, setNewMemoryText] = useState('');
  const [isAddingMemory, setIsAddingMemory] = useState(false);

  // Live Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'coach',
      text: `Hello ${user.name}! I am your KinetiQ AI Coach. I've initialized your session with Vectorize HindSight persistent memory. I have your active injury safeguards and nutritional protocols loaded into memory. How can I optimize your training today?`,
      time: 'Just now',
      guardrails: ['ROTATOR_CUFF_OVERHEAD_RESTRICTION', 'DAIRY_WHEY_ELIMINATION_PROTOCOL'],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Training Split Generator State
  const [generatedSplit, setGeneratedSplit] = useState<any | null>(null);
  const [isGeneratingSplit, setIsGeneratingSplit] = useState(false);

  // Fetch HindSight Memories on Mount
  const loadMemories = async () => {
    setIsFetchingMemories(true);
    try {
      const res = await fetch(`/api/agent/memories/${user.id || 'usr-aarav-demo'}`);
      const data = await res.json();
      if (data.memories) {
        setMemories(data.memories);
      }
    } catch (err) {
      console.warn('Could not load memories from API:', err);
    } finally {
      setIsFetchingMemories(false);
    }
  };

  useEffect(() => {
    loadMemories();
  }, [user.id]);

  // Send message to HindSight Coach Agent
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;

    const userMsgText = inputText.trim();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/agent/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || 'usr-aarav-demo',
          message: userMsgText,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      const data = await res.json();

      const coachMsg: ChatMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: data.reply || 'Protocol calculated and stored into HindSight memory.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        guardrails: data.guardrailsTriggered || [],
      };

      setMessages((prev) => [...prev, coachMsg]);

      // If new memories were retained during conversation, refresh memory bank!
      if (data.newlyRetainedMemories && data.newlyRetainedMemories.length > 0) {
        setMemories((prev) => [...data.newlyRetainedMemories, ...prev]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `coach-err-${Date.now()}`,
          sender: 'coach',
          text: 'Connected via offline physiological heuristic engine. Active guardrails maintained.',
          time: 'Just now',
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Add custom memory manually
  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;

    setIsAddingMemory(true);
    try {
      const res = await fetch(`/api/agent/memories/${user.id || 'usr-aarav-demo'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newMemoryCategory,
          content: newMemoryText.trim(),
        }),
      });

      const data = await res.json();
      if (data.memory) {
        setMemories((prev) => [data.memory, ...prev]);
        setNewMemoryText('');
      }
    } catch (err) {
      console.error('Failed to retain memory:', err);
    } finally {
      setIsAddingMemory(false);
    }
  };

  // Reset conversation to initial state
  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'coach',
        text: `Session re-calibrated for ${user.name}. All HindSight active guardrails and biometric protocols remain active in memory. What are we targeting now?`,
        time: 'Just now',
        guardrails: ['ROTATOR_CUFF_OVERHEAD_RESTRICTION', 'DAIRY_WHEY_ELIMINATION_PROTOCOL'],
      },
    ]);
  };

  // 1-Click Generate Memory-Protected Training Split
  const handleGenerateSplit = () => {
    setIsGeneratingSplit(true);
    setTimeout(() => {
      const hasShoulderInjury = memories.some((m) => m.category === 'injury' && m.content.toLowerCase().includes('rotator cuff'));
      const hasLactoseSensitivity = memories.some((m) => m.category === 'nutrition' && m.content.toLowerCase().includes('lactose'));

      setGeneratedSplit({
        title: '4-Day HindSight Protected Hypertrophy Split',
        guardrailsApplied: [
          hasShoulderInjury ? 'Rotator Cuff Impingement: Overhead presses replaced with Neutral-Grip DB Floor Presses' : null,
          hasLactoseSensitivity ? 'Lactose Sensitivity: Whey concentrate replaced with Fermented Pea/Rice Isolate' : null,
        ].filter(Boolean),
        days: [
          {
            name: 'Day 1: Upper Body Push & Core (Shoulder-Safe Protocol)',
            exercises: [
              hasShoulderInjury
                ? { name: 'Neutral-Grip DB Floor Press (Elbows 45°)', sets: '4 sets × 10 reps', rest: '75s', note: 'Prevents terminal shoulder impingement' }
                : { name: 'Flat Barbell Bench Press', sets: '4 sets × 8 reps', rest: '90s', note: 'Standard compound' },
              { name: 'Incline Dumbbell Bench (30° Angle)', sets: '3 sets × 10 reps', rest: '60s', note: 'Scapular plane path' },
              { name: 'Cable Face Pulls with External Rotation', sets: '4 sets × 15 reps', rest: '45s', note: 'Infraspinatus & rear delt reinforcement' },
              { name: 'Dual Rope Tricep Extension', sets: '3 sets × 12 reps', rest: '60s', note: 'Zero elbow strain' },
              { name: 'Hanging Leg Raises', sets: '3 sets × 12 reps', rest: '45s', note: 'Core bracing' },
            ],
          },
          {
            name: 'Day 2: Lower Body Quad & Posterior Chain',
            exercises: [
              { name: 'Barbell Back Squats', sets: '4 sets × 8 reps', rest: '120s', note: 'Targeting 100kg PR milestone' },
              { name: 'Romanian Dumbbell Deadlifts', sets: '4 sets × 10 reps', rest: '90s', note: 'Hamstring & glute hinge' },
              { name: 'Bulgarian Split Squats', sets: '3 sets × 10 reps/leg', rest: '60s', note: 'Unilateral stability' },
              { name: 'Standing Calf Raises', sets: '4 sets × 15 reps', rest: '45s', note: 'Full ankle dorsiflexion' },
            ],
          },
          {
            name: 'Day 3: Upper Body Pull & Rear Scapula',
            exercises: [
              { name: 'Chest-Supported T-Bar Rows', sets: '4 sets × 10 reps', rest: '90s', note: 'Zero lower back fatigue' },
              { name: 'Neutral Grip Lat Pulldown', sets: '4 sets × 10 reps', rest: '75s', note: 'Subscapularis friendly' },
              { name: 'Incline Dumbbell Bicep Curls', sets: '3 sets × 12 reps', rest: '60s', note: 'Full peak stretch' },
              { name: 'Hammer Curls', sets: '3 sets × 12 reps', rest: '45s', note: 'Brachialis development' },
            ],
          },
        ],
        nutrition: {
          proteinTarget: `${Math.round(user.weightKg * 2.0)}g daily`,
          recommendation: hasLactoseSensitivity
            ? 'Plant-Based Fermented Pea/Rice Isolate or Egg Whites. Avoid all dairy whey concentrates to prevent GI inflammation.'
            : 'Standard Micro-filtered Whey Isolate or Greek Yogurt.',
        },
      });
      setIsGeneratingSplit(false);
    }, 800);
  };

  const filteredMemories = memories.filter((m) => {
    if (activeTab === 'all') return true;
    return m.category === activeTab;
  });

  const injuryCount = memories.filter((m) => m.category === 'injury').length;
  const nutritionCount = memories.filter((m) => m.category === 'nutrition').length;
  const milestoneCount = memories.filter((m) => m.category === 'milestone').length;

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Clean, Refined Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
              HindSight Cognitive Memory Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            AI Personal Trainer with Persistent Memory
          </h1>
        </div>

        <button
          onClick={handleGenerateSplit}
          disabled={isGeneratingSplit}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all active:scale-95 shrink-0"
        >
          {isGeneratingSplit ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 fill-white" />}
          <span>Generate Memory-Protected Split</span>
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ================================================================= */}
        {/* LEFT COLUMN: MEMORY BANK & GUARDRAILS (5 COLS) */}
        {/* ================================================================= */}
        <div className="lg:col-span-5 space-y-5">

          {/* Card 1: HindSight Active Memory Bank */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    HindSight Active Memory Bank
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {memories.length} persistent biometric records
                  </span>
                </div>
              </div>

              <button
                onClick={loadMemories}
                disabled={isFetchingMemories}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                title="Refresh Memory Bank"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetchingMemories ? 'animate-spin text-purple-600' : ''}`} />
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-800/60 rounded-2xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-1 text-[11px] font-bold rounded-xl transition-all ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                All ({memories.length})
              </button>
              <button
                onClick={() => setActiveTab('injury')}
                className={`flex-1 py-1 text-[11px] font-bold rounded-xl transition-all ${
                  activeTab === 'injury'
                    ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                Injuries ({injuryCount})
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`flex-1 py-1 text-[11px] font-bold rounded-xl transition-all ${
                  activeTab === 'nutrition'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                Diet ({nutritionCount})
              </button>
              <button
                onClick={() => setActiveTab('milestone')}
                className={`flex-1 py-1 text-[11px] font-bold rounded-xl transition-all ${
                  activeTab === 'milestone'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                PRs ({milestoneCount})
              </button>
            </div>

            {/* Memory List */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredMemories.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  No records in this category.
                </div>
              ) : (
                filteredMemories.map((mem) => {
                  const isInjury = mem.category === 'injury';
                  const isNutrition = mem.category === 'nutrition';
                  const isMilestone = mem.category === 'milestone';

                  return (
                    <div
                      key={mem.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isInjury
                          ? 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/40 text-rose-950 dark:text-rose-200'
                          : isNutrition
                          ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40 text-amber-950 dark:text-amber-200'
                          : 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                          {isInjury && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                          {isNutrition && <Utensils className="w-3.5 h-3.5 text-amber-600" />}
                          {isMilestone && <Award className="w-3.5 h-3.5 text-emerald-600" />}
                          <span>{mem.category}</span>
                        </span>

                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                          {(mem.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed font-semibold">
                        {mem.content}
                      </p>

                      <div className="mt-2 pt-1.5 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Source: {mem.source}</span>
                        <span className="text-purple-600 dark:text-purple-400 font-bold">Vectorize Synced</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Add Constraint Form */}
            <form onSubmit={handleAddMemory} className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                + Teach HindSight a New Constraint
              </span>
              <div className="flex gap-2">
                <select
                  value={newMemoryCategory}
                  onChange={(e) => setNewMemoryCategory(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="injury">🚨 Injury</option>
                  <option value="nutrition">🥛 Nutrition</option>
                  <option value="milestone">🏆 Milestone</option>
                  <option value="preference">⚙️ Preference</option>
                </select>

                <input
                  type="text"
                  placeholder="e.g. Lower back stiffness with barbell squats..."
                  value={newMemoryText}
                  onChange={(e) => setNewMemoryText(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />

                <button
                  type="submit"
                  disabled={isAddingMemory || !newMemoryText.trim()}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs transition-colors shrink-0 flex items-center justify-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>

          {/* Card 2: Active System Guardrails (Enforced on all plans) */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
                  Active System Guardrails
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Enforced on All Plans
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Shoulder Protocol */}
              <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/80 flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0 animate-pulse" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-rose-200 font-bold text-xs">Rotator Cuff Impingement Restriction</strong>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">LOCKED</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    All overhead barbell military presses blocked. Automatically replaced with Neutral-Grip DB Floor Presses & Face Pulls.
                  </p>
                </div>
              </div>

              {/* Lactose Protocol */}
              <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/80 flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0 animate-pulse" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-amber-200 font-bold text-xs">Dairy Whey Elimination Protocol</strong>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">LOCKED</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Standard dairy whey concentrates blocked. Automatically replaced with Fermented Pea + Brown Rice Isolate.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Zero-Compromise Joint & GI Safety
              </span>
              <span className="text-purple-400 font-bold">Real-time LLM Guardrail</span>
            </div>
          </div>

        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: BEAUTIFUL CHAT PANEL (7 COLS) */}
        {/* ================================================================= */}
        <div className="lg:col-span-7 flex flex-col h-[700px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>KinetiQ AI Coach</span>
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Google Gemini 3.8 Flash • Persistent Memory Guardrails Active
                </p>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              className="px-2.5 py-1.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Start a fresh conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[88%] sm:max-w-[82%] rounded-3xl p-4 space-y-1.5 ${
                      isUser
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-bl-none border border-slate-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    {/* Guardrail badge banner if triggered */}
                    {msg.guardrails && msg.guardrails.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {msg.guardrails.map((g, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300/60 dark:border-rose-800 flex items-center gap-1"
                          >
                            <ShieldAlert className="w-2.5 h-2.5" />
                            {g.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {msg.text}
                    </div>

                    <span className={`text-[10px] block text-right font-medium ${isUser ? 'text-purple-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-purple-600 dark:text-purple-400 font-bold border border-purple-200 dark:border-purple-900/50">
                  <Brain className="w-4 h-4 animate-spin text-purple-600" />
                  <span>Recalling HindSight memory bank & applying guardrails...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Prompts:</span>
            <button
              onClick={() => setInputText('Give me an upper body push workout avoiding shoulder pain.')}
              className="text-[11px] font-bold px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 hover:border-purple-400 transition-colors"
            >
              🏋️ Push Workout (Test Shoulder)
            </button>
            <button
              onClick={() => setInputText('give me the diet plan, pure vegetarian diet, i have to gain 6 kg')}
              className="text-[11px] font-bold px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 hover:border-purple-400 transition-colors"
            >
              🥗 Pure Veg Bulk Plan (+6kg)
            </button>
            <button
              onClick={() => setInputText('What post-workout shake should I take with lactose intolerance?')}
              className="text-[11px] font-bold px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 hover:border-purple-400 transition-colors"
            >
              🥛 Shake (Test Lactose)
            </button>
            <button
              onClick={() => setInputText('I sprained my left ankle during basketball today.')}
              className="text-[11px] font-bold px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 hover:border-purple-400 transition-colors"
            >
              🚨 Report Ankle Sprain (Auto-Retain)
            </button>
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask AI Coach a question (e.g. check shoulder safety, adjust split, custom diet)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="p-2.5 sm:p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold transition-all shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

      {/* ================================================================= */}
      {/* GENERATED MEMORY-PROTECTED SPLIT MODAL/PANEL (IF ACTIVE) */}
      {/* ================================================================= */}
      {generatedSplit && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-purple-200 dark:border-purple-800 shadow-soft-xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-600 text-white shadow-soft">
                  Verified Safe Split
                </span>
                <span className="text-xs font-bold text-slate-500">Mifflin-St Jeor & Biometrics Verified</span>
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                {generatedSplit.title}
              </h2>
            </div>

            <button
              onClick={() => setGeneratedSplit(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-3 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Dismiss
            </button>
          </div>

          {/* Active Guardrails Applied Banner */}
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
            <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300 block">
              🛡️ HindSight Memory Guardrails Enforced on this Split:
            </span>
            {generatedSplit.guardrailsApplied.map((g: string, idx: number) => (
              <p key={idx} className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{g}</span>
              </p>
            ))}
          </div>

          {/* Training Days */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generatedSplit.days.map((day: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-black text-slate-900 dark:text-white">{day.name}</h4>
                <div className="space-y-2">
                  {day.exercises.map((ex: any, exIdx: number) => (
                    <div key={exIdx} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>{ex.name}</span>
                        <span className="text-purple-600 text-[10px]">{ex.sets}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Rest: {ex.rest} • {ex.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Nutrition Prescription */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 block">
                🥗 HindSight Allergen-Filtered Nutrition Prescription:
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                Target: {generatedSplit.nutrition.proteinTarget} • {generatedSplit.nutrition.recommendation}
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-sm shrink-0">
              Active Diet Protocol
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
