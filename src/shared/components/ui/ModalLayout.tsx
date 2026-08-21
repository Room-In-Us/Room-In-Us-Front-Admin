'use client';

import {
  useEffect,
  useRef,
  type FormEventHandler,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {X} from 'lucide-react';

import {cn} from '@/src/shared/lib/utils';

import {Button} from './button';

type ModalLayoutProps = {
  title: string;
  description: string;
  titleId: string;
  descriptionId: string;
  closeLabel: string;
  submitLabel: string;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className?: string;
  footerClassName?: string;
};

function ModalLayout({
  title,
  description,
  titleId,
  descriptionId,
  closeLabel,
  submitLabel,
  onClose,
  onSubmit,
  children,
  className,
  footerClassName,
}: ModalLayoutProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const firstFocusableElement = getFocusableElements(formRef.current)[0];
    const focusTarget = firstFocusableElement ?? formRef.current;
    focusTarget?.focus();

    return () => {
      previouslyFocusedElementRef.current?.focus();
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(formRef.current);

    if (focusableElements.length === 0) {
      event.preventDefault();
      formRef.current?.focus();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (!formRef.current?.contains(activeElement)) {
      event.preventDefault();
      firstFocusableElement.focus();
      return;
    }

    if (event.shiftKey && activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }

  return (
    <div
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal='true'
      className='bg-overlay fixed inset-0 z-50 flex items-center justify-center px-4 py-4'
      role='dialog'
      onKeyDown={handleKeyDown}
      onMouseDown={onClose}>
      <form
        ref={formRef}
        className={cn(
          'flex max-h-[calc(100dvh-2rem)] w-full max-w-[35rem] [scrollbar-width:none] flex-col gap-4 overflow-y-auto rounded-[10px] border border-black/10 bg-white p-6 shadow-xl [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          className
        )}
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={onSubmit}
        tabIndex={-1}>
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

        <div className={cn('flex justify-end gap-2 pt-0', footerClassName)}>
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

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',')
    )
  ).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true'
  );
}

export {ModalLayout};
