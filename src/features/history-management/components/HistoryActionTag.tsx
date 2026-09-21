import {cn} from '@/src/shared/lib/utils';

import {historyActionLabels, type HistoryAction} from '../model/history';

const actionTagClassNames = {
  create: 'bg-riu-monochrome-800',
  delete: 'bg-status-reported-background',
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
        {historyActionLabels[action]}
      </span>
    </span>
  );
}

export {HistoryActionTag};
