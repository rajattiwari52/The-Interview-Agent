import React, { useState } from 'react';
import { CheckCircle2, Radio, Circle, ChevronDown, ChevronUp } from 'lucide-react';

const LiveInterviewSidebar = ({ currentCount = 1, totalQuestions = 8, topicName = 'AI Technical Evaluation' }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Exact 5-phase 8-question interview progression mapping
  const phases = [
    { name: 'Introduction', min: 1, max: 1 },
    { name: 'Fundamentals', min: 2, max: 3 },
    { name: 'Technical Deep-Dive', min: 4, max: 5 },
    { name: 'Advanced Concepts', min: 6, max: 7 },
    { name: 'Final Assessment', min: 8, max: 8 },
  ];

  // Determine current active phase name for context box
  const activePhase = phases.find(
    (p) => currentCount >= p.min && currentCount <= p.max
  ) || phases[0];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-gray-50/50 dark:bg-[#080C16]/50 border-r border-gray-200/80 dark:border-slate-800/80 p-5 flex flex-col justify-between shrink-0 font-geist text-xs">
      <div className="space-y-6">
        {/* INTERVIEW PROGRESS */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono font-bold tracking-wider text-gray-400 dark:text-slate-500 uppercase">
            INTERVIEW PROGRESS (8 QUESTIONS)
          </p>

          <div className="bg-white dark:bg-[#0B0F19]/80 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-2 shadow-2xs backdrop-blur-md">
            <ul className="space-y-1">
              {phases.map((phase) => {
                const isCompleted = currentCount > phase.max;
                const isActive = currentCount >= phase.min && currentCount <= phase.max;

                return (
                  <li
                    key={phase.name}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-blue-50/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border-l-3 border-blue-600 dark:border-blue-500'
                        : isCompleted
                        ? 'text-gray-700 dark:text-slate-300'
                        : 'text-gray-400 dark:text-slate-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0" />
                    ) : isActive ? (
                      <Radio className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 fill-blue-600/20 animate-pulse" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300 dark:text-slate-700 shrink-0" />
                    )}
                    <span>{phase.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CURRENT CONTEXT */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono font-bold tracking-wider text-gray-400 dark:text-slate-500 uppercase">
            CURRENT CONTEXT
          </p>

          <div className="bg-white dark:bg-[#0B0F19]/80 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-4 space-y-3 shadow-2xs backdrop-blur-md">
            <div>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium mb-1.5">Topic Phase</p>
              <span className="font-mono text-xs font-semibold bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md border border-blue-100 dark:border-slate-700 block truncate">
                {activePhase.name}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium mb-1">Focus Target</p>
              <span className="text-xs font-medium text-gray-800 dark:text-slate-200 block truncate">
                {topicName}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium mb-1">Difficulty Level</p>
              <div className="flex items-center space-x-2 text-xs font-semibold text-gray-800 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>Adaptive AI ({activePhase.name})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Collapsible Accordion */}
      <div className="pt-4 border-t border-gray-200/80 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="w-full flex items-center justify-between text-xs font-medium text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>Interview Context Details</span>
          {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {detailsOpen && (
          <div className="mt-2.5 p-3 bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-xl text-[11px] text-gray-600 dark:text-slate-300 space-y-1.5 leading-snug">
            <p><strong className="text-gray-800 dark:text-white">Active Phase:</strong> Currently in {activePhase.name} phase (Question {activePhase.min}{activePhase.min !== activePhase.max ? `-${activePhase.max}` : ''} of {totalQuestions}).</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LiveInterviewSidebar;
