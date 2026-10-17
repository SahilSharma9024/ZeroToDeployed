import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, Share2, Calendar, MapPin, Ticket } from 'lucide-react';

export const QrPassModal: React.FC = () => {
  const { activeQrPass, setActiveQrPass, passes } = useApp();

  // Escape key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveQrPass(null);
      }
    };
    if (activeQrPass) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeQrPass, setActiveQrPass]);

  if (!activeQrPass) return null;

  return (
    <div
      onClick={() => setActiveQrPass(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm sm:max-w-md max-h-[88vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        
        {/* Header */}
        <div className="shrink-0 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-purple-200" />
            <h3 className="font-extrabold text-xs sm:text-sm tracking-wide uppercase">Official Athlete Pass • KINETIX</h3>
          </div>
          <button
            onClick={() => setActiveQrPass(null)}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close pass"
            title="Close pass (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ticket Body - Scrollable on small screens */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          
          <div className="text-center">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-1">
              ✓ Registration Confirmed & Active
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {activeQrPass.title}
            </h2>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
              {activeQrPass.category}
            </p>
          </div>

          {/* QR Code Card - Compact & crisp */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-purple-50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800/60 border border-purple-100 dark:border-slate-700 flex flex-col items-center justify-center shadow-inner">
            <div className="p-2 sm:p-2.5 bg-white rounded-xl shadow-soft border border-slate-200/80 mb-2">
              {/* Crisp high-contrast SVG QR code */}
              <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" rx="4" fill="white" />
                {/* Corner Finder 1 */}
                <rect x="10" y="10" width="24" height="24" rx="2" fill="#1e1b4b" />
                <rect x="14" y="14" width="16" height="16" rx="1" fill="white" />
                <rect x="18" y="18" width="8" height="8" rx="1" fill="#7c3aed" />
                {/* Corner Finder 2 */}
                <rect x="66" y="10" width="24" height="24" rx="2" fill="#1e1b4b" />
                <rect x="70" y="14" width="16" height="16" rx="1" fill="white" />
                <rect x="74" y="18" width="8" height="8" rx="1" fill="#7c3aed" />
                {/* Corner Finder 3 */}
                <rect x="10" y="66" width="24" height="24" rx="2" fill="#1e1b4b" />
                <rect x="14" y="70" width="16" height="16" rx="1" fill="white" />
                <rect x="18" y="74" width="8" height="8" rx="1" fill="#7c3aed" />
                {/* Data Matrix Dots */}
                <rect x="42" y="14" width="6" height="6" fill="#1e1b4b" />
                <rect x="52" y="14" width="6" height="6" fill="#7c3aed" />
                <rect x="42" y="24" width="6" height="6" fill="#1e1b4b" />
                <rect x="52" y="24" width="6" height="6" fill="#1e1b4b" />
                <rect x="14" y="42" width="6" height="6" fill="#7c3aed" />
                <rect x="24" y="42" width="6" height="6" fill="#1e1b4b" />
                <rect x="38" y="38" width="8" height="8" fill="#ec4899" />
                <rect x="54" y="38" width="6" height="6" fill="#1e1b4b" />
                <rect x="66" y="42" width="6" height="6" fill="#1e1b4b" />
                <rect x="78" y="42" width="6" height="6" fill="#7c3aed" />
                <rect x="42" y="52" width="6" height="6" fill="#1e1b4b" />
                <rect x="52" y="52" width="6" height="6" fill="#ec4899" />
                <rect x="42" y="66" width="6" height="6" fill="#7c3aed" />
                <rect x="52" y="66" width="6" height="6" fill="#1e1b4b" />
                <rect x="66" y="66" width="6" height="6" fill="#1e1b4b" />
                <rect x="76" y="76" width="8" height="8" fill="#1e1b4b" />
              </svg>
            </div>
            <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 tracking-wider">
              {activeQrPass.ticketCode}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Scan at venue entrance for instant check-in
            </p>
          </div>

          {/* Details breakdown */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-500" /> Date & Time
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{activeQrPass.date}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Venue
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-right max-w-[180px] sm:max-w-[220px] truncate" title={activeQrPass.venue}>
                {activeQrPass.venue}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Athlete Name</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeQrPass.athleteName}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400">Pass Fee</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeQrPass.cost}</span>
            </div>
          </div>

          {/* Pass Selector if multiple exist */}
          {passes.length > 1 && (
            <div className="pt-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Switch Pass ({passes.length} available)
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {passes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveQrPass(p)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                      p.id === activeQrPass.id
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {p.title.length > 18 ? `${p.title.substring(0, 16)}...` : p.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons with clear Cancel / Close button */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveQrPass(null)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => alert(`Downloaded pass PDF: ${activeQrPass.ticketCode}.pdf`)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Pass
            </button>
            <button
              type="button"
              onClick={() => alert(`Share link copied: https://kinetix.fit/pass/${activeQrPass.ticketCode}`)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              title="Share pass"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
