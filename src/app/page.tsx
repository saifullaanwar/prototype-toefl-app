'use client';
import { useRouter } from 'next/navigation';
import { BookOpen, CheckCircle, Clock, Trophy, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans selection:bg-blue-500/30">
      {/* Efek Cahaya Latar (Glow) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8 shadow-xl">
          <Sparkles size={16} /> The Future of TOEFL Prep
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
          Master the Language. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">
            Own Your Future.
          </span>
        </h1>
        
        <p className="max-w-2xl text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
          Simulasi TOEFL ITP dengan antarmuka yang dirancang untuk kenyamanan mata. 
          Uji kemampuan Anda tanpa rasa lelah.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <button 
            onClick={() => router.push('/test')}
            className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/20 hover:bg-blue-500 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-lg border border-blue-400/20"
          >
            Start Simulation
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
          {[
            { icon: <Clock />, title: "20 Minutes Test", desc: "Waktu yang dioptimalkan untuk melatih fokus dan kecepatan." },
            { icon: <BookOpen />, title: "Academic Standards", desc: "Materi yang dikurasi sesuai pola TOEFL ITP original." },
            { icon: <CheckCircle />, title: "Instant Scoring", desc: "Analisis hasil dan skor konversi secara langsung." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-colors">
              <div className="text-blue-400 mb-4">{item.icon}</div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer / Credit Section */}
      <footer className="relative z-10 py-12 border-t border-slate-800 bg-slate-900/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 opacity-50">
            <div className="h-[1px] w-12 bg-slate-700"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
              The Prototype
            </p>
            <div className="h-[1px] w-12 bg-slate-700"></div>
          </div>
          
          <div className="group cursor-default text-center">
            <p className="text-slate-500 text-sm mb-2 italic font-serif">Engineered with precision by</p>
            <h2 className="text-3xl font-black text-white tracking-tighter transition-all duration-500 group-hover:tracking-widest">
              SAIFUL <span className="text-blue-500">ANWAR</span>
            </h2>
            <div className="h-1 w-0 group-hover:w-full bg-blue-500 mx-auto transition-all duration-500 mt-1 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>

          <div className="flex flex-col items-center gap-2">
             <p className="text-slate-600 text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Eduveritas System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}