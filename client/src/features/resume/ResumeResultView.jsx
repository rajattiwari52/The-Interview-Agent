import React from 'react';
import { Upload } from 'lucide-react';
import ResumeResultsPass from './ResumeResultsPass';
import ResumeResultsNeedsImprovement from './ResumeResultsNeedsImprovement';
import { calculateRealAnalytics } from '../../utils/resumeAnalytics';

const ResumeResultView = ({ evaluation, onRetry, onStartInterview }) => {
  const analytics = calculateRealAnalytics(evaluation);

  if (!analytics) {
    return (
      <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-sm dark:shadow-2xl font-geist space-y-4 backdrop-blur-md">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-sans text-gray-900 dark:text-white">
          No Resume Analysis Available
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Please upload your PDF/DOCX resume in Step 1 to generate your AI ATS evaluation results.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 inline-flex items-center justify-center"
        >
          Upload Resume Now
        </button>
      </div>
    );
  }

  return analytics.isPass ? (
    <ResumeResultsPass evaluation={evaluation} onStartInterview={onStartInterview} />
  ) : (
    <ResumeResultsNeedsImprovement evaluation={evaluation} onRetry={onRetry} />
  );
};

export default ResumeResultView;
