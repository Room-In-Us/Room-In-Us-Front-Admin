'use client';

import {Button} from '@/src/shared/components/ui/button';
import {cn} from '@/src/shared/lib/utils';

type ManagementPaginationProps = {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  className?: string;
};

function ManagementPagination({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  className,
}: ManagementPaginationProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center gap-2',
        className
      )}>
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

export {ManagementPagination};
