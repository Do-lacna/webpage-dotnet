import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  getCookieConsent,
  onOpenCookieSettings,
  setCookieConsent,
  type CookieConsent as Consent,
} from '@/lib/cookieConsent';
import { applyMetaPixelConsent } from '@/lib/metaPixel';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(() => getCookieConsent() === null);

  useEffect(() => {
    if (getCookieConsent() === 'granted') applyMetaPixelConsent('granted');
    return onOpenCookieSettings(() => setOpen(true));
  }, []);

  const decide = (consent: Consent) => {
    setCookieConsent(consent);
    applyMetaPixelConsent(consent);
    setOpen(false);
  };

  if (!open) return null;

  return (
    // Same container and half-width as the hero's text column, so on desktop
    // the bar sits under the hero copy instead of over the phone showcase.
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        role="dialog"
        aria-label={t('cookieConsent.title')}
        aria-describedby="cookie-consent-description"
        className="pointer-events-auto flex flex-col gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-xl md:w-[calc(50%-1rem)] lg:flex-row lg:items-center lg:gap-4"
      >
        <p
          id="cookie-consent-description"
          className="min-w-0 text-sm text-muted-foreground"
        >
          {t('cookieConsent.description')}{' '}
          <a
            href="/Cookies"
            className="font-medium text-brand-primary underline underline-offset-2"
          >
            {t('cookieConsent.learnMore')}
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-brand-primary font-semibold text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary lg:flex-none"
            onClick={() => decide('denied')}
          >
            {t('cookieConsent.decline')}
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-brand-primary font-semibold text-white hover:bg-brand-primary/90 lg:flex-none"
            onClick={() => decide('granted')}
          >
            {t('cookieConsent.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
