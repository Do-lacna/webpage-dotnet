import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/HowItWorks/process', labelKey: 'howItWorksPage.nav.process' },
  { to: '/HowItWorks/discounts', labelKey: 'howItWorksPage.nav.discounts' },
  {
    to: '/HowItWorks/cheapest-cart',
    labelKey: 'howItWorksPage.nav.cheapestCart',
  },
  {
    to: '/HowItWorks/categories',
    labelKey: 'howItWorksPage.nav.categories',
  },
  {
    to: '/HowItWorks/data-updates',
    labelKey: 'howItWorksPage.nav.dataUpdates',
  },
  {
    to: '/HowItWorks/shopping-list',
    labelKey: 'howItWorksPage.nav.shoppingList',
  },
];

const HowItWorksLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
            {/* Sidebar / mobile tab bar */}
            <aside className="md:w-64 md:flex-shrink-0">
              <nav
                className={cn(
                  'flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1 md:overflow-visible md:pb-0',
                  'md:sticky md:top-28',
                )}
                aria-label={t('howItWorksPage.title')}
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'whitespace-nowrap rounded-lg px-4 py-3 text-sm md:text-base font-medium transition-colors',
                        'border md:border-l-4 md:border-y-0 md:border-r-0 md:rounded-none md:rounded-r-lg',
                        isActive
                          ? 'bg-brand-primary/10 text-brand-primary border-brand-primary'
                          : 'bg-white text-brand-indigo border-transparent hover:bg-gray-50 hover:text-brand-primary md:border-l-transparent',
                      )
                    }
                  >
                    {t(item.labelKey)}
                  </NavLink>
                ))}
              </nav>
            </aside>

            {/* Page content */}
            <div className="min-w-0 flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksLayout;
