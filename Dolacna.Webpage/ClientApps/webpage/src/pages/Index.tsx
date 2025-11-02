import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import DownloadSection from '@/components/sections/DownloadSection';
import Footer from '@/components/layout/Footer';
import StoresSection from '@/components/sections/StoresSection.tsx';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';

const Index = () => {
  useRevealAnimation();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <StoresSection />
        <Features />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
