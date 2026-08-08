import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 py-3 px-6 md:px-12 flex items-center justify-between shrink-0 sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-90 transition-opacity font-sans">
        IntervueAI
      </Link>
    </header>
  );
};

export default Navbar;
