import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import InfoPageLayout from './components/InfoPageLayout';
import InfoSection from './components/InfoSection';
import RelatedTopics from './components/RelatedTopics';
import CategoryList, { type CategoryGroup } from './components/CategoryList';
import { IllustrationMedia } from './components/InfoMedia';
import { useInfoSections } from './components/useInfoSections';
import { CATEGORY_TAXONOMY } from './components/categoriesTaxonomy';

const Categories = () => {
  const { t } = useTranslation();
  const categoryGroups: CategoryGroup[] = CATEGORY_TAXONOMY.map((category) => ({
    name: t(`categoriesPage.categoryList.names.${category.key}`),
    subgroups: category.subgroups,
  }));

  const subcategoryCount = CATEGORY_TAXONOMY.reduce(
    (total, category) =>
      total +
      category.subgroups.reduce(
        (sum, subgroup) => sum + subgroup.items.length,
        0,
      ),
    0,
  );
  const approxCount = Math.round(subcategoryCount / 10) * 10;

  const sections = useInfoSections('categoriesPage').map((section) => ({
    ...section,
    body: section.body?.replace('__COUNT__', String(approxCount)),
  }));

  const sectionMedia: Record<number, ReactNode> = {
    0: (
      <IllustrationMedia
        src="/images/howItWorks/custom/category-comparison.svg"
        alt={sections[0]?.heading}
      />
    ),
    1: (
      <IllustrationMedia
        src="/images/howItWorks/custom/unit-comparison.svg"
        alt={sections[1]?.heading}
      />
    ),
  };

  return (
    <InfoPageLayout namespace="categoriesPage">
      {sections.map((section, idx) => (
        <InfoSection
          key={section.heading}
          {...section}
          index={idx}
          reverse={idx % 2 === 1}
          media={sectionMedia[idx]}
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
