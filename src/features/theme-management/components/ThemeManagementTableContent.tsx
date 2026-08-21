'use client';

import {Pencil, Trash2} from 'lucide-react';

import {Button} from '@/src/shared/components/ui/button';
import {cn} from '@/src/shared/lib/utils';

import {useThemeManagementRows} from './ThemeManagementClientProvider';
import {ThemeStatusTag} from './ThemeStatusTag';

const columnHeaders = [
  'ID',
  '매장명',
  '테마명',
  '상태',
  '난이도',
  '플레이타임',
  '장르',
  '이미지',
  '작업',
];

function ThemeManagementTableContent() {
  const {themes} = useThemeManagementRows();

  return (
    <div className='border-riu-monochrome-50 bg-surface mt-6 overflow-hidden rounded-[10px] border'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[56rem] table-fixed border-collapse'>
          <thead>
            <tr className='border-riu-monochrome-50 bg-surface h-10 border-b'>
              {columnHeaders.map((header) => (
                <th
                  key={header}
                  scope='col'
                  className={cn(
                    'text-body3 text-riu-monochrome-1000 px-2 text-center align-middle',
                    header === 'ID' && 'w-[2rem]',
                    header === '매장명' && 'w-[11.25rem]',
                    header === '테마명' && 'w-[10.1875rem]',
                    header === '상태' && 'w-[5.25rem]',
                    header === '난이도' && 'w-[3.6875rem]',
                    header === '플레이타임' && 'w-[5.25rem]',
                    header === '장르' && 'w-[5.75rem]',
                    header === '이미지' && 'w-[5.6875rem]',
                    header === '작업' && 'w-[5.875rem]'
                  )}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {themes.length > 0 ? (
              themes.map((theme) => (
                <tr
                  key={theme.id}
                  className='border-riu-monochrome-30 h-20 border-b last:border-b-0'>
                  <td className='text-body3 text-riu-monochrome-1000 px-2 text-center'>
                    {theme.id}
                  </td>
                  <td className='text-body3 text-riu-monochrome-1000 px-2 text-center'>
                    <span className='block truncate'>{theme.storeName}</span>
                  </td>
                  <td className='text-body3 text-riu-monochrome-1000 px-2 text-center font-medium'>
                    <span className='block truncate'>{theme.name}</span>
                  </td>
                  <td className='px-2 text-center'>
                    <ThemeStatusTag status={theme.status} />
                  </td>
                  <td className='text-body3 text-riu-monochrome-1000 px-2 text-center'>
                    {theme.difficulty}
                  </td>
                  <td className='text-body3 text-riu-monochrome-1000 px-2 text-center'>
                    {theme.playTimeMinutes}분
                  </td>
                  <td className='px-2'>
                    <div className='flex flex-col items-center justify-center gap-1'>
                      {theme.genres.map((genre) => (
                        <span
                          key={genre}
                          className='bg-riu-monochrome-50 text-caption3 text-riu-monochrome-700 inline-flex h-5 items-center rounded-[100px] px-2'>
                          {genre}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className='px-2'>
                    <div
                      aria-label={`${theme.name} 이미지 영역`}
                      className='bg-riu-monochrome-30 mx-auto size-16 overflow-hidden rounded'
                    />
                  </td>
                  <td className='px-2'>
                    <div className='flex items-center justify-center gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        aria-label={`${theme.name} 수정`}
                        title='수정'
                        className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'>
                        <Pencil aria-hidden='true' className='size-4' />
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        aria-label={`${theme.name} 삭제`}
                        title='삭제'
                        className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'>
                        <Trash2 aria-hidden='true' className='size-4' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='h-20'>
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

export {ThemeManagementTableContent};
