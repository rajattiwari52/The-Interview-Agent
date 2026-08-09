import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ReportTopicPerformance = ({ topics = [] }) => {
  const displayTopics = topics.length > 0 ? topics : [
    {
      title: 'Spring Boot & Microservices',
      score: '85%',
      status: 'Strong',
      positive: 'Demonstrated solid understanding of framework fundamentals and dependency injection.',
    },
    {
      title: 'REST APIs & Caching',
      score: '80%',
      status: 'Proficient',
      positive: 'Clear justification for API design patterns and cache management.',
    },
    {
      title: 'Data Persistence & Databases',
      score: '72%',
      status: 'Needs Practice',
      positive: 'Familiar with core queries, but needs practice with indexing and transaction management.',
    },
  ];

  return (
    <div className="space-y-3 font-geist">
      <h2 className="text-base font-bold font-sans text-gray-900 dark:text-white">
        Topic Performance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayTopics.map((topic, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-5 shadow-2xs backdrop-blur-md space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white font-sans truncate">
                {topic.title}
              </h3>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                  topic.status === 'Needs Practice' || topic.status === 'Weak'
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900'
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900'
                }`}
              >
                {topic.score} • {topic.status}
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed flex items-start space-x-2">
              {topic.status === 'Needs Practice' || topic.status === 'Weak' ? (
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <span>{topic.positive}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportTopicPerformance;
