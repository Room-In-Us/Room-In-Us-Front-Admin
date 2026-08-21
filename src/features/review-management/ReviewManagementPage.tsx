import {PageTitle} from '@/src/shared/components/layout/PageTitle';

import {ReviewManagementTabs} from './components/ReviewManagementTabs';
import {reviews} from './model/mockReviews';

function ReviewManagementPage() {
  return (
    <section
      aria-labelledby='review-management-title'
      className='flex min-w-0 flex-col gap-6'>
      <PageTitle
        title={<span id='review-management-title'>후기 관리</span>}
        subtitle='후기 확인 및 관리'
      />

      <ReviewManagementTabs reviews={reviews} />
    </section>
  );
}

export {ReviewManagementPage};
