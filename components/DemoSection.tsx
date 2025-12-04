import React from 'react';
import { Play } from 'lucide-react';

const DemoSection: React.FC = () => {
  return (
    <section id="demo" className="w-full py-24 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            See it in action.
          </h2>
          <p className="text-gray-500 text-lg">
            Watch how DeepAuth deconstructs bias in real-time.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video rounded-2xl shadow-2xl overflow-hidden bg-gray-900">
          <video 
            className="w-full h-full object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </section>
  );
};

export default DemoSection;