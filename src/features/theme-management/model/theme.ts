type ThemeStatus = 'operating' | 'new' | 'closing' | 'closed';

type Theme = {
  id: number;
  storeName: string;
  name: string;
  status: ThemeStatus;
  difficulty: number;
  playTimeMinutes: number;
  genres: string[];
};

export type {Theme, ThemeStatus};
