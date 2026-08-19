export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imgUrl: string;
  isNew?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    title: 'Wireless Earbuds Pro',
    price: 199,
    category: 'Earphone', // Earphone
    imgUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    isNew: true,
  },
  {
    id: 'p2',
    title: 'Smart Watch Series 7',
    price: 299,
    category: 'Gadget', // Gadget
    imgUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
  {
    id: 'p3',
    title: 'MacBook Pro 16"',
    price: 1299,
    category: 'Laptop', // Laptop
    imgUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    isNew: true,
  },
  {
    id: 'p4',
    title: 'PlayStation 5 Console',
    price: 499,
    category: 'Console', // Console
    imgUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80',
  },
  {
    id: 'p5',
    title: 'Oculus Quest 2 VR',
    price: 399,
    category: 'Oculus', // Oculus
    imgUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=500&q=80',
  },
  {
    id: 'p6',
    title: 'Bluetooth Portable Speaker',
    price: 149,
    category: 'Speakers', // Speakers
    imgUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80',
  },
];