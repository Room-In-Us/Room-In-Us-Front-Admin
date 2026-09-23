'use client';

import {ManagementPagination} from '@/src/shared/components/ui/ManagementPagination';

import {useThemeManagementPagination} from './ThemeManagementClientProvider';
import {ThemeManagementTableContent} from './ThemeManagementTableContent';
import {ThemeManagementToolbar} from './ThemeManagementToolbar';

function ThemeManagementTable() {
  const {currentPage, totalPages, hasPreviousPage, hasNextPage, movePage} =
    useThemeManagementPagination();

  return (
    <>
      <ThemeManagementToolbar />
      <ThemeManagementTableContent />

      <ManagementPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={movePage}
        className='mt-6'
      />
    </>
  );
}

export {ThemeManagementTable};
