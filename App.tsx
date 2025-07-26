import React, { useState } from 'react';
import TaxCalculator from './TaxCalculator';
import ChatWindow from './components/ChatWindow';

// Nature-themed leaf icon
const LeafIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 9.8 9.8 0 0 1 8 5" />
        <line x1="2" y1="13" x2="10" y2="13" />
    </svg>
);


const App: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="relative min-h-screen">
            <TaxCalculator />

            {/* Floating Chat Button */}
            {!isChatOpen && (
                 <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40 flex items-center py-3 pl-4 pr-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-l-full shadow-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300"
                    aria-label="Ask WirZ Assistant for a detailed explanation"
                >
                    <LeafIcon className="h-7 w-7 flex-shrink-0" />
                    <div className="ml-3 text-left">
                        <p className="font-bold text-base leading-tight">WirZ Assistant</p>
                        <p className="text-xs leading-tight">Ask for details</p>
                    </div>
                </button>
            )}
            
            {/* Chat Window Overlay */}
            <div className={`
                fixed inset-0 sm:inset-auto sm:top-1/2 sm:right-8 sm:transform sm:-translate-y-1/2 
                z-50 transition-all duration-300 ease-in-out
                ${isChatOpen 
                    ? 'opacity-100' 
                    : 'opacity-0 translate-y-full sm:translate-y-0 sm:translate-x-16 pointer-events-none'
                }`}
            >
                {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
            </div>

             {/* Backdrop for mobile */}
            {isChatOpen && <div className="fixed inset-0 bg-black/30 z-40 sm:hidden" onClick={() => setIsChatOpen(false)}></div>}
        </div>
    );
};

export default App;