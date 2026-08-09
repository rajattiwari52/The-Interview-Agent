import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const DisqualificationTimeline = () => {
  const events = [
    { label: 'Interview Started', time: '10:33:36', type: 'success' },
    { label: 'Question 1 Completed', time: '10:35:10', type: 'success' },
    { label: 'Question 2 Completed', time: '10:37:45', type: 'success' },
    { label: 'Question 3 Completed', time: '10:40:12', type: 'success' },
    { label: 'Interview Screen Changed', time: '10:42:18', type: 'violation' },
    { label: 'Interview Terminated', time: '10:42:18', type: 'terminated' },
  ];

  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-2xl backdrop-blur-md font-geist space-y-4 max-w-3xl mx-auto">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
        Interview Integrity Timeline
      </h3>

      <div className="relative pl-6 space-y-4 border-l-2 border-gray-200 dark:border-slate-800 ml-2">
        {events.map((evt) => {
          const isViolation = evt.type === 'violation';
          const isTerminated = evt.type === 'terminated';

          return (
            <div key={evt.label} className="relative flex items-center justify-between text-xs">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[31px] w-4 h-4 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 ${
                  isViolation
                    ? 'text-amber-500 ring-4 ring-amber-100 dark:ring-amber-950/60'
                    : isTerminated
                    ? 'text-red-500 ring-4 ring-red-100 dark:ring-red-950/60'
                    : 'text-blue-600 dark:text-blue-400'
                }`}
              >
                {isViolation ? (
                  <AlertTriangle className="w-4 h-4 fill-amber-100 dark:fill-amber-950" />
                ) : isTerminated ? (
                  <XCircle className="w-4 h-4 fill-red-100 dark:fill-red-950" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 fill-blue-50 dark:fill-blue-950" />
                )}
              </div>

              {/* Event Text */}
              <span
                className={`font-medium ${
                  isViolation
                    ? 'text-amber-600 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200/60 dark:border-amber-900/60'
                    : isTerminated
                    ? 'text-red-600 dark:text-red-400 font-bold'
                    : 'text-gray-700 dark:text-slate-300'
                }`}
              >
                {evt.label}
              </span>

              <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500">
                {evt.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisqualificationTimeline;
