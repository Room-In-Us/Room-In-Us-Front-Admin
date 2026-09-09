import {
  API_ENDPOINTS,
  buildApiPath,
  getBrowserApi,
  type AdminApiTypes,
} from '@/src/shared/api';

import type {Store, StoreStatus} from '../model/store';

type GetStoreListParams = {
  keyword?: string;
  page: number;
  size: number;
};

type StoreListResult = {
  stores: Store[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNextPage: boolean;
};

type ApiStoreStatus = NonNullable<AdminApiTypes.GetStoreListResponse['status']>;

const storeStatusMap = {
  OPEN_SOON: 'upcoming',
  NEW_OPEN: 'new',
  NORMAL: 'operating',
  RENEWAL: 'renovation',
  CLOSING_SOON: 'closing',
  CLOSED: 'closed',
} satisfies Record<ApiStoreStatus, StoreStatus>;

const mapApiStoreStatus = (
  status: AdminApiTypes.GetStoreListResponse['status']
): StoreStatus => {
  return status ? storeStatusMap[status] : 'operating';
};

const mapApiStore = (
  store: AdminApiTypes.GetStoreListResponse,
  index: number
): Store => {
  return {
    id: store.id ?? index + 1,
    name: store.name ?? '',
    address: store.address ?? '',
    station: store.station ?? '',
    status: mapApiStoreStatus(store.status),
    phone: store.contact ?? '',
    website: store.websiteUrl ?? '',
  };
};

export const getStoreList = async ({
  keyword,
  page,
  size,
}: GetStoreListParams): Promise<StoreListResult> => {
  const {data} =
    await getBrowserApi().get<AdminApiTypes.PageResponseGetStoreListResponse>(
      buildApiPath(API_ENDPOINTS.stores.root, {
        keyword: keyword?.trim() || undefined,
        page,
        size,
      })
    );

  return {
    stores: data.contents?.map(mapApiStore) ?? [],
    page: data.page ?? page,
    size: data.size ?? size,
    totalElements: data.totalElements ?? 0,
    totalPages: data.totalPages ?? 1,
    hasNextPage: data.hasNextPage ?? false,
  };
};

export type {GetStoreListParams, StoreListResult};
