type HistoryTarget = 'store' | 'theme';

type HistoryAction = 'create' | 'delete' | 'update';

type HistoryRecord = {
  id: number;
  commitId?: string;
  themeId?: number;
  target: HistoryTarget;
  item: string;
  action: HistoryAction;
  editor: string;
  changedAt: string;
  metadata?: Record<string, unknown>;
};

export type {HistoryAction, HistoryRecord, HistoryTarget};
