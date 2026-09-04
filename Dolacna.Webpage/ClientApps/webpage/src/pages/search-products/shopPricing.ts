export interface ShopInfo {
  id: number;
  name: string;
  logo: string;
}

// Confirmed shop id mapping (see /shops endpoint): 1=Lidl, 2=Billa, 3=Kaufland, 4=Tesco.
export const SHOPS: ShopInfo[] = [
  { id: 1, name: 'Lidl', logo: '/images/stores/store-logos/lidl_logo.png' },
  { id: 2, name: 'Billa', logo: '/images/stores/store-logos/billa_logo.png' },
  {
    id: 3,
    name: 'Kaufland',
    logo: '/images/stores/store-logos/kaufland_logo.png',
  },
  { id: 4, name: 'Tesco', logo: '/images/stores/store-logos/tesco_logo.png' },
];

export function formatPrice(price: number): string {
  return `${price.toFixed(2)} €`;
}
