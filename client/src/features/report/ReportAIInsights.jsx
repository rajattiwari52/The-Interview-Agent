import React from 'react';
import { Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ReportAIInsights = ({
  insightText = 'Your strongest performance was in Java Fundamentals and OOP concepts. You demonstrated a clear understanding of inheritance and polymorphism. During the Spring Boot discussion, while you understood the core concepts, your explanation of bean lifecycles and dependency injection could be more precise. We recommend focusing on the Spring container\'s internal mechanics.',
}) => {
  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-7 shadow-sm dark:shadow-2xl backdrop-blur-md space-y-4 font-geist">
      <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
        <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500/20" />
        <h2 className="text-base font-bold font-sans">AI Interviewer Insights</h2>
      </div>

      <div className="bg-gray-50/80 dark:bg-slate-900/80 border border-gray-200/80 dark:border-slate-800 p-5 rounded-xl text-xs md:text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-sans space-y-2 [&_strong]:font-bold [&_strong]:text-blue-600 dark:[&_strong]:text-blue-400 [&_h3]:font-bold [&_h3]:text-gray-900 dark:[&_h3]:text-white [&_h3]:mt-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4">
        <ReactMarkdown>{insightText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReportAIInsights;
