import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Download, TrendingUp, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { calculateRealAnalytics } from '../../utils/resumeAnalytics';

const ResumeResultsPass = ({ evaluation, onStartInterview }) => {
  const navigate = useNavigate();

  const analytics = calculateRealAnalytics(evaluation) || {
    totalScore: 91,
    atsMatch: 94,
    skillsMatch: 92,
    experienceMatch: 89,
    keywordMatch: 91,
    strengths: [
      'Strong technical skills representation and formatting',
      'Well-structured, chronological layout highly preferred by ATS',
      'Highly relevant projects with clear, professional descriptions',
      'Strong industry keywords present throughout experience',
    ],
    weakAreas: [
      'Add more measurable achievements to recent roles',
      'Tailor keywords slightly more for specific job descriptions',
      'Strengthen a few older project descriptions with metrics',
    ],
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-2.5 font-geist">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div>
          <div className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/60 text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 mb-1.5">
            <Award className="w-3 h-3" />
            <span>Excellent Resume Strength</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-sans tracking-tight mb-0.5">
            🎉 Your Resume Looks Great!
          </h1>
          <p className="text-[11px] text-gray-500 dark:text-slate-400">
            Your resume is ready for job applications.
          </p>
        </div>

        {/* Score Box */}
        <div className="md:border-l border-gray-100 dark:border-slate-800 md:pl-6 flex items-center space-x-3 shrink-0">
          <div className="text-right">
            <span className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 font-sans">{analytics.totalScore}</span>
            <span className="text-[11px] text-gray-400 dark:text-slate-400"> / 100</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 dark:text-white font-sans">Excellent</p>
            <p className="text-[10px] text-gray-500 dark:text-slate-400 max-w-[130px] leading-tight">
              Highly competitive and ready for ATS.
            </p>
          </div>
        </div>
      </div>

      {/* Row of 4 Real Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-[9px] uppercase font-semibold text-gray-400 dark:text-slate-400 tracking-wider mb-0.5">ATS MATCH</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.atsMatch}%</p>
          </div>
          <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
        </div>

        <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-[9px] uppercase font-semibold text-gray-400 dark:text-slate-400 tracking-wider mb-0.5">SKILLS</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.skillsMatch}%</p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
        </div>

        <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-[9px] uppercase font-semibold text-gray-400 dark:text-slate-400 tracking-wider mb-0.5">EXPERIENCE</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.experienceMatch}%</p>
          </div>
          <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
        </div>

        <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-[9px] uppercase font-semibold text-gray-400 dark:text-slate-400 tracking-wider mb-0.5">KEYWORDS</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.keywordMatch}%</p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
        </div>
      </div>

      {/* Two Equal Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        {/* Left Column */}
        <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-4 shadow-2xs backdrop-blur-md">
          <h2 className="text-xs font-bold text-gray-900 dark:text-white font-sans flex items-center gap-1.5 mb-2.5">
            <span>👍</span>
            <span>What You're Doing Well</span>
          </h2>
          <ul className="space-y-1.5">
            {analytics.strengths.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-[11px] text-gray-700 dark:text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-4 shadow-2xs backdrop-blur-md">
          <h2 className="text-xs font-bold text-gray-900 dark:text-white font-sans flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Minor Improvements</span>
          </h2>
          <ul className="space-y-1.5">
            {analytics.weakAreas.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-[11px] text-gray-700 dark:text-slate-300">
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Dark Banner */}
      <div className="bg-[#0B132B] dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-xl p-3.5 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="text-base font-bold text-white font-sans tracking-tight mb-0.5">
            Your Resume Is Ready.
          </h3>
          <p className="text-[11px] text-gray-300 dark:text-slate-400">
            Let's prepare you for the interview based on your skills.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full md:w-auto shrink-0 justify-end">
          <button
            type="button"
            className="border border-gray-700 dark:border-slate-700 bg-gray-900/60 dark:bg-slate-800 hover:bg-gray-800 text-gray-200 dark:text-white font-medium px-3.5 py-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </button>

          <button
            type="button"
            onClick={onStartInterview || (() => navigate('/interview/preparation'))}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <span>Start Interview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeResultsPass;
