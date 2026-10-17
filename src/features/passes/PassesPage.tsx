import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Ticket, Calendar, MapPin, QrCode, CheckCircle2, Download, Search } from 'lucide-react';

export const PassesPage: React.FC<{ filterCategory?: 'sports' | 'fitness' | 'all' }> = ({
  filterCategory = 'all',
}) => {
  const { passes, setActiveQrPass, user } = useApp();
  const [search, setSearch] = useState('');

  const filteredPasses = passes.filter((p) => {
    if (filterCategory === 'sports' && p.type === 'gym_pass') return false;
    if (filterCategory === 'fitness' && p.type !== 'gym_pass') return false;
    if (search.trim()) {
      return p.title.toLowerCase().includes(search.toLowerCase()) || p.venue.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-rose-50 to-indigo-50 dark:from-purple-950/60 dark:via-rose-950/40 dark:to-slate-900 rounded-3xl p-6 border border-purple-200/60 dark:border-purple-800/40 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-soft flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" />
              Official Passes & Digital Tickets
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Verified Athlete Identity
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            My Registered Passes & Scannable QR Codes
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Click any pass to pull up the high-resolution dynamic QR code for entry verification at turfs, arenas, and gyms.
          </p>
        </div>

        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft text-right">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase">Confirmed Passes</span>
          <span className="text-base font-extrabold text-purple-600 dark:text-purple-400">{filteredPasses.length} Tickets</span>
        </div>
      </div>

      {/* Grid of Passes */}
      {filteredPasses.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
          <Ticket className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No passes found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You haven't auto-registered for any events or claimed any gym trial passes yet. Explore tournaments or gyms to get your first ticket!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPasses.map((pass) => (
            <div
              key={pass.id}
              onClick={() => setActiveQrPass(pass)}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {pass.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {pass.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {pass.title}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>{pass.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{pass.venue}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pass Code</span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {pass.ticketCode}
                  </span>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-soft transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  View QR Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

