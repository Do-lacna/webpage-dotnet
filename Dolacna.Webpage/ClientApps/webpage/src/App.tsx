import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Index from './pages/Index';

const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const HowItWorksLayout = lazy(
  () => import('./pages/how-it-works/HowItWorksLayout'),
);
const ProcessBackground = lazy(
  () => import('./pages/how-it-works/ProcessBackground'),
);
const Discounts = lazy(() => import('./pages/how-it-works/Discounts'));
const CheapestCart = lazy(() => import('./pages/how-it-works/CheapestCart'));
const Categories = lazy(() => import('./pages/how-it-works/Categories'));
const DataUpdates = lazy(() => import('./pages/how-it-works/DataUpdates'));
const Premium = lazy(() => import('./pages/Premium'));
const Download = lazy(() => import('./pages/Download'));
const AppRedirect = lazy(() => import('./pages/AppRedirect'));
const Faq = lazy(() => import('./pages/Faq'));
const LogoPage = lazy(() => import('./pages/Logo'));
const SearchProducts = lazy(
  () => import('./pages/search-products/SearchProducts'),
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/TermsOfService" element={<TermsOfService />} />
            <Route path="/Cookies" element={<Cookies />} />
            <Route path="/AboutUs" element={<Team />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/HowItWorks" element={<HowItWorksLayout />}>
              <Route index element={<Navigate to="process" replace />} />
              <Route path="process" element={<ProcessBackground />} />
              <Route path="discounts" element={<Discounts />} />
              <Route path="cheapest-cart" element={<CheapestCart />} />
              <Route path="categories" element={<Categories />} />
              <Route path="data-updates" element={<DataUpdates />} />
            </Route>
            <Route path="/Premium" element={<Premium />} />
            <Route path="/Download" element={<Download />} />
            <Route path="/app" element={<AppRedirect />} />
            <Route path="/FAQ" element={<Faq />} />
            <Route path="/Logo" element={<LogoPage />} />
            <Route path="/SearchProducts" element={<SearchProducts />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
