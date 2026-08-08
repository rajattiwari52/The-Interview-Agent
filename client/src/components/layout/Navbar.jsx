import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  return (
    <header className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 py-3 px-6 md:px-12 flex items-center justify-between shrink-0 sticky top-0 z-50 transition-colors duration-300">
      <Link to="/" className="hover:opacity-90 transition-opacity">
        <Logo />
      </Link>
      <div className="flex items-center space-x-3">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
