import type {FormEvent, ReactNode} from 'react';

import {Input} from '@/src/shared/components/ui/Input';
import {ModalLayout} from '@/src/shared/components/ui/ModalLayout';
import {cn} from '@/src/shared/lib/utils';

type StoreFormFieldConfig = {
  id: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'url' | 'tel' | 'date';
  defaultValue?: string;
  helperText?: ReactNode;
};

type StoreFormDialogProps = {
  title: string;
  description: string;
  submitLabel: string;
  titleId: string;
  descriptionId: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

function StoreFormDialog({
  title,
  description,
  submitLabel,
  titleId,
  descriptionId,
  closeLabel,
  onClose,
  children,
}: StoreFormDialogProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <ModalLayout
      closeLabel={closeLabel}
      description={description}
      descriptionId={descriptionId}
      submitLabel={submitLabel}
      title={title}
      titleId={titleId}
      onClose={onClose}
      onSubmit={handleSubmit}>
      {children}
    </ModalLayout>
  );
}

function StoreFormDialogField({
  field,
  idPrefix,
  textarea = false,
}: {
  field: StoreFormFieldConfig;
  idPrefix: string;
  textarea?: boolean;
}) {
  const inputId = `${idPrefix}-${field.id}`;

  return (
    <label className='flex min-w-0 flex-col gap-2' htmlFor={inputId}>
      <span className='text-body3 text-riu-monochrome-800 inline-flex gap-1'>
        <span>{field.label}</span>
        {field.required ? (
          <span className='text-destructive' aria-hidden='true'>
            *
          </span>
        ) : null}
      </span>
      {textarea ? (
        <textarea
          className={cn(
            'border-input bg-input text-body3 text-riu-monochrome-800 min-h-16 w-full resize-none rounded-lg border px-3 py-2 transition-colors outline-none',
            'placeholder:text-riu-monochrome-300',
            'focus-visible:border-riu-primary-500 focus-visible:bg-riu-monochrome-10'
          )}
          defaultValue={field.defaultValue}
          id={inputId}
          required={field.required}
          rows={3}
        />
      ) : (
        <Input
          defaultValue={field.defaultValue}
          id={inputId}
          required={field.required}
          type={field.type ?? 'text'}
        />
      )}
      {field.helperText ? (
        <span className='text-caption3 text-riu-monochrome-300 flex min-w-0 items-center gap-1'>
          {field.helperText}
        </span>
      ) : null}
    </label>
  );
}

export {StoreFormDialog, StoreFormDialogField};
export type {StoreFormFieldConfig};
