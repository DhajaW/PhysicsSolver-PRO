import { Heart, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative text-slate-300 py-10 px-6"
      style={{
        background: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-8">

          {/* Brand Section */}
          <div>
            <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Physics Solver Pro
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Master A/L Physics simply and correctly. A unique digital experience designed specifically for Sri Lankan students to conquer their exams.
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col md:items-end gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">
              අප හා සම්බන්ධ වන්න
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={14} className="text-blue-400 flex-shrink-0" />
              <span>Colombo, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-blue-400 flex-shrink-0" />
              <span className="font-medium text-blue-400">+94 713 080 010</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/80 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p className="flex items-center gap-1.5">
              Developed with
              <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse fill-red-500 flex-shrink-0" />
              by Flagship Studios · Dhaja Thusitha Weerasinghe
            </p>
            <div className="flex flex-col sm:items-end gap-1 text-center sm:text-right">
              <p>© 2026 Physics Solver Pro. All rights reserved.</p>
              <p className="text-slate-600 font-medium">Sri Lanka&apos;s Premium EdTech Platform</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}