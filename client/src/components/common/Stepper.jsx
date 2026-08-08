import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ currentStep = 1, steps = ['Upload', 'Analyze', 'Results'] }) => {
  return (
    <div className="w-full max-w-xl mx-auto py-2 px-2">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step}>
              {/* Step Badge & Label */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-[10px] flex items-center justify-center text-xs font-semibold font-geist transition-colors ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isActive
                      ? currentStep === 1
                        ? 'bg-blue-600 text-white font-bold'
                        : 'border-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 font-bold'
                      : 'border border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`mt-1.5 text-[11px] font-geist transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-gray-500 dark:text-slate-400'
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={`flex-1 h-[1px] mx-3 mb-5 transition-colors ${
                    isCompleted ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
