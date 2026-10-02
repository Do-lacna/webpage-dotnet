import type { CookieConsent } from './cookieConsent';

const META_PIXEL_ID = '1409816177247145';
const PIXEL_COOKIES = ['_fbp', '_fbc'];

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// Same bootstrap as Meta's official snippet, only loaded on demand instead of
// from index.html so nothing reaches Facebook before the visitor agrees.
// fbevents.js tracks later SPA navigations (history.pushState) on its own.
const loadMetaPixel = () => {
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
};

const clearPixelCookies = () => {
  // The pixel sets its cookies on the registrable domain, so try every parent
  const parts = window.location.hostname.split('.');
  const domains = parts.slice(0, -1).map((_, i) => `.${parts.slice(i).join('.')}`);
  for (const name of PIXEL_COOKIES) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
  }
};

export const applyMetaPixelConsent = (consent: CookieConsent) => {
  if (consent === 'granted') {
    if (window.fbq) window.fbq('consent', 'grant');
    else loadMetaPixel();
    return;
  }

  if (window.fbq) window.fbq('consent', 'revoke');
  clearPixelCookies();
};
