'use client';

import Link from 'next/link';
import {Pencil, Trash2} from 'lucide-react';
import * as React from 'react';

import {
  PageTitle,
  PageTitleActionButton,
} from '@/src/shared/components/layout/PageTitle';
import {Button} from '@/src/shared/components/ui/button';
import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';
import {SearchInputArea} from '@/src/shared/components/ui/SearchInputArea';
import {cn} from '@/src/shared/lib/utils';

import {
  StoreStatusTag,
  type StoreStatusTagVariant,
} from './StoreStatusTag';

type StoreStatus = 'operating' | 'new' | 'closing' | 'closed';

type Store = {
  id: number;
  name: string;
  address: string;
  station: string;
  status: StoreStatus;
  phone: string;
  website: string;
};

const storeStatusTagVariant = {
  operating: 'default',
  new: 'new',
  closing: 'expect-delete',
  closed: 'delete',
} satisfies Record<StoreStatus, StoreStatusTagVariant>;

const mockStoreSeeds = [
  {
    name: '키이스케이프 LOG_IN 1',
    address: '서울 강남구 강남대로98길 16 파빌리온빌딩 4층',
    station: '강남역',
    status: 'operating',
  },
  {
    name: '비트포비아 홍대점',
    address: '서울 마포구 양화로 160 비트포비아',
    station: '합정역',
    status: 'operating',
  },
  {
    name: '코드케이 강남점',
    address: '서울 강남구 테헤란로 123',
    station: '선릉역',
    status: 'operating',
  },
  {
    name: '넥스트에디션 신촌점',
    address: '서울 서대문구 신촌 88',
    station: '신촌역',
    status: 'operating',
  },
  {
    name: '마스터키 홍대점',
    address: '서울 마포구 어울마당로 55',
    station: '홍대입구역',
    status: 'operating',
  },
  {
    name: '비밀의방 삼성점',
    address: '서울 강남구 봉은사로 524',
    station: '삼성역',
    status: 'operating',
  },
  {
    name: '제로월드 건대점',
    address: '서울 광진구 능동로 111',
    station: '건대입구역',
    status: 'closing',
  },
  {
    name: '어메이징 브레이킹 신림점',
    address: '서울 관악구 신림로 340',
    station: '신림역',
    status: 'closed',
  },
  {
    name: '리얼월드 이대점',
    address: '서울 서대문구 이화여대길 52',
    station: '이대역',
    status: 'operating',
  },
  {
    name: '셜록홈즈 대학로점',
    address: '서울 종로구 대학로 101',
    station: '혜화역',
    status: 'operating',
  },
] satisfies Array<Omit<Store, 'id' | 'phone' | 'website'>>;

const storeBranches = [
  '강남점',
  '홍대점',
  '잠실점',
  '신촌점',
  '건대점',
  '대학로점',
  '성수점',
  '왕십리점',
  '노원점',
  '수원점',
];

const stores: Store[] = Array.from({length: 50}, (_, index) => {
  const seed = mockStoreSeeds[index % mockStoreSeeds.length];
  const branch = storeBranches[index % storeBranches.length];
  const id = index + 1;
  const status =
    id % 17 === 0
      ? 'closed'
      : id % 11 === 0
        ? 'closing'
        : id % 7 === 0
          ? 'new'
          : seed.status;

  return {
    ...seed,
    id,
    name: id <= mockStoreSeeds.length ? seed.name : `${seed.name} ${branch}`,
    status,
    phone: `02-${String(3000 + id).padStart(4, '0')}-${String(7000 + id).padStart(4, '0')}`,
    website: `https://example.com/stores/${id}`,
  };
});

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

function StoreManagementPage() {
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
  }, [normalizedSearchKeyword]);

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
    <section aria-labelledby='store-management-title' className='min-w-0'>
      <PageTitle
        title={<span id='store-management-title'>매장 관리</span>}
        subtitle={`총 ${filteredStores.length}개의 매장`}
        action={<PageTitleActionButton>매장 추가</PageTitleActionButton>}
      />

      <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-3'>
        <PageSizeSelect
          label='페이지 크기:'
          options={pageSizeOptions}
          value={pageSize}
          onValueChange={handlePageSizeChange}
        />
        <SearchInputArea
          label='검색:'
          placeholder='매장명 검색'
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          wrapperClassName='w-full max-w-[18.375rem] sm:w-[18.375rem]'
        />
      </div>

      <div className='mt-6 overflow-hidden rounded-sm border border-riu-monochrome-50 bg-surface'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[52.25rem] table-fixed border-collapse'>
            <thead>
              <tr className='h-10 border-b border-riu-monochrome-50 bg-riu-monochrome-10'>
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
                    className='h-[3.4375rem] border-b border-riu-monochrome-30 last:border-b-0'>
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
                          aria-label={`${store.name} 수정`}
                          className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'>
                          <Pencil aria-hidden='true' className='size-4' />
                        </Button>
                        <Button
                          type='button'
                          variant='outline'
                          size='icon'
                          aria-label={`${store.name} 삭제`}
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
    </section>
  );
}

export {StoreManagementPage};
