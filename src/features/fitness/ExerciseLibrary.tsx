import React, { useState } from 'react';
import { EXERCISE_DATABASE } from '../../data/exerciseDatabase';
import { ExerciseItem } from '../../types/fitness';
import { Play, Search, Video, X, Dumbbell, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

const CATEGORIES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'] as const;

export const ExerciseLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoExercise, setActiveVideoExercise] = useState<ExerciseItem | null>(null);

  const filteredExercises = EXERCISE_DATABASE.filter((ex) => {
    if (selectedCategory !== 'All' && ex.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ex.title.toLowerCase().includes(q);
      const matchMuscle = ex.targetMuscles.some((m) => m.toLowerCase().includes(q));
      if (!matchTitle && !matchMuscle) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-amber-50 rounded-3xl p-6 border border-rose-100 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-soft flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              Exercise Video Academy
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
              Biomechanical Form Guides
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Learn Proper Form with Step-by-Step Tutorials & Video Demonstrations
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Access curated exercise tutorials with breakdown of joint angles, cues, setup mechanics, and video demonstrations to lift safely and effectively.
          </p>
        </div>

        <div className="px-4 py-2 bg-white rounded-2xl border border-rose-100 shadow-soft text-right">
          <span className="text-[10px] text-slate-400 font-bold block uppercase">Exercise Library</span>
          <span className="text-sm font-extrabold text-rose-600">{EXERCISE_DATABASE.length} Movement Patterns</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search exercise or target muscle (e.g., Squat, Glutes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full sm:w-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white border-rose-500 shadow-pastel-rose'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
          >
            {/* Thumbnail with Video Play Overlay */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden group">
              <img
                src={ex.thumbnailUrl}
                alt={ex.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-md">
                  {ex.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-900 backdrop-blur-md">
                  {ex.difficulty}
                </span>
              </div>

              {/* Play Button Overlay */}
              <button
                onClick={() => setActiveVideoExercise(ex)}
                className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer"
                title="Watch Exercise Tutorial"
              >
                <div className="w-14 h-14 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-pastel-rose hover:bg-rose-600 transition-colors">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </button>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-semibold text-rose-300">
                  Equipment: {ex.equipment}
                </p>
              </div>
            </div>

            {/* Exercise Content */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{ex.title}</h3>

                {/* Target Muscles */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {ex.targetMuscles.map((muscle, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-100"
                    >
                      {muscle}
                    </span>
                  ))}
                  {ex.secondaryMuscles?.slice(0, 2).map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[10px] font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Biomechanical Execution Steps
                </span>
                <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside leading-relaxed">
                  {ex.steps.slice(0, 3).map((step, idx) => (
                    <li key={idx} className="line-clamp-2">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Common Mistakes */}
              {ex.commonMistakes && ex.commonMistakes.length > 0 && (
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-start gap-2 text-[11px] text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Avoid:</span>
                    <span>{ex.commonMistakes[0]}</span>
                  </div>
                </div>
              )}

              {/* Footer CTA */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">YouTube Verified Tutorial</span>
                <button
                  onClick={() => setActiveVideoExercise(ex)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Watch Video Guide
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Video Modal with Embedded YouTube Player */}
      {activeVideoExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">{activeVideoExercise.title} — Video Tutorial</h3>
                <p className="text-[10px] text-slate-400">Targeting: {activeVideoExercise.targetMuscles.join(', ')}</p>
              </div>
              <button
                onClick={() => setActiveVideoExercise(null)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive YouTube Embed */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideoExercise.youtubeVideoId}?autoplay=1&rel=0`}
                title={activeVideoExercise.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Steps & Cues Footer inside Modal */}
            <div className="p-5 bg-slate-50 space-y-3 max-h-48 overflow-y-auto">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Form Checklist & Safety Cues
              </span>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                {activeVideoExercise.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

