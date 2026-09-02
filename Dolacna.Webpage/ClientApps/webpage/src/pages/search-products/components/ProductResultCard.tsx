import { Skeleton } from '@/components/ui/skeleton';
import type { ShopPriceDto, ShopProductDto } from '@/lib/catalogApi';
import { ImageOff } from 'lucide-react';

const priceFormatter = new Intl.NumberFormat('sk-SK', {
  style: 'currency',
  currency: 'EUR',
});

const amountFormatter = new Intl.NumberFormat('sk-SK');

interface ProductResultCardProps {
  product: ShopProductDto;
  /** Price to display for a specific shop; defaults to the product's first entry. */
  shopPrice?: ShopPriceDto;
}

const ProductResultCard = ({
  product,
  shopPrice: shopPriceOverride,
}: ProductResultCardProps) => {
  const { detail, shops_prices } = product;
  const shopPrice = shopPriceOverride ?? shops_prices?.[0];
  const hasDiscount = shopPrice?.discount_price != null;
  const amount =
    detail.unit?.original_amount != null && detail.unit.original_unit
      ? `${amountFormatter.format(detail.unit.original_amount)} ${detail.unit.original_unit}`
      : null;

  return (
    <div className="glass-panel flex flex-col overflow-hidden rounded-xl transition-transform hover:-translate-y-1">
      <div className="aspect-square w-full bg-white flex items-center justify-center overflow-hidden">
        {detail.image_url ? (
          <img
            src={detail.image_url}
            alt={detail.name ?? ''}
            className="h-full w-full object-contain p-3"
            loading="lazy"
          />
        ) : (
          <ImageOff className="h-10 w-10 text-muted-foreground/40" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {detail.brand && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary/80">
            {detail.brand}
          </span>
        )}
        <p className="line-clamp-2 text-sm font-medium text-brand-indigo">
          {detail.name}
        </p>
        {amount && (
          <span className="text-xs text-muted-foreground">{amount}</span>
        )}
        <div className="mt-auto pt-2">
          {shopPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-brand-indigo">
                {priceFormatter.format(
                  hasDiscount
                    ? shopPrice.discount_price!.price
                    : shopPrice.actual_price,
                )}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {priceFormatter.format(shopPrice.actual_price)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductResultCardSkeleton = () => (
  <div className="glass-panel flex flex-col overflow-hidden rounded-xl">
    <Skeleton className="aspect-square w-full rounded-none" />
    <div className="flex flex-col gap-2 p-4">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-5 w-1/2" />
    </div>
  </div>
);

export default ProductResultCard;
