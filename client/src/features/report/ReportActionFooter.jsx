import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download, RefreshCw } from 'lucide-react';

const ReportActionFooter = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pt-4 font-geist">
      {/* Buttons Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-200/80 dark:border-slate-800/80">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigate('/resume/upload')}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium px-6 py-2.5 rounded-xl text-xs font-geist transition-all shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2"
          >
            <span>Practice Weak Areas</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/interview/live')}
            className="w-full sm:w-auto border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-800 dark:text-slate-200 font-medium px-6 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Practice Interview Again</span>
          </button>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-blue-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-white transition-colors flex items-center space-x-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </button>

      </div>

      {/* Page Footer */}
      <footer className="pt-6 border-t border-gray-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-slate-400 gap-3">
        <div>
          © 2024 IntervueAI. All systems operational.
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">API Status</a>
        </div>
      </footer>
    </div>
  );
};

export default ReportActionFooter;
