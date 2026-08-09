import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const DisqualifiedActionsBar = ({ defaultEligible = true }) => {
  const navigate = useNavigate();
  const [isEligible, setIsEligible] = useState(defaultEligible);

  return (
    <div className="space-y-4 font-geist max-w-3xl mx-auto">
      {/* Retake State Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs backdrop-blur-md transition-all ${
          isEligible
            ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-900/60 text-blue-900 dark:text-blue-200'
            : 'bg-gray-100/80 dark:bg-slate-900/80 border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          {isEligible ? (
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0" />
          )}
          <span>
            {isEligible
              ? "You're eligible for another attempt."
              : 'Another attempt is not currently available. Please contact your assessment administrator if you believe this was a mistake.'}
          </span>
        </div>

        {/* Development Toggle (Allows testing both states) */}
        <button
          type="button"
          onClick={() => setIsEligible(!isEligible)}
          className="text-[10px] font-mono text-gray-400 dark:text-slate-500 underline shrink-0 hover:text-gray-600 dark:hover:text-slate-300"
        >
          [Toggle Policy Demo: {isEligible ? 'Eligible' : 'Not Eligible'}]
        </button>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-200/80 dark:border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {isEligible ? (
            <button
              type="button"
              onClick={() => navigate('/resume/upload')}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-medium px-6 py-3 rounded-xl text-xs font-geist transition-all shadow-md shadow-blue-600/25 flex items-center justify-center space-x-2"
            >
              <span>Start New Interview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-gray-900 font-medium px-6 py-3 rounded-xl text-xs font-geist transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isEligible && (
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-800 dark:text-slate-200 font-medium px-6 py-3 rounded-xl text-xs font-geist transition-colors flex items-center justify-center space-x-2 shadow-2xs"
            >
              <span>Return to Dashboard</span>
            </button>
          )}
        </div>

        <button
          type="button"
          className="text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center space-x-1.5"
        >
          <FileText className="w-4 h-4" />
          <span>View Interview Policy</span>
        </button>
      </div>
    </div>
  );
};

export default DisqualifiedActionsBar;
