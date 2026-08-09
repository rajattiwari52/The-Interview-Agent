import { calculateRealAnalytics } from '../utils/resumeAnalytics';

describe('calculateRealAnalytics Utility Unit Tests', () => {
  test('returns null when evaluation is null or undefined', () => {
    expect(calculateRealAnalytics(null)).toBeNull();
    expect(calculateRealAnalytics(undefined)).toBeNull();
  });

  test('correctly parses direct hackathon Postman API response', () => {
    const mockPostmanApiResponse = {
      overallAnalysis: 'Overall Resume Score: 85/100',
      atsCompatibility: 88,
      skillsMatch: 85,
      experienceMatch: 80,
      keywordMatch: 82,
      matchedSkills: ['Java', 'SpringBoot', 'MongoDB'],
      recommendedSkills: ['Docker', 'AWS'],
      strengths: ['Strong technical skills section'],
      areasOfImprovement: ['Lack of quantitative metrics'],
      status: 'OK',
    };

    const analytics = calculateRealAnalytics(mockPostmanApiResponse);

    expect(analytics).not.toBeNull();
    expect(analytics.totalScore).toBe(85);
    expect(analytics.isPass).toBe(true);
    expect(analytics.atsMatch).toBe(88);
    expect(analytics.skillsMatch).toBe(85);
    expect(analytics.experienceMatch).toBe(80);
    expect(analytics.keywordMatch).toBe(82);
    expect(analytics.matchedSkills).toEqual(['Java', 'SpringBoot', 'MongoDB']);
    expect(analytics.missingSkills).toEqual(['Docker', 'AWS']);
  });

  test('correctly evaluates low score as NEEDS_IMPROVEMENT', () => {
    const mockLowScoreResponse = {
      overallAnalysis: 'Overall Resume Score: 65/100',
      atsCompatibility: 60,
      skillsMatch: 55,
      experienceMatch: 50,
      keywordMatch: 60,
    };

    const analytics = calculateRealAnalytics(mockLowScoreResponse);

    expect(analytics.totalScore).toBe(65);
    expect(analytics.isPass).toBe(false);
    expect(analytics.status).toBe('NEEDS_IMPROVEMENT');
  });
});
