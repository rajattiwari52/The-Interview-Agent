package com.example.AbsTalks.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Document(collection = "interview_sessions")
public class InterviewSession {

    @Id
    private String id;

    private String candidateId;

    private List<String> questions;
    private String resumeText;

    private List<String> answers;

    private int currentQuestion;

    private LocalDateTime startedAt;

    private boolean completed;

private String resumeAnalysis;

}
