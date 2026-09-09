'use client';

import * as React from 'react';

import {isApiError} from '@/src/shared/api';

import {useStoreListQuery} from '../api/store-queries';
import type {Store} from '../model/store';

type StoreManagementControlsContextValue = {
  pageSize: number;
  searchKeyword: string;
  onPageSizeChange: (nextPageSize: string) => void;
  onSearchKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type StoreManagementRowsContextValue = {
  stores: Store[];
  isError: boolean;
  isLoading: boolean;
  errorMessage: string;
};

type StoreManagementPaginationContextValue = {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  movePage: (nextPage: number) => void;
};

type StoreManagementSummaryContextValue = {
  totalElements: number;
};

type StoreManagementClientProviderProps = {
  children: React.ReactNode;
};

const StoreManagementControlsContext =
  React.createContext<StoreManagementControlsContextValue | null>(null);
const StoreManagementRowsContext =
  React.createContext<StoreManagementRowsContextValue | null>(null);
const StoreManagementPaginationContext =
  React.createContext<StoreManagementPaginationContextValue | null>(null);
const StoreManagementSummaryContext =
  React.createContext<StoreManagementSummaryContextValue | null>(null);

function StoreManagementClientProvider({
  children,
}: StoreManagementClientProviderProps) {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const normalizedSearchKeyword = searchKeyword.trim();
  const storeListQuery = useStoreListQuery({
    keyword: normalizedSearchKeyword || undefined,
    page: currentPage,
    size: pageSize,
  });
  const totalPages = Math.max(storeListQuery.data?.totalPages ?? 1, 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const handlePageSizeChange = React.useCallback((nextPageSize: string) => {
    setPageSize(Number(nextPageSize));
    setCurrentPage(1);
  }, []);

  const handleSearchKeywordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(event.target.value);
      setCurrentPage(1);
    },
    []
  );

  const movePage = React.useCallback(
    (nextPage: number) => {
      setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
    },
    [totalPages]
  );

  const controlsValue = React.useMemo(
    () => ({
      pageSize,
      searchKeyword,
      onPageSizeChange: handlePageSizeChange,
      onSearchKeywordChange: handleSearchKeywordChange,
    }),
    [pageSize, searchKeyword, handlePageSizeChange, handleSearchKeywordChange]
  );

  const rowsValue = React.useMemo(
    () => ({
      stores: storeListQuery.data?.stores ?? [],
      isError: storeListQuery.isError,
      isLoading: storeListQuery.isLoading,
      errorMessage: getStoreListErrorMessage(storeListQuery.error),
    }),
    [
      storeListQuery.data?.stores,
      storeListQuery.error,
      storeListQuery.isError,
      storeListQuery.isLoading,
    ]
  );

  const paginationValue = React.useMemo(
    () => ({
      currentPage: safeCurrentPage,
      totalPages,
      hasPreviousPage: safeCurrentPage > 1,
      hasNextPage:
        storeListQuery.data?.hasNextPage ?? safeCurrentPage < totalPages,
      movePage,
    }),
    [safeCurrentPage, totalPages, storeListQuery.data?.hasNextPage, movePage]
  );

  const summaryValue = React.useMemo(
    () => ({
      totalElements: storeListQuery.data?.totalElements ?? 0,
    }),
    [storeListQuery.data?.totalElements]
  );

  return (
    <StoreManagementControlsContext.Provider value={controlsValue}>
      <StoreManagementRowsContext.Provider value={rowsValue}>
        <StoreManagementPaginationContext.Provider value={paginationValue}>
          <StoreManagementSummaryContext.Provider value={summaryValue}>
            {children}
          </StoreManagementSummaryContext.Provider>
        </StoreManagementPaginationContext.Provider>
      </StoreManagementRowsContext.Provider>
    </StoreManagementControlsContext.Provider>
  );
}

function getStoreListErrorMessage(error: unknown) {
  if (!error) {
    return '';
  }

  return isApiError(error) ? error.message : '매장 목록을 불러오지 못했습니다.';
}

function useStoreManagementControls() {
  const value = React.useContext(StoreManagementControlsContext);

  if (!value) {
    throw new Error(
      'useStoreManagementControls must be used within StoreManagementClientProvider.'
    );
  }

  return value;
}

function useStoreManagementRows() {
  const value = React.useContext(StoreManagementRowsContext);

  if (!value) {
    throw new Error(
      'useStoreManagementRows must be used within StoreManagementClientProvider.'
    );
  }

  return value;
}

function useStoreManagementPagination() {
  const value = React.useContext(StoreManagementPaginationContext);

  if (!value) {
    throw new Error(
      'useStoreManagementPagination must be used within StoreManagementClientProvider.'
    );
  }

  return value;
}

function useStoreManagementSummary() {
  const value = React.useContext(StoreManagementSummaryContext);

  if (!value) {
    throw new Error(
      'useStoreManagementSummary must be used within StoreManagementClientProvider.'
    );
  }

  return value;
}

export {
  StoreManagementClientProvider,
  useStoreManagementControls,
  useStoreManagementPagination,
  useStoreManagementRows,
  useStoreManagementSummary,
};
