package com.example.AbsTalks.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.AbsTalks.dto.*;
import com.example.AbsTalks.model.InterviewSession;
import com.example.AbsTalks.repository.InterviewSessionRepository;

@Service
public class InterviewServiceImpl implements InterviewService {

    private final InterviewSessionRepository repository;
    private final GroqService groqService;

    public InterviewServiceImpl(InterviewSessionRepository repository,
                                GroqService groqService) {
        this.repository = repository;
        this.groqService = groqService;
    }

    @Override
    public StartInterviewResponse startInterview(StartInterviewRequest request) {

        String prompt = """
                You are an expert technical interviewer.

                Candidate Name: %s
                Role: %s

                Ask ONLY the first interview question.
                Return only the question.
                """.formatted(
                request.getCandidateName(),
                request.getRole());

        String firstQuestion = groqService.askAI(prompt);

        InterviewSession session = new InterviewSession();

        session.setCandidateId(request.getCandidateName());
        session.setQuestions(new ArrayList<>(List.of(firstQuestion)));
        session.setAnswers(new ArrayList<>());
        session.setCurrentQuestion(0);
        session.setStartedAt(LocalDateTime.now());
        session.setCompleted(false);

        repository.save(session);

        return new StartInterviewResponse(
                session.getId(),
                firstQuestion
        );
    }

    @Override
    public InterviewResponse nextQuestion(InterviewRequest request) {

        InterviewSession session = repository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Interview Session Not Found"));

        session.getAnswers().add(request.getAnswer());

        String prompt = """
                You are an expert Java interviewer.

                Previous Questions:
                %s

                Candidate Answers:
                %s

                Ask ONLY the next interview question.
                Return only the question.
                """.formatted(
                session.getQuestions(),
                session.getAnswers());

        String nextQuestion = groqService.askAI(prompt);

        session.getQuestions().add(nextQuestion);
        session.setCurrentQuestion(session.getCurrentQuestion() + 1);

        repository.save(session);

        return InterviewResponse.builder()
                .question(nextQuestion)
                .build();
    }
@Override
public String finishInterview(FinishInterviewRequest request) {

    InterviewSession session = repository.findById(request.getSessionId())
            .orElseThrow(() -> new RuntimeException("Interview Session Not Found"));

    String prompt = """
            You are an expert technical interviewer.

            Analyze the complete interview.

            Questions:
            %s

            Answers:
            %s

            Evaluate the candidate.

            Return the response in this format:

            Overall Score: XX/100

            Technical Skills:
            - ...

            Communication:
            - ...

            Confidence:
            - ...

            Strengths:
            - Point 1
            - Point 2
            - Point 3

            Areas of Improvement:
            - Point 1
            - Point 2
            - Point 3

            Recommendation:
            Hire / Maybe / Reject

            Final Feedback:
            Write 3-5 concise sentences describing the candidate's performance and what they should improve.

            Rules:
            - Use simple English.
            - Use bullet points.
            - Do NOT use markdown.
            - Do NOT use **.
            """.formatted(
                    String.join("\n", session.getQuestions()),
                    String.join("\n", session.getAnswers())
            );

    String feedback = groqService.askAI(prompt);

    session.setCompleted(true);
    repository.save(session);

    return feedback;
}

}