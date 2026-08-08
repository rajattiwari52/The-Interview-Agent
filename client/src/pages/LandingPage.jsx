import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FloatingNavbar from '../features/landing/FloatingNavbar';
import CinematicHero from '../features/landing/CinematicHero';
import ProblemSection from '../features/landing/ProblemSection';
import LearningJourney from '../features/landing/LearningJourney';
import AdaptiveInterviewSection from '../features/landing/AdaptiveInterviewSection';
import ResumeIntelligenceSection from '../features/landing/ResumeIntelligenceSection';
import InterviewReportSection from '../features/landing/InterviewReportSection';
import FeatureCardsGrid from '../features/landing/FeatureCardsGrid';
import BigStatementSection from '../features/landing/BigStatementSection';
import FinalCTA from '../features/landing/FinalCTA';
import LandingFooter from '../features/landing/LandingFooter';
import SoftAurora from '../components/ui/SoftAurora/SoftAurora';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // 2. Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM setup
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#060911] text-gray-900 dark:text-gray-100 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
      {/* Official React Bits SoftAurora Background Layer Matching Screenshot */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 dark:opacity-95">
        <SoftAurora
          speed={0.5}
          scale={1.4}
          brightness={1.2}
          color1="#2563EB"
          color2="#D946EF"
          noiseFrequency={2.2}
          noiseAmplitude={0.9}
          bandHeight={0.35}
          bandSpread={1.2}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={0.8}
          enableMouseInteraction={true}
          mouseInfluence={0.2}
        />
      </div>

      {/* Scrollable Content Layer */}
      <div className="relative z-10">
        <FloatingNavbar />
        <CinematicHero />
        <ProblemSection />
        <LearningJourney />
        <AdaptiveInterviewSection />
        <ResumeIntelligenceSection />
        <InterviewReportSection />
        <FeatureCardsGrid />
        <BigStatementSection />
        <FinalCTA />
        <LandingFooter />
      </div>
    </div>
  );
};

export default LandingPage;
