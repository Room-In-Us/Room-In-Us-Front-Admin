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

const historyActionLabels = {
  create: '생성',
  delete: '삭제',
  update: '수정',
} satisfies Record<HistoryRecord['action'], string>;

export {historyActionLabels};

export type {HistoryAction, HistoryRecord, HistoryTarget};
