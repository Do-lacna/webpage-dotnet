import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Cookies from './pages/Cookies';
import Team from './pages/Team';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import Premium from './pages/Premium';
import Download from './pages/Download';
import Faq from './pages/Faq';

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
          <Route path="/HowItWorks" element={<HowItWorks />} />
          <Route path="/Premium" element={<Premium />} />
          <Route path="/Download" element={<Download />} />
          <Route path="/FAQ" element={<Faq />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
