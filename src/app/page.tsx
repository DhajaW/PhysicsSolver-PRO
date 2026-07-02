'use client'
import { useState, useRef } from 'react';
import { Camera, UploadCloud, BookOpen, X, Loader2, ArrowLeft } from 'lucide-react';
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
    } catch (error) {
      alert("සේවාදායකය (Server) හා සම්බන්ධ වීමට නොහැක. අන්තර්ජාල සබඳතාව පරීක්ෂා කරන්න.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      
      {/* Header Section */}
      <div className="text-center mb-8 text-slate-800">
        <div className="flex justify-center mb-4 text-blue-600">
          <BookOpen size={42} />
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">
          Physics<span className="text-blue-600">Solver</span> PRO
        </h1>
        <p className="text-slate-500 text-sm font-medium">ලකුණු දීමේ පටිපාටියට අනුකූලව පියවරෙන් පියවර විසඳුම්</p>
      </div>

      {/* Main Container */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-2xl border border-slate-100">
        
        {solution ? (
          <div className="animate-in fade-in duration-500">
            <button 
              onClick={() => setSolution(null)}
              className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} /> වෙනත් ප්‍රශ්නයක්
            </button>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-800 prose prose-slate max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]} 
                rehypePlugins={[rehypeKatex]}
              >
                {solution}
              </ReactMarkdown>
            </div>
          </div>
        ) : imagePreview ? (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <div className="relative w-full max-w-md h-64 mb-6 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Selected problem" className="object-contain w-full h-full" />
              <button 
                onClick={clearImage}
                disabled={isLoading}
                className="absolute top-3 right-3 bg-white/90 text-red-500 p-2 rounded-full shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <button 
              onClick={getSolution}
              disabled={isLoading}
              className="w-full max-w-md flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-green-200"
            >
              {isLoading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  <span>AI විසඳුම සකසමින් පවතී...</span>
                </>
              ) : (
                <span>✨ විසඳුම බලන්න (AI)</span>
              )}
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-center mb-6 text-slate-700">ප්‍රශ්නයේ ඡායාරූපයක් ඇතුළත් කරන්න</h2>
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
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-2xl transition-all shadow-md shadow-blue-200"
              >
                <Camera size={24} />
                <span>කැමරාවෙන් ලබා ගන්න</span>
              </button>

              <div className="relative flex items-center py-2 text-slate-400">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-sm">හෝ</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-4 px-6 rounded-2xl transition-all border border-slate-200"
              >
                <UploadCloud size={24} />
                <span>ගැලරියෙන් Upload කරන්න</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex gap-8 text-sm text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span> 99% නිවැරදි
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span> පියවරෙන් පියවර
        </div>
      </div>

    </div>
  );
}