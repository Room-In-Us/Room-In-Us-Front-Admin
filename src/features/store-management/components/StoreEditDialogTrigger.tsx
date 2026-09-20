'use client';

import {useId, useState, type FormEvent} from 'react';
import {MapPin, Pencil} from 'lucide-react';

import {isApiError} from '@/src/shared/api';
import {Button} from '@/src/shared/components/ui/button';

import {
  useStoreDetailQuery,
  useUpdateStoreMutation,
} from '../api/store-queries';
import type {NullableDatePatchStoreRequest} from '../api/store-api';
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
  const [submitError, setSubmitError] = useState('');
  const storeDetailQuery = useStoreDetailQuery({
    enabled: isOpen,
    fallbackStore: store,
    storeId: store.id,
  });
  const updateStoreMutation = useUpdateStoreMutation();
  const storeDetail = storeDetailQuery.data;
  const isWaitingForStoreDetail = storeDetailQuery.isFetching || !storeDetail;
  const isSubmitting = updateStoreMutation.isPending;

  const basicFields = [
    {
      id: 'name',
      label: '매장명',
      required: true,
      defaultValue: storeDetail?.name,
    },
    {
      id: 'address',
      label: '주소',
      required: true,
      defaultValue: storeDetail?.address,
      helperText: (
        <>
          <MapPin aria-hidden='true' className='text-destructive size-3' />
          <span className='min-w-0 truncate'>{storeDetail?.station}</span>
        </>
      ),
    },
    {
      id: 'websiteUrl',
      label: '웹사이트 URL',
      required: true,
      type: 'url',
      defaultValue: storeDetail?.website,
    },
    {
      id: 'reservationUrl',
      label: '예약 URL',
      required: true,
      type: 'url',
      defaultValue: storeDetail?.reservationUrl,
    },
    {
      id: 'phone',
      label: '연락처',
      type: 'tel',
      defaultValue: storeDetail?.phone,
    },
  ] satisfies StoreFormFieldConfig[];
  const detailErrorMessage = getStoreDetailErrorMessage(storeDetailQuery.error);

  const closeDialog = () => {
    setIsOpen(false);
    setSubmitError('');
    updateStoreMutation.reset();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!storeDetail || isSubmitting) {
      return;
    }

    setSubmitError('');

    try {
      await updateStoreMutation.mutateAsync({
        storeId: store.id,
        request: createPatchStoreRequest(
          new FormData(event.currentTarget),
          storeDetail
        ),
      });
      closeDialog();
    } catch (error) {
      setSubmitError(getStoreUpdateErrorMessage(error));
    }
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
          submitLabel={isSubmitting ? '수정 중' : '수정'}
          submitDisabled={isWaitingForStoreDetail || isSubmitting}
          title='매장 수정'
          titleId={titleId}
          onClose={closeDialog}
          onSubmit={handleSubmit}>
          {isWaitingForStoreDetail ? (
            <StoreDetailStatus
              isError={storeDetailQuery.isError && !storeDetailQuery.isFetching}
              message={
                storeDetailQuery.isError && !storeDetailQuery.isFetching
                  ? detailErrorMessage
                  : '매장 상세 정보를 불러오는 중입니다.'
              }
              onRetry={() => void storeDetailQuery.refetch()}
            />
          ) : (
            <>
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
                    defaultValue: storeDetail.description,
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

                <StoreFormDialogField
                  field={basicFields[4]}
                  idPrefix={idPrefix}
                />

                <StoreFormDialogField
                  field={{
                    id: 'memo',
                    label: '비고',
                    defaultValue: storeDetail.memo,
                  }}
                  idPrefix={idPrefix}
                  textarea
                />
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
                      field={{
                        ...field,
                        defaultValue: storeDetail[field.id as keyof Store] as
                          | string
                          | undefined,
                      }}
                      idPrefix={idPrefix}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </StoreFormDialog>
      ) : null}
    </>
  );
}

function createPatchStoreRequest(
  formData: FormData,
  storeDetail: Store
): NullableDatePatchStoreRequest {
  return {
    name: getFormValue(formData, 'name'),
    address: getFormValue(formData, 'address'),
    about: getFormValue(formData, 'description'),
    websiteUrl: getFormValue(formData, 'websiteUrl'),
    reservationUrl: getFormValue(formData, 'reservationUrl'),
    contact: getFormValue(formData, 'phone'),
    openDate: getDatePatchValue(formData, 'openedAt', storeDetail.openedAt),
    renewalStartDate: getDatePatchValue(
      formData,
      'renovationStartedAt',
      storeDetail.renovationStartedAt
    ),
    renewalEndDate: getDatePatchValue(
      formData,
      'renovationEndedAt',
      storeDetail.renovationEndedAt
    ),
    closureExpectedDate: getDatePatchValue(
      formData,
      'expectedClosedAt',
      storeDetail.expectedClosedAt
    ),
    closureDate: getDatePatchValue(formData, 'closedAt', storeDetail.closedAt),
    note: getFormValue(formData, 'memo'),
  };
}

function getFormValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim();
}

function getDatePatchValue(
  formData: FormData,
  name: string,
  currentValue: string | undefined
) {
  const nextValue = getFormValue(formData, name);

  if (nextValue === (currentValue ?? '')) {
    return undefined;
  }

  return nextValue || null;
}

function StoreDetailStatus({
  isError,
  message,
  onRetry,
}: {
  isError: boolean;
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className='border-riu-monochrome-50 bg-riu-monochrome-10 flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg border px-4 py-6 text-center'>
      <p className='text-body3 text-riu-monochrome-600'>{message}</p>
      {isError ? (
        <Button
          type='button'
          variant='outline'
          className='border-riu-monochrome-50 text-body3 text-riu-monochrome-1000 h-9 rounded-lg px-4'
          onClick={onRetry}>
          다시 불러오기
        </Button>
      ) : null}
    </div>
  );
}

function getStoreDetailErrorMessage(error: unknown) {
  return isApiError(error)
    ? error.message
    : '매장 상세 정보를 불러오지 못했습니다.';
}

function getStoreUpdateErrorMessage(error: unknown) {
  return isApiError(error) ? error.message : '매장 정보를 수정하지 못했습니다.';
}

export {StoreEditDialogTrigger};
