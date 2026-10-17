import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, QrCode, Download, Share2, Calendar, MapPin, Ticket } from 'lucide-react';

export const QrPassModal: React.FC = () => {
  const { activeQrPass, setActiveQrPass, passes } = useApp();

  if (!activeQrPass) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-purple-200" />
            <h3 className="font-extrabold text-sm tracking-wide uppercase">Official Athlete Pass</h3>
          </div>
          <button
            onClick={() => setActiveQrPass(null)}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-5">
          
          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
              ✓ Registration Confirmed & Active
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {activeQrPass.title}
            </h2>
            <p className="text-xs text-purple-600 font-semibold mt-0.5">
              {activeQrPass.category}
            </p>
          </div>

          {/* QR Code Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-50 to-indigo-50/50 border border-purple-100 flex flex-col items-center justify-center shadow-inner">
            <div className="p-4 bg-white rounded-2xl shadow-soft border border-slate-200/80 mb-3">
              {/* Simulated crisp high-contrast SVG QR code */}
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
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
            <p className="text-xs font-mono font-bold text-slate-800 tracking-wider">
              {activeQrPass.ticketCode}
            </p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
              Scan at venue entrance for instant check-in
            </p>
          </div>

          {/* Details breakdown */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-500" /> Date & Time
              </span>
              <span className="font-semibold text-slate-800">{activeQrPass.date}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Venue
              </span>
              <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">
                {activeQrPass.venue}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Athlete Name</span>
              <span className="font-bold text-slate-900">{activeQrPass.athleteName}</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Pass Fee</span>
              <span className="font-bold text-emerald-600">{activeQrPass.cost}</span>
            </div>
          </div>

          {/* Pass Selector if multiple exist */}
          {passes.length > 1 && (
            <div className="pt-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Switch Pass ({passes.length} available)
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {passes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveQrPass(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                      p.id === activeQrPass.id
                        ? 'bg-purple-100 text-purple-800 border-purple-300'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.title.substring(0, 18)}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => alert(`Downloaded pass PDF: ${activeQrPass.ticketCode}.pdf`)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Offline Pass
            </button>
            <button
              onClick={() => alert(`Share link copied: https://pulseplay.io/pass/${activeQrPass.ticketCode}`)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
              title="Share pass"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

