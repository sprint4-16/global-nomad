export type Reviews = {
  reviews: Review[];
  totalCount: number;
  averageRating: number;
};

type Review = {
  id: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: null | string;
  };
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
