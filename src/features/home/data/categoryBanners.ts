import macbook from '../../../assets/images/macbook.png';
import earphone from '../../../assets/images/earphone.png';
import gadget from '../../../assets/images/watch.png';
import console from '../../../assets/images/gaming.png';
import oculus from '../../../assets/images/vr.png';
import speaker from '../../../assets/images/speaker.png';
export interface CategoryBanner {
  id: string;
  subtitle: string;
  title: string;
  bgTitle: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  buttonBg: string;
  buttonTextColor: string;
  imgUrl: string;
  isWide?: boolean;
}

export const CATEGORY_BANNERS: CategoryBanner[] = [
  {
    id: '1',
    subtitle: 'Enjoy',
    title: 'With',
    bgTitle: 'Earphone',
    buttonText: 'Browse',
    bgColor: 'bg-gradient-to-br from-gray-900 to-black',
    textColor: 'text-white',
    buttonBg: 'bg-red-600 hover:bg-red-700',
    buttonTextColor: 'text-white',
    imgUrl: earphone, 
  },
  {
    id: '2',
    subtitle: 'Enjoy',
    title: 'With',
    bgTitle: 'Gadget',
    buttonText: 'Browse',
    bgColor: 'bg-amber-400',
    textColor: 'text-white',
    buttonBg: 'bg-white hover:bg-gray-100',
    buttonTextColor: 'text-amber-500',
    imgUrl: gadget,
  },
  {
    id: '3',
    subtitle: 'Enjoy',
    title: 'With',
    bgTitle: 'Laptop',
    buttonText: 'Browse',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    buttonBg: 'bg-white hover:bg-gray-100',
    buttonTextColor: 'text-red-600',
    imgUrl: macbook,
    isWide: true, 
  },
  {
    id: '4',
    subtitle: 'Enjoy',
    title: 'With',
    bgTitle: 'CONSOLE',
    buttonText: 'Browse',
    bgColor: 'bg-gray-200 dark:bg-gray-800',
    textColor: 'text-gray-900 dark:text-white',
    buttonBg: 'bg-red-600 hover:bg-red-700',
    buttonTextColor: 'text-white',
    imgUrl: console,
    isWide: true, 
  },
  {
    id: '5',
    subtitle: 'Enjoy',
    title: 'With',
    bgTitle: 'Oculus',
    buttonText: 'Browse',
    bgColor: 'bg-emerald-500',
    textColor: 'text-white',
    buttonBg: 'bg-white hover:bg-gray-100',
    buttonTextColor: 'text-emerald-600',
    imgUrl: oculus,
  },
  {
    id: '6',
    subtitle: 'Enjoy',
    title: 'With',
    bgTitle: 'Speakers',
    buttonText: 'Browse',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    buttonBg: 'bg-white hover:bg-gray-100',
    buttonTextColor: 'text-blue-600',
    imgUrl: speaker,
  },
];