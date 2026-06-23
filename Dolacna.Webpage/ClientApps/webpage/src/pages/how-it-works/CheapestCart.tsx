import InfoPage from './InfoPage';

const CheapestCart = () => (
  <InfoPage
    namespace="cheapestCartPage"
    sectionImages={{
      0: '/images/howItWorks/undraw/undraw_groceries_4via.png',
      1: '/images/howItWorks/undraw/undraw_empty-cart_574u.png',
      3: '/images/howItWorks/undraw/undraw_savings_d97f.png',
    }}
    related={[
      {
        to: '/HowItWorks/categories',
        labelKey: 'categoriesPage.title',
        descriptionKey: 'categoriesPage.subtitle',
      },
    ]}
  />
);

export default CheapestCart;
