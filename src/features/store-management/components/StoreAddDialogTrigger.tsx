'use client';

import {useId, useState} from 'react';

import {PageTitleActionButton} from '@/src/shared/components/layout/PageTitle';

import {
  StoreFormDialog,
  StoreFormDialogField,
  type StoreFormFieldConfig,
} from './StoreFormDialog';

const basicFields: StoreFormFieldConfig[] = [
  {id: 'name', label: '매장명', required: true},
  {id: 'address', label: '주소', required: true},
  {id: 'websiteUrl', label: '웹사이트 URL', type: 'url'},
  {id: 'reservationUrl', label: '예약 URL', type: 'url'},
  {id: 'phone', label: '연락처', type: 'tel'},
];

const operationDateFields: StoreFormFieldConfig[] = [
  {id: 'openedAt', label: '오픈일', type: 'date'},
  {id: 'expectedClosedAt', label: '폐업 예정일', type: 'date'},
  {id: 'renovationStartedAt', label: '리뉴얼 시작일', type: 'date'},
  {id: 'renovationEndedAt', label: '리뉴얼 종료일', type: 'date'},
  {id: 'closedAt', label: '폐업일', type: 'date'},
];

function StoreAddDialogTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <PageTitleActionButton onClick={() => setIsOpen(true)}>
        매장 추가
      </PageTitleActionButton>

      {isOpen ? (
        <StoreFormDialog
          closeLabel='매장 추가 닫기'
          description='매장 정보를 입력해주세요.'
          descriptionId={descriptionId}
          submitLabel='추가'
          title='매장 추가'
          titleId={titleId}
          onClose={closeDialog}>
          <div className='flex flex-col gap-4'>
            {basicFields.slice(0, 2).map((field) => (
              <StoreFormDialogField
                key={field.id}
                field={field}
                idPrefix='store-add'
              />
            ))}

            <StoreFormDialogField
              field={{id: 'description', label: '소개'}}
              idPrefix='store-add'
              textarea
            />

            {basicFields.slice(2).map((field) => (
              <StoreFormDialogField
                key={field.id}
                field={field}
                idPrefix='store-add'
              />
            ))}
          </div>

          <div className='bg-riu-monochrome-50 h-px w-full' />

          <section className='flex flex-col gap-3'>
            <h3 className='text-body2 text-riu-monochrome-1000'>
              운영 날짜 정보
            </h3>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {operationDateFields.map((field) => (
                <StoreFormDialogField
                  key={field.id}
                  field={field}
                  idPrefix='store-add'
                />
              ))}
            </div>
          </section>
        </StoreFormDialog>
      ) : null}
    </>
  );
}

export {StoreAddDialogTrigger};
