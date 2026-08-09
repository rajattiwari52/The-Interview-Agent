import React from 'react';
import { ArrowRight, Monitor, EyeOff, AlertTriangle, XCircle } from 'lucide-react';

const DisqualificationSecurityDiagram = () => {
  const steps = [
    { label: 'Interview Screen', icon: Monitor, status: 'normal' },
    { label: 'Browser Focus Lost', icon: EyeOff, status: 'warning' },
    { label: 'Screen Change Detected', icon: AlertTriangle, status: 'alert' },
    { label: 'Interview Terminated', icon: XCircle, status: 'danger' },
  ];

  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-2xl backdrop-blur-md font-geist space-y-4 max-w-3xl mx-auto">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
        Security Event Flow
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800 space-y-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    step.status === 'danger'
                      ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'
                      : step.status === 'alert'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                      : step.status === 'warning'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-800 dark:text-slate-200 leading-tight">
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div className="hidden sm:flex justify-center text-gray-300 dark:text-slate-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DisqualificationSecurityDiagram;
