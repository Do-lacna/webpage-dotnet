import { useTranslation } from 'react-i18next';
import InfoPageLayout from './components/InfoPageLayout';
import InfoSection from './components/InfoSection';
import RelatedTopics from './components/RelatedTopics';
import CategoryList, { type CategoryGroup } from './components/CategoryList';
import { IllustrationMedia } from './components/InfoMedia';
import { useInfoSections } from './components/useInfoSections';

const Categories = () => {
  const { t } = useTranslation();
  const sections = useInfoSections('categoriesPage');
  const categoryGroups = t('categoriesPage.categoryList.groups', {
    returnObjects: true,
  }) as CategoryGroup[];

  return (
    <InfoPageLayout namespace="categoriesPage">
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

      <CategoryList
        title={t('categoriesPage.categoryList.title')}
        subtitle={t('categoriesPage.categoryList.subtitle')}
        emptyLabel={t('categoriesPage.categoryList.emptyLabel')}
        groups={categoryGroups}
      />

      <RelatedTopics
        links={[
          {
            to: '/HowItWorks/cheapest-cart',
            labelKey: 'cheapestCartPage.title',
            descriptionKey: 'cheapestCartPage.subtitle',
          },
        ]}
      />
    </InfoPageLayout>
  );
};

export default Categories;
