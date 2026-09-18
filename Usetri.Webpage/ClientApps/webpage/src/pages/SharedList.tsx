import Seo from '@/components/Seo';
import { Apple, ExternalLink, ShoppingBasket, Smartphone } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'https://api.usetrislovensko.sk';
const APP_STORE_URL = 'https://apps.apple.com/sk/app/u%C5%A1etri/id6744099337';
const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.dutosvarc.usetri';
const ANDROID_PACKAGE = 'com.dutosvarc.usetri';

/** What the app shows in its import sheet; the page mirrors it. */
const MAX_PREVIEW_ITEMS = 5;

interface SharedCartItem {
  name?: string | null;
  imageUrl?: string | null;
  quantity: number;
}

interface SharedCartResponse {
  cart?: {
    specific_products?:
      | {
          product?: { name?: string | null; image_url?: string | null };
          quantity?: number;
        }[]
      | null;
    categories?:
      | {
          category?: { name?: string | null; image_url?: string | null };
          cheapest?: { image_url?: string | null };
          quantity?: number;
        }[]
      | null;
  };
}

const isAndroid = () => /android/i.test(navigator.userAgent || '');

const isIOS = () => {
  const ua = navigator.userAgent || '';
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports as a Mac; touch support disambiguates it.
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  );
};

/**
 * Messenger, Instagram and friends open links in their own in-app browser,
 * which never hands a link to an installed app the way Safari or Chrome does.
 * Those visitors need to be told to reopen the page in a real browser.
 */
const isInAppBrowser = () => {
  const ua = navigator.userAgent || '';
  return /FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram|Line\/|Twitter|MicroMessenger|Snapchat/i.test(
    ua,
  );
};

const SharedList = () => {
  const { t } = useTranslation();
  const { token = '' } = useParams<{ token: string }>();

  const [items, setItems] = useState<SharedCartItem[] | null>(null);
  const [hasFailed, setHasFailed] = useState(false);

  const inAppBrowser = useMemo(isInAppBrowser, []);
  const storeUrl = useMemo(() => {
    if (isAndroid()) return GOOGLE_PLAY_URL;
    return isIOS() ? APP_STORE_URL : null;
  }, []);

  useEffect(() => {
    if (!token) {
      setHasFailed(true);
      return;
    }

    let isCurrent = true;

    fetch(`${API_BASE_URL}/shared-carts/${encodeURIComponent(token)}`)
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<SharedCartResponse>;
      })
      .then((data) => {
        if (!isCurrent) return;
        const cart = data.cart ?? {};
        // Categories first, then products — the order the app's list uses.
        const merged: SharedCartItem[] = [
          ...(cart.categories ?? []).map((item) => ({
            name: item.category?.name,
            imageUrl: item.category?.image_url ?? item.cheapest?.image_url,
            quantity: item.quantity ?? 1,
          })),
          ...(cart.specific_products ?? []).map((item) => ({
            name: item.product?.name,
            imageUrl: item.product?.image_url,
            quantity: item.quantity ?? 1,
          })),
        ];
        setItems(merged);
      })
      .catch(() => {
        if (isCurrent) setHasFailed(true);
      });

    return () => {
      isCurrent = false;
    };
  }, [token]);

  /**
   * Hands the link to the app. The `usetri://` scheme is used rather than this
   * page's own https address because an in-app browser will not pass an https
   * link to the app — it just loads it again in the webview. On Android an
   * `intent://` URL additionally falls back to the Play Store by itself.
   */
  const openInApp = useCallback(() => {
    const path = `share/${encodeURIComponent(token)}`;

    if (isAndroid()) {
      window.location.href = `intent://${path}#Intent;scheme=usetri;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(
        GOOGLE_PLAY_URL,
      )};end`;
      return;
    }

    window.location.href = `usetri://${path}`;
  }, [token]);

  const visibleItems = items?.slice(0, MAX_PREVIEW_ITEMS) ?? [];
  const hiddenCount = (items?.length ?? 0) - visibleItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary/10 to-white">
      <Seo
        title={t('sharedList.seoTitle')}
        description={t('sharedList.seoDescription')}
        noindex
      />

      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <img
            src="/images/logos/usetri-logo_symbol-purple.png"
            alt="Ušetri"
            className="mb-5 h-14 w-14"
          />
          <h1 className="text-3xl font-bold text-brand-indigo">
            {t('sharedList.title')}
          </h1>
          <p className="mt-2 text-gray-600">
            {hasFailed ? t('sharedList.expired') : t('sharedList.subtitle')}
          </p>
        </div>

        {!hasFailed && items !== null && items.length > 0 && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-gray-500">
              {t('sharedList.itemsCount', { count: items.length })}
            </p>
            <ul className="space-y-3">
              {visibleItems.map((item, index) => (
                <li
                  key={`${item.name}-${index}`}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <ShoppingBasket className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-800">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.quantity}×
                  </span>
                </li>
              ))}
            </ul>
            {hiddenCount > 0 && (
              <p className="mt-3 text-center text-sm text-gray-500">
                {t('sharedList.moreItems', { count: hiddenCount })}
              </p>
            )}
          </div>
        )}

        {inAppBrowser && (
          // Nothing on this page can make an in-app browser hand the link to
          // the app, so the only reliable advice is to leave it.
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <ExternalLink className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{t('sharedList.inAppBrowserHint')}</p>
          </div>
        )}

        {!hasFailed && (
          <button
            type="button"
            onClick={openInApp}
            className="mb-4 w-full rounded-xl bg-brand-primary px-6 py-4 text-center text-lg font-semibold text-white transition-opacity active:opacity-80"
          >
            {t('sharedList.openInApp')}
          </button>
        )}

        <p className="mb-3 text-center text-sm text-gray-500">
          {t('sharedList.noAppYet')}
        </p>

        <div className="flex flex-col gap-3">
          {(storeUrl === null || storeUrl === APP_STORE_URL) && (
            <a
              href={APP_STORE_URL}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800"
            >
              <Apple className="h-5 w-5" />
              App Store
            </a>
          )}
          {(storeUrl === null || storeUrl === GOOGLE_PLAY_URL) && (
            <a
              href={GOOGLE_PLAY_URL}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800"
            >
              <Smartphone className="h-5 w-5" />
              Google Play
            </a>
          )}
        </div>
      </main>
    </div>
  );
};

export default SharedList;
