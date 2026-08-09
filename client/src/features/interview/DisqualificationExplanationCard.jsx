import React from 'react';
import { HelpCircle } from 'lucide-react';

const DisqualificationExplanationCard = () => {
  return (
    <div className="bg-white dark:bg-[#0B0F19]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-2xl backdrop-blur-md font-geist space-y-3 max-w-3xl mx-auto">
      <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
        <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <h3 className="text-sm font-bold font-sans">Why did this happen?</h3>
      </div>

      <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
        During the interview, you are expected to remain on the IntervueAI interview screen. Changing browser tabs, windows, or navigating away from the interview may trigger an automatic disqualification.
      </p>

      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium pt-1 border-t border-gray-100 dark:border-slate-800">
        This helps maintain a fair and consistent assessment for every candidate.
      </p>
    </div>
  );
};

export default DisqualificationExplanationCard;
