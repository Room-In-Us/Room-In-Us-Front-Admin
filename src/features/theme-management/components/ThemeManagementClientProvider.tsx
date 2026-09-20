'use client';

import * as React from 'react';

import {isApiError} from '@/src/shared/api';

import {useThemeListQuery} from '../api/theme-queries';
import type {Theme} from '../model/theme';

type ThemeManagementControlsContextValue = {
  pageSize: number;
  searchKeyword: string;
  onPageSizeChange: (nextPageSize: string) => void;
  onSearchKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type ThemeManagementRowsContextValue = {
  errorMessage: string;
  isError: boolean;
  isLoading: boolean;
  themes: Theme[];
};

type ThemeManagementPaginationContextValue = {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  movePage: (nextPage: number) => void;
};

type ThemeManagementSummaryContextValue = {
  totalElements: number;
};

type ThemeManagementClientProviderProps = {
  children: React.ReactNode;
};

const ThemeManagementControlsContext =
  React.createContext<ThemeManagementControlsContextValue | null>(null);
const ThemeManagementRowsContext =
  React.createContext<ThemeManagementRowsContextValue | null>(null);
const ThemeManagementPaginationContext =
  React.createContext<ThemeManagementPaginationContextValue | null>(null);
const ThemeManagementSummaryContext =
  React.createContext<ThemeManagementSummaryContextValue | null>(null);

function ThemeManagementClientProvider({
  children,
}: ThemeManagementClientProviderProps) {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const normalizedSearchKeyword = searchKeyword.trim();
  const themeListQuery = useThemeListQuery({
    keyword: normalizedSearchKeyword || undefined,
    page: currentPage,
    size: pageSize,
  });
  const totalPages = Math.max(themeListQuery.data?.totalPages ?? 1, 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  React.useEffect(() => {
    if (
      !themeListQuery.data ||
      themeListQuery.isPlaceholderData ||
      totalPages >= currentPage
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentPage(totalPages);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [
    currentPage,
    themeListQuery.data,
    themeListQuery.isPlaceholderData,
    totalPages,
  ]);

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
      errorMessage: getThemeListErrorMessage(themeListQuery.error),
      isError: themeListQuery.isError,
      isLoading: themeListQuery.isLoading,
      themes: themeListQuery.data?.themes ?? [],
    }),
    [
      themeListQuery.data?.themes,
      themeListQuery.error,
      themeListQuery.isError,
      themeListQuery.isLoading,
    ]
  );

  const paginationValue = React.useMemo(
    () => ({
      currentPage: safeCurrentPage,
      totalPages,
      hasPreviousPage: safeCurrentPage > 1,
      hasNextPage:
        themeListQuery.data?.hasNextPage ?? safeCurrentPage < totalPages,
      movePage,
    }),
    [safeCurrentPage, totalPages, themeListQuery.data?.hasNextPage, movePage]
  );

  const summaryValue = React.useMemo(
    () => ({
      totalElements: themeListQuery.data?.totalElements ?? 0,
    }),
    [themeListQuery.data?.totalElements]
  );

  return (
    <ThemeManagementControlsContext.Provider value={controlsValue}>
      <ThemeManagementRowsContext.Provider value={rowsValue}>
        <ThemeManagementPaginationContext.Provider value={paginationValue}>
          <ThemeManagementSummaryContext.Provider value={summaryValue}>
            {children}
          </ThemeManagementSummaryContext.Provider>
        </ThemeManagementPaginationContext.Provider>
      </ThemeManagementRowsContext.Provider>
    </ThemeManagementControlsContext.Provider>
  );
}

function getThemeListErrorMessage(error: unknown) {
  if (!error) {
    return '';
  }

  return isApiError(error) ? error.message : '테마 목록을 불러오지 못했습니다.';
}

function useThemeManagementControls() {
  const value = React.useContext(ThemeManagementControlsContext);

  if (!value) {
    throw new Error(
      'useThemeManagementControls는 ThemeManagementClientProvider 안에서 사용해야 합니다.'
    );
  }

  return value;
}

function useThemeManagementRows() {
  const value = React.useContext(ThemeManagementRowsContext);

  if (!value) {
    throw new Error(
      'useThemeManagementRows는 ThemeManagementClientProvider 안에서 사용해야 합니다.'
    );
  }

  return value;
}

function useThemeManagementPagination() {
  const value = React.useContext(ThemeManagementPaginationContext);

  if (!value) {
    throw new Error(
      'useThemeManagementPagination은 ThemeManagementClientProvider 안에서 사용해야 합니다.'
    );
  }

  return value;
}

function useThemeManagementSummary() {
  const value = React.useContext(ThemeManagementSummaryContext);

  if (!value) {
    throw new Error(
      'useThemeManagementSummary는 ThemeManagementClientProvider 안에서 사용해야 합니다.'
    );
  }

  return value;
}

export {
  ThemeManagementClientProvider,
  useThemeManagementControls,
  useThemeManagementPagination,
  useThemeManagementRows,
  useThemeManagementSummary,
};
