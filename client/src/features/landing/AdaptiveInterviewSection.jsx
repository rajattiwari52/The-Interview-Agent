import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, User, ArrowUpRight, Zap, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AdaptiveInterviewSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const [chatStep, setChatStep] = useState(0);

  const steps = [
    {
      aiQuestion: 'Explain React state management.',
      candidateAnswer: 'State is used to hold data that determines component rendering...',
      aiFollowUp: "Good. Let's go deeper. How does React determine when a component needs to re-render?",
      difficulty: 'Easy',
      difficultyPct: 35,
      badgeColor: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900',
      meterGradient: 'from-blue-500 to-blue-600',
    },
    {
      aiQuestion: 'How does React determine when a component needs to re-render?',
      candidateAnswer: 'By comparing shallow references in Object.is during reconciliation...',
      aiFollowUp: 'Excellent. What are the memory trade-offs when over-using useMemo in high-frequency loops?',
      difficulty: 'Intermediate',
      difficultyPct: 68,
      badgeColor: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900',
      meterGradient: 'from-blue-500 via-indigo-600 to-indigo-700',
    },
    {
      aiQuestion: 'What are the memory trade-offs when over-using useMemo in high-frequency loops?',
      candidateAnswer: 'Closure allocations and memory retention can outweigh simple recalculation costs...',
      aiFollowUp: 'Outstanding demonstration of deep React internals. Final scenario generated.',
      difficulty: 'Advanced',
      difficultyPct: 95,
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
      meterGradient: 'from-blue-500 via-indigo-600 to-emerald-500',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1800',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setChatStep(0);
          } else if (progress < 0.66) {
            setChatStep(1);
          } else {
            setChatStep(2);
          }
        },
      });

      gsap.fromTo(
        cardRef.current,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
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

  const current = steps[chatStep];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-screen w-full pt-20 pb-8 px-4 bg-transparent border-b border-gray-200/50 dark:border-gray-800/60 flex flex-col justify-center items-center transition-colors duration-300"
    >
      <div ref={cardRef} className="max-w-5xl mx-auto w-full my-auto">
        <div className="text-center mb-6 space-y-1">
          <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block">
            SCROLL TO ADAPT
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-gray-900 dark:text-white tracking-tight">
            An Interview That Adapts to Every Answer
          </h2>
          <p className="text-xs md:text-sm font-geist text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-snug">
            As you scroll, watch how the AI interviewer evaluates candidate depth and automatically escalates question complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs font-geist backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800 pb-2.5 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-gray-800 dark:text-gray-200">PINNED ADAPTIVE STORY</span>
              </div>
              <div className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border transition-colors ${current.badgeColor}`}>
                Step {chatStep + 1} / 3: {current.difficulty}
              </div>
            </div>

            <div key={chatStep} className="space-y-3.5">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-blue-50/80 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 rounded-2xl rounded-tl-xs p-3 text-xs text-gray-800 dark:text-gray-200 max-w-md">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-0.5 text-[11px]">AI Interviewer</p>
                  <p className="leading-snug">{current.aiQuestion}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tr-xs p-3 text-xs text-gray-800 dark:text-gray-200 max-w-md shadow-2xs">
                  <p className="font-semibold text-gray-500 dark:text-gray-400 mb-0.5 text-[11px] text-right">Candidate Response</p>
                  <p className="font-mono text-[11px] leading-snug">{current.candidateAnswer}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-blue-50/80 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 rounded-2xl rounded-tl-xs p-3 text-xs text-gray-800 dark:text-gray-200 max-w-md space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-blue-900 dark:text-blue-300 text-[11px]">AI Interviewer</p>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200 dark:border-emerald-900 font-semibold">
                      <Zap className="w-3 h-3 fill-emerald-600" />
                      <span>Adaptive follow-up generated</span>
                    </span>
                  </div>
                  <p className="leading-snug">{current.aiFollowUp}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 font-geist space-y-4 shadow-xs backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-sans flex items-center gap-2">
                  <span>Difficulty Meter</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </h3>
                <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500">PINNED PROGRESS</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-gray-600 dark:text-gray-300">
                  <span>Current Difficulty</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">{current.difficulty}</span>
                </div>
                <div className="w-full h-3.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
                  <div
                    style={{ width: `${current.difficultyPct}%` }}
                    className={`h-full bg-gradient-to-r ${current.meterGradient} rounded-full transition-all duration-500 ease-out`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono font-semibold text-gray-400 dark:text-gray-500 pt-1">
                  <span className={current.difficulty === 'Easy' ? 'text-blue-600 dark:text-blue-400 font-bold scale-105 transition-all' : ''}>EASY</span>
                  <span className={current.difficulty === 'Intermediate' ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105 transition-all' : ''}>INTERMEDIATE</span>
                  <span className={current.difficulty === 'Advanced' ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105 transition-all' : ''}>ADVANCED</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-gray-200/60 dark:border-gray-800 flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">AI adapts to demonstrated understanding in real-time, escalating complexity as candidate provides deeper technical answers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdaptiveInterviewSection;
