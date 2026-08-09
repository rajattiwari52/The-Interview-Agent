import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Download, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { calculateRealAnalytics } from '../../utils/resumeAnalytics';

const ResumeResultsNeedsImprovement = ({ evaluation, onRetry }) => {
  const navigate = useNavigate();
  const [showRawOutput, setShowRawOutput] = useState(false);

  const analytics = calculateRealAnalytics(evaluation) || {
    totalScore: 0,
    atsMatch: 0,
    skillsMatch: 0,
    experienceMatch: 0,
    keywordMatch: 0,
    matchedSkills: [],
    missingSkills: [],
    strengths: [],
    weakAreas: [],
    aiRecommendations: [],
  };

  const radius = 45;
  const safeScore = Number.isFinite(analytics?.totalScore) ? analytics.totalScore : 0;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  return (
    <div className="w-full max-w-5xl mx-auto py-1 font-geist space-y-3">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-sans tracking-tight mb-0.5">
          Your Resume Analysis is Ready
        </h1>
        <p className="text-[11px] text-gray-500 dark:text-slate-400">
          Here's how your resume performs against ATS standards and industry expectations.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-3">
          {/* Score Card */}
          <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-4 text-center shadow-2xs backdrop-blur-md">
            <p className="text-[9px] font-semibold tracking-wider text-gray-400 dark:text-slate-400 uppercase mb-2">
              OVERALL RESUME SCORE
            </p>

            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 105 105">
                <circle
                  cx="52.5"
                  cy="52.5"
                  r={radius}
                  className="stroke-gray-100 dark:stroke-slate-800 fill-none"
                  strokeWidth="9"
                />
                <circle
                  cx="52.5"
                  cy="52.5"
                  r={radius}
                  className="stroke-blue-600 dark:stroke-blue-500 fill-none transition-all duration-1000 ease-out"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white font-sans">{safeScore}</span>
                <span className="text-[9px] text-gray-400 dark:text-slate-400">/ 100</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2 max-w-[180px] mx-auto leading-tight">
              Analysis based on your uploaded resume.
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-4 shadow-2xs space-y-3 backdrop-blur-md">
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-2">
                What You're Doing Well
              </h3>
              <ul className="space-y-1.5">
                {analytics.strengths.length > 0 ? (
                  analytics.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-[11px] text-gray-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-[11px] text-gray-400 italic">No specific strengths parsed</li>
                )}
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-2">
                Areas to Improve
              </h3>
              <ul className="space-y-1.5">
                {analytics.weakAreas.length > 0 ? (
                  analytics.weakAreas.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-[11px] text-gray-700 dark:text-slate-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500 dark:text-red-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-[11px] text-gray-400 italic">No critical weak areas identified</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-3">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs backdrop-blur-md">
              <p className="text-[9px] text-gray-500 dark:text-slate-400 mb-0.5">ATS Compatibility</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.atsMatch}%</p>
            </div>
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs backdrop-blur-md">
              <p className="text-[9px] text-gray-500 dark:text-slate-400 mb-0.5">Skills Match</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.skillsMatch}%</p>
            </div>
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs backdrop-blur-md">
              <p className="text-[9px] text-gray-500 dark:text-slate-400 mb-0.5">Experience Match</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.experienceMatch}%</p>
            </div>
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-lg p-2.5 shadow-2xs backdrop-blur-md">
              <p className="text-[9px] text-gray-500 dark:text-slate-400 mb-0.5">Keyword Match</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{analytics.keywordMatch}%</p>
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-4 shadow-2xs backdrop-blur-md">
            <h2 className="text-xs font-bold text-gray-900 dark:text-white mb-2 font-sans">Skills Analysis</h2>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 font-medium mb-1.5">Matched Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {analytics.matchedSkills.length > 0 ? (
                    analytics.matchedSkills.map((skill) => (
                      <span key={skill} className="bg-blue-50/80 dark:bg-slate-900 text-gray-800 dark:text-slate-200 text-[11px] px-2 py-0.5 rounded-md border border-blue-100/60 dark:border-slate-800">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-gray-400 italic">None</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 font-medium mb-1.5">Recommended Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {analytics.missingSkills.length > 0 ? (
                    analytics.missingSkills.map((skill) => (
                      <span key={skill} className="border border-dashed border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-400 text-[11px] px-2 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-gray-400 italic">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-blue-50/40 dark:bg-slate-900/80 border-l-4 border-l-blue-600 dark:border-l-blue-500 border border-blue-100/80 dark:border-slate-800 rounded-xl p-4 shadow-2xs backdrop-blur-md">
            <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-blue-600/20 dark:fill-blue-400/20" />
              <h2 className="text-xs font-bold text-gray-900 dark:text-white font-sans">AI Recommendations</h2>
            </div>
            <ol className="space-y-1.5 text-[11px] text-gray-700 dark:text-slate-300 leading-snug">
              {analytics.aiRecommendations.length > 0 ? (
                analytics.aiRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start space-x-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{idx + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))
              ) : (
                <li className="text-[11px] text-gray-400 italic">Follow standard industry guidelines for software engineering roles.</li>
              )}
            </ol>
          </div>

          {/* Raw AI Response Drawer */}
          {analytics.rawText && (
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-3.5 shadow-2xs backdrop-blur-md">
              <button
                type="button"
                onClick={() => setShowRawOutput(!showRawOutput)}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-800 dark:text-slate-200"
              >
                <div className="flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>View Raw AI Response Output</span>
                </div>
                {showRawOutput ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showRawOutput && (
                <pre className="mt-3 p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200/60 dark:border-slate-800 rounded-lg text-[11px] font-mono text-gray-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {analytics.rawText}
                </pre>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              className="border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-800 dark:text-white font-medium px-4 py-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Analysis</span>
            </button>
            <button
              type="button"
              onClick={onRetry || (() => navigate('/resume/upload'))}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <span>Start Technical Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeResultsNeedsImprovement;
