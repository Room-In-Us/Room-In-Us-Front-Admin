'use client';

import * as React from 'react';

import {IcEye, IcLayers, IcRotateCcw, IcStore} from '@/src/assets/icons';
import {
  useRestoreThemeHistoryMutation,
  useThemeHistoryDetailQuery,
  useThemeHistoryListQuery,
} from '@/src/features/theme-management/api/theme-queries';
import {useStoreHistoryListQuery} from '@/src/features/store-management/api/store-queries';
import {isApiError, type AdminApiTypes} from '@/src/shared/api';
import {Button} from '@/src/shared/components/ui/button';
import {Input} from '@/src/shared/components/ui/Input';
import {ModalLayout} from '@/src/shared/components/ui/ModalLayout';
import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';
import {Tabs, type TabItem} from '@/src/shared/components/ui/Tabs';
import {cn} from '@/src/shared/lib/utils';

import type {HistoryRecord, HistoryTarget} from '../model/history';
import {HistoryActionTag} from './HistoryActionTag';

const targetLabels = {
  store: '매장',
  theme: '테마',
} satisfies Record<HistoryTarget, string>;

const pageSizeOptions = [
  {value: '5', label: '5'},
  {value: '10', label: '10'},
  {value: '20', label: '20'},
];

function HistoryManagementTable() {
  const [activeTarget, setActiveTarget] =
    React.useState<HistoryTarget>('store');
  const [pageSize, setPageSize] = React.useState('10');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [selectedHistory, setSelectedHistory] =
    React.useState<HistoryRecord | null>(null);
  const storeHistoryListQuery = useStoreHistoryListQuery({
    endDate,
    page: 1,
    size: Number(pageSize),
    startDate,
  });
  const themeHistoryListQuery = useThemeHistoryListQuery({
    endDate,
    page: 1,
    size: Number(pageSize),
    startDate,
  });
  const restoreThemeHistoryMutation = useRestoreThemeHistoryMutation();
  const storeHistoryRows =
    storeHistoryListQuery.data?.histories.map(mapStoreHistoryListItem) ?? [];
  const themeHistoryRows =
    themeHistoryListQuery.data?.histories.map(mapThemeHistoryListItem) ?? [];
  const rows = activeTarget === 'theme' ? themeHistoryRows : storeHistoryRows;
  const visibleRows = rows.slice(0, Number(pageSize));
  const activeHistoryQuery =
    activeTarget === 'theme' ? themeHistoryListQuery : storeHistoryListQuery;

  const isHistoryLoading = activeHistoryQuery.isLoading;
  const isHistoryError = activeHistoryQuery.isError;

  const isHistoryEmpty =
    !isHistoryLoading && !isHistoryError && visibleRows.length === 0;

  const totalCount =
    activeTarget === 'theme'
      ? (themeHistoryListQuery.data?.totalElements ?? 0)
      : (storeHistoryListQuery.data?.totalElements ?? 0);

  function handleTargetChange(value: string) {
    setActiveTarget(value as HistoryTarget);
    setPageSize(value === 'theme' ? '5' : '10');
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

      <div className='flex flex-wrap items-center gap-x-4 gap-y-3'>
        <PageSizeSelect
          label='페이지 크기:'
          options={pageSizeOptions}
          value={pageSize}
          onValueChange={setPageSize}
        />

        <HistoryDatePicker
          id='history-start-date'
          label='조회 시작일:'
          value={startDate}
          max={endDate || undefined}
          onChange={setStartDate}
        />
        <HistoryDatePicker
          id='history-end-date'
          label='조회 종료일:'
          value={endDate}
          min={startDate || undefined}
          onChange={setEndDate}
        />
      </div>

      <div className='border-dashboard-border bg-surface w-full overflow-hidden rounded-[10px] border'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[56.875rem] table-fixed border-collapse'>
            <thead>
              <tr className='border-riu-monochrome-30 h-10 border-b'>
                <HistoryHeaderCell className='w-[17.875rem]'>
                  항목
                </HistoryHeaderCell>
                <HistoryHeaderCell className='w-[6.0625rem]'>
                  작업
                </HistoryHeaderCell>
                <HistoryHeaderCell className='w-[8.1875rem]'>
                  수정자
                </HistoryHeaderCell>
                <HistoryHeaderCell className='w-[5rem]'>상세</HistoryHeaderCell>
                <HistoryHeaderCell>변경 시간</HistoryHeaderCell>
                <HistoryHeaderCell className='w-[5rem]'>복구</HistoryHeaderCell>
              </tr>
            </thead>
            <tbody>
              {isHistoryLoading ? (
                <HistoryMessageRow message='히스토리를 불러오는 중입니다.' />
              ) : null}
              {isHistoryError ? (
                <HistoryMessageRow
                  message={getHistoryErrorMessage(
                    activeHistoryQuery.error,
                    activeTarget === 'theme'
                      ? '테마 히스토리를 불러오지 못했습니다.'
                      : '매장 히스토리를 불러오지 못했습니다.'
                  )}
                />
              ) : null}
              {isHistoryEmpty ? (
                <HistoryMessageRow message='조회된 히스토리가 없습니다.' />
              ) : null}
              {!isHistoryLoading && !isHistoryError
                ? visibleRows.map((history) => (
                    <HistoryTableRow
                      key={history.commitId ?? history.id}
                      history={history}
                      onOpenDetail={setSelectedHistory}
                      onRestore={handleThemeRestore}
                      restoreDisabled={restoreThemeHistoryMutation.isPending}
                    />
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>

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

function HistoryDatePicker({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className='flex min-w-[16rem] flex-1 items-center gap-2'>
      <label
        htmlFor={id}
        className='text-body3 text-riu-monochrome-800 shrink-0'>
        {label}
      </label>
      <Input
        id={id}
        type='date'
        value={value}
        min={min}
        max={max}
        aria-label={label}
        className='w-[11.25rem] flex-none'
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function HistoryHeaderCell({className, children}: React.ComponentProps<'th'>) {
  return (
    <th
      scope='col'
      className={cn(
        'text-body3 text-riu-monochrome-1000 px-2.5 text-center align-middle',
        className
      )}>
      {children}
    </th>
  );
}

function HistoryTableRow({
  history,
  onOpenDetail,
  onRestore,
  restoreDisabled,
}: {
  history: HistoryRecord;
  onOpenDetail: (history: HistoryRecord) => void;
  onRestore: (history: HistoryRecord) => void;
  restoreDisabled: boolean;
}) {
  const hasDetail =
    history.target === 'theme' && Boolean(history.commitId || history.metadata);

  return (
    <tr className='border-riu-monochrome-30 h-12 border-b last:border-b-0'>
      <td className='text-body3 text-riu-monochrome-1000 px-2.5 text-center'>
        <span className='block truncate'>{history.item}</span>
      </td>
      <td className='px-2.5 text-center'>
        <HistoryActionTag action={history.action} />
      </td>
      <td className='text-caption2 text-riu-monochrome-1000 px-2.5 text-center'>
        <span className='block truncate'>{history.editor}</span>
      </td>
      <td className='px-2.5 text-center'>
        <Button
          type='button'
          variant='outline'
          size='icon'
          aria-label={`${history.item} 히스토리 상세 보기`}
          title='상세 보기'
          disabled={!hasDetail}
          className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10 mx-auto'
          onClick={() => onOpenDetail(history)}>
          <IcEye aria-hidden='true' className='size-4' />
        </Button>
      </td>
      <td className='text-caption2 text-riu-monochrome-1000 px-2.5 text-center'>
        <span className='block truncate'>{history.changedAt}</span>
      </td>
      <td className='px-2.5 text-center'>
        {history.target === 'theme' && history.action === 'delete' ? (
          <Button
            type='button'
            variant='outline'
            size='icon'
            aria-label={`${history.item} 히스토리 복구`}
            title='복구'
            disabled={restoreDisabled}
            className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10 mx-auto'
            onClick={() => onRestore(history)}>
            <IcRotateCcw aria-hidden='true' className='size-4' />
          </Button>
        ) : null}
      </td>
    </tr>
  );
}

function HistoryMessageRow({message}: {message: string}) {
  return (
    <tr className='border-riu-monochrome-30 h-12 border-b last:border-b-0'>
      <td
        colSpan={6}
        className='text-caption2 text-riu-monochrome-300 px-2.5 text-center'>
        {message}
      </td>
    </tr>
  );
}

function HistoryMetadataDialog({
  history,
  onClose,
}: {
  history: HistoryRecord;
  onClose: () => void;
}) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const themeHistoryDetailQuery = useThemeHistoryDetailQuery({
    commitId: history.commitId ?? '',
    enabled: Boolean(history.commitId),
  });
  const detail = themeHistoryDetailQuery.data;
  const action =
    mapSnapshotTypeToAction(detail?.snapshotType) ?? history.action;
  const metadata = getHistoryMetadata(history, detail);
  const metadataText = JSON.stringify(metadata ?? {}, null, 2);
  const metadataId =
    typeof metadata?.id === 'number' ? metadata.id : history.id;
  const metadataLabel = getMetadataLabel(action);
  const title =
    action === 'delete'
      ? `${targetLabels[history.target]} #${metadataId} - ${action}`
      : `${detail?.themeName ?? history.item} - ${action}`;
  const updateEntries =
    action === 'update'
      ? getUpdateMetadataEntries(metadata, detail?.changes)
      : [];

  return (
    <ModalLayout
      title={title}
      description={history.changedAt}
      titleId={titleId}
      descriptionId={descriptionId}
      closeLabel='히스토리 상세 닫기'
      showFooter={false}
      className='max-w-[32rem]'
      onClose={onClose}>
      <div className='flex flex-col gap-2'>
        <h4 className='text-body2 text-riu-monochrome-1000'>{metadataLabel}</h4>
        {themeHistoryDetailQuery.isLoading ? (
          <div className='border-dashboard-border bg-dashboard-background text-caption2 text-riu-monochrome-300 rounded p-3'>
            상세 정보를 불러오는 중입니다.
          </div>
        ) : null}
        {themeHistoryDetailQuery.isError ? (
          <div className='border-dashboard-border bg-dashboard-background text-caption2 text-destructive rounded p-3'>
            {getHistoryErrorMessage(
              themeHistoryDetailQuery.error,
              '히스토리 상세 정보를 불러오지 못했습니다.'
            )}
          </div>
        ) : null}
        {!themeHistoryDetailQuery.isLoading &&
        !themeHistoryDetailQuery.isError &&
        action === 'update' ? (
          <div className='border-dashboard-border bg-dashboard-background flex flex-col gap-1 rounded p-3'>
            {updateEntries.map((entry) => (
              <div key={entry.field} className='flex flex-col gap-1'>
                <p className='text-body3 text-riu-monochrome-1000'>
                  {entry.field}
                </p>
                <div className='grid grid-cols-2 gap-4 pt-1'>
                  <div className='flex min-w-0 flex-col gap-1'>
                    <span className='text-caption2 text-riu-monochrome-300'>
                      변경 전:
                    </span>
                    <span className='text-caption2 text-destructive truncate'>
                      {entry.before}
                    </span>
                  </div>
                  <div className='flex min-w-0 flex-col gap-1'>
                    <span className='text-caption2 text-riu-monochrome-300'>
                      변경 후:
                    </span>
                    <span className='text-caption2 text-status-operating-foreground truncate'>
                      {entry.after}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {!themeHistoryDetailQuery.isLoading &&
        !themeHistoryDetailQuery.isError &&
        action !== 'update' ? (
          <pre className='font-metadata text-riu-monochrome-1000 border-dashboard-border bg-dashboard-background overflow-auto rounded p-3 text-[0.75rem] leading-4 whitespace-pre'>
            {metadataText}
          </pre>
        ) : null}
      </div>
    </ModalLayout>
  );
}

function getMetadataLabel(action: HistoryRecord['action']) {
  if (action === 'create') {
    return '생성 데이터:';
  }

  if (action === 'delete') {
    return '삭제 데이터:';
  }

  return '변경 내역:';
}

function getUpdateMetadataEntries(
  metadata: HistoryRecord['metadata'],
  changes?: AdminApiTypes.ChangeDetail[]
) {
  if (changes) {
    return changes.map((change, index) => ({
      field: change.property ?? `change-${index + 1}`,
      before: formatMetadataValue(change.before),
      after: formatMetadataValue(change.after),
    }));
  }

  return Object.entries(metadata ?? {})
    .map(([field, value]) => {
      if (!isUpdateValue(value)) {
        return null;
      }

      return {
        field,
        before: formatMetadataValue(value.before),
        after: formatMetadataValue(value.after),
      };
    })
    .filter((entry): entry is {field: string; before: string; after: string} =>
      Boolean(entry)
    );
}

function formatMetadataValue(value: unknown) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function isUpdateValue(
  value: unknown
): value is {before: unknown; after: unknown} {
  return (
    typeof value === 'object' &&
    value !== null &&
    'before' in value &&
    'after' in value
  );
}

function mapStoreHistoryListItem(
  history: AdminApiTypes.GetStoreHistoryListResponse,
  index: number
): HistoryRecord {
  return {
    id: history.storeId ?? index + 1,
    commitId: history.commitId,
    target: 'store',
    item: history.name ?? '',
    action: mapSnapshotTypeToAction(history.snapshotType) ?? 'create',
    editor: history.author ?? '',
    changedAt: formatHistoryDateTime(history.commitDateTime),
  };
}

function mapThemeHistoryListItem(
  history: AdminApiTypes.GetThemeHistoryListResponse,
  index: number
): HistoryRecord {
  return {
    id: history.themeId ?? index + 1,
    commitId: history.commitId,
    themeId: history.themeId,
    target: 'theme',
    item: history.name ?? '',
    action: mapSnapshotTypeToAction(history.snapshotType) ?? 'create',
    editor: history.author ?? '',
    changedAt: formatHistoryDateTime(history.commitDateTime),
  };
}

function mapSnapshotTypeToAction(
  snapshotType: AdminApiTypes.GetThemeHistoryListResponse['snapshotType']
): HistoryRecord['action'] | undefined {
  if (snapshotType === 'INITIAL') {
    return 'create';
  }

  if (snapshotType === 'UPDATE') {
    return 'update';
  }

  if (snapshotType === 'TERMINAL') {
    return 'delete';
  }

  return undefined;
}

function getHistoryMetadata(
  history: HistoryRecord,
  detail: AdminApiTypes.GetThemeHistoryDetailResponse | undefined
) {
  if (!detail) {
    return history.metadata;
  }

  if (detail.snapshotType === 'UPDATE') {
    return undefined;
  }

  const detailMetadata =
    detail as AdminApiTypes.GetThemeHistoryDetailResponse & {
      deletedData?: Record<string, unknown>;
    };

  return detailMetadata.deletedData ?? detail.createdData ?? history.metadata;
}

function formatHistoryDateTime(dateTime: string | undefined) {
  if (!dateTime) {
    return '';
  }

  const date = new Date(dateTime);
  if (Number.isNaN(date.getTime())) {
    return dateTime;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(date);
}

function getHistoryErrorMessage(error: unknown, fallbackMessage: string) {
  return isApiError(error) ? error.message : fallbackMessage;
}

export {HistoryManagementTable};
