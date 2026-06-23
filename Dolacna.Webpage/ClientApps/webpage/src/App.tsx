import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Cookies from './pages/Cookies';
import Team from './pages/Team';
import Contact from './pages/Contact';
import HowItWorksLayout from './pages/how-it-works/HowItWorksLayout';
import ProcessBackground from './pages/how-it-works/ProcessBackground';
import Discounts from './pages/how-it-works/Discounts';
import CheapestCart from './pages/how-it-works/CheapestCart';
import Categories from './pages/how-it-works/Categories';
import DataUpdates from './pages/how-it-works/DataUpdates';
import ShoppingList from './pages/how-it-works/ShoppingList';
import Premium from './pages/Premium';
import Download from './pages/Download';
import AppRedirect from './pages/AppRedirect';
import Faq from './pages/Faq';
import LogoPage from './pages/Logo';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
            <Route path="shopping-list" element={<ShoppingList />} />
          </Route>
          <Route path="/Premium" element={<Premium />} />
          <Route path="/Download" element={<Download />} />
          <Route path="/app" element={<AppRedirect />} />
          <Route path="/FAQ" element={<Faq />} />
          <Route path="/Logo" element={<LogoPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
