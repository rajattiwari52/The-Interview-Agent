package com.example.AbsTalks.service;

import com.example.AbsTalks.dto.FinishInterviewRequest;
import com.example.AbsTalks.dto.FinishInterviewResponse;
import com.example.AbsTalks.dto.InterviewRequest;
import com.example.AbsTalks.dto.InterviewResponse;
import com.example.AbsTalks.dto.StartInterviewRequest;
import com.example.AbsTalks.dto.StartInterviewResponse;

public interface InterviewService {

    StartInterviewResponse startInterview(StartInterviewRequest request);

    InterviewResponse nextQuestion(InterviewRequest request);
    public String finishInterview(FinishInterviewRequest request);

}