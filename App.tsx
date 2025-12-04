import React from 'react';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DemoSection from './components/DemoSection';

const App: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <DemoSection />
    </Layout>
  );
};

export default App;