import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, TrendingUp, Radio, Bot, Check, AlertTriangle, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LearningJourney = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const calloutRef = useRef(null);

  const nodes = [
    { num: '01', icon: BookOpen, title: 'CURRICULUM', sub: 'Standard Topics' },
    { num: '02', icon: TrendingUp, title: 'CANDIDATE PROGRESS', sub: 'Completed Modules' },
    { num: '03', icon: Radio, title: 'LEARNING SIGNALS', sub: 'Proficiency Tags' },
    { num: '04', icon: Bot, title: 'AI INTERVIEW PLAN', sub: 'Tailored Environment' },
  ];

  const tags = [
    { name: 'React', status: 'pass', icon: Check },
    { name: 'REST APIs', status: 'pass', icon: Check },
    { name: 'MongoDB', status: 'warn', icon: AlertTriangle },
    { name: 'Vector Databases', status: 'fail', icon: X },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.journey-node',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.25,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        calloutRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 px-4 bg-transparent border-b border-gray-200/50 dark:border-gray-800/60 overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-3">
          From Learning Signals to Adaptive Interviews
        </h2>
        <p className="text-xs md:text-sm font-geist text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-16 leading-relaxed">
          How IntervueAI transforms curriculum progress into targeted technical evaluation.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-[2.5px] bg-gray-200 dark:bg-gray-800 -translate-y-6 z-0">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 origin-left shadow-xs"
            />
          </div>

          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div key={node.title} className="journey-node relative z-10 flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/80 px-2 py-0.5 rounded-md mb-2 border border-blue-100 dark:border-blue-900">
                  {node.num}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/90 dark:border-gray-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-md mb-3 group hover:scale-105 transition-transform backdrop-blur-md">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-xs font-mono font-bold text-gray-900 dark:text-white tracking-wide mb-1">
                  {node.title}
                </h3>
                <p className="text-[11px] font-geist text-gray-500 dark:text-gray-400">{node.sub}</p>

                {idx === 2 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 justify-center max-w-[200px]">
                    {tags.map((t) => {
                      const TagIcon = t.icon;
                      return (
                        <span
                          key={t.name}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                            t.status === 'pass'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900'
                              : t.status === 'warn'
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900'
                              : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900'
                          }`}
                        >
                          <span>{t.name}</span>
                          <TagIcon className="w-3 h-3" />
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          ref={calloutRef}
          className="mt-16 inline-flex items-center space-x-2 bg-blue-50/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs font-mono font-semibold px-4 py-2 rounded-full shadow-2xs backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Personalized Interview Generated</span>
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;
