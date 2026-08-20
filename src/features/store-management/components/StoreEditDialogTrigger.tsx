'use client';

import {useId, useState} from 'react';
import {MapPin, Pencil} from 'lucide-react';

import {Button} from '@/src/shared/components/ui/button';

import type {Store} from '../model/store';
import {
  StoreFormDialog,
  StoreFormDialogField,
  type StoreFormFieldConfig,
} from './StoreFormDialog';

const operationDateFields = [
  {id: 'openedAt', label: '오픈일', type: 'date'},
  {id: 'expectedClosedAt', label: '폐업 예정일', type: 'date'},
  {id: 'renovationStartedAt', label: '리뉴얼 시작일', type: 'date'},
  {id: 'renovationEndedAt', label: '리뉴얼 종료일', type: 'date'},
  {id: 'closedAt', label: '폐업일', type: 'date'},
] satisfies StoreFormFieldConfig[];

function StoreEditDialogTrigger({store}: {store: Store}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const idPrefix = `store-edit-${store.id}`;

  const basicFields = [
    {id: 'name', label: '매장명', required: true, defaultValue: store.name},
    {
      id: 'address',
      label: '주소',
      required: true,
      defaultValue: store.address,
      helperText: (
        <>
          <MapPin aria-hidden='true' className='text-destructive size-3' />
          <span className='min-w-0 truncate'>{store.station}</span>
        </>
      ),
    },
    {
      id: 'websiteUrl',
      label: '웹사이트 URL',
      required: true,
      type: 'url',
      defaultValue: store.website,
    },
    {
      id: 'reservationUrl',
      label: '예약 URL',
      required: true,
      type: 'url',
      defaultValue: store.reservationUrl,
    },
    {id: 'phone', label: '연락처', type: 'tel', defaultValue: store.phone},
  ] satisfies StoreFormFieldConfig[];

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        type='button'
        variant='outline'
        size='icon'
        aria-label={`${store.name} 수정`}
        title='수정'
        className='border-riu-monochrome-30 bg-surface text-riu-monochrome-700 hover:bg-riu-monochrome-10'
        onClick={() => setIsOpen(true)}>
        <Pencil aria-hidden='true' className='size-4' />
      </Button>

      {isOpen ? (
        <StoreFormDialog
          closeLabel='매장 수정 닫기'
          description='매장 정보를 입력해주세요.'
          descriptionId={descriptionId}
          submitLabel='수정'
          title='매장 수정'
          titleId={titleId}
          onClose={closeDialog}>
          <div className='flex flex-col gap-4'>
            {basicFields.slice(0, 2).map((field) => (
              <StoreFormDialogField
                key={field.id}
                field={field}
                idPrefix={idPrefix}
              />
            ))}

            <StoreFormDialogField
              field={{
                id: 'description',
                label: '소개',
                defaultValue: store.description,
              }}
              idPrefix={idPrefix}
              textarea
            />

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {basicFields.slice(2, 4).map((field) => (
                <StoreFormDialogField
                  key={field.id}
                  field={field}
                  idPrefix={idPrefix}
                />
              ))}
            </div>

            <StoreFormDialogField field={basicFields[4]} idPrefix={idPrefix} />

            <StoreFormDialogField
              field={{
                id: 'memo',
                label: '비고',
                defaultValue: store.memo,
              }}
              idPrefix={idPrefix}
              textarea
            />
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
                  field={{
                    ...field,
                    defaultValue: store[field.id as keyof Store] as
                      | string
                      | undefined,
                  }}
                  idPrefix={idPrefix}
                />
              ))}
            </div>
          </section>
        </StoreFormDialog>
      ) : null}
    </>
  );
}

export {StoreEditDialogTrigger};
