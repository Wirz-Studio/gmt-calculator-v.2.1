
import React from 'react';

const LeafIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 9.8 9.8 0 0 1 8 5" />
        <line x1="2" y1="13" x2="10" y2="13" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200/80 shadow-sm p-4">
      <div className="max-w-5xl mx-auto flex items-center space-x-4">
        <LeafIcon />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
          WirZ Assistant Chat
        </h1>
      </div>
    </header>
  );
};

export default Header;