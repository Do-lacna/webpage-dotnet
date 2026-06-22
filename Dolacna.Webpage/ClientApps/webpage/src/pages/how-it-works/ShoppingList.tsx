import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ShoppingList = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-12 md:py-16" id="shopping-list">
      <div className="text-center mb-8 md:mb-12 reveal-animation">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 px-2 leading-tight text-brand-indigo">
          {t('shoppingListPage.title')}
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-4 max-w-3xl mx-auto leading-relaxed">
          {t('shoppingListPage.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto reveal-animation">
        <div className="glass-panel p-6 md:p-10">
          <p className="text-muted-foreground text-base md:text-lg text-left leading-relaxed">
            {t('shoppingListPage.body')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShoppingList;
