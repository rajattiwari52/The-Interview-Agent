import React from 'react';
import { ShieldX } from 'lucide-react';

const DisqualifiedResultInvalidatedCard = () => {
  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-2xl backdrop-blur-md font-geist space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
        <ShieldX className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-bold font-sans">Assessment Result</h3>
      </div>

      <div className="bg-gray-50/80 dark:bg-slate-900/60 p-4 rounded-xl border border-gray-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500 uppercase block mb-0.5">
            RESULT STATUS
          </span>
          <span className="text-xl font-bold font-sans text-amber-600 dark:text-amber-400">
            Invalidated
          </span>
        </div>

        <div className="sm:text-right text-gray-600 dark:text-slate-400 text-[11px] space-y-0.5">
          <p><strong className="text-gray-800 dark:text-slate-200">Reason:</strong> Interview integrity violation</p>
          <p><strong className="text-gray-800 dark:text-slate-200">Data Status:</strong> Partial interview data saved</p>
        </div>
      </div>
    </div>
  );
};

export default DisqualifiedResultInvalidatedCard;
