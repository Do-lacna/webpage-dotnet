import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-nude">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <span className="text-6xl font-bold text-brand-indigo">404</span>
          <div className="w-24 h-1 bg-brand-primary mx-auto my-6"></div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-brand-indigo">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button
          className="bg-brand-indigo text-white hover:bg-brand-primary hover:text-brand-indigo button-hover-effect"
          onClick={() => (window.location.href = '/')}
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
