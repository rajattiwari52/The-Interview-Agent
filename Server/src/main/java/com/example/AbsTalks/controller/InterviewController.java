package com.example.AbsTalks.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.AbsTalks.dto.FinishInterviewRequest;
import com.example.AbsTalks.dto.InterviewRequest;
import com.example.AbsTalks.dto.InterviewResponse;
import com.example.AbsTalks.dto.StartInterviewRequest;
import com.example.AbsTalks.dto.StartInterviewResponse;
import com.example.AbsTalks.service.InterviewService;
import com.example.AbsTalks.service.PdfService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    private final PdfService pdfService;

    @PostMapping("/start")
public ResponseEntity<StartInterviewResponse> startInterview(
        @RequestBody StartInterviewRequest request) {

    StartInterviewResponse response =
            interviewService.startInterview(request);

    return ResponseEntity.ok(response);
}

    @PostMapping("/next")
    public ResponseEntity<InterviewResponse> nextQuestion(
            @RequestBody InterviewRequest request) {

        return ResponseEntity.ok(interviewService.nextQuestion(request));
    }

    @PostMapping("/finish")
    public ResponseEntity<String> finishInterview(
            @RequestBody FinishInterviewRequest request) {

        return ResponseEntity.ok(interviewService.finishInterview(request));
    }

}