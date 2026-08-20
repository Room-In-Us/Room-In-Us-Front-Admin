'use client';

import {useId, useState} from 'react';
import {X} from 'lucide-react';

import {PageTitleActionButton} from '@/src/shared/components/layout/PageTitle';
import {Button} from '@/src/shared/components/ui/button';
import {Input} from '@/src/shared/components/ui/Input';
import {cn} from '@/src/shared/lib/utils';

type FieldConfig = {
  id: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'url' | 'tel' | 'date';
};

const basicFields: FieldConfig[] = [
  {id: 'name', label: '매장명', required: true},
  {id: 'address', label: '주소', required: true},
  {id: 'websiteUrl', label: '웹사이트 URL', type: 'url'},
  {id: 'reservationUrl', label: '예약 URL', type: 'url'},
  {id: 'phone', label: '연락처', type: 'tel'},
];

const operationDateFields: FieldConfig[] = [
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
        <div
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          aria-modal='true'
          className='bg-overlay fixed inset-0 z-50 flex items-center justify-center px-4 py-4'
          role='dialog'
          onMouseDown={closeDialog}>
          <form
            className='flex max-h-[calc(100dvh-2rem)] w-full max-w-[35rem] [scrollbar-width:none] flex-col gap-4 overflow-y-auto rounded-[10px] border border-black/10 bg-white p-6 shadow-xl [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
            onMouseDown={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              closeDialog();
            }}>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex min-w-0 flex-col gap-2'>
                <h2
                  className='text-h2 text-riu-monochrome-800 min-w-0'
                  id={titleId}>
                  매장 추가
                </h2>
                <p
                  className='text-caption2 text-riu-monochrome-100 min-w-0'
                  id={descriptionId}>
                  매장 정보를 입력해주세요.
                </p>
              </div>

              <Button
                aria-label='매장 추가 닫기'
                className='text-riu-monochrome-800 hover:bg-riu-monochrome-20 size-6'
                size='icon-xs'
                type='button'
                variant='ghost'
                onClick={closeDialog}>
                <X aria-hidden='true' className='size-4' />
              </Button>
            </div>

            <div className='flex flex-col gap-4'>
              {basicFields.slice(0, 2).map((field) => (
                <StoreAddDialogField key={field.id} field={field} />
              ))}

              <StoreAddDialogField
                field={{id: 'description', label: '소개'}}
                textarea
              />

              {basicFields.slice(2).map((field) => (
                <StoreAddDialogField key={field.id} field={field} />
              ))}
            </div>

            <div className='bg-riu-monochrome-50 h-px w-full' />

            <section className='flex flex-col gap-3'>
              <h3 className='text-body2 text-riu-monochrome-1000'>
                운영 날짜 정보
              </h3>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {operationDateFields.map((field) => (
                  <StoreAddDialogField key={field.id} field={field} />
                ))}
              </div>
            </section>

            <div className='flex justify-end gap-2 pt-0'>
              <Button
                className='border-riu-monochrome-50 text-body3 text-riu-monochrome-1000 h-9 rounded-lg px-4'
                type='button'
                variant='outline'
                onClick={closeDialog}>
                취소
              </Button>
              <Button
                className='bg-riu-monochrome-800 text-body3 text-riu-monochrome-10 hover:bg-riu-monochrome-700 h-9 rounded-lg px-4'
                type='submit'>
                추가
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

function StoreAddDialogField({
  field,
  textarea = false,
}: {
  field: FieldConfig;
  textarea?: boolean;
}) {
  const inputId = `store-add-${field.id}`;

  return (
    <label className='flex min-w-0 flex-col gap-2' htmlFor={inputId}>
      <span className='text-body3 text-riu-monochrome-800'>
        {field.label}
        {field.required ? ' *' : ''}
      </span>
      {textarea ? (
        <textarea
          className={cn(
            'border-input bg-input text-body3 text-riu-monochrome-300 min-h-16 w-full resize-none rounded-lg border px-3 py-2 transition-colors outline-none',
            'placeholder:text-riu-monochrome-300',
            'focus-visible:border-riu-primary-500 focus-visible:bg-riu-monochrome-10 focus-visible:text-riu-monochrome-700'
          )}
          id={inputId}
          rows={3}
        />
      ) : (
        <Input
          id={inputId}
          required={field.required}
          type={field.type ?? 'text'}
        />
      )}
    </label>
  );
}

export {StoreAddDialogTrigger};
