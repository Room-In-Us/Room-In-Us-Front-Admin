type ReviewStatus = 'normal' | 'reported' | 'deleted';

type Review = {
  id: number;
  theme: string;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
  status: ReviewStatus;
};

type ReviewTab = 'reported' | 'all' | 'deleted';

export type {Review, ReviewStatus, ReviewTab};
