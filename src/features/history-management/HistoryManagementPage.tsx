import {PageTitle} from '@/src/shared/components/layout/PageTitle';

import {HistoryManagementTable} from './components/HistoryManagementTable';

function HistoryManagementPage() {
  return (
    <section aria-labelledby='history-management-title' className='min-w-0'>
      <PageTitle
        title={<span id='history-management-title'>히스토리</span>}
        subtitle='데이터 수정 내역 조회'
      />

      <HistoryManagementTable />
    </section>
  );
}

export {HistoryManagementPage};
