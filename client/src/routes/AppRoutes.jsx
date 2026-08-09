import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import ResumeUploadPage from '../pages/ResumeUploadPage';
import ResumeAnalysisPage from '../pages/ResumeAnalysisPage';
import ResumeResultPage from '../pages/ResumeResultPage';
import InterviewPreparationPage from '../pages/InterviewPreparationPage';
import LiveInterviewPage from '../pages/LiveInterviewPage';
import InterviewReportPage from '../pages/InterviewReportPage';
import InterviewDisqualifiedPage from '../pages/InterviewDisqualifiedPage';
import InterviewIncompletePage from '../pages/InterviewIncompletePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/resume/upload" element={<ResumeUploadPage />} />
      <Route path="/resume/analyze" element={<ResumeAnalysisPage />} />
      <Route path="/resume/results" element={<ResumeResultPage />} />
      <Route path="/interview/preparation" element={<InterviewPreparationPage />} />
      <Route path="/interview/live" element={<LiveInterviewPage />} />
      <Route path="/interview/report" element={<InterviewReportPage />} />
      <Route path="/interview/disqualified" element={<InterviewDisqualifiedPage />} />
      <Route path="/interview/incomplete" element={<InterviewIncompletePage />} />
    </Routes>
  );
};

export default AppRoutes;
