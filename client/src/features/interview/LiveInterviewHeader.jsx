import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Clock } from 'lucide-react';
import Logo from '../../components/common/Logo';
import ThemeToggle from '../../components/common/ThemeToggle';
import interviewService from '../../services/interviewService';

const LiveInterviewHeader = ({ questionNum = 1, totalQuestions = 8, answeredCount = 0 }) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(600); // 10:00 timer for session

  // Timeout handler when timer hits 00:00
  const handleTimeout = async () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    if (answeredCount === 0) {
      navigate('/interview/incomplete');
      return;
    }

    const sessionId = localStorage.getItem('currentSessionId');
    if (sessionId) {
      try {
        const reportData = await interviewService.finishInterview(sessionId);
        if (reportData) {
          localStorage.setItem('interviewReport', typeof reportData === 'string' ? reportData : JSON.stringify(reportData));
        }
      } catch (err) {
        console.warn('Timeout finish interview error:', err);
      }
    }
    navigate('/interview/report');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answeredCount]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the interview session?')) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      if (answeredCount === 0) {
        navigate('/interview/incomplete');
      } else {
        navigate('/interview/report');
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800/80 py-3 px-6 md:px-8 flex items-center justify-between shrink-0 transition-colors duration-300 shadow-2xs">
      {/* Left Logo */}
      <div
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          if (answeredCount === 0) {
            navigate('/interview/incomplete');
          } else {
            navigate('/');
          }
        }}
        className="cursor-pointer"
      >
        <Logo />
      </div>

      {/* Center Title */}
      <div className="hidden sm:block text-xs md:text-sm font-semibold font-sans text-gray-800 dark:text-slate-200">
        Technical Interview
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4 text-xs font-mono font-medium text-gray-600 dark:text-slate-300">
        {/* Question Counter */}
        <span className="text-gray-500 dark:text-slate-400">
          Q<span className="text-gray-900 dark:text-white font-bold">{questionNum}</span> of {totalQuestions}
        </span>

        <span className="text-gray-300 dark:text-slate-700">|</span>

        {/* Timer */}
        <div className={`flex items-center space-x-1.5 ${seconds < 60 ? 'text-red-600 dark:text-red-400 font-bold animate-pulse' : 'text-gray-700 dark:text-slate-300'}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(seconds)}</span>
        </div>

        <span className="text-gray-300 dark:text-slate-700">|</span>

        <ThemeToggle />

        {/* Exit Action */}
        <button
          type="button"
          onClick={handleExit}
          className="flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold font-sans transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
};

export default LiveInterviewHeader;
