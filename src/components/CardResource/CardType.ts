import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export type cardState = 'large' | 'small';

export interface CardResourceProps {
  imgUrl?: StaticImageData;
  rating: number;
  reviewCount: number;
  price: string;
  children: ReactNode;
}

export interface CardContentProps extends CardResourceProps {
  state: cardState;
}
