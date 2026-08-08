import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Cpu, CheckCircle2, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ResumeIntelligenceSection = () => {
  const sectionRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  const [score, setScore] = useState(0);
  const [ats, setAts] = useState(0);
  const [skills, setSkills] = useState(0);
  const [experience, setExperience] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: 91,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              setScore(Math.round(this.targets()[0].val));
            },
          });

          gsap.to({ val: 0 }, {
            val: 94,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              setAts(Math.round(this.targets()[0].val));
            },
          });

          gsap.to({ val: 0 }, {
            val: 92,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              setSkills(Math.round(this.targets()[0].val));
            },
          });

          gsap.to({ val: 0 }, {
            val: 89,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              setExperience(Math.round(this.targets()[0].val));
            },
          });
        },
      });

      gsap.fromTo(
        '.resume-progress-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        leftCardRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        rightCardRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightCardRef.current,
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
          Resume Intelligence Meets Learning Profile
        </h2>
        <p className="text-xs md:text-sm font-geist text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-14 leading-relaxed">
          IntervueAI parses ATS compliance, experience depth, and verified skills to construct a targeted evaluation strategy.
        </p>

        <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto font-geist text-left backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6 mb-6 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
                RESUME SCORE
              </span>
              <div className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white">
                {score}<span className="text-sm font-geist text-gray-400 dark:text-gray-500 font-normal"> / 100</span>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 text-xs font-semibold px-3 py-1 rounded-full font-mono flex items-center gap-1.5 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Highly Competitive for ATS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/90 dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-gray-500 dark:text-gray-400">ATS Compatibility</span>
                <span className="font-bold text-gray-900 dark:text-white">{ats}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${ats}%` }}
                  className="resume-progress-bar h-full bg-blue-600 dark:bg-blue-500 rounded-full origin-left transition-all duration-300"
                />
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-gray-500 dark:text-gray-400">Skills Match</span>
                <span className="font-bold text-gray-900 dark:text-white">{skills}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${skills}%` }}
                  className="resume-progress-bar h-full bg-blue-600 dark:bg-blue-500 rounded-full origin-left transition-all duration-300"
                />
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-gray-500 dark:text-gray-400">Experience Match</span>
                <span className="font-bold text-gray-900 dark:text-white">{experience}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${experience}%` }}
                  className="resume-progress-bar h-full bg-blue-600 dark:bg-blue-500 rounded-full origin-left transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-700 dark:text-gray-300">
            <div ref={leftCardRef} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-700">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Resume Analysis</span>
            </div>
            <span className="text-gray-400 dark:text-gray-500 font-bold">+</span>
            <div ref={rightCardRef} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-700">
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Learning Profile</span>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-bold">➔</span>
            <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/60 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-300 font-bold">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Tailored Interview Plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeIntelligenceSection;
