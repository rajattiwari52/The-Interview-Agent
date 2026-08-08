import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Play, CheckCircle2, Circle, Radio, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CinematicHero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const previewRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(headlineRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
        .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo(ctaRef.current.children, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .fromTo(previewRef.current, { scale: 0.95, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');

      gsap.to(previewRef.current, {
        y: -30,
        scale: 1.01,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="space-y-6">
          {/* Top Pill Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center space-x-2 bg-slate-900/80 dark:bg-slate-950/80 border border-slate-800 text-blue-400 text-xs font-mono font-medium px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="tracking-wide uppercase text-[11px]">AI-POWERED TECHNICAL INTERVIEWS</span>
          </div>

          {/* Headline Reveal */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans text-gray-900 dark:text-white tracking-tight leading-[1.08]"
          >
            Turn Learning Progress <br className="hidden sm:inline" />
            Into <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Interview Readiness.</span>
          </h1>

          {/* Supporting Description */}
          <p
            ref={descRef}
            className="text-sm md:text-base font-geist text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            IntervueAI understands what candidates have learned, identifies their strengths and gaps, and conducts personalized technical interviews that adapt in real time.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3"
          >
            <button
              type="button"
              onClick={() => navigate('/resume/upload')}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-medium px-6 py-3 rounded-xl text-sm font-geist transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <span>Start Interview</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:bg-gray-100 dark:hover:bg-slate-800/80 text-gray-800 dark:text-slate-200 font-medium px-6 py-3 rounded-xl text-sm font-geist transition-colors flex items-center justify-center space-x-2 backdrop-blur-md shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 fill-current text-slate-400" />
              <span>Explore How It Works</span>
            </a>
          </div>
        </div>

        {/* Hero Product Preview Window Matching Screenshot */}
        <div ref={previewRef} className="mt-14 max-w-4xl mx-auto">
          <div className="bg-white/90 dark:bg-[#0B0F19]/90 border border-gray-200/90 dark:border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden text-left font-geist backdrop-blur-md">
            
            {/* Window Top Bar */}
            <div className="bg-gray-50/90 dark:bg-[#080B14]/90 border-b border-gray-200/80 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block" />
                <span className="ml-3 text-xs font-mono font-medium text-gray-500 dark:text-gray-400">
                  IntervueAI Interview Session
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-slate-900/90 px-3 py-1 rounded-full border border-blue-100 dark:border-slate-800">
                <Activity className="w-3.5 h-3.5" />
                <span>Question 4 of 10</span>
              </div>
            </div>

            {/* Window Main Layout: Sidebar + Chat Area */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[340px]">
              
              {/* Left Sidebar Steps */}
              <div className="md:col-span-4 border-r border-gray-200/80 dark:border-slate-800/80 p-5 space-y-4 bg-gray-50/50 dark:bg-[#090C16]/50">
                <ul className="space-y-3.5 text-xs font-geist">
                  <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0" />
                    <span>Introduction</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0" />
                    <span>Technical Fundamentals</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-900 dark:text-white font-semibold">
                    <Radio className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0 fill-blue-600/20" />
                    <span>Project Discussion</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-400 dark:text-gray-600">
                    <Circle className="w-4 h-4 shrink-0" />
                    <span>Advanced Concepts</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-400 dark:text-gray-600">
                    <Circle className="w-4 h-4 shrink-0" />
                    <span>Problem Solving</span>
                  </li>
                </ul>
              </div>

              {/* Right Chat Dialogue Container */}
              <div className="md:col-span-8 p-6 space-y-5 flex flex-col justify-center bg-white/50 dark:bg-[#0B0F19]/50">
                
                {/* AI Question Bubble */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100/90 dark:bg-[#131B2E] border border-gray-200 dark:border-blue-900/40 rounded-2xl rounded-tl-xs p-4 text-xs text-gray-800 dark:text-slate-200 max-w-lg space-y-1">
                    <p className="leading-relaxed">
                      Let's talk about one of the projects mentioned in your profile. Can you explain the architecture behind it?
                    </p>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 block pt-1">10:24 AM</span>
                  </div>
                </div>

                {/* Candidate Response Bubble */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-xs p-4 text-xs max-w-lg shadow-md space-y-1">
                    <p className="leading-relaxed">
                      I built a React application using a modular component structure with Redux for state management and Node.js backend with REST APIs.
                    </p>
                    <span className="text-[10px] font-mono text-blue-100 text-right block pt-1">10:25 AM ✓✓</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 flex items-center justify-center text-[11px] font-bold shrink-0 border border-gray-300 dark:border-slate-700">
                    You
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
