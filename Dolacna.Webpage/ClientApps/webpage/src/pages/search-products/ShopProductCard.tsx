import { Badge } from '@/components/ui/badge';
import { type ShopProductDto } from '@/lib/catalogApi';
import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatPrice, type ShopInfo } from './shopPricing';

interface ShopProductCardProps {
  shop: ShopInfo;
  product: ShopProductDto | null;
  price: number | null;
  isCheapest: boolean;
}

const ShopProductCard = ({
  shop,
  product,
  price,
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
          <Trophy className="h-3 w-3" />
          {t('categorySearch.cheapest')}
        </Badge>
      )}

      <img
        src={shop.logo}
        alt={shop.name}
        className="h-6 w-auto object-contain"
      />

      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-brand-nude">
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

      <span className="text-lg font-bold text-brand-indigo">
        {price !== null ? formatPrice(price) : '—'}
      </span>
    </div>
  );
};

export default ShopProductCard;
