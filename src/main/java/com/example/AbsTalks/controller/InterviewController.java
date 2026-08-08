package com.example.AbsTalks.controller;

import com.example.AbsTalks.dto.FinishInterviewRequest;
import com.example.AbsTalks.dto.FinishInterviewResponse;
import com.example.AbsTalks.dto.InterviewRequest;
import com.example.AbsTalks.dto.InterviewResponse;
import com.example.AbsTalks.dto.StartInterviewRequest;
import com.example.AbsTalks.dto.StartInterviewResponse;
import com.example.AbsTalks.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/start")
    public StartInterviewResponse startInterview(
            @RequestBody StartInterviewRequest request) {

        return interviewService.startInterview(request);
    }

    @PostMapping("/next")
    public InterviewResponse nextQuestion(
            @RequestBody InterviewRequest request) {

        return interviewService.nextQuestion(request);
    }
 @PostMapping("/finish")
    public String finishInterview(
            @RequestBody FinishInterviewRequest request) {

        return interviewService.finishInterview(request);
    }
}