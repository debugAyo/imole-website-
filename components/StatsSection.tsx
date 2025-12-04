import React from 'react';
import { AlertCircle } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="w-full bg-slate-900 border-y border-slate-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-6 md:gap-12">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="text-slate-400" size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tight">62%</h3>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">of digital content is unverified</p>
          </div>
        </div>

        <div className="hidden md:block w-px h-12 bg-slate-800"></div>

        <p className="text-lg text-slate-300 font-light max-w-lg">
          Misinformation spreads 6x faster than the truth. <br />
          <span className="text-white font-medium">Don't share until you check.</span>
        </p>

      </div>
    </section>
  );
};

export default StatsSection;