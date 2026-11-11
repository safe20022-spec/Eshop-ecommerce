import blog1Img from '../../../assets/images/blog-1.jpg';
import blog2Img from '../../../assets/images/blog-2.jpg';
import blog3Img from '../../../assets/images/blog-3.jpg';

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  author: string;
  image: string;
}

export const RECENT_NEWS_DATA: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to choose perfect smartwatch',
    subtitle: 'minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis meiores molestiae...',
    publishedAt: 'Jan 20, 2024',
    author: 'Dilshad',
    image: blog1Img,
  },
  {
    id: 'b2',
    title: 'How to choose perfect gadget',
    subtitle: 'minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis meiores molestiae...',
    publishedAt: 'Jan 20, 2024',
    author: 'Satya',
    image: blog2Img,
  },
  {
    id: 'b3',
    title: 'How to choose perfect VR headset',
    subtitle: 'minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis meiores molestiae...',
    publishedAt: 'Jan 20, 2024',
    author: 'Sabir',
    image: blog3Img,
  },
];