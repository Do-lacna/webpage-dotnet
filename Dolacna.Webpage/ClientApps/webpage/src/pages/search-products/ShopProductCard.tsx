import { Badge } from '@/components/ui/badge';
import { type ShopPriceDto, type ShopProductDto } from '@/lib/catalogApi';
import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatPrice, type ShopInfo } from './shopPricing';

interface ShopProductCardProps {
  shop: ShopInfo;
  product: ShopProductDto | null;
  price: number | null;
  shopPrice: ShopPriceDto | null;
  isCheapest: boolean;
}

const ShopProductCard = ({
  shop,
  product,
  price,
  shopPrice,
  isCheapest,
}: ShopProductCardProps) => {
  const { t } = useTranslation();
  const detail = product?.detail;
  const unit = detail?.unit;
  const amountLabel = unit
    ? `${unit.original_amount ?? unit.normalized_amount} ${
        unit.original_unit ?? unit.normalized_unit ?? ''
      }`.trim()
    : null;
  const discount = shopPrice?.discount_price ?? null;
  const originalPrice = shopPrice?.price ?? null;

  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center ${
        isCheapest
          ? 'border-brand-secondary bg-brand-secondary/10'
          : 'border-brand-lilac/30 bg-white'
      }`}
    >
      {isCheapest && (
        <Badge className="absolute -top-3 gap-1 border-transparent bg-brand-secondary text-brand-indigo">
          <Trophy className="h-4 w-4" />
          {t('categorySearch.cheapest')}
        </Badge>
      )}

      {discount && (
        <Badge className="absolute -right-2 -top-2 border-transparent bg-red-500 text-white">
          {t('categorySearch.discount', {
            percent: Math.round(discount.percentage_discount),
          })}
        </Badge>
      )}

      <div className="mb-3 flex h-12 w-24 items-center justify-center">
        <img
          src={shop.logo}
          alt={shop.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl bg-white">
        {detail?.image_url ? (
          <img
            src={detail.image_url}
            alt={detail.name ?? ''}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="px-1 text-center text-[10px] text-brand-indigo/40">
            {t('categorySearch.noImage')}
          </span>
        )}
      </div>

      <div className="min-w-0 w-full">
        <p className="truncate text-sm font-semibold text-brand-indigo">
          {detail?.name ?? '—'}
        </p>
        {detail && (
          <p className="truncate text-xs text-brand-indigo/60">
            {[detail.brand, amountLabel].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        {discount && originalPrice !== null && (
          <span className="text-sm text-brand-indigo/50 line-through">
            {formatPrice(originalPrice)}
          </span>
        )}
        <span
          className={`text-lg font-bold ${discount ? 'text-red-600' : 'text-brand-indigo'}`}
        >
          {price !== null ? formatPrice(price) : '—'}
        </span>
      </div>
    </div>
  );
};

export default ShopProductCard;
