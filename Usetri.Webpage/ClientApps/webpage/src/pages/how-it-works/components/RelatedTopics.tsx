import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { RelatedLink } from './types';

interface RelatedTopicsProps {
  links: RelatedLink[];
  className?: string;
}

/** "Related topics" links block. */
const RelatedTopics = ({ links, className }: RelatedTopicsProps) => {
  const { t } = useTranslation();

  if (!Array.isArray(links) || links.length === 0) return null;

  return (
    <div className={cn('mt-6', className)}>
      <p className="text-sm font-medium text-gray-500 mb-3 text-left">
        {t('howItWorksPage.relatedTitle')}
      </p>
      <div className="grid gap-4 sm:grid-cols-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="glass-panel p-5 transition-colors hover:bg-white group"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-brand-indigo group-hover:text-brand-primary transition-colors">
                {t(link.labelKey)}
              </span>
              <span className="text-brand-primary transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
            {link.descriptionKey && (
              <span className="mt-2 block text-sm text-muted-foreground text-left">
                {t(link.descriptionKey)}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default RelatedTopics;
