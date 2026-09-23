import {Button} from '@/src/shared/components/ui/button';
import {cn} from '@/src/shared/lib/utils';

import type {Review, ReviewTab} from '../model/review';
import {
  IcRotateCcw,
  IcStar,
  IcTrash2,
  IcTriangleAlert,
} from '@/src/assets/icons';

type ReviewManagementTableProps = {
  reviews: Review[];
  activeTab: ReviewTab;
  onDelete: (reviewId: number) => void;
  onRestore: (reviewId: number) => void;
};

const columnHeaders = [
  'ID',
  '테마',
  '작성자',
  '평점',
  '내용',
  '작성일',
  '상태',
  '작업',
];

function ReviewManagementTable({
  reviews,
  activeTab,
  onDelete,
  onRestore,
}: ReviewManagementTableProps) {
  return (
    <div className='border-dashboard-border bg-surface overflow-hidden rounded-[10px] border'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[57.125rem] table-fixed border-collapse'>
          <thead>
            <tr className='border-dashboard-border h-9 border-b'>
              {columnHeaders.map((header) => (
                <th
                  key={header}
                  scope='col'
                  className={cn(
                    'text-body3 text-riu-monochrome-1000 px-2.5 text-center align-middle',
                    header === 'ID' && 'w-[2.125rem]',
                    header === '테마' && 'w-[10.125rem]',
                    header === '작성자' && 'w-[4.3125rem]',
                    header === '평점' && 'w-[8.375rem]',
                    header === '내용' && 'w-[11.625rem]',
                    header === '작성일' && 'w-[6.625rem]',
                    header === '상태' &&
                      (activeTab === 'deleted'
                        ? 'w-[8.625rem]'
                        : 'w-[7.0625rem]'),
                    header === '작업' &&
                      (activeTab === 'deleted'
                        ? 'w-[5.3125rem]'
                        : 'w-[6.875rem]')
                  )}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review.id} className='h-12'>
                  <td className='text-caption2 text-riu-monochrome-800 px-2.5 text-center'>
                    {review.id}
                  </td>

                  <td className='text-caption2 text-riu-monochrome-800 px-2.5 text-center'>
                    <span className='block truncate'>{review.theme}</span>
                  </td>

                  <td className='text-caption2 text-riu-monochrome-800 px-2.5 text-center'>
                    <span className='block truncate'>{review.author}</span>
                  </td>

                  <td className='px-2.5'>
                    <ReviewRating rating={review.rating} />
                  </td>

                  <td className='text-caption2 text-riu-monochrome-800 px-2.5 text-center'>
                    <span className='block truncate'>{review.content}</span>
                  </td>

                  <td className='text-caption2 text-riu-monochrome-800 px-2.5 text-center whitespace-nowrap'>
                    {review.createdAt}
                  </td>

                  <td className='px-2.5'>
                    <div className='flex items-center justify-center gap-2.5'>
                      {review.isReported && <ReportedBadge />}

                      {activeTab === 'deleted' && <DeletedBadge />}
                    </div>
                  </td>

                  <td className='px-2.5 text-center'>
                    {review.status === 'deleted' ? (
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        aria-label={`${review.id}번 후기 복구`}
                        title='복구'
                        className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10 mx-auto h-8 w-8'
                        onClick={() => onRestore(review.id)}>
                        <IcRotateCcw aria-hidden='true' className='size-4' />
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        aria-label={`${review.id}번 후기 삭제`}
                        title='삭제'
                        className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10 mx-auto h-8 w-8'
                        onClick={() => onDelete(review.id)}>
                        <IcTrash2 aria-hidden='true' className='size-4' />
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className='h-12'>
                <td
                  colSpan={columnHeaders.length}
                  className='text-caption2 text-riu-monochrome-300 px-2.5 text-center'>
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReviewRating({rating}: {rating: number}) {
  return (
    <div
      className='flex items-center justify-center gap-1'
      aria-label={`평점 ${rating}점`}>
      {Array.from({length: 5}, (_, index) => {
        const isFilled = index < rating;

        return (
          <IcStar
            key={index}
            aria-hidden='true'
            className={cn(
              'size-4',
              isFilled
                ? 'fill-rating-star-active text-rating-star-active'
                : 'text-rating-star-inactive'
            )}
          />
        );
      })}
    </div>
  );
}

function ReportedBadge() {
  return (
    <span className='bg-status-reported-background text-status-reported-foreground text-button3 inline-flex items-center gap-1 rounded-lg px-2 py-0.5'>
      <IcTriangleAlert aria-hidden='true' className='size-3' />
      신고됨
    </span>
  );
}

function DeletedBadge() {
  return (
    <span className='bg-riu-monochrome-20 text-riu-monochrome-800 text-button3 inline-flex items-center justify-center rounded-lg px-2 py-0.5 whitespace-nowrap'>
      삭제됨
    </span>
  );
}

export {ReviewManagementTable};
