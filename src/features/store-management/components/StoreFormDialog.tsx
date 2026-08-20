import type {FormEvent, ReactNode} from 'react';
import {X} from 'lucide-react';

import {Button} from '@/src/shared/components/ui/button';
import {Input} from '@/src/shared/components/ui/Input';
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
    <div
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal='true'
      className='bg-overlay fixed inset-0 z-50 flex items-center justify-center px-4 py-4'
      role='dialog'
      onMouseDown={onClose}>
      <form
        className='flex max-h-[calc(100dvh-2rem)] w-full max-w-[35rem] [scrollbar-width:none] flex-col gap-4 overflow-y-auto rounded-[10px] border border-black/10 bg-white p-6 shadow-xl [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex min-w-0 flex-col gap-2'>
            <h2
              className='text-h2 text-riu-monochrome-800 min-w-0'
              id={titleId}>
              {title}
            </h2>
            <p
              className='text-caption2 text-riu-monochrome-100 min-w-0'
              id={descriptionId}>
              {description}
            </p>
          </div>

          <Button
            aria-label={closeLabel}
            className='text-riu-monochrome-800 hover:bg-riu-monochrome-20 size-6'
            size='icon-xs'
            type='button'
            variant='ghost'
            onClick={onClose}>
            <X aria-hidden='true' className='size-4' />
          </Button>
        </div>

        {children}

        <div className='flex justify-end gap-2 pt-0'>
          <Button
            className='border-riu-monochrome-50 text-body3 text-riu-monochrome-1000 h-9 rounded-lg px-4'
            type='button'
            variant='outline'
            onClick={onClose}>
            취소
          </Button>
          <Button
            className='bg-riu-monochrome-800 text-body3 text-riu-monochrome-10 hover:bg-riu-monochrome-700 h-9 rounded-lg px-4'
            type='submit'>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
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
