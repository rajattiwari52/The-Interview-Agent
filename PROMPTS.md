# ⚙️ IntervueAI - Frontend Development Prompt Logs

---

### 🔹 Module 1: REST API Integration & Dynamic Resume Analytics
1. **API Integration Specification**: "Integrate the provided REST API endpoints into the application for resume parsing and analysis."
2. **Automated Testing Suite**: "Configure and execute unit and integration test suites using Jest."
3. **Resume Analysis & Workflow**: "Implement end-to-end resume upload processing. Upon PDF upload, send the file to the backend `/resume/analyze` endpoint, parse the analytical response payload dynamically, start the interview session, and purge all hardcoded dummy mock data."
4. **Environment Deployment Configuration**: "Set `https://abstalk-1.onrender.com` as the base production API service endpoint."
5. **Data Cleanup**: "Remove all static mock datasets and enforce real-time API response binding across components."
6. **Analytics Parsing Engine**: "Update `calculateRealAnalytics.js` to eliminate fallback mock skill arrays. Parse and render exact metric strings and competency scores returned by `POST /resume/analyze`."
7. **Pattern Extraction Strategy**: "Refactor response parsing logic to reliably extract structured candidate metrics from variable API text strings."
8. **API Error Handling & Debugging**: "Inspect current API error responses against the Postman collection specification and align payload schema handling accordingly."
9. **Endpoint Mapping**: "Configure base API URL to `https://abstalk-1.onrender.com` and map corresponding application routes to defined REST endpoints."
10. **Exception Resolution**: "Fix runtime network and payload parsing exceptions based on the specified backend endpoint contract."
11. **Conditional Route Navigation**: "Resolve analytics render issues. If candidate skills fall outside required eligibility criteria post-analysis, route the user to an appropriate status/rejection view."
12. **Protocol Verification**: "Verify whether real-time communication uses WebSockets or standard HTTP REST polling."

---

### 🔹 Module 2: Candidate Lobby, Fullscreen Guard & Proctoring System
13. **Route & Component Debugging**: "Investigate and resolve rendering issues preventing the Interview Preparation Lobby page from mounting."
14. **Fullscreen Guard Logic**: "Fix state synchronization so full-screen mode detection accurately reflects true browser viewport state."
15. **Viewport Cleanup on Exit**: "Ensure that exiting an active interview session automatically releases full-screen mode."
16. **Session Abandonment Handling**: "Implement fallback routing to redirect users to an incomplete/aborted session page if they exit prior to answering any question."
17. **Proctoring Bypass Toggle (Debug Mode)**: "Temporarily disable tab-switching and window-focus loss disqualification listeners during testing to allow uninhibited multi-tab debugging."
18. **Proctoring Guard Enforcement**: "Re-enable active proctoring guard event listeners (`visibilitychange`, `blur`, `fullscreenchange`) and disqualification rules."

---

### 🔹 Module 3: Live AI Interview Engine & Dynamic Chat UI
19. **Adaptive Question Progress**: "Increment the active question counter sequentially as new questions arrive from the AI interviewer."
20. **Question State Synchronization**: "Ensure the header and sidebar question counters update reliably on question transitions."
21. **Prompt Context Alignment**: "Ensure AI interviewer question generation strictly adheres to candidate skill profiles and operates deterministically."
22. **State Mutation Fix**: "Debug and fix state updates where question index failed to increment upon receiving subsequent interview questions."
23. **Markdown Parser Integration**: "Fix rich text rendering issues where inline AI Markdown syntax (such as bold headers `**...**`) failed to parse in the chat stream."
24. **Adaptive Interview Flow Control**: "Cap the live session at exactly 8 questions, ensuring Question 1 explicitly prompts for candidate self-introduction."
25. **Terminal Session Navigation**: "Automatically transition the candidate directly to the `/interview/report` route upon submission of the 8th answer."
26. **Structured Response UI**: "Refactor live chat UI to separate previous answer evaluations and newly generated questions into distinct, structured cards."
27. **Interviewer Response Decomposition**: "Decompose raw AI response strings into two stacked UI containers: an upper Evaluation Bubble and a lower Next Question Card."
28. **Dynamic Sentiment Styling**: "Apply conditional color coding to evaluation cards (e.g. green background/borders for correct answers)."
29. **Clean Chat Layout**: "Strip phase headers (e.g. 'Introduction Phase:') and redundant 'Question:' prefixes from interviewer card headers."
30. **Card Sub-Heading UI**: "Render a clean, standardized 'Next Question' label above every new question container."
31. **Completion Route Guard**: "Ensure answering the final question automatically terminates full-screen mode and redirects to the final evaluation report."

---

### 🔹 Module 4: Evaluation Engine & Automated Report Analytics
32. **Candidate Accuracy Report**: "Generate the final interview report dynamically, matching scores and feedback directly to actual candidate performance."
33. **Report View Simplification**: "Remove unnecessary UI widgets from the interview report page."
34. **Metrics Readability Optimization**: "Refine evaluation metrics layout and score scaling algorithms to present accurate, intuitive competency insights."
35. **Session Timeout Handler**: "On timer expiration (00:00), automatically terminate the session and render the final report based on questions answered up to that point."
36. **Question-Based Analytics Engine**: "Calculate dynamic report metrics, overall score, and topic proficiencies based on the exact count of correct, partial, and incorrect candidate responses."
37. **Detailed Breakdown Toggle**: "Remove the standalone granular question-by-question card list from the main report layout while retaining overall score calculations."



# ⚙️ IntervueAI - Backend Development Prompt Logs

### 🔹 Prompt 1: System Architecture Design
> "Design an AI Interview Agent using Spring Boot and React capable of conducting adaptive multi-turn technical interviews based on a candidate's resume."

---

### 🔹 Prompt 2: AI Resume Intelligence & ATS Analysis
> "Generate a professional AI Resume Analysis prompt that evaluates:
> - Resume Score
> - ATS Compatibility
> - Skills Match
> - Experience Match
> - Keyword Match
> - Strengths & Weaknesses
> - Recommended Skills & AI Recommendations"

---

### 🔹 Prompt 3: Initial Technical Question Generation
> "Generate interview questions only from the AI Resume Analysis.
> **Rules:**
> 1. Ask one question at a time.
> 2. Focus on resume strengths and verify claimed skills.
> 3. Ask project-specific questions.
> 4. Increase difficulty gradually.
> 5. Return only one interview question at a time."

---

### 🔹 Prompt 4: Adaptive Multi-Turn Follow-Up Engine
> "Generate adaptive follow-up interview questions using Previous Questions, Candidate Answers, and Resume Analysis.
> **Rules:**
> - If answer is correct, increase difficulty (Easy → Intermediate → Advanced).
> - If answer is weak, ask another question from the same topic or clarify.
> - Never repeat questions and strictly maintain interview context."

---

### 🔹 Prompt 5: Granular Interview Evaluation & Scoring
> "Generate comprehensive post-interview evaluation report evaluating:
> - Technical Skills, Communication, & Confidence
> - Verified Skills vs. Weak Skills
> - Recommendation, Overall Score, & Final Feedback
> **Rules:**
> - Score strictly based on demonstrated knowledge (No sympathy marks; wrong answer = 0 marks).
> - Recommendation must align deterministically with the final score."

---

### 🔹 Prompt 6: Spring Boot REST Architecture
> "Generate Spring Boot REST API endpoints for:
> - `POST /api/resume/analyze` (Resume Analysis)
> - `POST /api/interview/start` (Interview Start)
> - `POST /api/interview/next` (Adaptive Next Question)
> - `POST /api/interview/finish` (Session Completion & Report)"

---

### 🔹 Prompt 7: React & Tailwind UI Architecture
> "Generate modern React pages using Tailwind CSS v4 for:
> - Resume Upload Page
> - Resume Analysis Dashboard
> - Live Adaptive Interview Workspace
> - Post-Interview Feedback & Analytics Report"

---

### 🔹 Prompt 8: MongoDB Persistence Schema
> "Design a MongoDB document schema for candidate interview sessions storing:
> - Raw Resume & Extracted ATS Analysis
> - Session Question-Answer Logs & Dynamic Progress Metrics
> - Final Analytical Feedback & Category Scores"

---

### 🔹 Prompt 9: Groq API Integration (WebClient)
> "Configure non-blocking asynchronous Groq API (`llama-3.1-8b-instant`) integration using Spring WebFlux `WebClient`."

---

### 🔹 Prompt 10: Production Deployment
> "Configure deployment workflows for deploying the React frontend on Vercel and the Spring Boot backend service on Render."

---

## 🛠️ AI Tools Used
- **ChatGPT** (Prompt Engineering & System Architecture)
- **Groq API / Llama 3.1 8B** (Real-Time Inference Engine)
- **GitHub Copilot** (Code Generation & Refactoring)

---
