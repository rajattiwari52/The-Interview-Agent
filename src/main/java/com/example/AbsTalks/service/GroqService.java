package com.example.AbsTalks.service;

import com.example.AbsTalks.dto.GroqRequest;
import com.example.AbsTalks.dto.GroqResponse;
import com.example.AbsTalks.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroqService {

    private final WebClient webClient;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    public String askAI(String prompt) {

        GroqRequest request = new GroqRequest(
                model,
                List.of(
                        new Message("user", prompt)
                )
        );

        GroqResponse response = webClient
                .post()
                .uri(apiUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(GroqResponse.class)
                .block();

        if (response == null
                || response.getChoices() == null
                || response.getChoices().isEmpty()) {
            return "No response from Groq";
        }

        return response.getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}