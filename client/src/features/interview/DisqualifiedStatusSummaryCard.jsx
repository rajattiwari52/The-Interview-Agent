import React from 'react';

const DisqualifiedStatusSummaryCard = ({
  status = 'DISQUALIFIED',
  questionsCompleted = '4 / 10',
  duration = '08:42',
  assessmentType = 'AI Technical Interview',
  integrityStatus = 'Violation Detected',
}) => {
  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-2xl backdrop-blur-md font-geist space-y-4 max-w-3xl mx-auto">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
        Interview Status Overview
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="bg-gray-50/80 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-800">
          <p className="text-[9px] font-mono text-gray-400 dark:text-slate-500 uppercase mb-0.5">Status</p>
          <p className="font-bold text-amber-600 dark:text-amber-400">{status}</p>
        </div>

        <div className="bg-gray-50/80 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-800">
          <p className="text-[9px] font-mono text-gray-400 dark:text-slate-500 uppercase mb-0.5">Questions</p>
          <p className="font-bold text-gray-900 dark:text-white">{questionsCompleted}</p>
        </div>

        <div className="bg-gray-50/80 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-800">
          <p className="text-[9px] font-mono text-gray-400 dark:text-slate-500 uppercase mb-0.5">Duration</p>
          <p className="font-mono font-bold text-gray-900 dark:text-white">{duration}</p>
        </div>

        <div className="bg-gray-50/80 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-800">
          <p className="text-[9px] font-mono text-gray-400 dark:text-slate-500 uppercase mb-0.5">Type</p>
          <p className="font-medium text-gray-800 dark:text-slate-200 truncate">{assessmentType}</p>
        </div>

        <div className="bg-gray-50/80 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-800 col-span-2 sm:col-span-1">
          <p className="text-[9px] font-mono text-gray-400 dark:text-slate-500 uppercase mb-0.5">Integrity</p>
          <p className="font-medium text-amber-600 dark:text-amber-400">{integrityStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default DisqualifiedStatusSummaryCard;
