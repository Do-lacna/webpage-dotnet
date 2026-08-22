/**
 * Seo.tsx
 *
 * Per-page <head> management without extra dependencies. The static defaults
 * live in index.html (they're what link-preview crawlers that don't run JS
 * see); this component overwrites them in place when a page mounts, so
 * Google's renderer indexes route-specific titles and descriptions instead
 * of duplicates of the homepage.
 */

import { useEffect } from 'react';

const SITE_URL = 'https://usetrislovensko.sk';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export type SeoProps = {
  /** Page title; the site name suffix is added automatically. */
  title: string;
  description?: string;
  /** Route path used for the canonical URL, e.g. "/Download". */
  path?: string;
  /** Ask search engines not to index this page (redirects, 404, internal). */
  noindex?: boolean;
};

export function Seo({ title, description, path, noindex }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    if (path !== undefined) {
      const url = `${SITE_URL}${path}`;
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
      setMeta('property', 'og:url', url);
    }

    if (noindex) {
      setMeta('name', 'robots', 'noindex');
      return () => {
        document.head.querySelector('meta[name="robots"]')?.remove();
      };
    }
  }, [title, description, path, noindex]);

  return null;
}

export default Seo;
