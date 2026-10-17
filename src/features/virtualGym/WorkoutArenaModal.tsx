import React, { useState, useEffect } from 'react';
import { VirtualGymExercise, getExerciseGifUrl } from '../../data/virtualGymDataset';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  Globe,
  Dumbbell,
  Clock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkoutArenaModalProps {
  exercise: VirtualGymExercise | null;
  onClose: () => void;
  targetSets?: number;
  targetReps?: string;
  onExerciseCompleted: (earnedXp: number) => void;
}

const LANGUAGE_MAP: Record<string, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  es: { label: 'Español', flag: '🇪🇸' },
  fr: { label: 'Français', flag: '🇫🇷' },
  it: { label: 'Italiano', flag: '🇮🇹' },
  tr: { label: 'Türkçe', flag: '🇹🇷' },
  hi: { label: 'हिन्दी', flag: '🇮🇳' },
  ru: { label: 'Русский', flag: '🇷🇺' },
  zh: { label: '中文', flag: '🇨🇳' },
};

export const WorkoutArenaModal: React.FC<WorkoutArenaModalProps> = ({
  exercise,
  onClose,
  targetSets = 4,
  targetReps = '10-12 reps',
  onExerciseCompleted,
}) => {
  if (!exercise) return null;

  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [setsDone, setSetsDone] = useState<boolean[]>(new Array(targetSets).fill(false));
  
  // Rest Timer State
  const defaultRestSeconds = 60;
  const [restTimeLeft, setRestTimeLeft] = useState<number>(defaultRestSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Play simple synth beep when timer hits 0
  const playTimerBeep = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            playTimerBeep();
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, restTimeLeft, soundEnabled]);

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleFinishSet = () => {
    const updated = [...setsDone];
    updated[currentSet - 1] = true;
    setSetsDone(updated);

    // Trigger minor confetti
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#A855F7', '#EC4899', '#3B82F6'],
    });

    if (currentSet < targetSets) {
      setCurrentSet(currentSet + 1);
      setRestTimeLeft(defaultRestSeconds);
      setIsTimerRunning(true);
    }
  };

  const handleCompleteExercise = () => {
    // Grand celebration confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899'],
    });

    onExerciseCompleted(120);
    onClose();
  };

  const gifUrl = getExerciseGifUrl(exercise.gif_url);

  // Instructions for selected language
  const instructionList =
    exercise.instruction_steps && exercise.instruction_steps.length > 0
      ? exercise.instruction_steps
      : [exercise.instructions_all?.[selectedLang] || exercise.instructions_all?.en || 'Follow proper form and control.'];

  const translatedParagraph = exercise.instructions_all?.[selectedLang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Exercise Arena • {exercise.category}
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white capitalize truncate">
                {exercise.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs py-1.5 pl-7 pr-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                {Object.entries(LANGUAGE_MAP).map(([code, { label, flag }]) => (
                  <option key={code} value={code}>
                    {flag} {label}
                  </option>
                ))}
              </select>
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Main Visual & Target Muscle Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Animated GIF from Dataset */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center justify-center group">
                <img
                  src={gifUrl}
                  alt={exercise.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                
                {/* Live GIF overlay pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-black text-white flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Interactive Loop</span>
                </div>

                <div className="absolute bottom-2 inset-x-2 text-center text-[9px] text-slate-400/80 bg-slate-950/70 py-0.5 rounded-lg backdrop-blur-xs">
                  © Gym Visual • hasaneyldrm/exercises-dataset
                </div>
              </div>

              {/* Target & Equipment Badges */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Target: <strong className="capitalize">{exercise.target}</strong>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Equip: <strong className="capitalize">{exercise.equipment}</strong>
                </span>
                {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Secondary: {exercise.secondary_muscles.join(', ')}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Step-by-Step Instructions & Execution Checklist */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>📋 Step-by-Step Execution Guide</span>
                </h3>
                <span className="text-[11px] font-bold text-slate-400">
                  {completedSteps.length} of {instructionList.length} steps checked
                </span>
              </div>

              {/* Numbered Step Items */}
              <div className="space-y-2.5">
                {instructionList.map((stepText, idx) => {
                  const isChecked = completedSteps.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-white dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isChecked ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </button>

                      <p className={`text-xs leading-relaxed ${isChecked ? 'line-through opacity-75' : ''}`}>
                        {stepText}
                      </p>
                    </div>
                  );
                })}

                {/* If selected language has translated overview */}
                {selectedLang !== 'en' && translatedParagraph && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">
                      {LANGUAGE_MAP[selectedLang]?.flag} {LANGUAGE_MAP[selectedLang]?.label} Translation:
                    </span>
                    {translatedParagraph}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Gamified Live Set Logger & Rest Stopwatch */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            
            {/* Set Progression */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Target: {targetSets} Sets × {targetReps}
                </span>
                <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">
                  Set {currentSet} of {targetSets}
                </span>
              </div>

              {/* Set indicator circles */}
              <div className="flex items-center gap-2">
                {setsDone.map((done, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-3 rounded-full transition-all ${
                      done
                        ? 'bg-emerald-500 shadow-sm'
                        : i === currentSet - 1
                        ? 'bg-purple-600 ring-2 ring-purple-400/50 animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleFinishSet}
                className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Set {currentSet} Complete (+25 XP)</span>
              </button>
            </div>

            {/* Rest Timer with Audio & Control */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-base text-slate-900 dark:text-white shadow-inner">
                  {restTimeLeft}s
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Rest Interval</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isTimerRunning ? 'Cooling down...' : 'Paused'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200 transition-colors"
                  title={isTimerRunning ? 'Pause' : 'Start Timer'}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    setRestTimeLeft(defaultRestSeconds);
                    setIsTimerRunning(false);
                  }}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  title="Reset to 60s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  title={soundEnabled ? 'Mute sound' : 'Enable audio chime'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Reward:</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>+120 Avatar XP</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Exit Arena
            </button>
            <button
              onClick={handleCompleteExercise}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>Complete Quest & Claim XP</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
