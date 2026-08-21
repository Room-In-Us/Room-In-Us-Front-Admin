import {Star, Trash2, TriangleAlert} from 'lucide-react';

import {Button} from '@/src/shared/components/ui/button';
import {cn} from '@/src/shared/lib/utils';

import type {Review} from '../model/review';

type ReviewManagementTableProps = {
  reviews: Review[];
  onDelete: (reviewId: number) => void;
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
  onDelete,
}: ReviewManagementTableProps) {
  return (
    <div className='border-dashboard-border bg-surface overflow-hidden rounded-[10px] border'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[48.75rem] table-fixed border-collapse'>
          <thead>
            <tr className='border-dashboard-border h-10 border-b'>
              {columnHeaders.map((header) => (
                <th
                  key={header}
                  scope='col'
                  className={cn(
                    'text-body3 text-riu-monochrome-1000 px-2.5 text-center align-middle',
                    header === 'ID' && 'w-[2.125rem] text-left',
                    header === '테마' && 'w-[12.6875rem]',
                    header === '작성자' && 'w-[4.3125rem]',
                    header === '평점' && 'w-[8.375rem]',
                    header === '내용' && 'w-[11.625rem]',
                    header === '작성일' && 'w-[6.625rem]',
                    header === '상태' && 'w-[7.0625rem]',
                    header === '작업' && 'w-[4rem]'
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
                  <td className='text-caption2 text-riu-monochrome-1000 px-2.5 text-center'>
                    {review.id}
                  </td>
                  <td className='text-caption2 text-riu-monochrome-1000 px-2.5 text-center'>
                    <span className='block truncate'>{review.theme}</span>
                  </td>
                  <td className='text-caption2 text-riu-monochrome-1000 px-2.5 text-center'>
                    <span className='block truncate'>{review.author}</span>
                  </td>
                  <td className='px-2.5'>
                    <ReviewRating rating={review.rating} />
                  </td>
                  <td className='text-riu-monochrome-1000 px-2.5 text-center text-[0.75rem] leading-[0.875rem] font-normal'>
                    <span className='line-clamp-2'>{review.content}</span>
                  </td>
                  <td className='text-caption2 text-riu-monochrome-1000 px-2.5 text-center whitespace-nowrap'>
                    {review.createdAt}
                  </td>
                  <td className='px-2.5 text-center'>
                    {review.status === 'reported' ? <ReportedBadge /> : null}
                  </td>
                  <td className='px-2.5 text-center'>
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      aria-label={`${review.id}번 후기 삭제`}
                      title={
                        review.status === 'deleted' ? '이미 삭제됨' : '삭제'
                      }
                      disabled={review.status === 'deleted'}
                      className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10 mx-auto'
                      onClick={() => onDelete(review.id)}>
                      <Trash2 aria-hidden='true' className='size-4' />
                    </Button>
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
          <Star
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
      <TriangleAlert aria-hidden='true' className='size-3' />
      신고됨
    </span>
  );
}

export {ReviewManagementTable};
