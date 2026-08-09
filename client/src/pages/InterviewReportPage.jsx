import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ReportHeroCard from '../features/report/ReportHeroCard';
import ReportMetricsRow from '../features/report/ReportMetricsRow';
import ReportTopicPerformance from '../features/report/ReportTopicPerformance';
import ReportAIInsights from '../features/report/ReportAIInsights';
import ReportActionFooter from '../features/report/ReportActionFooter';
import interviewService from '../services/interviewService';
import { calculateReportAnalytics } from '../utils/reportAnalytics';

const InterviewReportPage = () => {
  const [reportData, setReportData] = useState(() => {
    const saved = localStorage.getItem('interviewReport');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return saved;
    }
  });

  useEffect(() => {
    const sessionId = localStorage.getItem('currentSessionId');
    if (sessionId) {
      interviewService
        .finishInterview(sessionId)
        .then((res) => {
          if (res) {
            setReportData(res);
            localStorage.setItem('interviewReport', typeof res === 'string' ? res : JSON.stringify(res));
          }
        })
        .catch((err) => {
          console.warn('Backend finish interview API call failed:', err);
        });
    }
  }, []);

  // Compute clean, proportional analytics from real AI evaluation text
  const analytics = calculateReportAnalytics(reportData);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060911] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-y-auto flex flex-col justify-between font-geist">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-20 pb-12 space-y-6">
        {/* Top Hero Overview */}
        <ReportHeroCard
          score={analytics.score}
          performanceLabel={analytics.performanceLabel}
          badgeType={analytics.badgeType}
          summaryQuote={analytics.summaryQuote}
        />

        {/* Metrics Row */}
        <ReportMetricsRow metrics={analytics.metrics} />

        {/* Topic Breakdown */}
        <ReportTopicPerformance topics={analytics.topics} />

        {/* AI Evaluation Insights */}
        <ReportAIInsights insightText={typeof reportData === 'string' ? reportData : JSON.stringify(reportData || '')} />

        {/* Footer Actions */}
        <ReportActionFooter />
      </main>

      <Footer tagline="Built for engineers." />
    </div>
  );
};

export default InterviewReportPage;
