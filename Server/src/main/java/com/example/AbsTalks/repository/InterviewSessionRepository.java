package com.example.AbsTalks.repository;

import com.example.AbsTalks.model.InterviewSession;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InterviewSessionRepository {

    private final Map<String, InterviewSession> store = new ConcurrentHashMap<>();

    public InterviewSession save(InterviewSession session) {
        if (session.getId() == null || session.getId().isBlank()) {
            session.setId(UUID.randomUUID().toString());
        }
        store.put(session.getId(), session);
        return session;
    }

    public Optional<InterviewSession> findById(String id) {
        if (id == null) return Optional.empty();
        return Optional.ofNullable(store.get(id));
    }

    public List<InterviewSession> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(String id) {
        if (id != null) {
            store.remove(id);
        }
    }
}