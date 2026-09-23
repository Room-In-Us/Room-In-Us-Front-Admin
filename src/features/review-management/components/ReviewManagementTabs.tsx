'use client';

import * as React from 'react';

import {
  useDeleteReviewMutation,
  useReviewListQuery,
} from '@/src/features/review-management/api/review-queries';
import {isApiError} from '@/src/shared/api';
import {cn} from '@/src/shared/lib/utils';

import type {ReviewTab} from '../model/review';
import {ReviewManagementTable} from './ReviewManagementTable';
import {ReviewManagementPagination} from './ReviewManagementPagination';
import {GetReviewListParams} from '../api/review-api';

type ReviewTabItem = {
  value: ReviewTab;
  label: string;
};

const PAGE_SIZE = 10;

const reviewTabs: ReviewTabItem[] = [
  {
    value: 'reported',
    label: '신고된 후기',
  },
  {
    value: 'all',
    label: '전체 후기',
  },
  {
    value: 'deleted',
    label: '삭제된 후기',
  },
];

function ReviewManagementTabs() {
  const [activeTab, setActiveTab] = React.useState<ReviewTab>('reported');

  const [page, setPage] = React.useState(1);

  const activeReviewListQuery = useReviewListQuery(
    getReviewListParams(activeTab, page)
  );

  const reportedCountQuery = useReviewListQuery({
    page: 1,
    size: 1,
    searchType: 'REPORTED',
  });

  const deletedCountQuery = useReviewListQuery({
    page: 1,
    size: 1,
    searchType: 'DELETED',
  });

  const deleteReviewMutation = useDeleteReviewMutation();

  const rows = activeReviewListQuery.data?.reviews ?? [];

  const totalElements = activeReviewListQuery.data?.totalElements ?? 0;

  const totalPages = Math.max(activeReviewListQuery.data?.totalPages ?? 1, 1);

  const reportedCount = reportedCountQuery.data?.totalElements ?? 0;

  const deletedCount = deletedCountQuery.data?.totalElements ?? 0;

  const summaryLabel = getSummaryLabel(activeTab, totalElements);

  const errorMessage = activeReviewListQuery.isError
    ? getReviewErrorMessage(
        activeReviewListQuery.error,
        '후기 목록을 불러오지 못했습니다.'
      )
    : undefined;

  function handleTabChange(tab: ReviewTab) {
    setActiveTab(tab);
    setPage(1);
  }

  async function handleDelete(reviewId: number) {
    if (!window.confirm('후기를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteReviewMutation.mutateAsync({
        reviewId,
      });

      if (rows.length === 1 && page > 1) {
        setPage((currentPage) => Math.max(currentPage - 1, 1));
      }
    } catch (error) {
      window.alert(getReviewErrorMessage(error, '후기를 삭제하지 못했습니다.'));
    }
  }

  return (
    <div className='flex min-w-0 flex-col gap-6'>
      <div
        role='tablist'
        aria-label='후기 상태'
        className='bg-riu-monochrome-30 flex h-10 w-fit max-w-full items-center overflow-x-auto rounded-xl p-1'>
        {reviewTabs.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <button
              key={tab.value}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls='review-management-panel'
              id={`review-management-tab-${tab.value}`}
              onClick={() => handleTabChange(tab.value)}
              className={cn(
                'text-body3 text-riu-monochrome-1000 flex h-8 min-w-[116px] shrink-0 items-center justify-center gap-3 rounded-xl px-2 py-1 whitespace-nowrap transition-colors outline-none',
                'focus-visible:ring-riu-primary-300 focus-visible:ring-2 focus-visible:ring-offset-2',
                isActive && 'bg-surface'
              )}>
              <span className='shrink-0'>{tab.label}</span>

              {tab.value === 'reported' && (
                <span className='bg-status-reported-background text-status-reported-foreground text-button3 flex min-w-[1.475rem] shrink-0 items-center justify-center rounded-lg px-[0.55rem] py-[0.175rem]'>
                  {reportedCount}
                </span>
              )}

              {tab.value === 'deleted' && (
                <span className='bg-riu-monochrome-20 text-riu-monochrome-800 text-button3 flex min-w-[1.475rem] shrink-0 items-center justify-center rounded-lg px-[0.55rem] py-[0.175rem]'>
                  {deletedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        id='review-management-panel'
        role='tabpanel'
        aria-labelledby={`review-management-tab-${activeTab}`}
        className='flex min-w-0 flex-col gap-4'>
        <ReviewManagementTable
          reviews={rows}
          activeTab={activeTab}
          isLoading={activeReviewListQuery.isLoading}
          isError={activeReviewListQuery.isError}
          errorMessage={errorMessage}
          deleteDisabled={deleteReviewMutation.isPending}
          onDelete={handleDelete}
        />

        {!activeReviewListQuery.isLoading &&
        !activeReviewListQuery.isError &&
        totalElements > 0 ? (
          <ReviewManagementPagination
            currentPage={page}
            totalPages={totalPages}
            hasPreviousPage={page > 1}
            hasNextPage={
              activeReviewListQuery.data?.hasNextPage ?? page < totalPages
            }
            onPageChange={setPage}
          />
        ) : null}

        <p className='text-caption2 text-riu-monochrome-300'>{summaryLabel}</p>
      </div>
    </div>
  );
}

function getReviewListParams(
  tab: ReviewTab,
  page: number
): GetReviewListParams {
  if (tab === 'reported') {
    return {
      page,
      size: PAGE_SIZE,
      searchType: 'REPORTED',
    };
  }

  if (tab === 'deleted') {
    return {
      page,
      size: PAGE_SIZE,
      searchType: 'DELETED',
    };
  }

  return {
    page,
    size: PAGE_SIZE,
  };
}

function getSummaryLabel(tab: ReviewTab, count: number) {
  if (tab === 'reported') {
    return `총 ${count}개의 신고된 후기`;
  }

  if (tab === 'deleted') {
    return `총 ${count}개의 삭제된 후기`;
  }

  return `총 ${count}개의 후기`;
}

function getReviewErrorMessage(error: unknown, fallbackMessage: string) {
  return isApiError(error) ? error.message : fallbackMessage;
}

export {ReviewManagementTabs};
