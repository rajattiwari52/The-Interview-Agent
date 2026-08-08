import React from 'react';

const Footer = ({ tagline = "Engineered for precision." }) => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-3.5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-geist gap-3 shrink-0">
      <div>
        © 2024 IntervueAI. {tagline}
      </div>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
