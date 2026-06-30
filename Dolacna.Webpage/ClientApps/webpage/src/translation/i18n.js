import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import skTranslation from '../../public/locale/sk/translation.json';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'sk',
    lng: 'sk', // Force Slovak as initial language
    debug: false,
    // Bundle the default language so the app renders immediately without
    // waiting on a network fetch. Other languages still load lazily via HTTP.
    resources: {
      sk: { translation: skTranslation },
    },
    partialBundledLanguages: true,
    // Initialize synchronously so translations are ready on the very first
    // render (avoids react-i18next suspending the tree on startup).
    initImmediate: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locale/{{lng}}/translation.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    supportedLngs: ['sk', 'en'],
  });

export default i18n;
