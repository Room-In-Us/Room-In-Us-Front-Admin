'use client';

import {useId, useState, type FormEvent} from 'react';

import {isApiError, type AdminApiTypes} from '@/src/shared/api';
import {PageTitleActionButton} from '@/src/shared/components/layout/PageTitle';

import {useCreateStoreMutation} from '../api/store-queries';
import {
  StoreFormDialog,
  StoreFormDialogField,
  type StoreFormFieldConfig,
} from './StoreFormDialog';

const basicFields: StoreFormFieldConfig[] = [
  {id: 'name', label: '매장명', required: true},
  {id: 'address', label: '주소', required: true},
  {id: 'websiteUrl', label: '웹사이트 URL', required: true, type: 'url'},
  {id: 'reservationUrl', label: '예약 URL', required: true, type: 'url'},
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
  const [submitError, setSubmitError] = useState('');
  const titleId = useId();
  const descriptionId = useId();
  const createStoreMutation = useCreateStoreMutation();
  const isSubmitting = createStoreMutation.isPending;

  const closeDialog = () => {
    setIsOpen(false);
    setSubmitError('');
    createStoreMutation.reset();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError('');

    try {
      await createStoreMutation.mutateAsync({
        request: createPostStoreRequest(new FormData(event.currentTarget)),
      });
      closeDialog();
    } catch (error) {
      setSubmitError(getStoreCreateErrorMessage(error));
    }
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
          submitLabel={isSubmitting ? '추가 중' : '추가'}
          submitDisabled={isSubmitting}
          title='매장 추가'
          titleId={titleId}
          onClose={closeDialog}
          onSubmit={handleSubmit}>
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

          {submitError ? (
            <p role='alert' className='text-caption3 text-destructive'>
              {submitError}
            </p>
          ) : null}

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

function createPostStoreRequest(
  formData: FormData
): AdminApiTypes.PostStoreRequest {
  return {
    name: getFormValue(formData, 'name'),
    address: getFormValue(formData, 'address'),
    about: getOptionalFormValue(formData, 'description'),
    websiteUrl: getFormValue(formData, 'websiteUrl'),
    reservationUrl: getFormValue(formData, 'reservationUrl'),
    contact: getOptionalFormValue(formData, 'phone'),
    openDate: getOptionalFormValue(formData, 'openedAt'),
    renewalStartDate: getOptionalFormValue(formData, 'renovationStartedAt'),
    renewalEndDate: getOptionalFormValue(formData, 'renovationEndedAt'),
    closureExpectedDate: getOptionalFormValue(formData, 'expectedClosedAt'),
    closureDate: getOptionalFormValue(formData, 'closedAt'),
  };
}

function getFormValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim();
}

function getOptionalFormValue(formData: FormData, name: string) {
  const value = getFormValue(formData, name);

  return value || undefined;
}

function getStoreCreateErrorMessage(error: unknown) {
  return isApiError(error) ? error.message : '매장 정보를 추가하지 못했습니다.';
}

export {StoreAddDialogTrigger};
