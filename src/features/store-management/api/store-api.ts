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

type CreateStoreParams = {
  request: AdminApiTypes.PostStoreRequest;
};

type GetStoreDetailParams = {
  fallbackStore?: Store;
  storeId: Store['id'];
};

type DeleteStoreParams = {
  storeId: Store['id'];
};

type StoreDetailResult = Store;

type NullableDatePatchStoreRequest = Omit<
  AdminApiTypes.PatchStoreRequest,
  | 'closureDate'
  | 'closureExpectedDate'
  | 'openDate'
  | 'renewalEndDate'
  | 'renewalStartDate'
> & {
  closureDate?: null | string;
  closureExpectedDate?: null | string;
  openDate?: null | string;
  renewalEndDate?: null | string;
  renewalStartDate?: null | string;
};

type UpdateStoreParams = {
  request: NullableDatePatchStoreRequest;
  storeId: Store['id'];
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

const mapApiStoreDetail = (
  store: AdminApiTypes.GetStoreInfoResponse,
  fallbackStore: Store
): Store => {
  return {
    id: fallbackStore.id,
    name: store.name ?? fallbackStore.name,
    address: store.address ?? fallbackStore.address,
    station: store.station ?? fallbackStore.station,
    status: fallbackStore.status,
    phone: store.contact ?? fallbackStore.phone,
    website: store.websiteUrl ?? fallbackStore.website,
    reservationUrl: store.reservationUrl ?? fallbackStore.reservationUrl,
    description: store.about ?? fallbackStore.description,
    memo: store.note ?? fallbackStore.memo,
    openedAt: store.openDate ?? fallbackStore.openedAt,
    expectedClosedAt:
      store.closureExpectedDate ?? fallbackStore.expectedClosedAt,
    renovationStartedAt:
      store.renewalStartDate ?? fallbackStore.renovationStartedAt,
    renovationEndedAt: store.renewalEndDate ?? fallbackStore.renovationEndedAt,
    closedAt: store.closureDate ?? fallbackStore.closedAt,
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

export const createStore = async ({
  request,
}: CreateStoreParams): Promise<AdminApiTypes.PostStoreResponse> => {
  const {data} = await getBrowserApi().post<AdminApiTypes.PostStoreResponse>(
    API_ENDPOINTS.stores.root,
    request
  );

  return data;
};

export const getStoreDetail = async ({
  fallbackStore,
  storeId,
}: GetStoreDetailParams): Promise<StoreDetailResult> => {
  const {data} = await getBrowserApi().get<AdminApiTypes.GetStoreInfoResponse>(
    API_ENDPOINTS.stores.detail(storeId)
  );

  return mapApiStoreDetail(data, {
    id: storeId,
    name: '',
    address: '',
    station: '',
    status: 'operating',
    phone: '',
    website: '',
    ...fallbackStore,
  });
};

export const deleteStore = async ({
  storeId,
}: DeleteStoreParams): Promise<void> => {
  await getBrowserApi().delete(API_ENDPOINTS.stores.detail(storeId));
};

export const updateStore = async ({
  request,
  storeId,
}: UpdateStoreParams): Promise<void> => {
  await getBrowserApi().patch(API_ENDPOINTS.stores.detail(storeId), request);
};

export type {
  CreateStoreParams,
  DeleteStoreParams,
  GetStoreDetailParams,
  GetStoreListParams,
  NullableDatePatchStoreRequest,
  StoreDetailResult,
  StoreListResult,
  UpdateStoreParams,
};
