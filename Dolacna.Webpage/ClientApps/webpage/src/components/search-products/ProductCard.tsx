import { ImageOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ShopProductDto } from '@/lib/catalogApi';

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
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-semibold text-brand-primary">
            {cheapest !== null ? formatPrice(cheapest) : 'N/A'}
          </span>
          {prices.length > 0 && (
            <Badge variant="secondary">
              {prices.length} {prices.length === 1 ? 'obchod' : 'obchodov'}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
