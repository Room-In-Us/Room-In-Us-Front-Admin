import {ManagementPagination} from '@/src/shared/components/ui/ManagementPagination';
import {StoreManagementTableContent} from './StoreManagementTableContent';
import {StoreManagementToolbar} from './StoreManagementToolbar';
import {useStoreManagementPagination} from './StoreManagementClientProvider';

function StoreManagementTable() {
  const {currentPage, totalPages, hasPreviousPage, hasNextPage, movePage} =
    useStoreManagementPagination();
  return (
    <>
      <StoreManagementToolbar />
      <StoreManagementTableContent />
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

export {StoreManagementTable};
