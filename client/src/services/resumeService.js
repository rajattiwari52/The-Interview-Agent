import api from './api';

export const resumeService = {
  /**
   * POST /resume/analyze
   * Upload resume PDF/DOCX file (formData key: "resume")
   * Backend returns raw text analysis string or JSON object
   */
  analyzeResume: async (fileObj) => {
    const formData = new FormData();
    formData.append('resume', fileObj);

    const response = await api.post('/resume/analyze', formData);
    return response.data;
  },
};

export default resumeService;
