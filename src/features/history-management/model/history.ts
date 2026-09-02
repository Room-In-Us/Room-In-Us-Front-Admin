type HistoryTarget = 'store' | 'theme';

type HistoryAction = 'create' | 'update';

type HistoryRecord = {
  id: number;
  target: HistoryTarget;
  item: string;
  action: HistoryAction;
  editor: string;
  changedAt: string;
};

export type {HistoryAction, HistoryRecord, HistoryTarget};
