import React from 'react';
import { AlertCircle } from 'lucide-react';

const DisqualificationReasonCard = ({
  reason = 'Interview Screen Changed',
  description = 'Our proctoring system detected that you navigated away from the interview screen during the assessment.',
  detectionType = 'Browser tab/window change',
  detectionTime = '10:42:18',
}) => {
  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-7 shadow-sm dark:shadow-2xl backdrop-blur-md font-geist space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
        <AlertCircle className="w-4 h-4 stroke-[2]" />
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
          Reason for Disqualification
        </h2>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold font-sans text-gray-900 dark:text-white">
          {reason}
        </h3>
        <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-slate-800 text-xs">
        <div className="bg-gray-50/80 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-800">
          <p className="text-[10px] font-mono text-gray-400 dark:text-slate-500 uppercase mb-0.5">Detection</p>
          <p className="font-semibold text-gray-800 dark:text-slate-200">{detectionType}</p>
        </div>

        <div className="bg-amber-50/60 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
          <p className="text-[10px] font-mono text-amber-600/80 dark:text-amber-400/80 uppercase mb-0.5">Status</p>
          <p className="font-bold text-amber-700 dark:text-amber-300">Disqualified</p>
        </div>

        <div className="bg-gray-50/80 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-800">
          <p className="text-[10px] font-mono text-gray-400 dark:text-slate-500 uppercase mb-0.5">Detection Time</p>
          <p className="font-mono font-semibold text-gray-800 dark:text-slate-200">{detectionTime}</p>
        </div>
      </div>
    </div>
  );
};

export default DisqualificationReasonCard;
