import React from 'react';
import { Award, AlertCircle } from 'lucide-react';

const ReportHeroCard = ({
  score = 84,
  performanceLabel = 'Strong Performance',
  badgeType = 'emerald',
  summaryQuote = 'You demonstrated strong understanding of core technical concepts. Communication was clear, though some deeper technical explanations could be improved.',
}) => {
  const isAmber = badgeType === 'amber' || score < 60;

  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-2xl backdrop-blur-md transition-all">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Score Box */}
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800 rounded-xl min-w-[140px] shrink-0">
          <span className="text-4xl md:text-5xl font-bold font-sans text-gray-900 dark:text-white">
            {score}
          </span>
          <span className="text-xs font-mono text-gray-400 dark:text-slate-500 pt-1">
            / 100
          </span>
        </div>

        {/* Details & Quote */}
        <div className="flex-1 space-y-4 text-left">
          <div>
            <div
              className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2 border ${
                isAmber
                  ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-900/60'
                  : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-900/60'
              }`}
            >
              {isAmber ? <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> : <Award className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{performanceLabel}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-sans text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Interview Completed</span>
              <span>{score >= 60 ? '🎉' : '📊'}</span>
            </h1>

            <p className="text-xs md:text-sm font-geist text-gray-500 dark:text-slate-400 mt-1">
              Your personalized interview evaluation is ready.
            </p>
          </div>

          {/* Quote Callout */}
          <div className="bg-blue-50/50 dark:bg-slate-900/80 border-l-4 border-l-blue-600 dark:border-l-blue-500 border border-blue-100/60 dark:border-slate-800/80 p-4 rounded-xl text-xs md:text-sm font-geist text-gray-700 dark:text-slate-300 italic leading-relaxed">
            "{summaryQuote}"
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportHeroCard;
