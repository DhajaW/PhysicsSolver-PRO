'use client'
import { useState, useRef } from 'react';
import { Camera, UploadCloud, BookOpen, X, Loader2, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function Home() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div
      className="flex flex-col flex-grow relative"
      style={{
        backgroundImage: "url('/physics-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-blue-950/75 to-indigo-950/85 z-0" />

      {/* Animated particle-like decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow py-12 px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-40 animate-pulse" />
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-400 p-4 rounded-2xl shadow-2xl shadow-blue-500/30">
                <BookOpen size={36} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            <span className="text-white">Physics</span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Solver</span>
            <span className="text-white"> PRO</span>
          </h1>
          <p className="text-blue-200/80 text-sm font-medium tracking-wide">
            ලකුණු දීමේ පටිපාටියට අනුකූලව · AI-Powered · පියවරෙන් පියවර විසඳුම්
          </p>
          {/* Decorative line */}
          <div className="mt-4 flex justify-center gap-2">
            <span className="w-8 h-px bg-blue-400/60" />
            <span className="w-2 h-px bg-cyan-400" />
            <span className="w-8 h-px bg-blue-400/60" />
          </div>
        </div>

        {/* Main Glass Card */}
        <div className="w-full max-w-2xl">
          <div
            className="rounded-3xl p-7 md:p-9 border shadow-2xl"
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderColor: 'rgba(148, 163, 184, 0.15)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(148,163,184,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {solution ? (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                <button
                  onClick={() => setSolution(null)}
                  className="flex items-center gap-2 text-blue-400 font-semibold mb-6 hover:text-cyan-400 transition-colors group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span>වෙනත් ප්‍රශ්නයක්</span>
                </button>

                <div
                  className="rounded-2xl p-6 text-slate-200 prose prose-invert prose-slate max-w-none"
                  style={{
                    background: 'rgba(30, 41, 59, 0.7)',
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
              <div className="flex flex-col items-center" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                <div
                  className="relative w-full max-w-md h-64 mb-6 rounded-2xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    background: 'rgba(30, 41, 59, 0.5)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Selected problem" className="object-contain w-full h-full" />
                  <button
                    onClick={clearImage}
                    disabled={isLoading}
                    className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-red-400 p-2 rounded-full shadow-lg hover:bg-red-500/20 hover:text-red-300 transition-all disabled:opacity-50 border border-slate-700/50"
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </div>

                <button
                  onClick={getSolution}
                  disabled={isLoading}
                  className="w-full max-w-md flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: isLoading
                      ? 'linear-gradient(135deg, #374151, #4b5563)'
                      : 'linear-gradient(135deg, #2563eb, #06b6d4, #4f46e5)',
                    backgroundSize: '200% 200%',
                    color: 'white',
                    boxShadow: isLoading ? 'none' : '0 8px 32px rgba(37, 99, 235, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                    animation: isLoading ? 'none' : 'gradientShift 3s ease infinite',
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={22} className="animate-spin" />
                      <span>AI විසඳුම සකසමින් පවතී...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={22} />
                      <span>✨ විසඳුම බලන්න AI</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <h2 className="text-lg font-semibold text-center mb-7 text-slate-300 tracking-wide">
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
                    className="w-full flex items-center justify-center gap-3 font-semibold py-4 px-6 rounded-2xl transition-all group"
                    style={{
                      background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.55)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.35)')}
                  >
                    <Camera size={22} className="group-hover:scale-110 transition-transform" />
                    <span>කැමරාවෙන් ලබා ගන්න</span>
                  </button>

                  <div className="relative flex items-center py-2 text-slate-500">
                    <div className="flex-grow border-t border-slate-700/60" />
                    <span className="flex-shrink-0 mx-4 text-xs font-medium uppercase tracking-widest">හෝ</span>
                    <div className="flex-grow border-t border-slate-700/60" />
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-3 font-semibold py-4 px-6 rounded-2xl transition-all group"
                    style={{
                      background: 'rgba(30, 41, 59, 0.6)',
                      color: '#94a3b8',
                      border: '1px solid rgba(148, 163, 184, 0.15)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(51, 65, 85, 0.7)';
                      e.currentTarget.style.color = '#e2e8f0';
                      e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
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

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
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
      </div>

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