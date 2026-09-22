'use client';

import {useState} from 'react';

import {isApiError} from '@/src/shared/api';
import {Button} from '@/src/shared/components/ui/button';
import {ModalLayout} from '@/src/shared/components/ui/ModalLayout';

import {useThemeDetailQuery} from '../api/theme-queries';
import {ThemeFormDialog} from './ThemeFormDialog';
import {IcSquarePen} from '@/src/assets/icons';

function ThemeEditDialogTrigger({
  themeId,
  themeName,
}: {
  themeId: number;
  themeName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        aria-label={`${themeName} 수정`}
        className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'
        size='icon'
        title='수정'
        type='button'
        variant='outline'
        onClick={() => setIsOpen(true)}>
        <IcSquarePen aria-hidden='true' className='size-4' />
      </Button>
      {isOpen ? (
        <ThemeEditDialog themeId={themeId} onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
}

function ThemeEditDialog({
  themeId,
  onClose,
}: {
  themeId: number;
  onClose: () => void;
}) {
  const {data, isFetching, isError, error, refetch} = useThemeDetailQuery({
    themeId,
  });

  if (data && !isFetching && !isError) {
    return (
      <ThemeFormDialog
        initialTheme={data}
        mode='edit'
        themeId={themeId}
        onClose={onClose}
      />
    );
  }

  return (
    <ModalLayout
      closeLabel='테마 수정 닫기'
      description='테마 정보를 입력해주세요.'
      descriptionId={`theme-edit-description-${themeId}`}
      submitDisabled
      submitLabel='수정'
      title='테마 수정'
      titleId={`theme-edit-title-${themeId}`}
      onClose={onClose}
      onSubmit={(event) => event.preventDefault()}>
      {isFetching ? (
        <p className='text-body3 text-riu-monochrome-500' role='status'>
          테마 정보를 불러오는 중입니다.
        </p>
      ) : isError ? (
        <div className='flex flex-col items-start gap-3'>
          <p className='text-body3 text-destructive' role='alert'>
            {isApiError(error)
              ? error.message
              : '테마 정보를 불러오지 못했습니다.'}
          </p>
          <Button type='button' variant='outline' onClick={() => refetch()}>
            다시 시도
          </Button>
        </div>
      ) : null}
    </ModalLayout>
  );
}

export {ThemeEditDialogTrigger};
