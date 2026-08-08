import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BigStatementSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.96 },
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
    <section ref={sectionRef} className="py-20 md:py-24 px-4 bg-transparent transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div
          ref={cardRef}
          className="relative bg-[#090D16]/90 border border-slate-800 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl overflow-hidden backdrop-blur-md"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-mono px-3.5 py-1 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>That's adaptive interviewing.</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight leading-tight text-white">
              An interview shouldn't feel like an exam. <br />
              It should feel like a technical conversation.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigStatementSection;
