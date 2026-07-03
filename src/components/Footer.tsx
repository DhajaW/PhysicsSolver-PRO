import { Heart, MapPin, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative text-slate-300 py-10 px-6 select-none"
      style={{
        background: 'rgba(2, 6, 23, 0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-8">

          {/* 1. Brand Section */}
          <div className="space-y-3">
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-500 fill-yellow-500" />
              <span>Physics Solver Pro</span>
            </h2>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Master A/L Physics simply and correctly. A unique digital experience designed specifically for Sri Lankan students to conquer their exams.
            </p>
          </div>

          {/* 2. Connect With Us Section */}
          <div className="space-y-4">
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              CONNECT WITH US
            </h3>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-4 text-slate-400">
              {/* Facebook */}
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Youtube */}
              <a href="#" className="hover:text-red-500 transition-colors" aria-label="Youtube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="hover:text-sky-400 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-pink-500 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              {/* Linkedin */}
              <a href="#" className="hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            {/* Address Row */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={14} className="text-slate-500" />
              <span>Kandy, Sri Lanka</span>
            </div>
          </div>

          {/* 3. Developed With Card */}
          <div className="flex md:justify-end w-full">
            <div 
              className="rounded-2xl p-5 border flex flex-col items-center w-full max-w-[260px] text-center"
              style={{
                background: 'rgba(15, 23, 42, 0.45)',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              {/* DEVELOPED WITH Badge */}
              <div className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-slate-400 uppercase bg-slate-900/60 px-2.5 py-1 rounded-md mb-3 border border-slate-800">
                <span>DEVELOPED WITH</span>
                <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                <span>BY</span>
              </div>

              {/* Developer Name & Studio */}
              <h4 className="text-cyan-400 font-bold text-base tracking-wide mb-0.5">
                Flagship Studios
              </h4>
              <p className="text-slate-400 text-xs mb-4">
                Dhaja Thusitha Weerasinghe
              </p>

              {/* Contact Button */}
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-cyan-400"
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                }}
              >
                <Phone size={12} className="fill-cyan-400/10" />
                <span>+94 713 080 010</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-900 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
            <p>© 2026 Physics Solver Pro. All rights reserved.</p>
            <p>Sri Lanka&apos;s Premium EdTech Platform</p>
          </div>
        </div>
      </div>
    </footer>
  );
}