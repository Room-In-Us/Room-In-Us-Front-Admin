'use client';

import * as React from 'react';

import {cn} from '@/src/shared/lib/utils';

import type {Review, ReviewTab} from '../model/review';
import {ReviewManagementTable} from './ReviewManagementTable';

type ReviewManagementTabsProps = {
  reviews: Review[];
};

type ReviewTabItem = {
  value: ReviewTab;
  label: string;
};

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

function ReviewManagementTabs({reviews}: ReviewManagementTabsProps) {
  const [reviewItems, setReviewItems] = React.useState(reviews);
  const [activeTab, setActiveTab] = React.useState<ReviewTab>('reported');
  const reportedCount = reviewItems.filter(
    (review) => review.status === 'reported'
  ).length;
  const rows = getRowsByTab(reviewItems, activeTab);
  const summaryLabel = getSummaryLabel(activeTab, rows.length);

  function handleDelete(reviewId: number) {
    setReviewItems((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId ? {...review, status: 'deleted'} : review
      )
    );
  }

  return (
    <div className='flex min-w-0 flex-col gap-6'>
      <div
        role='tablist'
        aria-label='후기 상태'
        className='bg-riu-monochrome-30 flex h-10 w-fit items-center rounded-xl p-1'>
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
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'text-body3 text-riu-monochrome-1000 flex h-8 w-[140px] items-center justify-center gap-3 rounded-xl px-2 py-1 transition-colors outline-none',
                'focus-visible:ring-riu-primary-300 focus-visible:ring-2 focus-visible:ring-offset-2',
                isActive && 'bg-surface'
              )}>
              <span>{tab.label}</span>
              {tab.value === 'reported' ? (
                <span className='bg-status-reported-background text-status-reported-foreground text-button3 flex min-w-[1.25rem] items-center justify-center rounded-lg px-2 py-0.5'>
                  {reportedCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        id='review-management-panel'
        role='tabpanel'
        aria-labelledby={`review-management-tab-${activeTab}`}
        className='min-w-0'>
        <ReviewManagementTable reviews={rows} onDelete={handleDelete} />
        <p className='text-caption2 text-riu-monochrome-300 mt-3'>
          {summaryLabel}
        </p>
      </div>
    </div>
  );
}

function getRowsByTab(reviews: Review[], tab: ReviewTab) {
  if (tab === 'reported') {
    return reviews.filter((review) => review.status === 'reported');
  }

  if (tab === 'deleted') {
    return reviews.filter((review) => review.status === 'deleted');
  }

  return reviews.filter((review) => review.status !== 'deleted');
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

export {ReviewManagementTabs};
