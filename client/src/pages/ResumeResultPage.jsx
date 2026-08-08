import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Stepper from '../components/common/Stepper';
import ResumeResultView from '../features/resume/ResumeResultView';

const ResumeResultPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar showNavLinks={true} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <Stepper currentStep={3} steps={['Upload', 'Analyze', 'Results']} />
        <ResumeResultView />
      </main>

      <Footer tagline="Built for engineers." />
    </div>
  );
};

export default ResumeResultPage;
