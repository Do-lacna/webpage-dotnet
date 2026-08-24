import { ImageOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { ShopProductDto } from '@/lib/catalogApi';

// Shop ids returned by the API are stable and match these known chains.
// Files live in /public, so they're referenced by URL, not imported.
const SHOP_LOGOS: Record<number, { src: string; name: string }> = {
  1: { src: '/images/stores/store-logos/lidl_logo.png', name: 'Lidl' },
  2: { src: '/images/stores/store-logos/billa_logo.png', name: 'Billa' },
  3: { src: '/images/stores/store-logos/kaufland_logo.png', name: 'Kaufland' },
  4: { src: '/images/stores/store-logos/tesco_logo.png', name: 'Tesco' },
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

interface ProductCardProps {
  shopProduct: ShopProductDto;
}

const ProductCard = ({ shopProduct }: ProductCardProps) => {
  const { detail, shops_prices } = shopProduct;
  const prices = shops_prices ?? [];
  const cheapest = prices.reduce<number | null>(
    (min, p) => (min === null || p.actual_price < min ? p.actual_price : min),
    null,
  );

  const amount = detail.unit?.original_amount;
  const unit = detail.unit?.original_unit;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex h-36 items-center justify-center bg-brand-nude/40">
        {detail.image_url ? (
          <img
            src={detail.image_url}
            alt={detail.name ?? ''}
            className="h-full w-full object-contain p-3"
            loading="lazy"
          />
        ) : (
          <ImageOff className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <CardContent className="space-y-2 p-4">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium">
          {detail.name}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{detail.brand ?? '—'}</span>
          {amount != null && unit && (
            <span>
              {amount} {unit}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-lg font-semibold text-brand-primary">
            {cheapest !== null ? formatPrice(cheapest) : 'N/A'}
          </span>
          {prices.length > 0 && (
            <div className="flex items-center gap-1">
              {prices.map((price) => {
                const logo = SHOP_LOGOS[price.shop_id];
                if (!logo) return null;
                return (
                  <img
                    key={price.shop_id}
                    src={logo.src}
                    alt={logo.name}
                    title={logo.name}
                    loading="lazy"
                    className="h-5 w-5 shrink-0 rounded-sm bg-white object-contain p-0.5 ring-1 ring-border"
                  />
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
