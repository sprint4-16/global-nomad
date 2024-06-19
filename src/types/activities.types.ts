export type ActivityType = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls?: { id: number; imageUrl: string }[];
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
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
