import { Car, CheckCircle2, Headphones, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SERVICES_DATA: ServiceFeature[] = [
  {
    id: '1',
    title: 'Free Shipping',
    description: 'Free Shipping On All Order',
    icon: Car,
  },
  {
    id: '2',
    title: 'Money Guarantee',
    description: '30 Days Money Back',
    icon: CheckCircle2,
  },
  {
    id: '3',
    title: 'Online Support 24/7',
    description: 'Technical Support 24/7',
    icon: Headphones,
  },
  {
    id: '4',
    title: 'Secure Payment',
    description: 'All Payment Secure',
    icon: Wallet,
  },
];