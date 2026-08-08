package com.example.AbsTalks.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackResponse {

    private int score;

    private String feedback;

    private String strengths;

    private String improvements;

}