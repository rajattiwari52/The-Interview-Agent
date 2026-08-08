import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle, FileX, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const gridRef = useRef(null);

  const problems = [
    {
      icon: HelpCircle,
      title: 'Generic Questions',
      desc: 'Standardized question banks ignore candidate context and fail to evaluate real problem-solving capabilities.',
    },
    {
      icon: FileX,
      title: 'Resume-Only Screening',
      desc: 'Static resumes miss practical skills, project depth, and actual technical proficiency.',
    },
    {
      icon: Code2,
      title: 'Static Assessments',
      desc: 'One-size-fits-all coding tests create friction without measuring how candidates adapt under discussion.',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.problem-card-item',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-transparent border-y border-gray-200/50 dark:border-gray-800/60 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          ref={headlineRef}
          className="text-3xl md:text-5xl font-bold font-sans text-gray-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto mb-16"
        >
          Traditional Interviews Ask Questions.{' '}
          <span className="text-blue-600 dark:text-blue-400">IntervueAI Understands Candidates.</span>
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {problems.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="problem-card-item bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 hover:border-blue-500/80 rounded-2xl p-6 transition-all duration-300 shadow-2xs hover:shadow-md group cursor-pointer backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center mb-5 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-900 transition-colors">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-sans mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-geist leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
