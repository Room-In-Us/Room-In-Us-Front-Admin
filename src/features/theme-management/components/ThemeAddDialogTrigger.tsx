'use client';

import {useState} from 'react';

import {PageTitleActionButton} from '@/src/shared/components/layout/PageTitle';

import {ThemeFormDialog} from './ThemeFormDialog';

function ThemeAddDialogTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PageTitleActionButton onClick={() => setIsOpen(true)}>
        테마 추가
      </PageTitleActionButton>
      {isOpen ? (
        <ThemeFormDialog mode='add' onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
}

export {ThemeAddDialogTrigger};
