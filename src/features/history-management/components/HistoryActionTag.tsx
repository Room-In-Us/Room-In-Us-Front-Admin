import {cn} from '@/src/shared/lib/utils';

import type {HistoryAction} from '../model/history';

const actionLabels = {
  create: '생성',
  delete: '삭제',
  update: '수정',
} satisfies Record<HistoryAction, string>;

const actionTagClassNames = {
  create: 'bg-riu-monochrome-800',
  delete: 'bg-[#d4183d]',
  update: 'bg-riu-monochrome-20',
} satisfies Record<HistoryAction, string>;

const actionTagTextClassNames = {
  create: 'text-white',
  delete: 'text-white',
  update: 'text-riu-monochrome-800',
} satisfies Record<HistoryAction, string>;

function HistoryActionTag({action}: {action: HistoryAction}) {
  return (
    <span
      className={cn(
        'inline-flex h-[22px] min-w-10 items-center justify-center rounded-lg px-2',
        actionTagClassNames[action]
      )}>
      <span className={`text-body4 ${actionTagTextClassNames[action]}`}>
        {actionLabels[action]}
      </span>
    </span>
  );
}

export {HistoryActionTag};
