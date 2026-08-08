package com.example.AbsTalks.dto;

import java.util.List;

import lombok.Data;

@Data
public class ResumeAnalysisResponse {

    private int overallScore;

    private int atsCompatibility;

    private int skillsMatch;

    private int experienceMatch;

    private int keywordMatch;

    private List<String> strengths;

    private List<String> improvements;

    private List<String> matchedSkills;

    private List<String> recommendedSkills;

    private List<String> recommendations;

}