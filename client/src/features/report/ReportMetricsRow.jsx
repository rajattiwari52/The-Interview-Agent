import React from 'react';

const ReportMetricsRow = ({
  metrics = [
    { name: 'Technical Knowledge', value: 88 },
    { name: 'Problem Solving', value: 86 },
    { name: 'Communication', value: 82 },
    { name: 'Topic Understanding', value: 84 },
  ],
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-geist">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-xl p-5 shadow-2xs backdrop-blur-md transition-all flex flex-col justify-between space-y-3"
        >
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
              {metric.name}
            </p>
            <p className="text-2xl font-bold font-sans text-gray-900 dark:text-white">
              {metric.value}%
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${metric.value}%` }}
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-700 ease-out"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportMetricsRow;
