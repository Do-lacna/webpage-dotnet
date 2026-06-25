import InfoPageLayout from './components/InfoPageLayout';
import InfoSection from './components/InfoSection';
import RelatedTopics from './components/RelatedTopics';
import { CardsMedia, ScreenshotMedia } from './components/InfoMedia';
import { useInfoSections } from './components/useInfoSections';

const IMG = '/images/howItWorks/cart';

const CheapestCart = () => {
  const sections = useInfoSections('cheapestCartPage');

  return (
    <InfoPageLayout namespace="cheapestCartPage">
      {/* Add supported categories */}
      <InfoSection
        {...sections[0]}
        index={0}
        centerMedia
        media={
          <ScreenshotMedia
            srcs={[`${IMG}/IMG_4874.PNG`]}
            alt={sections[0]?.heading}
          />
        }
      >
        <RelatedTopics
          links={[
            {
              to: '/HowItWorks/categories',
              labelKey: 'categoriesPage.title',
              descriptionKey: 'categoriesPage.subtitle',
            },
          ]}
        />
      </InfoSection>

      {/* Or add specific products */}
      <InfoSection
        {...sections[1]}
        index={1}
        reverse
        centerMedia
        media={
          <ScreenshotMedia
            srcs={[`${IMG}/IMG_4883.PNG`]}
            alt={sections[1]?.heading}
          />
        }
      />

      {/* Replacing with the cheapest variant */}
      <InfoSection
        {...sections[2]}
        index={2}
        centerMedia
        media={
          <ScreenshotMedia
            srcs={[`${IMG}/IMG_4884.PNG`]}
            alt={sections[2]?.heading}
          />
        }
      />

      {/* How comparison sorting works */}
      <InfoSection {...sections[3]} index={3} />

      {/* The result: the cheapest cart */}
      <InfoSection
        {...sections[4]}
        index={4}
        reverse
        media={
          <CardsMedia
            srcs={[`${IMG}/IMG_4885.JPEG`, `${IMG}/IMG_4886.JPEG`]}
            alt={sections[4]?.heading}
          />
        }
      />
    </InfoPageLayout>
  );
};

export default CheapestCart;
