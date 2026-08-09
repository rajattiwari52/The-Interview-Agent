import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Maximize2, ShieldAlert, XCircle } from 'lucide-react';

const MAX_WARNINGS = 2;
// Set PROCTORING_ENABLED to true to enable proctoring & disqualification on tab switches
const PROCTORING_ENABLED = true;

const ProctoringGuard = ({ children, onDisqualify }) => {
  if (!PROCTORING_ENABLED) {
    return <>{children}</>;
  }

  const navigate = useNavigate();

  const [warningsCount, setWarningsCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [needsFullscreen, setNeedsFullscreen] = useState(false);

  // Helper to check if screen is currently in fullscreen mode
  const isCurrentlyFullscreen = () => {
    return Boolean(document.fullscreenElement || window.innerHeight === window.screen.height);
  };

  // Function to request fullscreen mode
  const enterFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      setNeedsFullscreen(false);
    } catch (err) {
      console.warn('Fullscreen request deferred or blocked:', err);
      if (isCurrentlyFullscreen()) {
        setNeedsFullscreen(false);
      } else {
        setNeedsFullscreen(true);
      }
    }
  }, []);

  // Initialize fullscreen check on mount
  useEffect(() => {
    if (isCurrentlyFullscreen()) {
      setNeedsFullscreen(false);
    } else {
      enterFullscreen();
    }
  }, [enterFullscreen]);

  // Handle Tab Switch & Window Focus Loss
  const triggerWarning = useCallback(() => {
    if (isDisqualified) return;

    setWarningsCount((prev) => {
      const nextCount = prev + 1;

      if (nextCount >= MAX_WARNINGS) {
        setIsDisqualified(true);
        if (onDisqualify) onDisqualify();
        return MAX_WARNINGS;
      } else {
        setShowWarningModal(true);
        return nextCount;
      }
    });
  }, [isDisqualified, onDisqualify]);

  // Listen to visibilitychange, blur, and fullscreenchange
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        triggerWarning();
      }
    };

    const handleWindowBlur = () => {
      // Only trigger if document is actually hidden or lost focus
      if (document.hidden) {
        triggerWarning();
      }
    };

    const handleFullscreenChange = () => {
      if (isCurrentlyFullscreen()) {
        setNeedsFullscreen(false);
      } else if (!isDisqualified) {
        setNeedsFullscreen(true);
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Block F12, Ctrl+Shift+I, Alt+Tab, etc.
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'c') ||
        (e.ctrlKey && e.key === 'v')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);

      // Automatically exit fullscreen when leaving the interview page
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [triggerWarning, isDisqualified]);

  return (
    <>
      {children}

      {/* 1. INITIAL / RE-ENTRY FULLSCREEN PROMPT MODAL */}
      {needsFullscreen && !isDisqualified && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 font-geist">
          <div className="bg-[#0B0F19] border border-blue-500/40 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl text-white">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto shadow-md">
              <Maximize2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold font-sans text-white">
                Fullscreen Required
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                To maintain interview integrity, IntervueAI requires full screen mode. Please click below to enter full screen and resume your session.
              </p>
            </div>

            <button
              type="button"
              onClick={enterFullscreen}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl text-xs font-geist transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Enter Fullscreen & Resume</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. TAB SWITCH / WINDOW BLUR WARNING MODAL (WARNING 1 of 2) */}
      {showWarningModal && !isDisqualified && (
        <div className="fixed inset-0 z-[110] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 font-geist">
          <div className="bg-[#0B0F19] border border-amber-500/50 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl text-white">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-md animate-pulse">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
                WARNING 1 OF {MAX_WARNINGS}
              </span>
              <h2 className="text-xl font-bold font-sans text-white">
                Tab or Window Switch Detected!
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                You navigated away from the interview screen. Navigating away or switching tabs is strictly prohibited during live evaluation.
              </p>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 text-[11px] font-mono text-amber-200">
              ⚠️ You have <strong>1 remaining chance</strong> before automatic disqualification.
            </div>

            <button
              type="button"
              onClick={() => {
                setShowWarningModal(false);
                enterFullscreen();
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs font-geist transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>I Understand & Continue</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. DISQUALIFIED MODAL (WARNING 2 REACHED) */}
      {isDisqualified && (
        <div className="fixed inset-0 z-[120] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 font-geist">
          <div className="bg-[#0B0F19] border border-red-500/50 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl text-white">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto shadow-lg">
              <XCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold px-3.5 py-1 rounded-full uppercase">
                SESSION DISQUALIFIED
              </span>
              <h2 className="text-2xl font-bold font-sans text-white">
                Interview Terminated
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                You exceeded the maximum allowed tab/window switches ({MAX_WARNINGS}/{MAX_WARNINGS}). Due to proctoring policy violations, your technical interview session has been terminated.
              </p>
            </div>

            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-3.5 text-xs text-red-300 font-mono">
              Proctoring Status: Disqualified (2 Violations Recorded)
            </div>

            <button
              type="button"
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen().catch(() => {});
                }
                navigate('/interview/disqualified');
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl text-xs font-geist transition-all shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>View Disqualification Details</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProctoringGuard;
