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

---

### 🔹 Module 5: Project Documentation & System Configuration
38. **Git Commit Formatting**: "Generate conventional Git commit messages summarizing recent proctoring and evaluation enhancements."
39. **Tech Stack Audit**: "Provide a comprehensive breakdown of all frontend frameworks, libraries, and tools utilized in the project."
40. **Documentation Formatting**: "Format technical stack documentation into a clean, structured visual layout."
41. **Code Block Export**: "Output documentation inside a single, copyable Markdown code block."
42. **Prompt History Logging**: "Extract and compile all user prompt logs across frontend development phases into a structured Markdown document."
43. **Prompt Localization**: "Translate all prompt logs into technical English."