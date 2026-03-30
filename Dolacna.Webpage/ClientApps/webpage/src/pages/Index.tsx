import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import DownloadSection from '@/components/sections/DownloadSection';
import Features from '@/components/sections/Features';
import Hero from '@/components/sections/Hero';
import StoresSection from '@/components/sections/StoresSection.tsx';
import ValueProposition from '@/components/sections/ValueProposition';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';

const Index = () => {
  useRevealAnimation();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <StoresSection />
        <ValueProposition />
        <Features />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
