import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 bg-transparent border-b border-gray-200/50 dark:border-gray-800/60 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div
          ref={cardRef}
          className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-indigo-950 dark:to-slate-950 border border-blue-500/30 rounded-3xl p-10 md:p-16 text-center text-white shadow-xl overflow-hidden backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 text-white text-xs font-mono px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              <span>READY FOR ELEVATED HIRING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight leading-tight">
              Your Next Interview <br />
              Should Understand You.
            </h2>

            <p className="text-xs md:text-sm font-geist text-blue-100 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Turn your learning journey into a personalized technical interview that highlights your true capabilities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/resume/upload')}
                className="w-full sm:w-auto bg-white hover:bg-gray-100 active:scale-[0.98] text-blue-700 dark:text-slate-950 font-semibold px-8 py-3.5 rounded-xl text-xs md:text-sm font-geist transition-all shadow-md flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
              >
                <span>Start Interview</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#features"
                className="w-full sm:w-auto border border-white/30 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-xl text-xs md:text-sm font-geist transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                Explore Platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
