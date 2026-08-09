import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ShieldAlert } from 'lucide-react';

const DisqualifiedHeroCard = () => {
  const iconRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle non-aggressive pulse animation for security icon
      gsap.to(iconRef.current, {
        scale: 1.05,
        opacity: 0.9,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-6 md:p-8 text-center shadow-sm dark:shadow-2xl backdrop-blur-md transition-all font-geist space-y-4 max-w-3xl mx-auto">
      {/* Icon Badge */}
      <div
        ref={iconRef}
        className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-xs"
      >
        <ShieldAlert className="w-7 h-7 stroke-[2]" />
      </div>

      {/* Main Text */}
      <div className="space-y-1.5">
        <span className="inline-block bg-amber-100/80 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/80 text-[11px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">
          PROCTORING NOTICE
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-sans text-gray-900 dark:text-white tracking-tight">
          Interview Disqualified
        </h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
          Your interview session was ended because an interview integrity violation was detected.
        </p>
      </div>
    </div>
  );
};

export default DisqualifiedHeroCard;
