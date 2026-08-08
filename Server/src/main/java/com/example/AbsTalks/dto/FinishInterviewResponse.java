package com.example.AbsTalks.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinishInterviewResponse {

    private int overallScore;

    private int technicalScore;

    private int communicationScore;

    private int confidenceScore;

    private List<String> strengths;

    private List<String> weaknesses;

    private String recommendation;

    private String feedback;
}