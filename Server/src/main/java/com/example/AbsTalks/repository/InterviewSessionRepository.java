package com.example.AbsTalks.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.AbsTalks.model.InterviewSession;

public interface InterviewSessionRepository
        extends MongoRepository<InterviewSession, String> {

}