import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Seo from '@/components/Seo';
import DownloadSection from '@/components/sections/DownloadSection';
import Features from '@/components/sections/Features';
import Hero from '@/components/sections/Hero';
import StoresSection from '@/components/sections/StoresSection.tsx';
import ValueProposition from '@/components/sections/ValueProposition';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  useRevealAnimation();

  return (
    <div className="min-h-screen">
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} path="/" />
      <Header />
      <main>
        <Hero />
        <StoresSection />
        <Features />
        <ValueProposition />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
