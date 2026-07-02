import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050508] text-slate-300 py-12 px-6 mt-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-3 flex items-center gap-2">
            Physics Solver Pro
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
            Master A/L Physics simply and correctly. A unique digital experience designed specifically for Sri Lankan students to conquer their exams.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-white font-semibold mb-3">අප හා සම්බන්ධ වන්න</h3>
          <p className="text-sm">Colombo, Sri Lanka</p>
          <p className="text-sm mt-1 font-medium text-blue-400">+94 713 080 010</p>
        </div>
      </div>

      {/* Credits */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="mb-2 flex items-center justify-center gap-1">
          Developed with 
          <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" /> 
          by Flagship Studios | Dhaja Thusitha Weerasinghe
        </p>
        <p className="mb-1">© 2026 Physics Solver Pro. All rights reserved.</p>
        <p className="font-semibold text-slate-700">Sri Lanka's Premium EdTech Platform</p>
      </div>
    </footer>
  );
}