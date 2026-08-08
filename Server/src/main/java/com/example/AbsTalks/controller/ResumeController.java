package com.example.AbsTalks.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.AbsTalks.dto.ResumeAnalysisResponse;
import com.example.AbsTalks.service.PdfService;
import com.example.AbsTalks.service.ResumeService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final PdfService pdfService;
    private final ResumeService resumeService;

    @PostMapping(value="/analyze",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> analyze(
            @RequestParam MultipartFile resume){

        String resumeText = pdfService.extractText(resume);

        String analysis = resumeService.analyzeResume(resumeText);

        return ResponseEntity.ok(analysis);
    }
}