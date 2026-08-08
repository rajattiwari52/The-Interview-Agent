/**
 * Calculate dynamic real analytics percentages and metrics from backend API evaluation payload.
 */
export const calculateRealAnalytics = (evaluation) => {
  if (!evaluation) return null;

  const criteria = evaluation.criteria || {};

  // Technical skill match percentage
  const techSkill = criteria.technicalSkillRelevance;
  const skillsMatch = techSkill && techSkill.maxScore > 0
    ? Math.round((techSkill.score / techSkill.maxScore) * 100)
    : 80;

  // Project depth & practical experience match percentage
  const proj = criteria.projectDepth;
  const exp = criteria.practicalExperience;
  const projPct = proj && proj.maxScore > 0 ? (proj.score / proj.maxScore) * 100 : 80;
  const expPct = exp && exp.maxScore > 0 ? (exp.score / exp.maxScore) * 100 : 75;
  const experienceMatch = Math.round((projPct + expPct) / 2);

  // Curriculum & keyword alignment percentage
  const curr = criteria.curriculumAlignment;
  const keywordMatch = curr && curr.alignmentPercentage != null
    ? curr.alignmentPercentage
    : curr && curr.maxScore > 0
    ? Math.round((curr.score / curr.maxScore) * 100)
    : 85;

  // ATS Compatibility percentage
  const consistency = criteria.technicalConsistency;
  const completeness = criteria.resumeCompleteness;
  const consistencyPct = consistency && consistency.maxScore > 0 ? (consistency.score / consistency.maxScore) * 100 : 70;
  const completenessPct = completeness && completeness.maxScore > 0 ? (completeness.score / completeness.maxScore) * 100 : 80;
  const atsMatch = Math.round((consistencyPct + completenessPct + (evaluation.totalScore || 80)) / 3);

  return {
    totalScore: evaluation.totalScore ?? 80,
    status: evaluation.status || (evaluation.totalScore >= 80 ? 'PASS' : 'NEEDS_IMPROVEMENT'),
    isPass:
      evaluation.status === 'PASS' ||
      evaluation.interviewEligible === true ||
      evaluation.recommendation?.decision === 'PROCEED_TO_INTERVIEW' ||
      (evaluation.totalScore != null && evaluation.totalScore >= 80),
    atsMatch,
    skillsMatch,
    experienceMatch,
    keywordMatch,
    matchedSkills: techSkill?.matchedSkills || [],
    missingSkills: techSkill?.missingSkills || [],
    strengths: evaluation.strengths || [],
    weakAreas: evaluation.weakAreas || [],
    decision: evaluation.recommendation?.decision,
    reason: evaluation.recommendation?.reason,
  };
};
