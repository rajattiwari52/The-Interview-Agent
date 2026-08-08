package com.example.AbsTalks.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StartInterviewResponse {

    private String sessionId;
    private String question;

}