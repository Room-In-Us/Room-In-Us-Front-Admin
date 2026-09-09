'use client';

import {PageTitle} from '@/src/shared/components/layout/PageTitle';

import {StoreAddDialogTrigger} from './components/StoreAddDialogTrigger';
import {
  StoreManagementClientProvider,
  useStoreManagementSummary,
} from './components/StoreManagementClientProvider';
import {StoreManagementTable} from './components/StoreManagementTable';

function StoreManagementPage() {
  return (
    <StoreManagementClientProvider>
      <StoreManagementPageContent />
    </StoreManagementClientProvider>
  );
}

function StoreManagementPageContent() {
  const {totalElements} = useStoreManagementSummary();

  return (
    <section aria-labelledby='store-management-title' className='min-w-0'>
      <PageTitle
        title={<span id='store-management-title'>매장 관리</span>}
        subtitle={`총 ${totalElements}개의 매장`}
        action={<StoreAddDialogTrigger />}
      />

      <StoreManagementTable />
    </section>
  );
}

export {StoreManagementPage};
