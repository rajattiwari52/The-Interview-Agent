import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle2, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InterviewReportSection = () => {
  const sectionRef = useRef(null);
  const reportRef = useRef(null);

  const [tech, setTech] = useState(0);
  const [problem, setProblem] = useState(0);
  const [comm, setComm] = useState(0);
  const [topic, setTopic] = useState(0);

  const strongAreas = [
    'React Fundamentals',
    'REST APIs',
    'Project Understanding',
  ];

  const weakAreas = [
    'MongoDB Schema Design',
    'Advanced React Concepts',
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        reportRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: reportRef.current,
            start: 'top 80%',
          },
        }
      );

      ScrollTrigger.create({
        trigger: reportRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, { val: 88, duration: 1.2, ease: 'power2.out', onUpdate: function () { setTech(Math.round(this.targets()[0].val)); } });
          gsap.to({ val: 0 }, { val: 86, duration: 1.2, delay: 0.1, ease: 'power2.out', onUpdate: function () { setProblem(Math.round(this.targets()[0].val)); } });
          gsap.to({ val: 0 }, { val: 82, duration: 1.2, delay: 0.2, ease: 'power2.out', onUpdate: function () { setComm(Math.round(this.targets()[0].val)); } });
          gsap.to({ val: 0 }, { val: 84, duration: 1.2, delay: 0.3, ease: 'power2.out', onUpdate: function () { setTopic(Math.round(this.targets()[0].val)); } });
        },
      });

      gsap.fromTo(
        '.report-item',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.report-item-list',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-transparent border-b border-gray-200/50 dark:border-gray-800/60 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-3">
          Granular Post-Interview Performance Reports
        </h2>
        <p className="text-xs md:text-sm font-geist text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-14 leading-relaxed">
          Detailed metrics, identified competencies, and actionable feedback generated immediately following each session.
        </p>

        <div ref={reportRef} className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/90 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm max-w-4xl mx-auto text-left font-geist backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            <div className="md:col-span-5 bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-xl p-5 text-center shadow-2xs space-y-4">
              <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                OVERALL EVALUATION SCORE
              </span>
              <div className="text-4xl font-bold font-sans text-gray-900 dark:text-white">
                84<span className="text-xs font-geist text-gray-400 dark:text-gray-500 font-normal"> / 100</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-mono px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-900 font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Proficient Standard</span>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs font-mono">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Technical Knowledge</span>
                    <span className="font-bold text-gray-900 dark:text-white">{tech}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div style={{ width: `${tech}%` }} className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Problem Solving</span>
                    <span className="font-bold text-gray-900 dark:text-white">{problem}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div style={{ width: `${problem}%` }} className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Communication</span>
                    <span className="font-bold text-gray-900 dark:text-white">{comm}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div style={{ width: `${comm}%` }} className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Topic Understanding</span>
                    <span className="font-bold text-gray-900 dark:text-white">{topic}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div style={{ width: `${topic}%` }} className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 report-item-list">
              <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-xl p-5 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white font-sans uppercase tracking-wider">
                  Strong Areas
                </h4>
                <ul className="space-y-2">
                  {strongAreas.map((item) => (
                    <li key={item} className="report-item flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-xl p-5 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white font-sans uppercase tracking-wider">
                  Needs Improvement
                </h4>
                <ul className="space-y-2">
                  {weakAreas.map((item) => (
                    <li key={item} className="report-item flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewReportSection;
