import { Badge } from '@/components/ui/badge';
import { type ShopProductDto } from '@/lib/catalogApi';
import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SHOPS, formatPrice } from './useCategoryPriceComparison';

interface ProductPriceCardProps {
  product: ShopProductDto;
}

const ProductPriceCard = ({ product }: ProductPriceCardProps) => {
  const { t } = useTranslation();
  const { detail, shops_prices } = product;
  const unit = detail.unit;
  const amountLabel = unit
    ? `${unit.original_amount ?? unit.normalized_amount} ${
        unit.original_unit ?? unit.normalized_unit ?? ''
      }`.trim()
    : null;

  const shopPrices = SHOPS.map((shop) => ({
    ...shop,
    price:
      shops_prices?.find((sp) => sp.shop_id === shop.id)?.actual_price ?? null,
  }));

  // Cheapest shop for THIS product only (independent of the category-wide cheapest).
  const cheapestShopId = shopPrices.reduce<number | null>(
    (cheapestId, shop) => {
      if (shop.price === null) return cheapestId;
      const cheapest = shopPrices.find((s) => s.id === cheapestId);
      if (!cheapest || cheapest.price === null) return shop.id;
      return shop.price < cheapest.price ? shop.id : cheapestId;
    },
    null,
  );

  return (
    <div className="rounded-2xl border border-brand-lilac/30 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-nude">
          {detail.image_url ? (
            <img
              src={detail.image_url}
              alt={detail.name ?? ''}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-center text-[10px] text-brand-indigo/40">
              {t('categorySearch.noImage')}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-brand-indigo">
            {detail.name}
          </p>
          <p className="truncate text-sm text-brand-indigo/60">
            {[detail.brand, amountLabel].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {shopPrices.map((shop) => (
          <div
            key={shop.id}
            className={`relative flex flex-col items-center gap-1 rounded-xl border p-3 ${
              shop.id === cheapestShopId
                ? 'border-brand-secondary bg-brand-secondary/10'
                : 'border-brand-lilac/20 bg-brand-nude/40'
            }`}
          >
            {shop.id === cheapestShopId && (
              <Badge className="absolute -top-3 gap-1 border-transparent bg-brand-secondary text-brand-indigo">
                <Trophy className="h-3 w-3" />
              </Badge>
            )}
            <img
              src={shop.logo}
              alt={shop.name}
              className="h-6 w-auto object-contain"
            />
            <span className="text-sm font-bold text-brand-indigo">
              {shop.price !== null ? formatPrice(shop.price) : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPriceCard;
