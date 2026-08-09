import React, { useState, useCallback } from 'react';
import LiveInterviewHeader from '../features/interview/LiveInterviewHeader';
import LiveInterviewSidebar from '../features/interview/LiveInterviewSidebar';
import LiveInterviewChat from '../features/interview/LiveInterviewChat';
import ProctoringGuard from '../features/interview/ProctoringGuard';

const LiveInterviewPage = () => {
  const [sessionState, setSessionState] = useState({
    currentCount: 1,
    totalQuestions: 8,
    answeredCount: 0,
  });

  const handleSessionUpdate = useCallback((update) => {
    setSessionState((prev) => ({
      ...prev,
      ...update,
    }));
  }, []);

  return (
    <ProctoringGuard>
      <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#F8FAFC] dark:bg-[#060911] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Fixed Header */}
        <LiveInterviewHeader
          questionNum={sessionState.currentCount}
          totalQuestions={sessionState.totalQuestions}
          answeredCount={sessionState.answeredCount}
        />

        {/* Main Container below Header */}
        <div className="flex-1 flex flex-col md:flex-row pt-16 overflow-hidden">
          {/* Left Sidebar */}
          <LiveInterviewSidebar
            currentCount={sessionState.currentCount}
            totalQuestions={sessionState.totalQuestions}
          />

          {/* Right Main Chat */}
          <LiveInterviewChat onSessionUpdate={handleSessionUpdate} />
        </div>
      </div>
    </ProctoringGuard>
  );
};

export default LiveInterviewPage;
