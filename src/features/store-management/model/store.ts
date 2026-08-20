type StoreStatus = 'operating' | 'new' | 'closing' | 'closed';

type Store = {
  id: number;
  name: string;
  address: string;
  station: string;
  status: StoreStatus;
  phone: string;
  website: string;
};

export type {Store, StoreStatus};
