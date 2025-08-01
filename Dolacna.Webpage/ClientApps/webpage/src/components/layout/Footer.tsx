import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              Ušetri<span className="text-brand-accent"> Slovensko</span>
            </div>
            <p className="text-white/70 mb-6">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61575249665020"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-colors"
                aria-label="Facebook"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    'https://www.facebook.com/profile.php?id=61575249665020',
                    '_blank',
                    'noopener,noreferrer',
                  );
                }}
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/usetrislovensko"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-colors"
                aria-label="Instagram"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    'https://www.instagram.com/usetrislovensko',
                    '_blank',
                    'noopener,noreferrer',
                  );
                }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:usetripareur@gmail.com"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-brand-accent">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="AboutUs"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('footer.aboutUs')}
                </a>
              </li>

              <li>
                <a
                  href="/Contact"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a
                  href="/FAQ"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('faq_header')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-brand-accent">
              {t('footer.getTheApp')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('footer.appStore')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('footer.googlePlay')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-brand-accent">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3"></ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm">
            © {currentYear} usetrislovensko.sk. {t('footer.allRightsReserved')}
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="PrivacyPolicy"
              className="text-white/50 hover:text-white text-sm"
            >
              {t('footer.privacyPolicy')}
            </a>
            <a
              href="TermsOfService"
              className="text-white/50 hover:text-white text-sm"
            >
              {t('footer.termsOfService')}
            </a>
            <a
              href="Cookies"
              className="text-white/50 hover:text-white text-sm"
            >
              {t('footer.cookiePolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
