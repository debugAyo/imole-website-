import React, { useState } from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import WaitlistModal from './WaitlistModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 selection:bg-slate-200 selection:text-slate-900 scroll-smooth">
      {/* Navbar */}
      <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <nav className="w-full px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
               <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">DeepAuth</span>
            <span className="hidden sm:inline-block text-gray-300 mx-2">|</span>
            <span className="hidden sm:inline-block text-gray-500 font-medium text-sm">Imolé</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="hidden md:block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Mission
            </a>
            <a 
              href="#demo" 
              onClick={(e) => handleSmoothScroll(e, 'demo')}
              className="hidden md:block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Demo
            </a>
            <button 
              onClick={() => setShowWaitlist(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
            >
              Install Extension
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-gray-900">Imolé.</span>
            <p className="text-sm text-gray-500">© 2025. Shining light on the truth.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-slate-700 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>

    {/* Waitlist Modal */}
    <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </>
  );
};

export default Layout;