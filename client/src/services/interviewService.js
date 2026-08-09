import api from './api';

export const interviewService = {
  /**
   * POST /interview/start
   * Start adaptive AI interview session
   * Request Body: { candidateName: string, resumeAnalysis: string }
   * Response: { sessionId: string, question: string, currentCount: number, totalQuestions: number, progress: number }
   */
  startInterview: async (candidateName = 'Candidate', resumeAnalysisText = '') => {
    let rawAnalysisString = '';
    if (typeof resumeAnalysisText === 'object' && resumeAnalysisText !== null) {
      rawAnalysisString = resumeAnalysisText.overallAnalysis || JSON.stringify(resumeAnalysisText);
    } else {
      rawAnalysisString = String(resumeAnalysisText || '');
    }

    const response = await api.post('/interview/start', {
      candidateName,
      resumeAnalysis: rawAnalysisString,
    });

    return response.data;
  },

  /**
   * POST /interview/next
   * Submit candidate answer and get next adaptive question
   * Request Body: { sessionId: string, answer: string, currentCount: number, phase: string }
   * Response: { sessionId: string, question: string, currentCount: number, totalQuestions: number, progress: number, completed: boolean }
   */
  sendNextAnswer: async (sessionId, candidateAnswer, currentCount = 1, phaseName = 'Introduction') => {
    const response = await api.post('/interview/next', {
      sessionId,
      answer: candidateAnswer,
      currentCount,
      phase: phaseName,
    });

    return response.data;
  },

  /**
   * POST /interview/finish
   * Finish the interview session and fetch report evaluation text
   * Request Body: { sessionId: string }
   * Response: Raw text or JSON evaluation report
   */
  finishInterview: async (sessionId) => {
    const response = await api.post('/interview/finish', {
      sessionId,
    });

    return response.data;
  },
};

export default interviewService;
