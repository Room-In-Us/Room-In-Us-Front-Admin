'use client';

import * as React from 'react';

import {IconSlot, type IconSlotSize} from '@/src/shared/components/ui/IconSlot';
import {cn} from '@/src/shared/lib/utils';

type TabItem = {
  value: string;
  label: string;
  count?: number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize?: IconSlotSize;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  tabClassName?: string;
  'aria-label'?: string;
};

function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  tabClassName,
  'aria-label': ariaLabel = 'tabs',
}: TabsProps) {
  const firstEnabledValue = items.find((item) => !item.disabled)?.value;
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? value ?? firstEnabledValue
  );
  const selectedValue = value ?? internalValue;

  function selectTab(item: TabItem) {
    if (item.disabled) {
      return;
    }

    setInternalValue(item.value);
    onValueChange?.(item.value);
  }

  return (
    <div
      role='group'
      aria-label={ariaLabel}
      className={cn(
        'border-riu-monochrome-20 flex items-center border-b',
        className
      )}>
      {items.map((item) => {
        const Icon = item.icon;
        const isSelected = item.value === selectedValue;

        return (
          <button
            key={item.value}
            type='button'
            aria-pressed={isSelected}
            disabled={item.disabled}
            onClick={() => selectTab(item)}
            className={cn(
              'text-button2 flex h-10 w-[108px] shrink-0 items-center justify-between px-4 py-2.5 transition-colors outline-none',
              'text-riu-monochrome-500 border-b border-transparent',
              'focus-visible:border-riu-primary-500 focus-visible:bg-riu-primary-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isSelected &&
                'border-riu-primary-300 bg-riu-primary-0 text-riu-primary-300',
              tabClassName
            )}>
            {Icon ? (
              <IconSlot size={item.iconSize ?? 'sm'}>
                <Icon aria-hidden='true' />
              </IconSlot>
            ) : (
              <span aria-hidden='true' className='size-4 shrink-0' />
            )}

            <span className='whitespace-nowrap'>{item.label}</span>

            {typeof item.count === 'number' ? (
              <span
                className={cn(
                  'bg-riu-monochrome-30 text-body4 text-riu-monochrome-500 flex size-[18px] shrink-0 items-center justify-center rounded-full',
                  isSelected && 'bg-riu-primary-20 text-riu-primary-300'
                )}>
                {item.count}
              </span>
            ) : (
              <span aria-hidden='true' className='size-[18px] shrink-0' />
            )}
          </button>
        );
      })}
    </div>
  );
}

export {Tabs, type TabItem};
