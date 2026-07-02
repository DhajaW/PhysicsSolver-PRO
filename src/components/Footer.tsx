export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-6 mt-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-3">Physics Solver Pro</h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Master A/L Physics simply and correctly. A unique digital experience designed specifically for Sri Lankan students to conquer their exams.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold mb-3">අප හා සම්බන්ධ වන්න</h3>
          <p className="text-sm">Colombo, Sri Lanka</p>
          <p className="text-sm mt-1 font-medium text-blue-400">+94 713 080 010</p>
        </div>
      </div>

      {/* Credits */}
      <div className="max-w-4xl mx-auto mt-10 pt-6 border-t border-slate-700 text-center text-xs text-slate-500">
        <p className="mb-2">Developed with ❤️ by Flagship Studios | Dhaja Thusitha Weerasinghe</p>
        <p>© 2026 Physics Solver Pro. All rights reserved.</p>
        <p className="mt-1 font-semibold text-slate-600">Sri Lanka's Premium EdTech Platform</p>
      </div>
    </footer>
  );
}