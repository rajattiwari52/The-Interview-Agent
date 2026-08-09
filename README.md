# 🚀 IntervueAI - The AI Interview Agent

An AI-powered mock interview and resume evaluation platform designed to help candidates prepare for technical interviews with real-time adaptive questioning, ATS resume analysis, and detailed performance analytics.

---

## ✨ Key Features

* **📄 AI-Powered Resume Intelligence & ATS Analysis**
  * Extracts text from uploaded PDF resumes using **Apache PDFBox**.
  * Evaluates ATS compatibility scores, skill matching percentages, and experience depth.

* **🎤 Real-Time Adaptive AI Mock Interview**
  * Conducts personalized mock technical interviews tailored to candidate backgrounds and learning progress.
  * Uses an **Adaptive Questioning Engine** to dynamically adjust question complexity (Easy $\rightarrow$ Intermediate $\rightarrow$ Advanced) based on live responses.

* **💬 Dynamic Question Generation**
  * Replaces static question banks with real-time follow-up questions generated via the **Groq API** powered by **Llama 3.1 8B Instant**.

* **📊 Granular Post-Interview Feedback & Analytics**
  * Generates comprehensive post-interview performance reports:
    * **Overall Score Breakdown:** Technical Knowledge, Problem Solving, Communication, and Topic Understanding.
    * **Key Highlights:** Detailed breakdown of Strong Areas and Areas Needing Improvement.

* **☁️ Cloud Database & Scalable REST Architecture**
  * Stores candidate sessions, interview metrics, and profile data securely using **MongoDB Atlas**.
  * Fully secured RESTful APIs configured with **Spring Security** and **CORS**.

---

## 🛠️ Tech Stack

### **Backend**
* **Language & Framework:** Java 21, Spring Boot
* **Modules:** Spring Web, Spring Security, Spring WebFlux (WebClient), Spring Data MongoDB
* **Build Tool:** Maven
* **Database:** MongoDB Atlas (Cloud)
* **AI Engine:** Groq API (Llama 3.1 8B Instant)
* **PDF Processing:** Apache PDFBox
* **Utilities:** Lombok, Jackson

### **Frontend**
* **Core Framework & Build:** React 19 (v19.2.8), Vite (v8.2.0), React Router DOM (v7.18.2)
* **Styling & UI:** Tailwind CSS v4 (v4.3.3), Lucide React (v1.30.0)
* **Animations & Visual Effects:** Framer Motion (v13.0.0), GSAP (v3.15.0), Lenis Smooth Scroll (v1.3.26), OGL WebGL Shader Engine (v1.0.11)
* **Feature Components:** React Dropzone (v20.0.0), React Markdown (v10.1.0), Recharts (v3.10.1)
* **API Integration:** Axios (v1.19.0)
* **Testing:** Jest (v30.4.2), React Testing Library (v16.3.2)

### **Deployment & Tooling**
* **Backend Hosting:** Render
* **Frontend Hosting:** Vercel
* **API Testing:** Postman
* **Version Control:** Git, GitHub

---

## 📦 Backend Dependencies

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>

    <!-- PDF Processing -->
    <dependency>
        <groupId>org.apache.pdfbox</groupId>
        <artifactId>pdfbox</artifactId>
        <version>3.0.1</version>
    </dependency>

    <!-- Utilities -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
</dependencies>
```
# 🏗️ IntervueAI - System Architecture Diagram

Below is the end-to-end system architecture detailing candidate workflow, backend services, external integrations, data layer, and infrastructure.

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       INTERVUE AI SYSTEM ARCHITECTURE                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐    ┌────────────────────────────────────────────────────────────────────┐
│    1. CANDIDATE WORKFLOW     │    │                   2. SPRING BOOT REST BACKEND API                  │
├──────────────────────────────┤    ├────────────────────────────────────────────────────────────────────┤
│                              │    │                         API GATEWAY & ROUTING                      │
│ 1. Upload Resume (PDF)       │    │  [ POST /api/v1/auth/* ]   [ POST /api/v1/interview/* ] [ POST /api/v1/analysis/* ]
│    (Candidate uploads PDF)   │    │      (Auth APIs)                 (Interview Flow)            (Analytics)
│              │               │    ├────────────────────────────────────────────────────────────────────┤
│              ▼               │    │                         CORE SERVICES (Spring Boot)                │
│ 2. AI Resume Analytics       │    │  • Auth Service (JWT, OAuth2, User Mgmt)                           │
│    (Skills, Experience, ATS) │    │  • Resume Service (PDF Parsing, Apache PDFBox)                      │
│              │               │    │  • Interview Service (Question Flow, Session Mgmt)                 │
│              ▼               │    │  • Proctoring Service (Anti-Cheat, Tab Lock, Face/Audio Check)     │
│ 3. Verification Lobby        │    │  • Evaluation Service (Answer Evaluation, Scoring Engine)          │
│    (Device, Mic, Cam Check)  │    │  • Report Service (Report Generation, AI Insights)                 │
│              │               │    ├────────────────────────────────────────────────────────────────────┤
│              ▼               │    │                       ASYNCHRONOUS PROCESSING                      │
│ 4. Live AI Interview         │    │  [ Question Generator ] ──> [ Evaluation Engine ]                  │
│    (Adaptive Room)           │    │           │                             │                          │
│              │               │    │           ▼                             ▼                          │
│              ▼               │    │  [ Report Builder ]     ──> [ Notification Service ]               │
│ 5. Real-Time Answer Sub.     │    │────────────────────────────────────────────────────────────────────┤
│    (Voice & Text payloads)   │    │                          COMMON UTILITIES                           │
│              │               │    │  [ File Storage ] [ Cache ] [ Email/SMS ] [ Logging ] [ Config Server ]
│              ▼               │    │    (S3/MinIO)    (Redis)   (Service)    (Monitoring) (Spring Cloud)  │
│ 6. Final Performance Report  │    └─────────────────────────────────┬──────────────────────────────────┘
│    (Evaluation & Score)      │                                      │
└──────────────┬───────────────┘                                      │
               │                                                      │
               └──────────────────────────┬───────────────────────────┘
                                          │
                                          ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            4. DATA LAYER                                               │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  POSTGRESQL (Primary Relational DB)                 │  MONGODB (Document DB)                           │
│  • users (id, name, email, role)                    │  • interview_sessions                            │
│  • interviews (id, user_id, status)                 │    (interviewId, candidateInfo, proctoringEvents)│
│  • questions (id, interview_id, topic)              │  • analytics_logs                                │
│  • answers (id, question_id, answer_text)           │    (interviewId, events, metrics, logs)          │
│  • scores (id, interview_id, total_score)           │                                                  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────┐    ┌─────────────────────────────────────────────────────────┐
│           3. EXTERNAL SERVICES          │    │                5. CROSS-CUTTING CONCERNS                │
├─────────────────────────────────────────┤    ├─────────────────────────────────────────────────────────┤
│ • AI / LLM Service                      │    │ • Security (JWT, OAuth2, Role Based Access Control)     │
│   (OpenAI / Gemini / Claude)            │    │ • Rate Limiting (API Throttling & Protection)          │
│ • Speech-to-Text                        │    │ • Audit Logging (Activity & Security Logs)              │
│   (Real-time voice transcription)       │    │ • Error Handling (Global Exception Management)          │
│ • Text-to-Speech                        │    │ • Monitoring (Health Checks & Metrics)                  │
│   (AI Voice Responses)                  │    └─────────────────────────────────────────────────────────┘
│ • Identity Provider                     │
│   (JWT / OAuth2 / OIDC Auth)            │    ┌─────────────────────────────────────────────────────────┐
│ • Video / Proctoring AI                 │    │               6. INFRASTRUCTURE & DEVOPS                │
│   (Face Detection, Gaze & Behavior)     │    ├─────────────────────────────────────────────────────────┤
└─────────────────────────────────────────┘    │ Frontend (React/TS) ──> API Server (Spring Boot)        │
                                               │   ──> PostgreSQL DB / MongoDB / Redis Cache             │
                                               │   ──> CI/CD Pipeline (GitHub Actions) ──> Prometheus/Grafana│
                                               └─────────────────────────────────────────────────────────┘

```

⚙️ Getting Started
    Prerequisites
     Java 21 or higher installed
    Node.js (v18+) and npm/pnpm installed
     MongoDB Atlas database URI
    Groq API Key


🔧 Setup Backend (Server)
    Navigate to the server folder: cd Server


Configure environment variables in src/main/resources/application.yml or application.properties:
      spring:
    data:
     mongodb:
       uri: your_mongodb_atlas_connection_string
   groq:
     api:
     key: your_groq_api_key
      url: [https://api.groq.com/openai/v1/chat/completions](https://api.groq.com/openai/v1/chat/completions)



Build and run the project:
    Bash
    mvn clean install
    mvn spring-boot:run

 🎨 Setup Frontend (Client)
         Navigate to the client directory: cd client
         Install dependencies: npm install
         Create a .env file in the client directory:VITE_API_BASE_URL=http://localhost:8080/api
         Start the development server: npm run dev
         The application will open on http://localhost:5173  

🌐 Deployment
       Backend: Deployed on Render using a Web Service environment.
       Frontend: Deployed on Vercel with automatic deployment pipeline configured from main.


📜 License
       This project is licensed under the MIT License.
         
