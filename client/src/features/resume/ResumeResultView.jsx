import React from 'react';
import ResumeResultsPass from './ResumeResultsPass';
import ResumeResultsNeedsImprovement from './ResumeResultsNeedsImprovement';

const ResumeResultView = ({ evaluation, onRetry, onStartInterview }) => {
  // Evaluates criteria condition automatically
  const isPass =
    evaluation?.status === 'PASS' ||
    evaluation?.interviewEligible === true ||
    evaluation?.recommendation?.decision === 'PROCEED_TO_INTERVIEW' ||
    (evaluation?.totalScore != null && evaluation.totalScore >= 80);

  return isPass ? (
    <ResumeResultsPass evaluation={evaluation} onStartInterview={onStartInterview} />
  ) : (
    <ResumeResultsNeedsImprovement evaluation={evaluation} onRetry={onRetry} />
  );
};

export default ResumeResultView;
