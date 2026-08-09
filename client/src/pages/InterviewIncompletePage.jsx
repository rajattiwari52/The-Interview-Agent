import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw, Home, ShieldAlert, FileQuestion, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const InterviewIncompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060911] text-gray-900 dark:text-gray-100 font-geist transition-colors duration-300 flex flex-col justify-between overflow-y-auto">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 pt-24 pb-12 space-y-6 flex flex-col items-center justify-center">
        
        {/* Main Incomplete Hero Card */}
        <div className="w-full bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-2xl backdrop-blur-md text-center space-y-5">
          
          {/* Warning Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
            <FileQuestion className="w-8 h-8" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60 text-[11px] font-mono font-bold px-3 py-1 rounded-full inline-block uppercase">
              Interview Incomplete
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-gray-900 dark:text-white">
              Session Ended Without Responses
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              You exited the live interview session before submitting any answers. No evaluation score was generated for this session.
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-gray-50 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800 rounded-xl p-4 max-w-md mx-auto text-xs space-y-2 text-left font-geist">
            <div className="flex justify-between items-center text-gray-600 dark:text-slate-400">
              <span>Questions Answered:</span>
              <span className="font-bold text-gray-900 dark:text-white font-mono">0 of 10</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 dark:text-slate-400">
              <span>Evaluation Status:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">Not Evaluated</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 dark:text-slate-400">
              <span>Retake Eligibility:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">Eligible Immediately</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-medium px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/interview/preparation')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restart Interview</span>
            </button>
          </div>

        </div>

      </main>

      <Footer tagline="Built for engineers." />
    </div>
  );
};

export default InterviewIncompletePage;
