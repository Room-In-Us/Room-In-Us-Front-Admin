import * as React from 'react';

import {useThemeHistoryDetailQuery} from '@/src/features/theme-management/api/theme-queries';
import type {AdminApiTypes} from '@/src/shared/api';
import {ModalLayout} from '@/src/shared/components/ui/ModalLayout';

import {
  getHistoryErrorMessage,
  mapSnapshotTypeToAction,
} from '../lib/history-utils';
import {
  historyActionLabels,
  type HistoryRecord,
  type HistoryTarget,
} from '../model/history';

const targetLabels = {
  store: '매장',
  theme: '테마',
} satisfies Record<HistoryTarget, string>;

type HistoryMetadataDialogProps = {
  history: HistoryRecord;
  onClose: () => void;
};

function HistoryMetadataDialog({history, onClose}: HistoryMetadataDialogProps) {
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
      ? `${targetLabels[history.target]} #${metadataId} - ${historyActionLabels[action]}`
      : `${detail?.themeName ?? history.item} - ${historyActionLabels[action]}`;

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
        action === 'create' ? (
          <pre className='font-metadata text-riu-monochrome-1000 border-dashboard-border bg-dashboard-background overflow-auto rounded p-3 text-[0.75rem] leading-4 whitespace-pre'>
            {metadataText}
          </pre>
        ) : null}
        {!themeHistoryDetailQuery.isLoading &&
        !themeHistoryDetailQuery.isError &&
        action === 'delete' ? (
          <div className='border-dashboard-border bg-dashboard-background text-caption2 text-riu-monochrome-300 rounded p-3'>
            삭제된 데이터의 상세 정보는 제공되지 않습니다.
          </div>
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
    .filter(
      (
        entry
      ): entry is {
        field: string;
        before: string;
        after: string;
      } => Boolean(entry)
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

function isUpdateValue(value: unknown): value is {
  before: unknown;
  after: unknown;
} {
  return (
    typeof value === 'object' &&
    value !== null &&
    'before' in value &&
    'after' in value
  );
}

function getHistoryMetadata(
  history: HistoryRecord,
  detail: AdminApiTypes.GetThemeHistoryDetailResponse | undefined
) {
  if (!detail) {
    return history.metadata;
  }

  if (detail.snapshotType !== 'INITIAL') {
    return undefined;
  }

  return detail.createdData ?? history.metadata;
}

export {HistoryMetadataDialog};
