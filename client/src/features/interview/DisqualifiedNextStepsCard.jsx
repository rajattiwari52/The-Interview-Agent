import React from 'react';

const DisqualifiedNextStepsCard = () => {
  const steps = [
    { num: '01', text: 'Your interview session has been recorded as disqualified.' },
    { num: '02', text: 'Your interview responses up to the violation may be retained for assessment records.' },
    { num: '03', text: 'A new attempt may be available depending on the assessment policy.' },
  ];

  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-2xl backdrop-blur-md font-geist space-y-4 max-w-3xl mx-auto">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
        What Happens Next?
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-gray-50/80 dark:bg-slate-900/60 p-4 rounded-xl border border-gray-200/60 dark:border-slate-800 space-y-2"
          >
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/60 inline-block">
              {step.num}
            </span>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed font-geist">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisqualifiedNextStepsCard;
