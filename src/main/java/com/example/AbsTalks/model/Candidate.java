package com.example.AbsTalks.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "candidates")
public class Candidate {

    @Id
    private String id;

    private String name;

    private String email;

    private List<String> completedTopics;

    private List<String> skippedTopics;

    private int completedDays;

    private String currentLevel;

}