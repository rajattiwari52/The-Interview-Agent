import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Send, UserCheck, Sparkles, Volume2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import interviewService from '../../services/interviewService';

const LiveInterviewChat = ({ onSessionUpdate }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentCount, setCurrentCount] = useState(1);
  const [answeredCount, setAnsweredCount] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Start Real AI Interview API Session on Mount (POST /interview/start)
  useEffect(() => {
    const resumeAnalysis = localStorage.getItem('resumeAnalysis') || '';
    setIsTyping(true);

    interviewService
      .startInterview('Arnav', resumeAnalysis)
      .then((data) => {
        setIsTyping(false);
        if (data && data.question) {
          setSessionId(data.sessionId);
          if (data.sessionId) {
            localStorage.setItem('currentSessionId', data.sessionId);
          }
          const startCount = data.currentCount || 1;
          setCurrentCount(startCount);
          if (onSessionUpdate) {
            onSessionUpdate({
              currentCount: startCount,
              totalQuestions: data.totalQuestions || 8,
              answeredCount: 0,
            });
          }

          // Ensure Question 1 asks for Candidate Introduction cleanly
          let initialQuestion = data.question;
          if (startCount === 1 && !initialQuestion.toLowerCase().includes('introduce')) {
            initialQuestion = `Welcome to your technical interview! To begin, please **introduce yourself**—give a brief overview of your technical background, core skills, and key projects you have built.`;
          } else {
            initialQuestion = stripPhaseHeaders(initialQuestion);
          }

          setMessages([
            {
              id: Date.now(),
              sender: 'ai',
              name: 'AI Interviewer',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              text: initialQuestion,
            },
          ]);
        }
      })
      .catch((err) => {
        console.error('Backend start interview failed:', err);
        setIsTyping(false);
        setErrorMsg('Could not start live interview session. Please check if https://abstalk-1.onrender.com is running.');
      });
  }, [onSessionUpdate]);

  // Helper to strip any leading Phase headers, Question headers, or Q1 of 8 text
  const stripPhaseHeaders = (text = '') => {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/^(?:\s|\n|\r)*(?:\*\*)?(?:[a-zA-Z\s]+Phase\s*(?:\([^)]*\))?|[a-zA-Z\s]+Phase:?|Next Interview Question|Interview Question|Next Question|Question):\s*(?:\*\*)?(?:\s|\n|\r)*/gi, '')
      .replace(/^(?:\s|\n|\r)*(?:\*\*)?Introduction Phase\s*(?:\([^)]*\))?:\s*(?:\*\*)?(?:\s|\n|\r)*/gi, '')
      .replace(/^(?:\s|\n|\r)*(?:Since the candidate[^:]*:|I will ask[^:]*:|to verify their understanding:)\s*(?:\s|\n|\r)*/gi, '')
      .trim();
  };

  // Helper to detect if candidate's answer was evaluated as correct vs incorrect
  const isCorrectAnswer = (text = '') => {
    if (!text || typeof text !== 'string') return false;
    const lower = text.toLowerCase();
    if (lower.includes('incorrect') || lower.includes('fails to') || lower.includes('lack of') || lower.includes('no effort')) {
      return false;
    }
    return lower.includes('correct') || lower.includes('accurate') || lower.includes('good answer') || lower.includes('strong understanding');
  };

  // Helper to split raw AI response into Evaluation bubble and Next Question bubble
  const parseAIResponse = (text) => {
    if (!text || typeof text !== 'string') return { evalText: null, questionText: text };

    const cleaned = text.trim();

    // 1. Explicit question markers
    let questionMatch = cleaned.match(/(?:Next Interview Question|Interview Question|Next Question|Question:)/i);

    // 2. Evaluation transition patterns like "verify their understanding:" or "ask an easier question...:"
    if (!questionMatch) {
      questionMatch = cleaned.match(/(?:verify their understanding:|ask an easier question[^:]*:|follow-up question[^:]*:|ask a question[^:]*:)\s*\n+/i);
    }

    // 3. Fallback: Paragraph ending with "?" when text contains "Decision:"
    if (!questionMatch && cleaned.includes('Decision:')) {
      const lastParamIdx = cleaned.lastIndexOf('\n\n');
      if (lastParamIdx > 40 && cleaned.substring(lastParamIdx).includes('?')) {
        questionMatch = { index: lastParamIdx };
      }
    }

    if (questionMatch && questionMatch.index > 0) {
      const evalText = cleaned.substring(0, questionMatch.index).trim();
      let questionText = cleaned.substring(questionMatch.index).trim();

      questionText = stripPhaseHeaders(questionText);

      return {
        evalText: evalText.length > 5 ? evalText : null,
        questionText: questionText.length > 5 ? questionText : stripPhaseHeaders(cleaned),
      };
    }

    return { evalText: null, questionText: stripPhaseHeaders(cleaned) };
  };

  // Submit Candidate Answer (POST /interview/next)
  const handleSend = async () => {
    const textToSend = inputText.trim();
    if (!textToSend) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      name: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const nextCount = currentCount + 1;
    const nextAnswered = answeredCount + 1;
    setCurrentCount(nextCount);
    setAnsweredCount(nextAnswered);

    if (onSessionUpdate) {
      onSessionUpdate({
        currentCount: nextCount,
        answeredCount: nextAnswered,
        totalQuestions: 8,
      });
    }

    const PHASES = [
      { name: 'Introduction', min: 1, max: 1 },
      { name: 'Fundamentals', min: 2, max: 3 },
      { name: 'Technical Deep-Dive', min: 4, max: 5 },
      { name: 'Advanced Concepts', min: 6, max: 7 },
      { name: 'Final Assessment', min: 8, max: 8 },
    ];
    const currentPhase = PHASES.find((p) => nextCount >= p.min && nextCount <= p.max) || PHASES[0];

    if (sessionId) {
      try {
        const data = await interviewService.sendNextAnswer(sessionId, textToSend, nextCount, currentPhase.name);
        setIsTyping(false);

        // Immediate check: If this was the answer to Q8 (or 8+ answers submitted), exit and go to report!
        if (data.completed || nextAnswered >= 8 || nextCount > 8 || currentCount >= 8) {
          try {
            const reportData = await interviewService.finishInterview(sessionId);
            if (reportData) {
              localStorage.setItem('interviewReport', typeof reportData === 'string' ? reportData : JSON.stringify(reportData));
            }
          } catch (finishErr) {
            console.warn('Finish interview call error:', finishErr);
          }
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          navigate('/interview/report');
          return;
        }

        if (data) {
          if (data.currentCount) {
            setCurrentCount(data.currentCount);
            if (onSessionUpdate) {
              onSessionUpdate({
                currentCount: data.currentCount,
                answeredCount: nextAnswered,
                totalQuestions: data.totalQuestions || 8,
              });
            }
          }

          if (data.question) {
            const { evalText, questionText } = parseAIResponse(data.question);
            const now = Date.now();
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            setMessages((prev) => [
              ...prev,
              {
                id: now,
                sender: 'ai',
                name: 'AI Interviewer',
                time: timeStr,
                evalText: evalText,
                questionText: questionText,
                questionNum: data.currentCount || nextCount,
              },
            ]);
          }
        }
      } catch (err) {
        console.error('Send next answer API failed:', err);
        setIsTyping(false);
        setErrorMsg('Failed to send answer to backend API.');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-white dark:bg-[#060911] font-geist transition-colors duration-300">
      
      {/* Top Interviewer Sub-Header */}
      <div className="bg-gray-50/80 dark:bg-[#080C16]/80 border-b border-gray-200/80 dark:border-slate-800/80 px-6 py-3.5 flex items-center justify-between shrink-0 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="AI Interviewer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          <div>
            <h3 className="text-xs font-bold font-sans text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>AI Interviewer</span>
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span>Senior Engineer Mode</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-slate-400">
          <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
          <span className="font-mono text-[10px] hidden sm:inline">Audio Active</span>
        </div>
      </div>

      {/* Main Chat Timeline */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {errorMsg && (
          <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3.5 text-xs text-amber-800 dark:text-amber-300 flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="space-y-1.5">
            {/* Header info */}
            <div className={`flex items-center space-x-2 text-[11px] font-mono text-gray-400 dark:text-slate-500 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && (
                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="AI Interviewer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span>{msg.name}</span>
              <span>•</span>
              <span>{msg.time}</span>
            </div>

            {/* Message Bubble Grouping */}
            <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' ? (
                <div className="space-y-2.5 max-w-2xl w-full">
                  {/* 1. Evaluation of Previous Answer Card (Top) */}
                  {msg.evalText && (() => {
                    const isCorrect = isCorrectAnswer(msg.evalText);
                    return (
                      <div className={`rounded-2xl rounded-tl-xs p-4 shadow-2xs text-xs md:text-sm leading-relaxed space-y-2 font-sans [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 border ${
                        isCorrect
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 [&_strong]:font-bold [&_strong]:text-emerald-800 dark:[&_strong]:text-emerald-300'
                          : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300/70 dark:border-amber-900/60 text-gray-800 dark:text-slate-200 [&_strong]:font-bold [&_strong]:text-amber-800 dark:[&_strong]:text-amber-300'
                      }`}>
                        <div className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md inline-block mb-1 border ${
                          isCorrect
                            ? 'bg-emerald-100/90 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                            : 'bg-amber-100/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border-amber-300/80 dark:border-amber-800/80'
                        }`}>
                          {isCorrect ? '✅ Evaluation: Correct Answer' : '⚠️ Evaluation: Needs Improvement / Incorrect'}
                        </div>
                        <ReactMarkdown>{msg.evalText}</ReactMarkdown>
                      </div>
                    );
                  })()}

                  {/* 2. Next Question Card (Directly Below) */}
                  <div className="bg-white dark:bg-[#0B0F19] border border-blue-500/60 dark:border-blue-500/50 rounded-2xl p-4.5 shadow-2xs text-xs md:text-sm text-gray-900 dark:text-slate-100 leading-relaxed space-y-2 font-sans [&_strong]:font-bold [&_strong]:text-blue-600 dark:[&_strong]:text-blue-400 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4">
                    <h4 className="text-xs font-bold font-sans text-blue-600 dark:text-blue-400 mb-1.5">
                      Next Question:
                    </h4>
                    <ReactMarkdown>{msg.questionText || msg.text}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0066FF] text-white rounded-2xl rounded-tr-xs p-4 md:p-4.5 shadow-md text-xs md:text-sm leading-relaxed max-w-2xl font-sans whitespace-pre-line">
                  {msg.text}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-gray-400 dark:text-slate-500">
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="AI Interviewer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-gray-50/90 dark:bg-slate-900/90 border border-gray-200/80 dark:border-slate-800 rounded-2xl rounded-tl-xs px-4 py-2.5 text-xs text-gray-500 dark:text-slate-400 italic flex items-center space-x-2 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-spin" />
              <span>AI Interviewer is generating question...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Bottom Interactive Textarea Box */}
      <div className="p-4 md:p-6 bg-gray-50/50 dark:bg-[#080C16]/50 border-t border-gray-200/80 dark:border-slate-800/80 shrink-0">
        <div className="bg-white dark:bg-[#0B0F19] border border-gray-200/90 dark:border-slate-800 rounded-2xl p-3 md:p-4 shadow-sm backdrop-blur-md transition-all focus-within:border-blue-500 dark:focus-within:border-blue-500">
          
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            className="w-full bg-transparent border-0 text-xs md:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none resize-none font-geist"
          />

          <div className="pt-2 border-t border-gray-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Voice Toggle Action */}
            <button
              type="button"
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                isVoiceActive
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Mic className={`w-4 h-4 ${isVoiceActive ? 'text-blue-600 animate-pulse' : ''}`} />
              <span>Voice</span>
            </button>

            {/* Hint Text */}
            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500 tracking-wider">
              PRESS ENTER TO SEND • SHIFT + ENTER FOR A NEW LINE
            </span>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              className="bg-[#0066FF] hover:bg-blue-700 disabled:opacity-40 text-white font-medium px-5 py-2 rounded-xl text-xs font-geist transition-all shadow-md shadow-blue-600/20 flex items-center space-x-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LiveInterviewChat;
