import * as React from 'react';

import {cn} from '@/src/shared/lib/utils';

function Input({
  className,
  type = 'text',
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot='input'
      type={type}
      className={cn(
        'border-input bg-input text-body3 text-riu-monochrome-300 h-9 w-full min-w-0 rounded-lg border px-3 py-1 transition-colors outline-none',
        'placeholder:text-riu-monochrome-300',
        'focus-visible:border-riu-primary-500 focus-visible:bg-riu-monochrome-10 focus-visible:text-riu-monochrome-700 focus-visible:placeholder:text-riu-monochrome-700',
        'disabled:bg-input disabled:text-riu-monochrome-70 disabled:placeholder:text-riu-monochrome-70 disabled:cursor-not-allowed',
        'aria-invalid:border-destructive aria-invalid:text-riu-monochrome-700',
        className
      )}
      {...props}
    />
  );
}

export {Input};
