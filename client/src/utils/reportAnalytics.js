/**
 * Utility function to parse raw AI evaluation response text and chat history
 * into structured Q&A breakdowns, dynamic metrics, topic scores, and executive summaries.
 */

export const parseQnAFromChatHistory = (chatHistory = []) => {
  if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
    return [];
  }

  const qna = [];
  let lastQuestionText = 'Introduction & Background';

  for (let i = 0; i < chatHistory.length; i++) {
    const msg = chatHistory[i];

    if (msg.sender === 'ai') {
      const qText = msg.questionText || msg.text;
      if (qText) {
        lastQuestionText = qText;
      }
    } else if (msg.sender === 'user') {
      const candidateAnswer = msg.text || '';
      const nextAiMsg = chatHistory[i + 1];
      const evaluation = nextAiMsg?.evalText || nextAiMsg?.text || 'Evaluated during technical interview session.';

      let status = 'needs_improvement';
      const evalLower = evaluation.toLowerCase();
      const answerLower = candidateAnswer.toLowerCase();

      if (
        evalLower.includes('correct') ||
        evalLower.includes('accurate') ||
        evalLower.includes('good answer') ||
        evalLower.includes('strong understanding') ||
        evalLower.includes('well explained')
      ) {
        status = 'correct';
      } else if (
        evalLower.includes('incorrect') ||
        evalLower.includes('wrong') ||
        evalLower.includes('fails to') ||
        evalLower.includes('lack of') ||
        evalLower.includes('no effort') ||
        answerLower.length < 5
      ) {
        status = 'incorrect';
      } else {
        status = 'needs_improvement';
      }

      qna.push({
        id: qna.length + 1,
        questionNum: qna.length + 1,
        question: lastQuestionText,
        candidateAnswer: candidateAnswer,
        evaluation: evaluation,
        status: status,
      });
    }
  }

  return qna;
};

// Fallback Q&A list if user opens report directly without chat history
const DEFAULT_QNA_LIST = [
  {
    id: 1,
    questionNum: 1,
    question: 'To begin, please introduce yourself—give a brief overview of your technical background, core skills, and key projects.',
    candidateAnswer: 'I am a Software Engineer with experience in React, Node.js, Java Spring Boot, and PostgreSQL. Built scalable microservices and real-time chat platforms.',
    evaluation: '✅ **Strong Introduction**: Candidate clearly articulated technical stack and relevant backend architecture experience.',
    status: 'correct',
  },
  {
    id: 2,
    questionNum: 2,
    question: 'Can you explain Dependency Injection in Spring Boot and why constructor injection is preferred over `@Autowired` on fields?',
    candidateAnswer: 'Dependency Injection lets Spring container manage object creation. Constructor injection is better because it allows immutability (final fields) and makes unit testing easier.',
    evaluation: '✅ **Correct & Precise**: Great answer highlighting immutability and testability benefits of constructor injection.',
    status: 'correct',
  },
  {
    id: 3,
    questionNum: 3,
    question: 'How do you prevent N+1 query problems in JPA / Hibernate when fetching entity relationships?',
    candidateAnswer: 'We can use `@EntityGraph` or `JOIN FETCH` in JPQL to eagerly fetch related entities in a single SQL query instead of N separate queries.',
    evaluation: '✅ **Correct**: Demonstrates clear understanding of database query optimization and JPA fetch strategies.',
    status: 'correct',
  },
  {
    id: 4,
    questionNum: 4,
    question: 'How does Redis cache eviction work with LRU vs LFU policies under high memory pressure?',
    candidateAnswer: 'LRU removes least recently used keys, while LFU removes keys used least frequently. Redis drops keys when maxmemory limit is reached.',
    evaluation: '⚠️ **Needs Improvement**: Basic distinction is correct, but candidate missed mentioning how frequency counters work in LFU vs timestamps in LRU and volatile-lru configuration settings.',
    status: 'needs_improvement',
  },
  {
    id: 5,
    questionNum: 5,
    question: 'Can you explain how Java Garbage Collection handles Memory Leaks caused by Static collection references?',
    candidateAnswer: 'Static variables are collected automatically when the method finishes running.',
    evaluation: '❌ **Incorrect**: Static references stay in GC Root memory for the entire JVM process lifetime, so referenced objects will NOT be garbage collected unless explicitly removed or cleared.',
    status: 'incorrect',
  },
];

export const calculateReportAnalytics = (rawReportText = '', rawChatHistory = null) => {
  const text = typeof rawReportText === 'string'
    ? rawReportText
    : (rawReportText?.overallEvaluation || rawReportText?.summary || JSON.stringify(rawReportText || ''));

  // 1. Parse Q&A List
  let chatHistory = rawChatHistory;
  if (!chatHistory) {
    try {
      const savedHistory = localStorage.getItem('interviewChatHistory');
      if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
      }
    } catch {
      chatHistory = null;
    }
  }

  let qnaList = parseQnAFromChatHistory(chatHistory);
  if (qnaList.length === 0) {
    qnaList = DEFAULT_QNA_LIST;
  }

  // 2. Compute dynamic stats from Q&A list
  const totalQuestions = qnaList.length;
  const correctCount = qnaList.filter((item) => item.status === 'correct').length;
  const partialCount = qnaList.filter((item) => item.status === 'needs_improvement').length;
  const incorrectCount = qnaList.filter((item) => item.status === 'incorrect').length;

  // 3. Dynamic Score Calculation based on answer correctness
  let score = Math.round(((correctCount * 100) + (partialCount * 60) + (incorrectCount * 20)) / Math.max(1, totalQuestions));

  // Override with explicit score match if text explicitly contains Overall Score
  const scoreMatch = text.match(/(?:Overall Score|Score|Rating):\s*(\d+)(?:\s*\/\s*100)?/i);
  if (scoreMatch) {
    score = Math.min(100, Math.max(0, parseInt(scoreMatch[1], 10)));
  }

  // 4. Performance Label & Badge
  let performanceLabel = 'Strong Performance';
  let badgeType = 'emerald';
  if (score >= 80) {
    performanceLabel = 'Exceptional Performance';
    badgeType = 'emerald';
  } else if (score >= 65) {
    performanceLabel = 'Proficient Candidate';
    badgeType = 'emerald';
  } else if (score >= 50) {
    performanceLabel = 'Moderate Technical Fit';
    badgeType = 'amber';
  } else {
    performanceLabel = 'Needs Technical Improvement';
    badgeType = 'amber';
  }

  // 5. Clean Executive Summary Quote
  let summaryQuote = '';
  const feedbackMatch = text.match(/Final Feedback:\s*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i);
  const recommendationMatch = text.match(/Recommendation:\s*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i);

  if (feedbackMatch && feedbackMatch[1]?.trim().length > 20) {
    summaryQuote = feedbackMatch[1].trim().replace(/\s+/g, ' ');
  } else if (recommendationMatch && recommendationMatch[1]?.trim().length > 20) {
    summaryQuote = recommendationMatch[1].trim().replace(/\s+/g, ' ');
  } else {
    summaryQuote = `Candidate answered ${totalQuestions} questions: ${correctCount} correct, ${partialCount} partial, and ${incorrectCount} incorrect. Overall evaluation indicates ${performanceLabel.toLowerCase()}.`;
  }

  // 6. Dynamic Metrics Row
  const techValue = Math.min(98, Math.max(25, Math.round(score * 1.04)));
  const probValue = Math.min(95, Math.max(20, Math.round(score * 0.96)));
  const commValue = Math.min(95, Math.max(30, Math.round((correctCount / totalQuestions) * 90 + 10)));
  const topicValue = Math.min(96, Math.max(25, Math.round(score * 1.02)));

  const metrics = [
    { name: 'Technical Knowledge', value: techValue },
    { name: 'Problem Solving', value: probValue },
    { name: 'Communication', value: commValue },
    { name: 'Topic Understanding', value: topicValue },
  ];

  // 7. Dynamic Topics Breakdown
  const topics = [
    {
      title: 'Core Fundamentals & Syntax',
      score: `${techValue}%`,
      status: techValue >= 70 ? 'Strong' : 'Needs Practice',
      positive: `Candidate correctly answered ${correctCount} core technical questions.`,
    },
    {
      title: 'Technical Communication & Clarity',
      score: `${commValue}%`,
      status: commValue >= 70 ? 'Proficient' : 'Needs Practice',
      positive: 'Clear technical descriptions provided during live interview questions.',
    },
    {
      title: 'System Architecture & Advanced Concepts',
      score: `${topicValue}%`,
      status: topicValue >= 70 ? 'Proficient' : 'Needs Practice',
      positive: incorrectCount > 0 ? `${incorrectCount} question(s) need deeper study on advanced edge cases.` : 'Strong grasp of system design patterns.',
    },
  ];

  return {
    score,
    performanceLabel,
    badgeType,
    summaryQuote,
    metrics,
    topics,
    qnaList,
    totalQuestions,
    correctCount,
    partialCount,
    incorrectCount,
  };
};

export default calculateReportAnalytics;
