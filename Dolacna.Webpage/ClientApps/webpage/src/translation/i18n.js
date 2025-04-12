import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Load translations from JSON files
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Initialize i18next for React
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable for debugging
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    backend: {
      loadPath: '/locale/{{lng}}/translation.json', // Path to translation files
    },
    detection: {
      order: ['localStorage', 'navigator'], // Detect language from localStorage first, then browser settings
      caches: ['localStorage'], // Store language in localStorage
    },
  });

export default i18n;
