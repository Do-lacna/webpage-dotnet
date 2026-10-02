export type CookieConsent = 'granted' | 'denied';

const STORAGE_KEY = 'cookieConsent';
const OPEN_SETTINGS_EVENT = 'cookie-settings:open';

export const getCookieConsent = (): CookieConsent | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

export const setCookieConsent = (consent: CookieConsent) => {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Storage unavailable (e.g. private mode) – the choice lasts for this visit only
  }
};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
};

export const onOpenCookieSettings = (handler: () => void) => {
  window.addEventListener(OPEN_SETTINGS_EVENT, handler);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
};
