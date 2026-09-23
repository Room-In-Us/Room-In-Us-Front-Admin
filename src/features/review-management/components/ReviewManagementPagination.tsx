'use client';

import {Button} from '@/src/shared/components/ui/button';

type ReviewManagementPaginationProps = {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
};

function ReviewManagementPagination({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}: ReviewManagementPaginationProps) {
  return (
    <div className='flex w-full items-center justify-center gap-2'>
      <Button
        type='button'
        variant='outline'
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
        className='border-riu-monochrome-30 bg-surface text-button2 text-riu-monochrome-800 h-8 px-3'>
        이전
      </Button>

      <span className='text-body3 text-riu-monochrome-800 px-1'>
        {currentPage} / {totalPages}
      </span>

      <Button
        type='button'
        variant='outline'
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
        className='border-riu-monochrome-30 bg-surface text-button2 text-riu-monochrome-800 h-8 px-3'>
        다음
      </Button>
    </div>
  );
}

export {ReviewManagementPagination};
