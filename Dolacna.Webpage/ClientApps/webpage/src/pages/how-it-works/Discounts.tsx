import InfoPageLayout from './components/InfoPageLayout';
import InfoSection from './components/InfoSection';
import { IllustrationMedia } from './components/InfoMedia';
import { useInfoSections } from './components/useInfoSections';

const images: Record<number, string> = {
  0: '/images/howItWorks/custom/discount-tags.svg',
  1: '/images/howItWorks/custom/loyalty-cards.svg',
  2: '/images/howItWorks/custom/quantity-discount-2plus1.svg',
  3: '/images/howItWorks/custom/real-price-coins.svg',
};

const Discounts = () => {
  const sections = useInfoSections('discountsPage');

  return (
    <InfoPageLayout namespace="discountsPage">
      {sections.map((section, idx) => (
        <InfoSection
          key={section.heading}
          {...section}
          index={idx}
          reverse={idx % 2 === 1}
          media={
            images[idx] ? (
              <IllustrationMedia src={images[idx]} alt={section.heading} />
            ) : undefined
          }
        />
      ))}
    </InfoPageLayout>
  );
};

export default Discounts;
