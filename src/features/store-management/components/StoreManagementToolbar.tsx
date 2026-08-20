'use client';

import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';
import {SearchInputArea} from '@/src/shared/components/ui/SearchInputArea';

import {useStoreManagementControls} from './StoreManagementClientProvider';

const pageSizeOptions = [
  {value: '10', label: '10'},
  {value: '20', label: '20'},
  {value: '50', label: '50'},
];

function StoreManagementToolbar() {
  const {
    pageSize,
    searchKeyword,
    onPageSizeChange,
    onSearchKeywordChange,
  } = useStoreManagementControls();

  return (
    <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-3'>
      <PageSizeSelect
        label='페이지 크기:'
        options={pageSizeOptions}
        value={pageSize}
        onValueChange={onPageSizeChange}
      />
      <SearchInputArea
        label='검색'
        placeholder='매장명 검색'
        value={searchKeyword}
        onChange={onSearchKeywordChange}
        wrapperClassName='w-full max-w-[18.375rem] sm:w-[18.375rem]'
      />
    </div>
  );
}

export {StoreManagementToolbar};
