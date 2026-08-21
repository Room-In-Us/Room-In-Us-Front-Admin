'use client';

import * as React from 'react';

import type {Theme} from '../model/theme';

type ThemeManagementControlsContextValue = {
  pageSize: number;
  searchKeyword: string;
  onPageSizeChange: (nextPageSize: string) => void;
  onSearchKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type ThemeManagementRowsContextValue = {
  themes: Theme[];
};

type ThemeManagementPaginationContextValue = {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  movePage: (nextPage: number) => void;
};

type ThemeManagementClientProviderProps = {
  themes: Theme[];
  children: React.ReactNode;
};

const ThemeManagementControlsContext =
  React.createContext<ThemeManagementControlsContextValue | null>(null);
const ThemeManagementRowsContext =
  React.createContext<ThemeManagementRowsContextValue | null>(null);
const ThemeManagementPaginationContext =
  React.createContext<ThemeManagementPaginationContextValue | null>(null);

function ThemeManagementClientProvider({
  themes,
  children,
}: ThemeManagementClientProviderProps) {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const normalizedSearchKeyword = searchKeyword.trim().toLowerCase();
  const filteredThemes = React.useMemo(() => {
    if (!normalizedSearchKeyword) {
      return themes;
    }

    return themes.filter((theme) =>
      [theme.storeName, theme.name, ...theme.genres].some((value) =>
        value.toLowerCase().includes(normalizedSearchKeyword)
      )
    );
  }, [normalizedSearchKeyword, themes]);

  const totalPages = Math.max(Math.ceil(filteredThemes.length / pageSize), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstVisibleThemeIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedThemes = filteredThemes.slice(
    firstVisibleThemeIndex,
    firstVisibleThemeIndex + pageSize
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
      themes: paginatedThemes,
    }),
    [paginatedThemes]
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
    <ThemeManagementControlsContext.Provider value={controlsValue}>
      <ThemeManagementRowsContext.Provider value={rowsValue}>
        <ThemeManagementPaginationContext.Provider value={paginationValue}>
          {children}
        </ThemeManagementPaginationContext.Provider>
      </ThemeManagementRowsContext.Provider>
    </ThemeManagementControlsContext.Provider>
  );
}

function useThemeManagementControls() {
  const value = React.useContext(ThemeManagementControlsContext);

  if (!value) {
    throw new Error(
      'useThemeManagementControls must be used within ThemeManagementClientProvider.'
    );
  }

  return value;
}

function useThemeManagementRows() {
  const value = React.useContext(ThemeManagementRowsContext);

  if (!value) {
    throw new Error(
      'useThemeManagementRows must be used within ThemeManagementClientProvider.'
    );
  }

  return value;
}

function useThemeManagementPagination() {
  const value = React.useContext(ThemeManagementPaginationContext);

  if (!value) {
    throw new Error(
      'useThemeManagementPagination must be used within ThemeManagementClientProvider.'
    );
  }

  return value;
}

export {
  ThemeManagementClientProvider,
  useThemeManagementControls,
  useThemeManagementPagination,
  useThemeManagementRows,
};
