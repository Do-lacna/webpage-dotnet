import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'sk', // Default language
    debug: true,
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
    preload: ['sk'],
  });

export default i18n;
