package com.example.AbsTalks.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.AbsTalks.dto.FinishInterviewRequest;
import com.example.AbsTalks.dto.InterviewRequest;
import com.example.AbsTalks.dto.InterviewResponse;
import com.example.AbsTalks.dto.StartInterviewRequest;
import com.example.AbsTalks.dto.StartInterviewResponse;
import com.example.AbsTalks.model.InterviewSession;
import com.example.AbsTalks.repository.InterviewSessionRepository;

@Service
public class InterviewServiceImpl implements InterviewService {

    private final InterviewSessionRepository repository;
    private final GroqService groqService;
    private final ResumeService resumeService;

    public InterviewServiceImpl(
            InterviewSessionRepository repository,
            GroqService groqService,
            ResumeService resumeService) {

        this.repository = repository;
        this.groqService = groqService;
        this.resumeService = resumeService;
    }

    @Override
public StartInterviewResponse startInterview(StartInterviewRequest request) {

    String analysis = request.getResumeAnalysis();

    String prompt = """
            You are an expert technical interviewer.

            Below is the AI Resume Analysis.

            ====================================

            %s

            ====================================

            Conduct a personalized interview.

            Rules:

            1. Verify every matched skill.

            2. Focus on Areas of Improvement.

            3. Ask project-based questions.

            4. Ask conceptual questions on Recommended Skills.

            5. Never ask random questions.

            6. Ask ONLY ONE interview question.

            7. Return ONLY the interview question.

            """
            .formatted(analysis);

    String firstQuestion = groqService.askAI(prompt);

    InterviewSession session = new InterviewSession();

    session.setCandidateId(request.getCandidateName());

    session.setResumeAnalysis(analysis);

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

    // Save current answer
    session.getAnswers().add(request.getAnswer());

    String prompt = """
            You are an expert technical interviewer.

            Resume Analysis:
            %s

            ====================================

            Previous Questions:
            %s

            ====================================

            Candidate Answers:
            %s

            ====================================

            Latest Answer:
            %s

            Your Tasks:

            1. Evaluate the latest answer.

            2. Decide whether the answer is:
               - Correct
               - Partially Correct
               - Incorrect

            3. If Correct:
               - Increase the difficulty.

            4. If Partially Correct:
               - Ask a follow-up question.

            5. If Incorrect:
               - Ask an easier question on the same topic.

            6. Continue verifying skills from the resume analysis.

            7. Ask ONLY ONE interview question.

            8. Return ONLY the interview question.
            """
            .formatted(
                    session.getResumeAnalysis(),
                    String.join("\n", session.getQuestions()),
                    String.join("\n", session.getAnswers()),
                    request.getAnswer()
            );

    String nextQuestion = groqService.askAI(prompt);

    session.getQuestions().add(nextQuestion);
    session.setCurrentQuestion(session.getCurrentQuestion() + 1);

    repository.save(session);

    int totalQuestions = 10;
    int currentQuestion = session.getCurrentQuestion() + 1;

    return InterviewResponse.builder()
            .question(nextQuestion)
            .previousAnswer(request.getAnswer())
            .currentQuestion(currentQuestion)
            .totalQuestions(totalQuestions)
            .progress((currentQuestion * 100.0) / totalQuestions)
            .completed(false)
            .build();
}
        @Override
    public String finishInterview(FinishInterviewRequest request) {

        InterviewSession session = repository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Interview Session Not Found"));

        String prompt = """
                You are an expert technical interviewer.

                Resume Analysis:

                %s

                ====================================

                Questions Asked:

                %s

                ====================================

                Candidate Answers:

                %s

                ====================================

                Evaluate the candidate.

                Verify whether the candidate actually possesses the
                skills mentioned in the resume analysis.

                Return ONLY the following format.

                Overall Score: XX/100

                Technical Skills:
                - ...

                Communication:
                - ...

                Confidence:
                - ...

                Verified Skills:
                - ...

                Weak Skills:
                - ...

                Recommendation:
                Hire / Maybe Hire / Reject

                Final Feedback:
                Write 4-5 concise sentences.

                Rules:

                1. Compare the answers with the resume analysis.

                2. Mention which claimed skills were actually demonstrated.

                3. Mention weak areas.

                4. Keep feedback concise.

                5. Do NOT use markdown.

                6. Return ONLY the evaluation.
                """
                .formatted(
                        session.getResumeAnalysis(),
                        String.join("\n", session.getQuestions()),
                        String.join("\n", session.getAnswers())
                );

        String feedback = groqService.askAI(prompt);

        session.setCompleted(true);

        repository.save(session);

        return feedback;
    }

}