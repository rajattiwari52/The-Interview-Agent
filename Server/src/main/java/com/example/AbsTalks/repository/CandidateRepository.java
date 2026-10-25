package com.example.AbsTalks.repository;

import com.example.AbsTalks.model.Candidate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class CandidateRepository {

    private final Map<String, Candidate> store = new ConcurrentHashMap<>();

    public Optional<Candidate> findByEmail(String email) {
        if (email == null) return Optional.empty();
        return store.values().stream().filter(c -> email.equalsIgnoreCase(c.getEmail())).findFirst();
    }

    public Candidate save(Candidate candidate) {
        if (candidate.getId() == null || candidate.getId().isBlank()) {
            candidate.setId(UUID.randomUUID().toString());
        }
        store.put(candidate.getId(), candidate);
        return candidate;
    }

    public Optional<Candidate> findById(String id) {
        if (id == null) return Optional.empty();
        return Optional.ofNullable(store.get(id));
    }
}