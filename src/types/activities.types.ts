import { categoryList, TIME_MENU_ITEMS } from '@/constants';

export type ActivityType = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: typeof categoryList;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  schedules: {
    id: number;
    date: string;
    startTime: typeof TIME_MENU_ITEMS;
    endTime: typeof TIME_MENU_ITEMS;
  }[];
};

export type Time = {
  endTime: string;
  startTime: string;
  id: number;
};

export type AvailableScheduleType = {
  date: 'string';
  times: Time[];
}[];
