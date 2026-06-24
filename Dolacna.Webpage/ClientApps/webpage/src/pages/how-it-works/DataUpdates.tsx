import InfoPageLayout from './components/InfoPageLayout';
import InfoSection from './components/InfoSection';
import { IllustrationMedia } from './components/InfoMedia';
import { useInfoSections } from './components/useInfoSections';

const DataUpdates = () => {
  const sections = useInfoSections('dataUpdatesPage');

  return (
    <InfoPageLayout namespace="dataUpdatesPage">
      {sections.map((section, idx) => (
        <InfoSection
          key={section.heading}
          {...section}
          index={idx}
          reverse={idx % 2 === 1}
          media={
            idx === 0 ? (
              <IllustrationMedia
                src="/images/howItWorks/undraw/undraw_data-analysis_b7cp.png"
                alt={section.heading}
              />
            ) : undefined
          }
        />
      ))}
    </InfoPageLayout>
  );
};

export default DataUpdates;
