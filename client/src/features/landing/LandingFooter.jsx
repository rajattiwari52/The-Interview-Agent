import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Logo from '../../components/common/Logo';

gsap.registerPlugin(ScrollTrigger);

const LandingFooter = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ft-col',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-white/80 dark:bg-gray-900/90 border-t border-gray-200/80 dark:border-gray-800 pt-16 pb-12 px-6 md:px-12 text-gray-600 dark:text-gray-400 font-geist text-xs backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-100 dark:border-gray-800">
        
        {/* Brand Column */}
        <div className="ft-col md:col-span-4 space-y-4">
          <Logo />

          <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-sm">
            AI-powered technical interviews built around the candidate's learning journey. Tailored, adaptive, and highly objective.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/resume/upload')}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Links Columns */}
        <div className="ft-col md:col-span-2 space-y-3">
          <h4 className="font-mono font-bold text-gray-900 dark:text-white uppercase text-[11px] tracking-wider">Product</h4>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            <li><a href="#how-it-works" className="hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Adaptive Engine</a></li>
            <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Resume Intelligence</a></li>
            <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Reports & Analytics</a></li>
          </ul>
        </div>

        <div className="ft-col md:col-span-2 space-y-3">
          <h4 className="font-mono font-bold text-gray-900 dark:text-white uppercase text-[11px] tracking-wider">Features</h4>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">AI Interviewer</a></li>
            <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Difficulty Meter</a></li>
            <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Curriculum Signals</a></li>
            <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Score Breakdown</a></li>
          </ul>
        </div>

        <div className="ft-col md:col-span-2 space-y-3">
          <h4 className="font-mono font-bold text-gray-900 dark:text-white uppercase text-[11px] tracking-wider">Resources</h4>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Candidates Guide</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Interview Prep</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">API Services</a></li>
          </ul>
        </div>

        <div className="ft-col md:col-span-2 space-y-3">
          <h4 className="font-mono font-bold text-gray-900 dark:text-white uppercase text-[11px] tracking-wider">Company</h4>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-gray-500 dark:text-gray-400 gap-4">
        <div>© 2024 IntervueAI Inc. Engineered for precision.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
