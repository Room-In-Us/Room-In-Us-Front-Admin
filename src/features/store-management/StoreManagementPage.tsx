import {PageTitle} from '@/src/shared/components/layout/PageTitle';

import {StoreAddDialogTrigger} from './components/StoreAddDialogTrigger';
import {StoreManagementTable} from './components/StoreManagementTable';
import {stores} from './model/mockStores';

function StoreManagementPage() {
  return (
    <section aria-labelledby='store-management-title' className='min-w-0'>
      <PageTitle
        title={<span id='store-management-title'>매장 관리</span>}
        subtitle={`총 ${stores.length}개의 매장`}
        action={<StoreAddDialogTrigger />}
      />

      <StoreManagementTable stores={stores} />
    </section>
  );
}

export {StoreManagementPage};
