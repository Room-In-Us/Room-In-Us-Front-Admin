import type {Store} from '../model/store';
import {StoreManagementClientProvider} from './StoreManagementClientProvider';
import {StoreManagementPagination} from './StoreManagementPagination';
import {StoreManagementTableContent} from './StoreManagementTableContent';
import {StoreManagementToolbar} from './StoreManagementToolbar';

type StoreManagementTableProps = {
  stores: Store[];
};

function StoreManagementTable({stores}: StoreManagementTableProps) {
  return (
    <StoreManagementClientProvider stores={stores}>
      <StoreManagementToolbar />
      <StoreManagementTableContent />
      <StoreManagementPagination />
    </StoreManagementClientProvider>
  );
}

export {StoreManagementTable};
