import * as React from 'react';

import {IcSearch} from '@/src/assets/icons';
import {cn} from '@/src/shared/lib/utils';

function Input({
  className,
  type = 'text',
  variant = 'default',
  ...props
}: React.ComponentProps<'input'> & {variant?: 'default' | 'search'}) {
  const inputClassName = cn(
    'border-input bg-input text-body3 text-riu-monochrome-700 h-9 w-full min-w-0 rounded-lg border px-3 py-1 transition-colors outline-none',
    'placeholder:text-riu-monochrome-300',
    'focus-visible:border-riu-primary-500 focus-visible:bg-riu-monochrome-10',
    'disabled:bg-input disabled:text-riu-monochrome-70 disabled:placeholder:text-riu-monochrome-70 disabled:cursor-not-allowed',
    'aria-invalid:border-destructive',
    variant === 'default' && className
  );

  if (variant === 'search') {
    return (
      <span
        className={cn(
          'border-input bg-input focus-within:border-riu-primary-500 focus-within:bg-riu-monochrome-10 flex h-9 min-w-0 items-center gap-2 rounded-lg border px-3 transition-colors',
          'has-disabled:cursor-not-allowed has-disabled:opacity-60',
          className
        )}>
        <IcSearch
          aria-hidden='true'
          className='text-riu-monochrome-100 size-4 shrink-0'
        />
        <input
          data-slot='input'
          type={type}
          className='text-body3 text-riu-monochrome-700 placeholder:text-riu-monochrome-100 min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed'
          {...props}
        />
      </span>
    );
  }

  return (
    <input
      data-slot='input'
      type={type}
      className={inputClassName}
      {...props}
    />
  );
}

export {Input};
