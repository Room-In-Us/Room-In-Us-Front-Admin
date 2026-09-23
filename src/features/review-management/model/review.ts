type ReviewStatus = 'active' | 'deleted';

type Review = {
  id: number;
  theme: string;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
  status: ReviewStatus;
  isReported: boolean;
  reportReasons: string[];
};

type ReviewTab = 'reported' | 'all' | 'deleted';

export type {Review, ReviewStatus, ReviewTab};
