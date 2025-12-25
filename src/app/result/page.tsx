'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Trophy, CheckCircle, RotateCcw, Home, Award } from 'lucide-react';
import { Suspense } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  
  // Ambil data dari URL
  const score = searchParams.get('score') || '310';
  const correct = searchParams.get('correct') || '0';
  const total = searchParams.get('total') || '25';

  // LOGIKA LEVEL (Ditaruh di dalam komponen agar bisa diakses)
  const getLevel = (scoreNum: number) => {
    if (scoreNum >= 600) return "Expert - C1 Heritage";
    if (scoreNum >= 500) return "Advanced - B2 Level";
    if (scoreNum >= 450) return "Intermediate - B1 Level";
    return "Elementary - A2 Level";
  };

  const scoreValue = parseInt(score);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Card Utama */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-blue-600 p-8 text-white">
            <Trophy className="mx-auto mb-4" size={64} />
            <h1 className="text-3xl font-bold italic tracking-tighter">TEST COMPLETED</h1>
            <p className="opacity-80 font-medium tracking-wide">Eduveritas TOEFL Prediction Test</p>
          </div>

          <div className="p-10">
            <div className="mb-8">
              <p className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-2">Your Final Score</p>
              <div className="text-7xl font-black text-blue-600 tracking-tighter">
                {score}
              </div>
              {/* PEMANGGILAN LEVEL DISINI */}
              <p className="text-blue-800 font-bold mt-4 text-xl">
                {getLevel(scoreValue)}
              </p>
            </div>

            {/* Statistik Jawaban */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold mb-1">
                  <CheckCircle size={20} /> Correct
                </div>
                <p className="text-3xl font-bold text-emerald-700">{correct}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-center gap-2 text-slate-500 font-bold mb-1">
                  <Award size={20} /> Questions
                </div>
                <p className="text-3xl font-bold text-slate-700">{total}</p>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/test" 
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
              >
                <RotateCcw size={20} /> RETAKE TEST
              </Link>
              <Link 
                href="/" 
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-100 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95"
              >
                <Home size={20} /> BACK TO HOME
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-slate-400 text-sm italic">
          Disclaimer: This is a prediction score based on your correct answers.
        </p>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Calculating Your Results...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}