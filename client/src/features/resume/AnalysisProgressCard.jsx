import React, { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle2, Check, Loader2, Circle, AlertCircle } from 'lucide-react';
import resumeService from '../../services/resumeService';

const ANALYSIS_TASKS = [
  'Extracting experience & skills',
  'Identifying technologies & frameworks',
  'Analyzing project complexity & ATS match',
  'Preparing adaptive interview environment',
];

const AnalysisProgressCard = ({ fileObj, fileName, fileSize, onCancel, onComplete }) => {
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [progress, setProgress] = useState(10);
  const [errorMsg, setErrorMsg] = useState(null);
  const apiResultRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    if (fileObj) {
      resumeService.analyzeResume(fileObj)
        .then((res) => {
          if (isMounted && res) {
            apiResultRef.current = res;
            const resString = typeof res === 'string' ? res : JSON.stringify(res);
            localStorage.setItem('resumeAnalysis', resString);
          }
        })
        .catch((err) => {
          console.error('Backend API /resume/analyze error:', err);
          if (isMounted) {
            setErrorMsg('Could not connect to backend server. Please check your network connection.');
          }
        });
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 2;

        if (nextProgress >= 100) {
          clearInterval(timer);
          setActiveTaskIndex(4);
          setTimeout(() => {
            if (onComplete) {
              const savedData = apiResultRef.current || localStorage.getItem('resumeAnalysis');
              onComplete(savedData);
            }
          }, 400);
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
    }, 120);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [fileObj, onComplete]);

  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-7 max-w-xl w-full mx-auto shadow-sm dark:shadow-2xl mt-1 backdrop-blur-md transition-all text-gray-900 dark:text-white font-geist space-y-4">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center tracking-tight font-sans">
        Analyzing your resume...
      </h1>

      {/* Error Alert if API Fails */}
      {errorMsg && (
        <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3.5 text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-snug">{errorMsg}</p>
        </div>
      )}

      {/* File Badge */}
      {fileName && (
        <div className="bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100/80 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1 mr-2">
            <FileText className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-geist font-medium text-gray-900 dark:text-white truncate" title={fileName}>
                {fileName}
              </p>
              {fileSize && (
                <p className="text-[11px] font-geist text-gray-500 dark:text-slate-400">{fileSize}</p>
              )}
            </div>
          </div>
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
        </div>
      )}

      {/* Sequential Tasks Checklist */}
      <div className="border border-gray-200/80 dark:border-slate-800 rounded-xl p-4 bg-gray-50/40 dark:bg-slate-900/40 space-y-3 font-geist text-xs">
        {ANALYSIS_TASKS.map((taskLabel, idx) => {
          const isCompleted = idx < activeTaskIndex;
          const isActive = idx === activeTaskIndex;

          return (
            <div
              key={taskLabel}
              className={`flex items-center space-x-3 transition-colors ${
                isCompleted
                  ? 'text-gray-800 dark:text-gray-200'
                  : isActive
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-400 dark:text-slate-500'
              }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400 stroke-[2.5]" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 dark:text-slate-700" />
              )}
              <span>{taskLabel}</span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="font-geist">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-gray-700 dark:text-slate-300">Overall Progress</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Cancel Button */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/80 px-5 py-2 rounded-xl text-xs font-geist font-medium transition-colors shadow-2xs"
        >
          Cancel Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisProgressCard;
