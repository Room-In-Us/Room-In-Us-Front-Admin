'use client';

import {type Dispatch, type SetStateAction} from 'react';

import {IcPlus, IcTrash2} from '@/src/assets/icons';
import {Button} from '@/src/shared/components/ui/button';
import {Input} from '@/src/shared/components/ui/Input';

type PriceRow = {
  id: number;
  headcount: string;
  totalPrice: string;
  perPersonPrice: string;
  lastEdited: 'totalPrice' | 'perPersonPrice';
};

type ThemePriceFieldsProps = {
  rows: PriceRow[];
  setRows: Dispatch<SetStateAction<PriceRow[]>>;
};

function ThemePriceFields({rows, setRows}: ThemePriceFieldsProps) {
  const addPriceRow = () => {
    setRows((currentRows) => [
      ...currentRows,
      {
        id: Math.max(0, ...currentRows.map((row) => row.id)) + 1,
        headcount: '0',
        totalPrice: '0',
        perPersonPrice: '0',
        lastEdited: 'totalPrice',
      },
    ]);
  };

  const updatePriceRow = (
    id: number,
    field: 'headcount' | 'totalPrice' | 'perPersonPrice',
    value: string
  ) => {
    setRows((currentRows) =>
      currentRows.map((row) => {
        if (row.id !== id) return row;

        const nextRow = {...row, [field]: value};
        const headcount = Number(nextRow.headcount);
        if (!Number.isInteger(headcount) || headcount < 1) return nextRow;

        if (
          field === 'totalPrice' ||
          (field === 'headcount' && row.lastEdited === 'totalPrice')
        ) {
          return {
            ...nextRow,
            perPersonPrice: nextRow.totalPrice
              ? String(Math.round(Number(nextRow.totalPrice) / headcount))
              : '',
            lastEdited: 'totalPrice' as const,
          };
        }

        return {
          ...nextRow,
          totalPrice: nextRow.perPersonPrice
            ? String(Number(nextRow.perPersonPrice) * headcount)
            : '',
          lastEdited: 'perPersonPrice' as const,
        };
      })
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2'>
        <div className='min-w-0'>
          <h3 className='text-body3 text-riu-monochrome-800'>가격 정보</h3>
          <p className='text-caption3 text-riu-monochrome-100 mt-1'>
            전체 가격 또는 1인가 중 원하는 항목을 입력하면 나머지가 자동
            계산됩니다.
          </p>
        </div>
        <Button
          className='border-riu-monochrome-50 text-body3 text-riu-monochrome-1000 h-8 gap-1.5 rounded-lg bg-white px-2.5'
          type='button'
          variant='outline'
          onClick={addPriceRow}>
          <IcPlus aria-hidden='true' className='size-4' />
          가격 추가
        </Button>
      </div>
      <div className='bg-dashboard-background rounded-[10px] p-4'>
        <div className='overflow-x-auto'>
          <table className='text-body3 text-riu-monochrome-1000 w-full min-w-[26rem] table-fixed'>
            <colgroup>
              <col className='w-[24%]' />
              <col className='w-[36%]' />
              <col className='w-[28%]' />
              <col className='w-[12%]' />
            </colgroup>
            <thead>
              <tr className='bg-riu-monochrome-20 border-riu-monochrome-50 h-10 border-b text-left'>
                <th className='px-2 font-medium' scope='col'>
                  인원
                </th>
                <th className='px-2 font-medium' scope='col'>
                  전체 가격
                </th>
                <th className='px-2 font-medium' scope='col'>
                  1인가
                </th>
                <th className='px-2' scope='col'>
                  <span className='sr-only'>삭제</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    className='text-caption2 text-riu-monochrome-100 h-[5.25rem] px-2 text-center'
                    colSpan={4}>
                    가격 정보가 없습니다. &quot;가격 추가&quot; 버튼을 클릭하여
                    추가해주세요.
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='h-[3.25rem] bg-white'>
                    <td className='p-2'>
                      <Input
                        aria-label={`${index + 1}번째 가격 인원`}
                        min={1}
                        step={1}
                        type='number'
                        value={row.headcount}
                        onChange={(event) =>
                          updatePriceRow(
                            row.id,
                            'headcount',
                            event.target.value
                          )
                        }
                      />
                    </td>
                    <td className='p-2'>
                      <Input
                        aria-label={`${index + 1}번째 전체 가격`}
                        min={0}
                        step={1}
                        type='number'
                        value={row.totalPrice}
                        onChange={(event) =>
                          updatePriceRow(
                            row.id,
                            'totalPrice',
                            event.target.value
                          )
                        }
                      />
                    </td>
                    <td className='p-2'>
                      <Input
                        aria-label={`${index + 1}번째 1인가`}
                        min={0}
                        step={1}
                        type='number'
                        value={row.perPersonPrice}
                        onChange={(event) =>
                          updatePriceRow(
                            row.id,
                            'perPersonPrice',
                            event.target.value
                          )
                        }
                      />
                    </td>
                    <td className='p-2 text-center'>
                      <Button
                        aria-label={`${index + 1}번째 가격 삭제`}
                        className='text-destructive hover:bg-destructive/10 size-8'
                        size='icon'
                        type='button'
                        variant='ghost'
                        onClick={() =>
                          setRows((currentRows) =>
                            currentRows.filter((item) => item.id !== row.id)
                          )
                        }>
                        <IcTrash2 aria-hidden='true' className='size-4' />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export {ThemePriceFields, type PriceRow};
