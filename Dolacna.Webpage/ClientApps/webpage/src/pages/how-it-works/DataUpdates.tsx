import type { ReactNode } from 'react';
import InfoPageLayout from './components/InfoPageLayout';
import InfoSection from './components/InfoSection';
import { IllustrationMedia } from './components/InfoMedia';
import { useInfoSections } from './components/useInfoSections';

const DataUpdates = () => {
  const sections = useInfoSections('dataUpdatesPage');

  const sectionMedia: Record<number, ReactNode> = {
    0: (
      <IllustrationMedia
        src="/images/howItWorks/undraw/undraw_online-calendar_zaoc.png"
        alt={sections[0]?.heading}
      />
    ),
    1: (
      <IllustrationMedia
        src="/images/howItWorks/custom/ai-leaflets.svg"
        alt={sections[1]?.heading}
      />
    ),
  };

  return (
    <InfoPageLayout namespace="dataUpdatesPage">
      {sections.map((section, idx) => (
        <InfoSection
          key={section.heading}
          {...section}
          index={idx}
          reverse={idx % 2 === 1}
          media={sectionMedia[idx]}
        />
      ))}
    </InfoPageLayout>
  );
};

export default DataUpdates;
