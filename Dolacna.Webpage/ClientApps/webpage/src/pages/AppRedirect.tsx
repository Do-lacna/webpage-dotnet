import { useEffect } from 'react';
import Download from './Download';

const APP_STORE_URL =
  'https://apps.apple.com/sk/app/u%C5%A1etri/id6744099337';
const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.dutosvarc.usetri';

const detectStoreUrl = (): string | null => {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';

  if (/android/i.test(ua)) return GOOGLE_PLAY_URL;

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports as Mac; disambiguate via touch support
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (isIOS) return APP_STORE_URL;

  return null;
};

const AppRedirect = () => {
  useEffect(() => {
    const target = detectStoreUrl();
    if (target) window.location.replace(target);
  }, []);

  return <Download />;
};

export default AppRedirect;
