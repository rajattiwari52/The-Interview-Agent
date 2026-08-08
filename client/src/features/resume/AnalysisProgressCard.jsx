import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, Check, Loader2, Circle } from 'lucide-react';

const ANALYSIS_TASKS = [
  'Extracting experience',
  'Identifying technologies',
  'Analyzing project complexity',
  'Preparing interview environment',
];

const AnalysisProgressCard = ({ fileName, fileSize, onCancel, onComplete }) => {
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 3;

        // Advance active task index based on progress threshold
        if (nextProgress >= 100) {
          clearInterval(timer);
          setActiveTaskIndex(4); // All tasks complete
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        } else if (nextProgress >= 75) {
          setActiveTaskIndex(3);
        } else if (nextProgress >= 50) {
          setActiveTaskIndex(2);
        } else if (nextProgress >= 25) {
          setActiveTaskIndex(1);
        }

        return nextProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-7 max-w-xl w-full mx-auto shadow-xs mt-1">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-4 tracking-tight font-sans">
        Analyzing your resume...
      </h1>

      {/* File Badge */}
      {fileName && (
        <div className="bg-blue-50/50 border border-blue-100/80 rounded-xl p-3 flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1 mr-2">
            <FileText className="w-4.5 h-4.5 text-blue-600 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-geist font-medium text-gray-900 truncate" title={fileName}>
                {fileName}
              </p>
              {fileSize && (
                <p className="text-[11px] font-geist text-gray-500">{fileSize}</p>
              )}
            </div>
          </div>
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 fill-emerald-100 shrink-0" />
        </div>
      )}

      {/* Sequential Tasks Checklist */}
      <div className="border border-gray-200/80 rounded-xl p-4 bg-gray-50/40 space-y-3 mb-4 font-geist text-xs">
        {ANALYSIS_TASKS.map((taskLabel, idx) => {
          const isCompleted = idx < activeTaskIndex;
          const isActive = idx === activeTaskIndex;

          return (
            <div
              key={taskLabel}
              className={`flex items-center space-x-3 transition-colors ${
                isCompleted
                  ? 'text-gray-800'
                  : isActive
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-400'
              }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600 stroke-[2.5]" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
              <span>{taskLabel}</span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-5 font-geist">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-gray-700">Overall Progress</span>
          <span className="font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Cancel Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg text-xs font-geist font-medium transition-colors shadow-2xs"
        >
          Cancel Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisProgressCard;
