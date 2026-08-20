type StoreStatus = 'operating' | 'new' | 'closing' | 'closed';

type Store = {
  id: number;
  name: string;
  address: string;
  station: string;
  status: StoreStatus;
  phone: string;
  website: string;
  reservationUrl?: string;
  description?: string;
  memo?: string;
  openedAt?: string;
  expectedClosedAt?: string;
  renovationStartedAt?: string;
  renovationEndedAt?: string;
  closedAt?: string;
};

export type {Store, StoreStatus};
