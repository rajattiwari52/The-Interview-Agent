import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import ThemeToggle from '../../components/common/ThemeToggle';

const DisqualifiedHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800/80 py-3 px-6 md:px-12 flex items-center justify-between shrink-0 transition-colors duration-300 shadow-2xs">
      <div onClick={() => navigate('/')} className="cursor-pointer">
        <Logo />
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-xs font-mono font-medium text-gray-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-gray-200/60 dark:border-slate-700">
          Interview Session
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default DisqualifiedHeader;
