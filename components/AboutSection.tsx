import React from 'react';
import { User, ChevronRight, Zap, AlertCircle, TrendingUp, Target, Shield, Eye } from 'lucide-react';

const AboutSection: React.FC = () => {
  const handleScrollToManifesto = () => {
    const element = document.getElementById('manifesto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="w-full py-24 bg-slate-50 border-t border-gray-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Split Screen: Mission & Visual */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Why we built DeepAuth.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                In an era of deepfakes, clarity is power. We are a team of engineers and journalists dedicated to restoring trust. We don't just scan text; we analyze intent, context, and origin to give you the full picture.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={handleScrollToManifesto}
                className="text-slate-600 font-semibold hover:text-slate-800 flex items-center gap-1 transition-colors group"
              >
                Read our manifesto 
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Abstract Visual - Glowing Orb */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-slate-400/20 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Core Gradient Orb */}
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800 shadow-2xl overflow-hidden flex items-center justify-center group transform transition-transform hover:scale-105 duration-700 ease-out">
                {/* Internal Reflections */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-2xl rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-900/30 blur-xl rounded-full"></div>
                
                {/* Wireframe-ish Rings */}
                <div className="absolute inset-4 border border-white/20 rounded-full opacity-50"></div>
                <div className="absolute inset-16 border border-white/10 rounded-full opacity-30"></div>
                
                {/* Center Icon */}
                <Zap className="text-white w-16 h-16 drop-shadow-lg" strokeWidth={1.5} />
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-8 top-20 w-3 h-3 bg-slate-500 rounded-full blur-[1px]"></div>
              <div className="absolute -left-4 bottom-20 w-2 h-2 bg-slate-400 rounded-full blur-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Manifesto Section */}
        <div id="manifesto" className="mb-20 scroll-mt-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4">
              Our Manifesto
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The principles that guide everything we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ManifestoCard 
              icon={<Target className="text-slate-600" size={28} />}
              title="Truth First"
              description="We believe everyone deserves access to verified information. Misinformation erodes democracy, health, and trust. We're here to change that."
            />
            <ManifestoCard 
              icon={<Shield className="text-slate-600" size={28} />}
              title="Privacy Protected"
              description="Your searches are yours alone. We use end-to-end encryption and never store your verification history. Your curiosity stays private."
            />
            <ManifestoCard 
              icon={<Eye className="text-slate-600" size={28} />}
              title="Transparency Always"
              description="We show our work. Every verification comes with sources, confidence scores, and methodology. No black boxes here."
            />
          </div>
        </div>

        {/* Stats Cards - Integrated */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          <div className="bg-slate-900 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="text-slate-400" size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white tracking-tight">62%</h3>
              <p className="text-slate-400 text-sm">of digital content is unverified</p>
            </div>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
              <TrendingUp className="text-slate-400" size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white tracking-tight">6x</h3>
              <p className="text-slate-400 text-sm">faster misinformation spreads vs truth</p>
            </div>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <TeamCard 
            name="Adriel Babalola" 
            title="The Visionary" 
            role="-------"
          />
          <TeamCard 
            name="Olajide Ayomide" 
            title="Collaborator" 
            role="--------"
          />
        </div>
        
      </div>
    </section>
  );
};

interface TeamCardProps {
  name: string;
  title: string;
  role: string;
}

interface ManifestoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ManifestoCard: React.FC<ManifestoCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:border-slate-200 hover:-translate-y-1">
    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
      {icon}
    </div>
    <h4 className="font-bold text-gray-900 text-lg mb-3">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const TeamCard: React.FC<TeamCardProps> = ({ name, title, role }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:shadow-md transition-all duration-300 hover:border-slate-200">
    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
      <User size={20} />
    </div>
    <div className="text-left">
      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">{title}</div>
      <h3 className="font-bold text-gray-900 text-base">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

export default AboutSection;