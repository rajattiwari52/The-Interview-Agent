import api from '../services/api';
import resumeService from '../services/resumeService';
import interviewService from '../services/interviewService';

jest.mock('../services/api');

describe('Services API Integration Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('resumeService.analyseResume sends FormData to /resume/analyse', async () => {
    const mockResponse = {
      data: {
        overallAnalysis: 'Overall Resume Score: 80/100',
        atsCompatibility: 80,
      },
    };
    api.post.mockResolvedValueOnce(mockResponse);

    const mockFile = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const result = await resumeService.analyseResume(mockFile);

    expect(api.post).toHaveBeenCalledWith(
      '/resume/analyse',
      expect.any(FormData),
      expect.objectContaining({
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    expect(result).toEqual(mockResponse.data);
  });

  test('interviewService.startInterview calls POST /interview/start', async () => {
    const mockStartResponse = {
      data: {
        sessionId: 'session_123',
        question: 'What is Dependency Injection?',
        currentCount: 1,
        totalQuestions: 10,
      },
    };
    api.post.mockResolvedValueOnce(mockStartResponse);

    const result = await interviewService.startInterview('Vansh', 'analysis_string');

    expect(api.post).toHaveBeenCalledWith('/interview/start', {
      candidateName: 'Vansh',
      resumeAnalysis: 'analysis_string',
    });
    expect(result).toEqual(mockStartResponse.data);
  });

  test('interviewService.sendNextAnswer calls POST /interview/next', async () => {
    const mockNextResponse = {
      data: {
        sessionId: 'session_123',
        question: 'Follow up on Spring Beans?',
        currentCount: 2,
        totalQuestions: 10,
        completed: false,
      },
    };
    api.post.mockResolvedValueOnce(mockNextResponse);

    const result = await interviewService.sendNextAnswer('session_123', 'My answer');

    expect(api.post).toHaveBeenCalledWith('/interview/next', {
      sessionId: 'session_123',
      answer: 'My answer',
    });
    expect(result).toEqual(mockNextResponse.data);
  });
});
