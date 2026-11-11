import watchImg from '../../../assets/images/watch.png';
import earphoneImg from '../../../assets/images/earphone.png';
import macbookImg from '../../../assets/images/macbook.png';
import gamingImg from '../../../assets/images/gaming.png';

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  isNew?: boolean;
}

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'p1',
    name: 'Smart Watch Wireless',
    price: 299,
    originalPrice: 350,
    rating: 5,
    image: watchImg,
    badge: 'Sale',
  },
  {
    id: 'p2',
    name: 'Logitech Gaming Headset',
    price: 120,
    rating: 4,
    image: earphoneImg,
    isNew: true,
  },
  {
    id: 'p3',
    name: 'MacBook Pro M2 16"',
    price: 1999,
    originalPrice: 2200,
    rating: 5,
    image: macbookImg,
    badge: 'Hot',
  },
  {
    id: 'p4',
    name: 'PlayStation 5 Console',
    price: 499,
    rating: 5,
    image: gamingImg,
  },
];