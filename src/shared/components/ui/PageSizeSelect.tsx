'use client';

import * as React from 'react';

import {IcChevronDown} from '@/src/assets/icons';
import {IconSlot} from '@/src/shared/components/ui/IconSlot';
import {cn} from '@/src/shared/lib/utils';

type PageSizeOption = {
  value: string;
  label: string;
};

type PageSizeSelectProps = Omit<
  React.ComponentProps<'button'>,
  'children' | 'defaultValue' | 'onChange' | 'value'
> & {
  label?: string;
  options?: PageSizeOption[];
  value?: string | number;
  defaultValue?: string | number;
  onValueChange?: (value: string) => void;
  className?: string;
  menuClassName?: string;
  name?: string;
  triggerClassName?: string;
};

const defaultPageSizeOptions = [
  {value: '10', label: '10'},
  {value: '20', label: '20'},
  {value: '50', label: '50'},
  {value: '100', label: '100'},
];
const fallbackPageSizeOption = {value: '', label: ''};

function PageSizeSelect({
  id,
  label = '페이지 크기:',
  options = defaultPageSizeOptions,
  value,
  defaultValue = '10',
  onValueChange,
  className,
  menuClassName,
  name,
  triggerClassName,
  disabled,
  onClick,
  onKeyDown,
  ...props
}: PageSizeSelectProps) {
  const generatedId = React.useId();
  const buttonId = id ?? generatedId;
  const listboxId = `${buttonId}-listbox`;
  const isControlled = value !== undefined;
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue)
  );
  const rootRef = React.useRef<HTMLDivElement>(null);
  const selectedValue = isControlled ? String(value) : internalValue;
  const selectedOption =
    options.find((option) => option.value === selectedValue) ??
    options[0] ??
    fallbackPageSizeOption;

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, [isOpen]);

  function selectValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setIsOpen(false);
  }

  function moveSelection(direction: 1 | -1) {
    if (options.length === 0) {
      return;
    }

    const selectedIndex = Math.max(
      options.findIndex((option) => option.value === selectedValue),
      0
    );
    const nextIndex =
      (selectedIndex + direction + options.length) % options.length;

    selectValue(options[nextIndex].value);
  }

  function handleTriggerClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    setIsOpen((current) => !current);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((current) => !current);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveSelection(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveSelection(-1);
    }
  }

  return (
    <div ref={rootRef} className={cn('flex items-start gap-2', className)}>
      <label
        htmlFor={buttonId}
        className='text-body3 text-riu-monochrome-800 flex h-9 shrink-0 items-center'>
        {label}
      </label>

      <div className='relative w-24 shrink-0'>
        {name ? (
          <input type='hidden' name={name} value={selectedOption.value} />
        ) : null}

        <button
          id={buttonId}
          type='button'
          role='combobox'
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          disabled={disabled}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
          className={cn(
            'bg-riu-monochrome-20 text-body3 text-riu-monochrome-1000 flex h-9 w-full items-center justify-between rounded-lg border border-transparent py-1.5 pr-3 pl-3.5 transition-colors outline-none',
            'focus-visible:ring-ring/50 focus-visible:ring-3',
            'disabled:cursor-not-allowed disabled:opacity-50',
            triggerClassName
          )}
          {...props}>
          <span className='min-w-0 truncate'>{selectedOption.label}</span>

          <IconSlot
            aria-hidden='true'
            size='sm'
            className={cn(
              'text-riu-monochrome-1000 transition-transform',
              isOpen && 'rotate-180'
            )}>
            <IcChevronDown />
          </IconSlot>
        </button>

        {isOpen ? (
          <div
            id={listboxId}
            role='listbox'
            aria-labelledby={buttonId}
            className={cn(
              'bg-riu-monochrome-20 absolute top-11 left-0 z-20 flex w-full flex-col gap-1 rounded-lg p-2',
              menuClassName
            )}>
            {options.map((option) => {
              const isSelected = option.value === selectedOption.value;

              return (
                <button
                  key={option.value}
                  type='button'
                  role='option'
                  aria-selected={isSelected}
                  onClick={() => selectValue(option.value)}
                  className={cn(
                    'text-body3 flex h-7 w-full items-center rounded-lg p-1 text-left transition-colors outline-none',
                    'text-riu-monochrome-200 hover:bg-riu-monochrome-10 hover:text-riu-monochrome-1000 focus-visible:bg-riu-monochrome-10 focus-visible:text-riu-monochrome-1000',
                    isSelected &&
                      'bg-riu-monochrome-10 text-riu-monochrome-1000'
                  )}>
                  <span className='min-w-0 truncate'>{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export {PageSizeSelect, type PageSizeOption};
