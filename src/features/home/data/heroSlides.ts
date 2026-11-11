export interface SlideData {
  id: string;
  subtitle: string;
  title: string;
  bgTitle: string;
  buttonText: string;
  imgUrl: string;
  category: string;
}

export const HERO_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    subtitle: 'Beats Solo',
    title: 'Wireless',
    bgTitle: 'HEADPHONE',
    buttonText: 'Shop By Category',
    imgUrl: '/src/assets/images/headphone.png',
    category: 'headphone',
  },
  {
    id: 'slide-2',
    subtitle: 'Beats Solo',
    title: 'Wireless',
    bgTitle: 'VIRTUAL',
    buttonText: 'Shop By Category',
    imgUrl: '/src/assets/images/vr.png',
    category: 'vr',
  },
  {
    id: 'slide-3',
    subtitle: 'Beats Solo',
    title: 'Branded',
    bgTitle: 'LAPTOPS',
    buttonText: 'Shop By Category',
    imgUrl: '/src/assets/images/macbook.png',
    category: 'macbook',
  },
];