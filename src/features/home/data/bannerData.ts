import headphoneImg from '../../../assets/images/headphone.png';

export interface BannerData {
  discount: string;
  title: string;
  date: string;
  image: string;
  productName: string;
  saleTitle: string;
  description: string;
  buttonText: string;
  bgColor: string;
}

export const MAIN_BANNER_DATA: BannerData = {
  discount: '30% OFF',
  title: 'FINE SMILE',
  date: '10 Jan to 28 Jan',
  image: headphoneImg,
  productName: 'Air Solo Bass',
  saleTitle: 'Winter Sale',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis',
  buttonText: 'Shop',
  bgColor: 'bg-red-600',
};