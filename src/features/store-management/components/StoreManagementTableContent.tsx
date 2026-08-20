'use client';

import Link from 'next/link';
import {Trash2} from 'lucide-react';

import {Button} from '@/src/shared/components/ui/button';
import {cn} from '@/src/shared/lib/utils';

import type {Store} from '../model/store';
import {StoreEditDialogTrigger} from './StoreEditDialogTrigger';
import {useStoreManagementRows} from './StoreManagementClientProvider';
import {StoreStatusTag, type StoreStatusTagVariant} from './StoreStatusTag';

const storeStatusTagVariant = {
  operating: 'default',
  new: 'new',
  closing: 'expect-delete',
  closed: 'delete',
} satisfies Record<Store['status'], StoreStatusTagVariant>;

const columnHeaders = [
  'ID',
  '매장명',
  '주소',
  '상태',
  '연락처',
  '웹사이트',
  '작업',
];

function StoreManagementTableContent() {
  const {stores} = useStoreManagementRows();

  return (
    <div className='border-riu-monochrome-50 bg-surface mt-6 overflow-hidden rounded-sm border'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[52.25rem] table-fixed border-collapse'>
          <thead>
            <tr className='border-riu-monochrome-50 bg-riu-monochrome-10 h-10 border-b'>
              {columnHeaders.map((header) => (
                <th
                  key={header}
                  scope='col'
                  className={cn(
                    'text-body3 text-riu-monochrome-800 px-2 text-left align-middle',
                    header === 'ID' && 'w-[2rem]',
                    header === '매장명' && 'w-[9.375rem]',
                    header === '주소' && 'w-[17.75rem]',
                    header === '상태' && 'w-[4.8125rem]',
                    header === '연락처' && 'w-[7.625rem]',
                    header === '웹사이트' && 'w-[4rem]',
                    header === '작업' && 'w-[5.875rem]'
                  )}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stores.length > 0 ? (
              stores.map((store) => (
                <tr
                  key={store.id}
                  className='border-riu-monochrome-30 h-[3.4375rem] border-b last:border-b-0'>
                  <td className='text-body3 text-riu-monochrome-800 px-2'>
                    {store.id}
                  </td>
                  <td className='text-body3 text-riu-monochrome-800 px-2'>
                    <span className='block truncate'>{store.name}</span>
                  </td>
                  <td className='px-2'>
                    <div className='flex min-w-0 flex-col gap-0.5'>
                      <span className='text-body3 text-riu-monochrome-800 truncate'>
                        {store.address}
                      </span>
                      <span className='text-caption3 text-riu-monochrome-300 truncate'>
                        {store.station}
                      </span>
                    </div>
                  </td>
                  <td className='px-2'>
                    <StoreStatusTag
                      variant={storeStatusTagVariant[store.status]}
                    />
                  </td>
                  <td className='text-body3 text-riu-monochrome-800 px-2'>
                    <span className='block truncate'>{store.phone}</span>
                  </td>
                  <td className='px-2'>
                    <Link
                      href={store.website}
                      className='text-body3 text-link underline-offset-2 hover:underline'
                      target='_blank'
                      rel='noreferrer'>
                      링크
                    </Link>
                  </td>
                  <td className='px-2'>
                    <div className='flex items-center gap-2'>
                      <StoreEditDialogTrigger store={store} />
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        disabled
                        aria-label={`${store.name} 삭제 기능 준비 중`}
                        title='삭제 기능 준비 중'
                        className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'>
                        <Trash2 aria-hidden='true' className='size-4' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='h-[3.4375rem]'>
                <td
                  colSpan={columnHeaders.length}
                  className='text-body3 text-riu-monochrome-500 px-2 text-center'>
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export {StoreManagementTableContent};
