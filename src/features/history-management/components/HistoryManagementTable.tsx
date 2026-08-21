'use client';

import * as React from 'react';
import {Eye} from 'lucide-react';

import {IcLayers, IcStore} from '@/src/assets/icons';
import {Button} from '@/src/shared/components/ui/button';
import {Input} from '@/src/shared/components/ui/Input';
import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';
import {Tabs, type TabItem} from '@/src/shared/components/ui/Tabs';
import {cn} from '@/src/shared/lib/utils';

import type {
  HistoryAction,
  HistoryRecord,
  HistoryTarget,
} from '../model/history';
import {histories} from '../model/mockHistories';

const targetLabels = {
  store: '매장',
  theme: '테마',
} satisfies Record<HistoryTarget, string>;

const actionLabels = {
  create: '생성',
  update: '수정',
} satisfies Record<HistoryAction, string>;

const pageSizeOptions = [
  {value: '5', label: '5'},
  {value: '10', label: '10'},
  {value: '20', label: '20'},
];

function HistoryManagementTable() {
  const [activeTarget, setActiveTarget] =
    React.useState<HistoryTarget>('store');
  const [pageSize, setPageSize] = React.useState('10');
  const rows = histories.filter((history) => history.target === activeTarget);
  const visibleRows = rows.slice(0, Number(pageSize));

  function handleTargetChange(value: string) {
    setActiveTarget(value as HistoryTarget);
    setPageSize(value === 'theme' ? '5' : '10');
  }

  return (
    <div className='mt-6 flex min-w-0 flex-col items-start gap-6'>
      <Tabs
        aria-label='히스토리 유형'
        items={createHistoryTabs()}
        value={activeTarget}
        onValueChange={handleTargetChange}
        className='border-riu-monochrome-20'
      />

      <div className='flex w-full flex-wrap items-center gap-x-4 gap-y-3'>
        <PageSizeSelect
          label='페이지 크기:'
          options={pageSizeOptions}
          value={pageSize}
          onValueChange={setPageSize}
        />

        <HistoryDateInput id='history-start-date' label='조회 시작일:' />
        <HistoryDateInput id='history-end-date' label='조회 종료일:' />
      </div>

      <div className='border-dashboard-border bg-surface w-full overflow-hidden rounded-[10px] border'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[48rem] table-fixed border-collapse'>
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
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((history) => (
                <HistoryTableRow key={history.id} history={history} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className='text-caption2 text-riu-monochrome-300'>
        총 {rows.length}개의 히스토리
      </p>
    </div>
  );
}

function createHistoryTabs(): TabItem[] {
  return (['store', 'theme'] satisfies HistoryTarget[]).map((target) => ({
    value: target,
    label: targetLabels[target],
    count: histories.filter((history) => history.target === target).length,
    icon: target === 'store' ? IcStore : IcLayers,
    iconSize: 'sm',
  }));
}

function HistoryDateInput({id, label}: {id: string; label: string}) {
  return (
    <div className='flex min-w-[16rem] flex-1 items-center gap-2'>
      <label
        htmlFor={id}
        className='text-body3 text-riu-monochrome-800 shrink-0'>
        {label}
      </label>
      <Input id={id} type='text' aria-label={label} />
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

function HistoryTableRow({history}: {history: HistoryRecord}) {
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
          aria-label={`${history.item} 변경 상세 보기`}
          title='상세 보기'
          className='border-riu-monochrome-30 bg-surface text-riu-monochrome-1000 hover:bg-riu-monochrome-10 mx-auto size-8'>
          <Eye aria-hidden='true' className='size-4' />
        </Button>
      </td>
      <td className='text-caption2 text-riu-monochrome-1000 px-2.5 text-center'>
        <span className='block truncate'>{history.changedAt}</span>
      </td>
    </tr>
  );
}

function HistoryActionTag({action}: {action: HistoryAction}) {
  const isCreate = action === 'create';

  return (
    <span
      className={cn(
        'text-body4 inline-flex h-[22px] min-w-10 items-center justify-center rounded-lg px-2',
        isCreate
          ? 'bg-riu-monochrome-800 text-white'
          : 'bg-riu-monochrome-20 text-riu-monochrome-800'
      )}>
      {actionLabels[action]}
    </span>
  );
}

export {HistoryManagementTable};
