import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import DisqualifiedHeader from '../features/interview/DisqualifiedHeader';
import DisqualifiedHeroCard from '../features/interview/DisqualifiedHeroCard';
import DisqualificationReasonCard from '../features/interview/DisqualificationReasonCard';
import DisqualificationSecurityDiagram from '../features/interview/DisqualificationSecurityDiagram';
import DisqualifiedStatusSummaryCard from '../features/interview/DisqualifiedStatusSummaryCard';
import DisqualificationTimeline from '../features/interview/DisqualificationTimeline';
import DisqualificationExplanationCard from '../features/interview/DisqualificationExplanationCard';
import DisqualifiedResultInvalidatedCard from '../features/interview/DisqualifiedResultInvalidatedCard';
import DisqualifiedNextStepsCard from '../features/interview/DisqualifiedNextStepsCard';
import DisqualifiedActionsBar from '../features/interview/DisqualifiedActionsBar';
import Footer from '../components/layout/Footer';

const InterviewDisqualifiedPage = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle GSAP stagger reveal animation on page load
      gsap.fromTo(
        '.disqualified-card',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060911] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-y-auto flex flex-col justify-between">
      <DisqualifiedHeader />

      <main ref={containerRef} className="flex-1 max-w-5xl w-full mx-auto px-4 pt-20 pb-12 space-y-6">
        <div className="disqualified-card">
          <DisqualifiedHeroCard />
        </div>

        <div className="disqualified-card">
          <DisqualificationReasonCard />
        </div>

        <div className="disqualified-card">
          <DisqualificationSecurityDiagram />
        </div>

        <div className="disqualified-card">
          <DisqualifiedStatusSummaryCard />
        </div>

        <div className="disqualified-card">
          <DisqualificationTimeline />
        </div>

        <div className="disqualified-card">
          <DisqualificationExplanationCard />
        </div>

        <div className="disqualified-card">
          <DisqualifiedResultInvalidatedCard />
        </div>

        <div className="disqualified-card">
          <DisqualifiedNextStepsCard />
        </div>

        <div className="disqualified-card">
          <DisqualifiedActionsBar />
        </div>
      </main>

      <Footer tagline="Proctoring System Active." />
    </div>
  );
};

export default InterviewDisqualifiedPage;
