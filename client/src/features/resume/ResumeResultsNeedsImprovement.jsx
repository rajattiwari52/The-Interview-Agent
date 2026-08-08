import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Download } from 'lucide-react';
import { calculateRealAnalytics } from '../../utils/resumeAnalytics';

const ResumeResultsNeedsImprovement = ({ evaluation, onRetry }) => {
  const navigate = useNavigate();

  const analytics = calculateRealAnalytics(evaluation) || {
    totalScore: 78,
    atsMatch: 82,
    skillsMatch: 80,
    experienceMatch: 74,
    keywordMatch: 76,
    matchedSkills: ['React', 'JavaScript', 'Node.js', 'HTML/CSS'],
    missingSkills: ['TypeScript', 'AWS', 'Docker', 'MCP'],
    strengths: [
      'Strong technical skills section',
      'Good project experience',
      'Clear formatting structure',
    ],
    weakAreas: [
      'Lack of measurable achievements',
      'Vague project descriptions',
      'Missing specific industry keywords',
    ],
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (analytics.totalScore / 100) * circumference;

  return (
    <div className="w-full max-w-5xl mx-auto py-1 font-geist space-y-3">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 font-sans tracking-tight mb-0.5">
          Your Resume Analysis is Ready
        </h1>
        <p className="text-[11px] text-gray-500">
          Here's how your resume performs against ATS standards and industry expectations.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-3">
          {/* Score Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 text-center shadow-2xs">
            <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
              OVERALL RESUME SCORE
            </p>

            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 105 105">
                <circle
                  cx="52.5"
                  cy="52.5"
                  r={radius}
                  className="stroke-gray-100 fill-none"
                  strokeWidth="9"
                />
                <circle
                  cx="52.5"
                  cy="52.5"
                  r={radius}
                  className="stroke-blue-600 fill-none transition-all duration-1000 ease-out"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-900 font-sans">{analytics.totalScore}</span>
                <span className="text-[9px] text-gray-400">/ 100</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 mt-2 max-w-[180px] mx-auto leading-tight">
              Good, but has room for targeted improvements.
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs space-y-3">
            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-2">
                What You're Doing Well
              </h3>
              <ul className="space-y-1.5">
                {analytics.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-[11px] text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-900 mb-2">
                Areas to Improve
              </h3>
              <ul className="space-y-1.5">
                {analytics.weakAreas.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-[11px] text-gray-700">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-3">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white border border-gray-200/80 rounded-lg p-2.5 shadow-2xs">
              <p className="text-[9px] text-gray-500 mb-0.5">ATS Compatibility</p>
              <p className="text-lg font-bold text-gray-900">{analytics.atsMatch}%</p>
            </div>
            <div className="bg-white border border-gray-200/80 rounded-lg p-2.5 shadow-2xs">
              <p className="text-[9px] text-gray-500 mb-0.5">Skills Match</p>
              <p className="text-lg font-bold text-gray-900">{analytics.skillsMatch}%</p>
            </div>
            <div className="bg-white border border-gray-200/80 border-l-3 border-l-red-500 rounded-lg p-2.5 shadow-2xs">
              <p className="text-[9px] text-gray-500 mb-0.5">Experience Match</p>
              <p className="text-lg font-bold text-red-600">{analytics.experienceMatch}%</p>
            </div>
            <div className="bg-white border border-gray-200/80 border-l-3 border-l-red-500 rounded-lg p-2.5 shadow-2xs">
              <p className="text-[9px] text-gray-500 mb-0.5">Keyword Match</p>
              <p className="text-lg font-bold text-red-600">{analytics.keywordMatch}%</p>
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2 font-sans">Skills Analysis</h2>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-gray-500 font-medium mb-1.5">Matched Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {analytics.matchedSkills.map((skill) => (
                    <span key={skill} className="bg-blue-50/80 text-gray-800 text-[11px] px-2 py-0.5 rounded-md border border-blue-100/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-medium mb-1.5">Recommended Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {analytics.missingSkills.map((skill) => (
                    <span key={skill} className="border border-dashed border-gray-300 text-gray-600 text-[11px] px-2 py-0.5 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-blue-50/40 border-l-4 border-l-blue-600 border border-blue-100/80 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-blue-600 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-blue-600/20" />
              <h2 className="text-xs font-bold text-gray-900 font-sans">AI Recommendations</h2>
            </div>
            <ol className="space-y-1.5 text-[11px] text-gray-700 leading-snug">
              <li className="flex items-start space-x-1">
                <span className="font-semibold text-gray-900">1.</span>
                <span>Quantify achievements in your latest role. E.g., write "Improved rendering performance by 40%".</span>
              </li>
              <li className="flex items-start space-x-1">
                <span className="font-semibold text-gray-900">2.</span>
                <span>Add specific mentions of testing frameworks (Jest, Cypress) to align with Frontend roles.</span>
              </li>
              <li className="flex items-start space-x-1">
                <span className="font-semibold text-gray-900">3.</span>
                <span>Flesh out your summary section to explicitly state your target role and core value proposition.</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-medium px-4 py-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Analysis</span>
            </button>
            <button
              type="button"
              onClick={onRetry || (() => navigate('/resume/upload'))}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <span>Improve My Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeResultsNeedsImprovement;
