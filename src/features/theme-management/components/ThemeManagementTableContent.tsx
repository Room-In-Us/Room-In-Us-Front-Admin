'use client';

import {Pencil, Trash2} from 'lucide-react';

import {isApiError} from '@/src/shared/api';
import {Button} from '@/src/shared/components/ui/button';
import {cn} from '@/src/shared/lib/utils';

import {useDeleteThemeMutation} from '../api/theme-queries';
import type {Theme} from '../model/theme';
import {useThemeManagementRows} from './ThemeManagementClientProvider';
import {ThemeStatusTag} from './ThemeStatusTag';

const columnHeaders = [
  {label: 'ID', className: 'w-[2rem]'},
  {label: '매장명', className: 'w-[11.25rem]'},
  {label: '테마명', className: 'w-[10.1875rem]'},
  {label: '상태', className: 'w-[5.25rem]'},
  {label: '난이도', className: 'w-[3.6875rem]'},
  {label: '플레이타임', className: 'w-[5.25rem]'},
  {label: '장르', className: 'w-[5.75rem]'},
  {label: '이미지', className: 'w-[5.6875rem]'},
  {label: '작업', className: 'w-[5.875rem]'},
];

function ThemeManagementTableContent() {
  const {themes, isLoading, isError, errorMessage} = useThemeManagementRows();

  return (
    <div className='border-riu-monochrome-50 bg-surface mt-6 overflow-hidden rounded-[10px] border'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[56rem] table-fixed border-collapse'>
          <thead>
            <tr className='border-riu-monochrome-50 bg-surface h-10 border-b'>
              {columnHeaders.map((header) => (
                <th
                  key={header.label}
                  scope='col'
                  className={cn(
                    'text-body3 text-riu-monochrome-1000 px-2 text-center align-middle',
                    header.className
                  )}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ThemeTableMessageRow message='테마 목록을 불러오는 중입니다.' />
            ) : isError ? (
              <ThemeTableMessageRow
                message={errorMessage || '테마 목록을 불러오지 못했습니다.'}
              />
            ) : themes.length > 0 ? (
              themes.map((theme) => (
                <ThemeTableRow key={theme.id} theme={theme} />
              ))
            ) : (
              <ThemeTableMessageRow message='검색 결과가 없습니다.' />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ThemeTableRow({theme}: {theme: Theme}) {
  const deleteThemeMutation = useDeleteThemeMutation();
  const unavailableDescriptionId = `theme-actions-unavailable-${theme.id}`;
  const deleteErrorMessage = getDeleteThemeErrorMessage(
    deleteThemeMutation.error
  );

  const handleDelete = async () => {
    try {
      await deleteThemeMutation.mutateAsync({themeId: theme.id});
    } catch {
      // The mutation keeps the error for rendering below.
    }
  };

  return (
    <tr className='border-riu-monochrome-30 h-20 border-b last:border-b-0'>
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
          {theme.genres.length > 0 ? (
            theme.genres.map((genre, index) => (
              <span
                key={`${genre}-${index}`}
                className='bg-riu-monochrome-50 inline-flex h-5 items-center justify-center rounded-[100px] px-2'>
                <span className='text-caption3 text-riu-monochrome-700'>
                  {genre}
                </span>
              </span>
            ))
          ) : (
            <span className='text-body3 text-riu-monochrome-300'>-</span>
          )}
        </div>
      </td>
      <td className='px-2'>
        <div
          aria-label={`${theme.name} 이미지 영역`}
          role='img'
          className='bg-riu-monochrome-30 mx-auto size-16 overflow-hidden rounded'
          style={
            theme.imageUrl
              ? {
                  backgroundImage: `url(${theme.imageUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }
              : undefined
          }
        />
      </td>
      <td className='px-2'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <span id={unavailableDescriptionId} className='sr-only'>
            테마 수정 기능은 아직 준비 중입니다.
          </span>
          <div className='flex items-center justify-center gap-2'>
            <Button
              type='button'
              variant='outline'
              size='icon'
              aria-label={`${theme.name} 수정`}
              aria-describedby={unavailableDescriptionId}
              title='수정 기능 준비 중'
              disabled
              className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'>
              <Pencil aria-hidden='true' className='size-4' />
            </Button>
            <Button
              type='button'
              variant='outline'
              size='icon'
              aria-label={`${theme.name} 삭제`}
              title='삭제'
              disabled={deleteThemeMutation.isPending}
              className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'
              onClick={handleDelete}>
              <Trash2 aria-hidden='true' className='size-4' />
            </Button>
          </div>
          {deleteThemeMutation.isError ? (
            <p
              role='alert'
              title={deleteErrorMessage}
              className='text-caption3 text-destructive w-full truncate text-center'>
              삭제 실패
            </p>
          ) : null}
        </div>
      </td>
    </tr>
  );
}

function ThemeTableMessageRow({message}: {message: string}) {
  return (
    <tr className='h-20'>
      <td
        colSpan={columnHeaders.length}
        className='text-body3 text-riu-monochrome-500 px-2 text-center'>
        {message}
      </td>
    </tr>
  );
}

function getDeleteThemeErrorMessage(error: unknown) {
  return isApiError(error) ? error.message : '테마를 삭제하지 못했습니다.';
}

export {ThemeManagementTableContent};
