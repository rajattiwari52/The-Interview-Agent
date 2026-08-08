import React from 'react';

const Footer = ({ tagline = "Engineered for precision." }) => {
  return (
    <footer className="w-full bg-white/90 dark:bg-slate-900/90 border-t border-gray-200/80 dark:border-slate-800 py-3.5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-slate-400 font-geist gap-3 shrink-0 transition-colors duration-300">
      <div>
        © 2024 IntervueAI. {tagline}
      </div>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
