'use client';
import { useEffect, useState } from 'react';
import { Timer, ChevronLeft, ChevronRight, Loader2, Volume2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { calculateToeflScore } from '../../utils/scoring';

export default function TestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(1200);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) setQuestions(data);
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Waktu habis! Jawaban Anda akan otomatis dikirim.");
      autoSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (questionId: string, choice: string) => {
    setAnswers({ ...answers, [questionId]: choice });
  };

  const autoSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) correctCount++;
    });
    const finalScore = calculateToeflScore(correctCount, questions.length);
    router.push(`/result?score=${finalScore}&correct=${correctCount}&total=${questions.length}`);
  };

  const handleSubmit = () => {
    if (window.confirm("Apakah Anda yakin ingin mengakhiri ujian sekarang?")) {
      autoSubmit();
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      <p className="text-gray-500 font-medium">Menyiapkan Materi Ujian...</p>
    </div>
  );

  const currentQ = questions[currentIndex];
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold italic tracking-tighter uppercase">EDUVERITAS</div>
          <div className="h-6 w-[1px] bg-slate-300"></div>
          <span className="text-slate-500 font-medium text-sm uppercase tracking-widest hidden md:block italic">
            {currentQ?.category} Section
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? "text-red-500 animate-pulse" : "text-slate-700"}`}>
            <Timer size={20} /> {formatTime(timeLeft)}
          </div>
          <button onClick={handleSubmit} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-all text-sm shadow-md">
            SUBMIT
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[500px] flex-1">
            <div className="flex justify-between items-center mb-8">
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            {currentQ?.audio_url && (
              <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                <Volume2 className="text-blue-600 flex-shrink-0" size={24} />
                <audio controls src={currentQ.audio_url} className="w-full" />
              </div>
            )}

            {currentQ?.description && (
              <div className="mb-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-slate-700 leading-relaxed font-serif italic shadow-sm whitespace-pre-line">
                <p className="font-bold text-blue-600 mb-2 not-italic uppercase text-xs tracking-widest">Reading Passage:</p>
                {currentQ.description}
              </div>
            )}

            <h2 className="text-2xl font-semibold text-slate-800 mb-10 leading-relaxed italic">{currentQ?.question_text}</h2>

            <div className="grid gap-4">
              {currentQ?.options?.map((option: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(currentQ.id, option)}
                  className={`flex items-center p-5 text-left border-2 rounded-xl transition-all ${answers[currentQ.id] === option ? "border-blue-600 bg-blue-50 shadow-sm" : "border-slate-100 hover:border-blue-300 hover:bg-slate-50"}`}
                >
                  <span className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg mr-4 font-bold ${answers[currentQ.id] === option ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`text-lg ${answers[currentQ.id] === option ? "text-blue-900 font-bold" : "text-slate-600"}`}>{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigasi Previous/Next */}
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="flex items-center gap-2 px-6 py-3 text-slate-600 font-bold disabled:opacity-30 hover:bg-slate-200 rounded-xl transition-all active:scale-95"
            >
              <ChevronLeft /> PREVIOUS
            </button>
            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="flex items-center gap-2 px-10 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-30 active:scale-95"
            >
              NEXT <ChevronRight />
            </button>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h3 className="text-xs font-black text-slate-400 mb-6 uppercase tracking-widest border-b pb-4 text-center">Navigator</h3>
            <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full aspect-square rounded-lg text-xs font-bold transition-all border-2 ${currentIndex === index ? "border-blue-600 bg-blue-600 text-white scale-105 shadow-md" : answers[q.id] ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-slate-100 bg-slate-50 text-slate-400"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Credit - Sekarang di dalam return dan akan tampil di paling bawah */}
      <footer className="py-8 border-t border-slate-200 mt-auto bg-white">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm font-medium">
              © {new Date().getFullYear()} <span className="text-blue-600 font-bold italic">EDUVERITAS</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs italic font-serif">A Prototype Developed by</span>
              <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest shadow-sm uppercase">
                SAIFUL ANWAR
              </span>
            </div>
          </div>
        </footer>
    </div>
  );
}