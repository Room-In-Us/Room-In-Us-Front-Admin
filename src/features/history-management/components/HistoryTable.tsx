import * as React from 'react';

import {IcEye, IcRotateCcw} from '@/src/assets/icons';
import {Button} from '@/src/shared/components/ui/button';
import {cn} from '@/src/shared/lib/utils';

import type {HistoryRecord} from '../model/history';
import {HistoryActionTag} from './HistoryActionTag';

type HistoryTableProps = {
  histories: HistoryRecord[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  restoreDisabled: boolean;
  onOpenDetail: (history: HistoryRecord) => void;
  onRestore: (history: HistoryRecord) => void;
};

function HistoryTable({
  histories,
  isLoading,
  isError,
  errorMessage,
  restoreDisabled,
  onOpenDetail,
  onRestore,
}: HistoryTableProps) {
  const isEmpty = !isLoading && !isError && histories.length === 0;

  return (
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
            {isLoading ? (
              <HistoryMessageRow message='히스토리를 불러오는 중입니다.' />
            ) : null}

            {isError ? <HistoryMessageRow message={errorMessage} /> : null}

            {isEmpty ? (
              <HistoryMessageRow message='조회된 히스토리가 없습니다.' />
            ) : null}

            {!isLoading && !isError
              ? histories.map((history, index) => (
                  <HistoryTableRow
                    key={history.commitId ?? `${history.target}-${index}`}
                    history={history}
                    restoreDisabled={restoreDisabled}
                    onOpenDetail={onOpenDetail}
                    onRestore={onRestore}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
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

  const canRestore = history.target === 'theme' && history.action === 'delete';

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
        {canRestore ? (
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

export {HistoryTable};
