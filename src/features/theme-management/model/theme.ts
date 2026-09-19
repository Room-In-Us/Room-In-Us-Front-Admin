type ThemeStatus =
  | 'closed'
  | 'closing'
  | 'new'
  | 'operating'
  | 'renovation'
  | 'upcoming';

type Theme = {
  id: number;
  storeId: number;
  storeName: string;
  name: string;
  status: ThemeStatus;
  difficulty: number;
  playTimeMinutes: number;
  genres: string[];
  imageUrl?: string;
};

export type {Theme, ThemeStatus};
