package com.example.AbsTalks.service;

import org.springframework.stereotype.Service;

@Service
public class ResumeService {

    private final GroqService groqService;

    public ResumeService(GroqService groqService) {
        this.groqService = groqService;
    }

    public String analyzeResume(String resumeText) {

        String prompt = """
                You are an expert ATS Resume Analyzer and Career Coach.

                Analyze the following resume carefully.

                Return ONLY the response in the following format.

                ========================================

                Overall Resume Score: XX/100

                ATS Compatibility: XX%%

                Skills Match: XX%%

                Experience Match: XX%%

                Keyword Match: XX%%

                Matched Skills:
                - Skill 1
                - Skill 2
                - Skill 3

                Recommended Skills:
                - Skill 1
                - Skill 2
                - Skill 3

                Strengths:
                - Point 1
                - Point 2
                - Point 3

                Areas of Improvement:
                - Point 1
                - Point 2
                - Point 3

                AI Recommendations:
                1. Recommendation 1
                2. Recommendation 2
                3. Recommendation 3

                ========================================

                Rules:
                - Return ONLY the above format.
                - Do not use Markdown.
                - Do not use ** or #.
                - Keep recommendations concise.
                - Base everything only on the resume.

                Resume:

                %s
                """.formatted(resumeText);

        return groqService.askAI(prompt);
    }
}