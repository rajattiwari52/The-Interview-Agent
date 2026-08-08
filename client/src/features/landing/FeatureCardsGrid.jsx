import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Sliders, BookCheck, UserCheck, MessageSquare, BarChart2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureCardsGrid = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const features = [
    {
      icon: Bot,
      title: 'AI Interviewer',
      desc: 'Conversational voice and text evaluator trained on real technical interview standards.',
    },
    {
      icon: Sliders,
      title: 'Adaptive Questioning',
      desc: 'Dynamically shifts question depth and difficulty based on candidate response signals.',
    },
    {
      icon: BookCheck,
      title: 'Curriculum-Aware',
      desc: 'Integrates directly with completed coursework and syllabus modules to target expected knowledge.',
    },
    {
      icon: UserCheck,
      title: 'Candidate-Aware',
      desc: 'Personalized evaluation tailored to candidate experience, past projects, and core skill stack.',
    },
    {
      icon: MessageSquare,
      title: 'Real-Time Conversation',
      desc: 'Low-latency dialogue flow for natural back-and-forth technical discussions.',
    },
    {
      icon: BarChart2,
      title: 'Detailed Evaluation',
      desc: 'Actionable score reports detailing technical accuracy, problem solving, and communication.',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feat-card-item',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
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

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { y: -6, scale: 1.01, duration: 0.25, ease: 'power2.out' });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <section id="features" ref={sectionRef} className="py-24 px-4 bg-transparent border-b border-gray-200/50 dark:border-gray-800/60 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-3">
          Architected for Technical Precision
        </h2>
        <p className="text-xs md:text-sm font-geist text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-16 leading-relaxed">
          Everything you need to deliver high-signal technical interviews at scale.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="feat-card-item group relative bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 overflow-hidden cursor-pointer backdrop-blur-md"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110 stroke-[2]" />
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white font-sans mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-geist leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsGrid;
