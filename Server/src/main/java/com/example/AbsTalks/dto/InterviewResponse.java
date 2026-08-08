package com.example.AbsTalks.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InterviewResponse {

    private String question;

    private int currentQuestion;

    private int totalQuestions;

    private double progress;

    private String previousAnswer;
    private boolean completed;
}