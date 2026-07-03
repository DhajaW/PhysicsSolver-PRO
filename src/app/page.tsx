'use client'
import { useState, useRef, useEffect } from 'react';
import { Camera, UploadCloud, BookOpen, X, ArrowLeft, Sparkles, Zap, GraduationCap, Award, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Footer from '@/components/Footer';
import 'katex/dist/katex.min.css';

// 1. Particles Canvas Component
function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to mouse
        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// 2. Custom Bohr Atom Loader Messages
const loadingMessages = [
  "📸 රූපය කියවමින් පවතී...",
  "🧠 භෞතික විද්‍යා ගැටලුව හඳුනාගනිමින්...",
  "📝 සූත්‍ර සහ සිද්ධාන්ත විශ්ලේෂණය කරමින්...",
  "📐 පියවරෙන් පියවර විසඳුම සකසමින්...",
  "🎯 ලකුණු දීමේ පටිපාටියට අනුකූලව සකසමින්..."
];

export default function Home() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cycle loading messages
  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setSolution(null);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setSolution(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getSolution = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.solution) {
        setSolution(data.solution);
      } else {
        alert(data.error || "පොඩි ගැටලුවක් මතු විය. නැවත උත්සාහ කරන්න.");
      }
    } catch {
      alert("සේවාදායකය (Server) හා සම්බන්ධ වීමට නොහැක. අන්තර්ජාල සබඳතාව පරීක්ෂා කරන්න.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scroll-container bg-slate-950 text-slate-100">
      
      {/* SECTION 1: Solver Landing View */}
      <section className="scroll-section flex flex-col justify-center items-center py-10 px-4">
        
        {/* Background Image Wrapper */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
          style={{
            backgroundImage: "url('/physics-bg.png')",
            backgroundAttachment: 'fixed',
          }}
        />
        
        {/* Dark Radial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/90 z-0" />
        
        {/* Interactive Canvas Particles */}
        <ParticlesCanvas />

        {/* Ambient Glow Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none z-0" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse pointer-events-none z-0" style={{ animationDelay: '1s' }} />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
          
          {/* Version / Release Badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] animate-pulse">
            <Sparkles size={12} className="text-cyan-400" />
            <span>AI-Powered v2.5 Release</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-2xl shadow-2xl">
                  <BookOpen size={36} className="text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
              <span className="text-white">Physics</span>
              <span className="text-shimmer-neon font-black">Solver</span>
              <span className="text-white"> PRO</span>
            </h1>
            <p className="text-blue-200/80 text-sm font-medium tracking-wide">
              ලකුණු දීමේ පටිපාටියට අනුකූලව · පියවරෙන් පියවර විසඳුම්
            </p>
          </div>

          {/* Solver Glass Card */}
          <div className="w-full">
            <div
              className="rounded-3xl p-6 md:p-8 border glow-card"
              style={{
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderColor: 'rgba(148, 163, 184, 0.15)',
              }}
            >
              {isLoading ? (
                /* Custom Bohr Atom Loading Interface */
                <div className="flex flex-col items-center justify-center py-10" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                  <div className="atom-loader-container mb-8">
                    <div className="atom-nucleus" />
                    <div className="atom-orbit-1"><div className="atom-electron" /></div>
                    <div className="atom-orbit-2"><div className="atom-electron" /></div>
                    <div className="atom-orbit-3"><div className="atom-electron" /></div>
                  </div>
                  <p className="text-blue-300 font-bold text-lg animate-pulse text-center max-w-sm">
                    {loadingMessages[loadingMessageIndex]}
                  </p>
                  <p className="text-slate-400 text-xs mt-2">විසඳුම සැකසීමට තත්පර 10-15ක් ගතවිය හැක.</p>
                </div>
              ) : solution ? (
                /* Solution Display Mode */
                <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                  <button
                    onClick={() => setSolution(null)}
                    className="flex items-center gap-2 text-blue-400 font-semibold mb-6 hover:text-cyan-400 transition-colors group cursor-pointer"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>වෙනත් ප්‍රශ්නයක් විසඳන්න</span>
                  </button>

                  <div
                    className="rounded-2xl p-6 text-slate-200 prose prose-invert prose-slate max-w-none shadow-inner"
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(148, 163, 184, 0.12)',
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {solution}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : imagePreview ? (
                /* Image Selected Mode */
                <div className="flex flex-col items-center" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                  <div
                    className="relative w-full max-w-md h-64 mb-6 rounded-2xl overflow-hidden group"
                    style={{
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      background: 'rgba(30, 41, 59, 0.4)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="Selected problem" className="object-contain w-full h-full" />
                    <button
                      onClick={clearImage}
                      className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-red-400 p-2 rounded-full shadow-lg hover:bg-red-500/25 hover:text-red-300 transition-all border border-slate-700/50 cursor-pointer"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>

                  <button
                    onClick={getSolution}
                    className="w-full max-w-md flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl transition-all cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb, #06b6d4, #4f46e5)',
                      backgroundSize: '200% 200%',
                      color: 'white',
                      boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                      animation: 'gradientShift 3s ease infinite',
                    }}
                  >
                    <Sparkles size={22} />
                    <span>✨ විසඳුම බලන්න AI</span>
                  </button>
                </div>
              ) : (
                /* Main Image Upload Mode */
                <div className="max-w-md mx-auto">
                  <h2 className="text-lg font-semibold text-center mb-6 text-slate-300 tracking-wide">
                    📸 ප්‍රශ්නයේ ඡායාරූපයක් ඇතුළත් කරන්න
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl cursor-pointer transition-all group shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                        color: 'white',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.55)')}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.35)')}
                    >
                      <Camera size={22} className="group-hover:scale-110 transition-transform" />
                      <span>කැමරාවෙන් ලබා ගන්න</span>
                    </button>

                    <div className="relative flex items-center py-2 text-slate-500">
                      <div className="flex-grow border-t border-slate-800" />
                      <span className="flex-shrink-0 mx-4 text-xs font-semibold uppercase tracking-widest text-slate-500">හෝ</span>
                      <div className="flex-grow border-t border-slate-800" />
                    </div>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-3 font-semibold py-4 px-6 rounded-2xl cursor-pointer transition-all group"
                      style={{
                        background: 'rgba(30, 41, 59, 0.4)',
                        color: '#94a3b8',
                        border: '1px solid rgba(148, 163, 184, 0.15)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                        e.currentTarget.style.color = '#e2e8f0';
                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
                        e.currentTarget.style.color = '#94a3b8';
                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.15)';
                      }}
                    >
                      <UploadCloud size={22} className="group-hover:scale-110 transition-transform" />
                      <span>ගැලරියෙන් Upload කරන්න</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { icon: '⚡', label: '99% නිවැරදි', color: '#10b981' },
              { icon: '📐', label: 'පියවරෙන් පියවර', color: '#3b82f6' },
              { icon: '🎯', label: 'Marking Scheme', color: '#8b5cf6' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(148, 163, 184, 0.12)',
                  color: badge.color,
                }}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 animate-bounce pointer-events-none">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300">ප්‍රධාන අංග බලන්න</span>
            <div className="w-1.5 h-1.5 border-r border-b border-blue-400 rotate-45" />
          </div>

        </div>
      </section>

      {/* SECTION 2: Features, Instruction & Info Grid */}
      <section className="scroll-section flex flex-col justify-center items-center py-16 px-4 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-900">
        
        {/* Glow blobs for background */}
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl my-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              මෙම ඇප් එකෙහි ඇති <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">විශේෂතා</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              ශ්‍රී ලාංකික උසස් පෙළ භෞතික විද්‍යා (A/L Physics) සිසුන් සඳහාම නිපදවන ලද සුවිශේෂී අධ්‍යාපනික මෙවලමකි.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feature Card 1 */}
            <div 
              className="rounded-2xl p-6 border flex gap-4 transition-all hover:-translate-y-1"
              style={{
                background: 'rgba(30, 41, 59, 0.25)',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bg-blue-500/10 p-3.5 rounded-xl h-fit text-blue-400">
                <Camera size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">පින්තූරයෙන් ක්ෂණික විසඳුම්</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  පොතෙහි, ප්‍රශ්න පත්‍රයේ හෝ handwritten සටහනක ඇති භෞතික විද්‍යා ප්‍රශ්න කෙලින්ම ඡායාරූපයක් මඟින් ඇතුළත් කර ක්ෂණිකව උත්තර ලබාගන්න.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div 
              className="rounded-2xl p-6 border flex gap-4 transition-all hover:-translate-y-1"
              style={{
                background: 'rgba(30, 41, 59, 0.25)',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.35)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bg-cyan-500/10 p-3.5 rounded-xl h-fit text-cyan-400">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">පියවරෙන් පියවර පැහැදිලි කිරීම්</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  හුදු කෙටි පිළිතුරු වෙනුවට, සිද්ධාන්ත පැහැදිලි කරමින්, සූත්‍ර ආදේශනයන් දක්වමින් පියවරෙන් පියවර සිංහල මාධ්‍යයෙන් උත්තර ලබාදේ.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div 
              className="rounded-2xl p-6 border flex gap-4 transition-all hover:-translate-y-1"
              style={{
                background: 'rgba(30, 41, 59, 0.25)',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.35)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bg-purple-500/10 p-3.5 rounded-xl h-fit text-purple-400">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Marking Scheme අනුකූලතාව</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ලංකාවේ A/L විභාග ලකුණු දීමේ ක්‍රමවේදයට ගැළපෙන ලෙස අවසන් පිළිතුර සහ නිවැරදි ඒකකය (units) ලකුණු ලැබෙන ලෙස වෙන වෙනම ව්‍යුහගත කර ඇත.
                </p>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div 
              className="rounded-2xl p-6 border flex gap-4 transition-all hover:-translate-y-1"
              style={{
                background: 'rgba(30, 41, 59, 0.25)',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.35)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bg-indigo-500/10 p-3.5 rounded-xl h-fit text-indigo-400">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">ප්‍රශ්න සීමාවක් නැත</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  භෞතික විද්‍යාවේ ඕනෑම අංශයක (තාපය, ආලෝකය, ධාරා විද්‍යුතය ආදී...) ඕනෑම මට්ටමක ගැටලුවක් විසඳා ගැනීමට ඇති හැකියාව.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SECTION 3: Pinned Footer Section */}
      <section className="scroll-section flex flex-col justify-end bg-slate-950">
        <Footer />
      </section>

      {/* Styled Animations for page */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </div>
  );
}