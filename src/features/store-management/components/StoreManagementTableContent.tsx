'use client';

import Link from 'next/link';

import {isApiError} from '@/src/shared/api';
import {Button} from '@/src/shared/components/ui/button';

import {useDeleteStoreMutation} from '../api/store-queries';
import type {Store} from '../model/store';
import {StoreEditDialogTrigger} from './StoreEditDialogTrigger';
import {useStoreManagementRows} from './StoreManagementClientProvider';
import {StoreStatusTag, type StoreStatusTagVariant} from './StoreStatusTag';
import {IcTrash2} from '@/src/assets/icons';
import { cn } from '@/src/shared/lib/utils';

const storeStatusTagVariant = {
  operating: 'default',
  new: 'new',
  upcoming: 'upcoming',
  renovation: 'renovation',
  closing: 'expect-delete',
  closed: 'delete',
} satisfies Record<Store['status'], StoreStatusTagVariant>;

const columnHeaders = [
  {label: 'ID', className: 'w-[2rem]'},
  {label: '매장명', className: 'w-[9.375rem]'},
  {label: '주소', className: 'w-[17.75rem]'},
  {label: '상태', className: 'w-[4.8125rem] text-center'},
  {label: '연락처', className: 'w-[7.625rem]'},
  {label: '웹사이트', className: 'w-[4rem]'},
  {label: '작업', className: 'w-[5.875rem]'},
];

function StoreManagementTableContent() {
  const {stores, isLoading, isError, errorMessage} = useStoreManagementRows();

  return (
    <div className='border-riu-monochrome-50 bg-surface mt-6 overflow-hidden rounded-sm border'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[52.25rem] table-fixed border-collapse'>
          <thead>
            <tr className='border-riu-monochrome-50 bg-riu-monochrome-10 h-10 border-b'>
              {columnHeaders.map((header) => (
                <th
                  key={header.label}
                  scope='col'
                  className={`text-body3 text-riu-monochrome-800 px-2 text-left align-middle ${header.className}`}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <StoreTableMessageRow message='매장 목록을 불러오는 중입니다.' />
            ) : isError ? (
              <StoreTableMessageRow
                message={errorMessage || '매장 목록을 불러오지 못했습니다.'}
              />
            ) : stores.length > 0 ? (
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
                      {store.station ? (
                        <span className='text-caption3 text-riu-monochrome-300 truncate'>
                          {store.station}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className='px-2 text-center'>
                    <StoreStatusTag
                      variant={storeStatusTagVariant[store.status]}
                    />
                  </td>
                  <td className='text-body3 text-riu-monochrome-800 px-2'>
                    <span className='block truncate'>{store.phone || '-'}</span>
                  </td>
                  <td className='px-2'>
                    {store.website ? (
                      <Link
                        href={store.website}
                        className='text-body3 text-link underline-offset-2 hover:underline'
                        target='_blank'
                        rel='noreferrer'>
                        링크
                      </Link>
                    ) : (
                      <span className='text-body3 text-riu-monochrome-300'>
                        -
                      </span>
                    )}
                  </td>
                  <td className='px-2'>
                    <StoreTableActions store={store} />
                  </td>
                </tr>
              ))
            ) : (
              <StoreTableMessageRow message='검색 결과가 없습니다.' />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StoreTableActions({store}: {store: Store}) {
  const deleteStoreMutation = useDeleteStoreMutation();
  const deleteErrorMessage = getDeleteStoreErrorMessage(
    deleteStoreMutation.error
  );

  const handleDelete = async () => {
    if (!window.confirm(`${store.name} 매장을 삭제할까요?`)) {
      return;
    }

    try {
      await deleteStoreMutation.mutateAsync({storeId: store.id});
    } catch {
      // The mutation keeps the error for rendering below.
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <StoreEditDialogTrigger store={store} />
        <Button
          type='button'
          variant='outline'
          size='icon'
          aria-label={`${store.name} 삭제`}
          title='삭제'
          disabled={deleteStoreMutation.isPending}
          className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'
          onClick={handleDelete}>
          <IcTrash2 aria-hidden='true' className='size-4' />
        </Button>
      </div>
      {deleteStoreMutation.isError ? (
        <p
          role='alert'
          className='text-caption3 text-destructive w-full break-words whitespace-normal'>
          {deleteErrorMessage} 삭제 실패
        </p>
      ) : null}
    </div>
  );
}

function StoreTableMessageRow({message}: {message: string}) {
  return (
    <tr className='h-[3.4375rem]'>
      <td
        colSpan={columnHeaders.length}
        className='text-body3 text-riu-monochrome-500 px-2 text-center'>
        {message}
      </td>
    </tr>
  );
}

function getDeleteStoreErrorMessage(error: unknown) {
  return isApiError(error) ? error.message : '매장을 삭제하지 못했습니다.';
}

export {StoreManagementTableContent};
