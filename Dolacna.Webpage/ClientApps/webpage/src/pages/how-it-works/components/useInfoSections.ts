import { useTranslation } from 'react-i18next';
import type { InfoSectionContent } from './types';

/**
 * Reads the `sections` array for a how-it-works page from its i18n namespace.
 */
export function useInfoSections(namespace: string): InfoSectionContent[] {
  const { t } = useTranslation();
  const sections = t(`${namespace}.sections`, {
    returnObjects: true,
  }) as InfoSectionContent[];
  return Array.isArray(sections) ? sections : [];
}
