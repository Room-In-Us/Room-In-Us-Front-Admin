'use client';

import Link from 'next/link';
import {Pencil, Trash2} from 'lucide-react';
import * as React from 'react';

import {Button} from '@/src/shared/components/ui/button';
import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';
import {SearchInputArea} from '@/src/shared/components/ui/SearchInputArea';
import {cn} from '@/src/shared/lib/utils';

import type {Store} from './StoreManagementPage';
import {StoreStatusTag, type StoreStatusTagVariant} from './StoreStatusTag';

type StoreManagementTableProps = {
  stores: Store[];
};

const storeStatusTagVariant = {
  operating: 'default',
  new: 'new',
  closing: 'expect-delete',
  closed: 'delete',
} satisfies Record<Store['status'], StoreStatusTagVariant>;

const pageSizeOptions = [
  {value: '10', label: '10'},
  {value: '20', label: '20'},
  {value: '50', label: '50'},
];

const columnHeaders = [
  'ID',
  '매장명',
  '주소',
  '상태',
  '연락처',
  '웹사이트',
  '작업',
];

function StoreManagementTable({stores}: StoreManagementTableProps) {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const normalizedSearchKeyword = searchKeyword.trim().toLowerCase();
  const filteredStores = React.useMemo(() => {
    if (!normalizedSearchKeyword) {
      return stores;
    }

    return stores.filter((store) =>
      [store.name, store.address, store.station, store.phone].some((value) =>
        value.toLowerCase().includes(normalizedSearchKeyword)
      )
    );
  }, [normalizedSearchKeyword, stores]);

  const totalPages = Math.max(Math.ceil(filteredStores.length / pageSize), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstVisibleStoreIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedStores = filteredStores.slice(
    firstVisibleStoreIndex,
    firstVisibleStoreIndex + pageSize
  );
  const hasPreviousPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < totalPages;

  function handlePageSizeChange(nextPageSize: string) {
    setPageSize(Number(nextPageSize));
    setCurrentPage(1);
  }

  function handleSearchKeywordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearchKeyword(event.target.value);
    setCurrentPage(1);
  }

  function movePage(nextPage: number) {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  return (
    <>
      <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-3'>
        <PageSizeSelect
          label='페이지 크기:'
          options={pageSizeOptions}
          value={pageSize}
          onValueChange={handlePageSizeChange}
        />
        <SearchInputArea
          label='검색'
          placeholder='매장명 검색'
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          wrapperClassName='w-full max-w-[18.375rem] sm:w-[18.375rem]'
        />
      </div>

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
              {paginatedStores.length > 0 ? (
                paginatedStores.map((store) => (
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
                        <Button
                          type='button'
                          variant='outline'
                          size='icon'
                          disabled
                          aria-label={`${store.name} 수정 기능 준비 중`}
                          title='수정 기능 준비 중'
                          className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'>
                          <Pencil aria-hidden='true' className='size-4' />
                        </Button>
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

      <div className='mt-6 flex items-center justify-center gap-2'>
        <Button
          type='button'
          variant='outline'
          disabled={!hasPreviousPage}
          onClick={() => movePage(safeCurrentPage - 1)}
          className='border-riu-monochrome-30 bg-surface text-button2 text-riu-monochrome-800 h-8 px-3'>
          이전
        </Button>
        <span className='text-body3 text-riu-monochrome-800 px-1'>
          {safeCurrentPage} / {totalPages}
        </span>
        <Button
          type='button'
          variant='outline'
          disabled={!hasNextPage}
          onClick={() => movePage(safeCurrentPage + 1)}
          className='border-riu-monochrome-30 bg-surface text-button2 text-riu-monochrome-800 h-8 px-3'>
          다음
        </Button>
      </div>
    </>
  );
}

export {StoreManagementTable};
