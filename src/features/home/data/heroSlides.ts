import slide_image_1 from '../../../assets/images/headphone.png';
import slide_image_2 from '../../../assets/images/vr.png';
import slide_image_3 from '../../../assets/images/macbook.png';

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
    imgUrl: slide_image_1,
    category: 'headphone',
  },
  {
    id: 'slide-2',
    subtitle: 'Beats Solo',
    title: 'Wireless',
    bgTitle: 'VIRTUAL',
    buttonText: 'Shop By Category',
    imgUrl: slide_image_2,
    category: 'vr',
  },
  {
    id: 'slide-3',
    subtitle: 'Beats Solo',
    title: 'Branded',
    bgTitle: 'LAPTOPS',
    buttonText: 'Shop By Category',
    imgUrl: slide_image_3,
    category: 'macbook',
  },
];