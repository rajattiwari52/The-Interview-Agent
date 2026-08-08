import api from './api';

export const resumeService = {
  /**
   * Upload resume file to backend API
   */
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Trigger real AI analysis for uploaded resume
   */
  analyzeResume: async (resumeId) => {
    const response = await api.post(`/resume/analyze/${resumeId}`);
    return response.data;
  },

  /**
   * Fetch evaluation analytics results
   */
  getEvaluationResults: async (resumeId) => {
    const response = await api.get(`/resume/results/${resumeId}`);
    return response.data;
  },
};

export default resumeService;
