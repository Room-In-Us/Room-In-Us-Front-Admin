import {isApiError, type AdminApiTypes} from '@/src/shared/api';

import type {HistoryRecord} from '../model/history';

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

export {
  formatHistoryDateTime,
  getHistoryErrorMessage,
  mapSnapshotTypeToAction,
  mapStoreHistoryListItem,
  mapThemeHistoryListItem,
};
