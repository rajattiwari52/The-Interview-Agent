import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import Logo from '../../components/common/Logo';
import ThemeToggle from '../../components/common/ThemeToggle';

const FloatingNavbar = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth navbar entrance animation
      gsap.fromTo(
        navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none"
    >
      {/* Frosted Glassmorphism Floating Pill Container Matching Screenshot */}
      <div className="nav-glass-box w-full max-w-6xl rounded-2xl px-6 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 bg-white/80 dark:bg-[#0B0F19]/85 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800/80 shadow-lg text-gray-900 dark:text-white">
        {/* IntervueAI Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer group flex items-center"
        >
          <Logo />
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-geist font-medium text-gray-700 dark:text-slate-300">
          {['Product', 'How It Works', 'Features', 'For Candidates'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative py-1 hover:text-blue-600 dark:hover:text-white transition-colors group"
            >
              <span>{item}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-600 dark:bg-blue-400 transition-all duration-250 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => navigate('/resume/upload')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-medium px-4 py-2 rounded-xl text-xs font-geist transition-all shadow-md shadow-blue-600/20 flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default FloatingNavbar;
