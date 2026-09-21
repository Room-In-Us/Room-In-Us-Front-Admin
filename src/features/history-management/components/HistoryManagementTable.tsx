'use client';

import * as React from 'react';

import {IcLayers, IcStore} from '@/src/assets/icons';
import {useStoreHistoryListQuery} from '@/src/features/store-management/api/store-queries';
import {
  useRestoreThemeHistoryMutation,
  useThemeHistoryListQuery,
} from '@/src/features/theme-management/api/theme-queries';
import {Tabs, type TabItem} from '@/src/shared/components/ui/Tabs';

import type {HistoryRecord, HistoryTarget} from '../model/history';
import {
  getHistoryErrorMessage,
  mapStoreHistoryListItem,
  mapThemeHistoryListItem,
} from '../lib/history-utils';
import {HistoryFilterBar} from './HistoryFilterBar';
import {HistoryMetadataDialog} from './HistoryMetadataDialog';
import {HistoryTable} from './HistoryTable';
import {HistoryManagementPagination} from './HistoryManagementPagination';

const targetLabels = {
  store: '매장',
  theme: '테마',
} satisfies Record<HistoryTarget, string>;

function HistoryManagementTable() {
  const [activeTarget, setActiveTarget] =
    React.useState<HistoryTarget>('store');
  const [pageSize, setPageSize] = React.useState('10');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [selectedHistory, setSelectedHistory] =
    React.useState<HistoryRecord | null>(null);
  const [page, setPage] = React.useState(1);

  const storeHistoryListQuery = useStoreHistoryListQuery({
    endDate,
    page,
    size: Number(pageSize),
    startDate,
  });

  const themeHistoryListQuery = useThemeHistoryListQuery({
    endDate,
    page,
    size: Number(pageSize),
    startDate,
  });

  const restoreThemeHistoryMutation = useRestoreThemeHistoryMutation();

  const storeHistoryRows =
    storeHistoryListQuery.data?.histories.map(mapStoreHistoryListItem) ?? [];

  const themeHistoryRows =
    themeHistoryListQuery.data?.histories.map(mapThemeHistoryListItem) ?? [];

  const rows = activeTarget === 'theme' ? themeHistoryRows : storeHistoryRows;

  const activeHistoryQuery =
    activeTarget === 'theme' ? themeHistoryListQuery : storeHistoryListQuery;

  const totalCount =
    activeTarget === 'theme'
      ? (themeHistoryListQuery.data?.totalElements ?? 0)
      : (storeHistoryListQuery.data?.totalElements ?? 0);

  const historyErrorMessage = getHistoryErrorMessage(
    activeHistoryQuery.error,
    activeTarget === 'theme'
      ? '테마 히스토리를 불러오지 못했습니다.'
      : '매장 히스토리를 불러오지 못했습니다.'
  );

  const totalPages = Math.max(activeHistoryQuery.data?.totalPages ?? 1, 1);

  const hasPreviousPage = page > 1;

  const hasNextPage = page < totalPages;

  function handlePageSizeChange(value: string) {
    setPageSize(value);
    setPage(1);
  }

  function handleStartDateChange(value: string) {
    setStartDate(value);
    setPage(1);
  }

  function handleEndDateChange(value: string) {
    setEndDate(value);
    setPage(1);
  }

  function handleTargetChange(value: string) {
    setActiveTarget(value as HistoryTarget);
    setPage(1);
  }

  async function handleThemeRestore(history: HistoryRecord) {
    const {commitId} = history;

    if (!commitId) {
      return;
    }

    if (!window.confirm('데이터를 복구하시겠습니까?')) {
      return;
    }

    try {
      await restoreThemeHistoryMutation.mutateAsync({commitId});
    } catch (error) {
      window.alert(
        getHistoryErrorMessage(error, '테마 히스토리를 복구하지 못했습니다.')
      );
    }
  }

  return (
    <div className='mt-6 flex min-w-0 flex-col items-start gap-6'>
      <Tabs
        aria-label='히스토리 유형'
        items={createHistoryTabs({
          storeCount: storeHistoryListQuery.data?.totalElements ?? 0,
          themeCount: themeHistoryListQuery.data?.totalElements ?? 0,
        })}
        value={activeTarget}
        onValueChange={handleTargetChange}
        className='border-riu-monochrome-20'
      />

      <HistoryFilterBar
        pageSize={pageSize}
        startDate={startDate}
        endDate={endDate}
        onPageSizeChange={handlePageSizeChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />

      <HistoryTable
        histories={rows}
        isLoading={activeHistoryQuery.isLoading}
        isError={activeHistoryQuery.isError}
        errorMessage={historyErrorMessage}
        restoreDisabled={restoreThemeHistoryMutation.isPending}
        onOpenDetail={setSelectedHistory}
        onRestore={handleThemeRestore}
      />

      <HistoryManagementPagination
        currentPage={page}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={setPage}
      />

      <p className='text-caption2 text-riu-monochrome-300'>
        총 {totalCount}개의 히스토리
      </p>

      {selectedHistory ? (
        <HistoryMetadataDialog
          history={selectedHistory}
          onClose={() => setSelectedHistory(null)}
        />
      ) : null}
    </div>
  );
}

function createHistoryTabs({
  storeCount,
  themeCount,
}: {
  storeCount: number;
  themeCount: number;
}): TabItem[] {
  return (['store', 'theme'] satisfies HistoryTarget[]).map((target) => ({
    value: target,
    label: targetLabels[target],
    count: target === 'store' ? storeCount : themeCount,
    icon: target === 'store' ? IcStore : IcLayers,
    iconSize: 'sm',
  }));
}

export {HistoryManagementTable};
