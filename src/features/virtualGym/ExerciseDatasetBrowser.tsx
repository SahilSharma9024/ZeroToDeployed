import React, { useState, useMemo } from 'react';
import {
  CURATED_EXERCISES,
  VirtualGymExercise,
  getExerciseImageUrl,
} from '../../data/virtualGymDataset';
import {
  Search,
  Dumbbell,
  Play,
  Filter,
  ExternalLink,
  Sparkles,
  Layers,
} from 'lucide-react';

interface ExerciseDatasetBrowserProps {
  onSelectExercise: (exercise: VirtualGymExercise) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Exercises' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'upper legs', label: 'Upper Legs' },
  { id: 'upper arms', label: 'Upper Arms' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'waist', label: 'Waist & Core' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'lower legs', label: 'Calves' },
];

const EQUIPMENT_FILTERS = [
  'all',
  'barbell',
  'dumbbell',
  'body weight',
  'cable',
];

export const ExerciseDatasetBrowser: React.FC<ExerciseDatasetBrowserProps> = ({
  onSelectExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const filteredExercises = useMemo(() => {
    return CURATED_EXERCISES.filter((ex) => {
      // Category filter
      if (selectedCategory !== 'all' && ex.category !== selectedCategory) {
        return false;
      }
      // Equipment filter
      if (selectedEquipment !== 'all') {
        if (!ex.equipment.toLowerCase().includes(selectedEquipment)) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ex.name.toLowerCase().includes(q);
        const matchesTarget = ex.target.toLowerCase().includes(q);
        const matchesEquip = ex.equipment.toLowerCase().includes(q);
        return matchesName || matchesTarget || matchesEquip;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedEquipment]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-soft space-y-6">
      
      {/* Header & Source Repo Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Exercise Dataset Library
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            1,324+ fitness dataset with high-framerate animation GIFs, step-by-step instructions, and target muscles.
          </p>
        </div>

        {/* GitHub Repo Citation Badge */}
        <a
          href="https://github.com/hasaneyldrm/exercises-dataset"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-xs w-fit"
        >
          <span className="text-sm">📦</span>
          <span>hasaneyldrm/exercises-dataset</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Filter Toolbar: Search + Category Pills + Equipment Dropdown */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search exercise by name, target muscle (e.g. bicep, pectorals)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-bold pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Equipment selector */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="text-xs font-bold py-2.5 px-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Equipment</option>
              <option value="barbell">Barbell</option>
              <option value="dumbbell">Dumbbell</option>
              <option value="body weight">Bodyweight</option>
              <option value="cable">Cable Machine</option>
            </select>
          </div>
        </div>

        {/* Category Pills Scrollable */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex-shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((ex) => {
          const thumbUrl = getExerciseImageUrl(ex.image);

          return (
            <div
              key={ex.id}
              onClick={() => onSelectExercise(ex)}
              className="group p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Thumbnail Image */}
                <div className="relative w-full aspect-square max-h-44 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={thumbUrl}
                    alt={ex.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-black text-white capitalize">
                    {ex.category}
                  </span>
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white capitalize group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                    {ex.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/40">
                      🎯 {ex.target}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                      🏋️ {ex.equipment}
                    </span>
                  </div>
                </div>

                {/* Step preview count */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {ex.instruction_steps && ex.instruction_steps.length > 0
                    ? `1. ${ex.instruction_steps[0]}`
                    : 'Step-by-step form instructions available.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">
                  {ex.instruction_steps?.length || 1} Steps Guide
                </span>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-black text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Practice in Arena</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="py-12 text-center space-y-2">
          <p className="text-sm font-bold text-slate-500">No exercises found matching your filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedEquipment('all');
            }}
            className="text-xs font-black text-purple-600 dark:text-purple-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Dataset License & Attribution Note */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span>Dataset under MIT License. Exercise media assets © Gym Visual (https://gymvisual.com/).</span>
        <span className="font-semibold text-purple-600 dark:text-purple-400">10 languages supported</span>
      </div>

    </div>
  );
};
