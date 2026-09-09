import {StoreManagementPagination} from './StoreManagementPagination';
import {StoreManagementTableContent} from './StoreManagementTableContent';
import {StoreManagementToolbar} from './StoreManagementToolbar';

function StoreManagementTable() {
  return (
    <>
      <StoreManagementToolbar />
      <StoreManagementTableContent />
      <StoreManagementPagination />
    </>
  );
}

export {StoreManagementTable};
