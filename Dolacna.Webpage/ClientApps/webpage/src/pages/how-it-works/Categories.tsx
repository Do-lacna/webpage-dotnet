import InfoPage from './InfoPage';

const Categories = () => (
  <InfoPage
    namespace="categoriesPage"
    sectionImages={{
      0: '/images/howItWorks/undraw/undraw_data-analysis_b7cp.png',
    }}
    related={[
      {
        to: '/HowItWorks/cheapest-cart',
        labelKey: 'cheapestCartPage.title',
        descriptionKey: 'cheapestCartPage.subtitle',
      },
    ]}
  />
);

export default Categories;
