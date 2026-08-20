'use client';

import * as React from 'react';

import type {Store} from '../model/store';

type StoreManagementControlsContextValue = {
  pageSize: number;
  searchKeyword: string;
  onPageSizeChange: (nextPageSize: string) => void;
  onSearchKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type StoreManagementRowsContextValue = {
  stores: Store[];
};

type StoreManagementPaginationContextValue = {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  movePage: (nextPage: number) => void;
};

type StoreManagementClientProviderProps = {
  stores: Store[];
  children: React.ReactNode;
};

const StoreManagementControlsContext =
  React.createContext<StoreManagementControlsContextValue | null>(null);
const StoreManagementRowsContext =
  React.createContext<StoreManagementRowsContextValue | null>(null);
const StoreManagementPaginationContext =
  React.createContext<StoreManagementPaginationContextValue | null>(null);

function StoreManagementClientProvider({
  stores,
  children,
}: StoreManagementClientProviderProps) {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const normalizedSearchKeyword = searchKeyword.trim().toLowerCase();
  const filteredStores = React.useMemo(() => {
    if (!normalizedSearchKeyword) {
      return stores;
    }

    return stores.filter((store) =>
      [store.name, store.address, store.station, store.phone].some((value) =>
        value.toLowerCase().includes(normalizedSearchKeyword)
      )
    );
  }, [normalizedSearchKeyword, stores]);

  const totalPages = Math.max(Math.ceil(filteredStores.length / pageSize), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstVisibleStoreIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedStores = filteredStores.slice(
    firstVisibleStoreIndex,
    firstVisibleStoreIndex + pageSize
  );

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
      stores: paginatedStores,
    }),
    [paginatedStores]
  );

  const paginationValue = React.useMemo(
    () => ({
      currentPage: safeCurrentPage,
      totalPages,
      hasPreviousPage: safeCurrentPage > 1,
      hasNextPage: safeCurrentPage < totalPages,
      movePage,
    }),
    [safeCurrentPage, totalPages, movePage]
  );

  return (
    <StoreManagementControlsContext.Provider value={controlsValue}>
      <StoreManagementRowsContext.Provider value={rowsValue}>
        <StoreManagementPaginationContext.Provider value={paginationValue}>
          {children}
        </StoreManagementPaginationContext.Provider>
      </StoreManagementRowsContext.Provider>
    </StoreManagementControlsContext.Provider>
  );
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

export {
  StoreManagementClientProvider,
  useStoreManagementControls,
  useStoreManagementPagination,
  useStoreManagementRows,
};
