import * as React from 'react';

import {Input} from '@/src/shared/components/ui/Input';
import {cn} from '@/src/shared/lib/utils';

type SearchInputAreaProps = React.ComponentProps<'input'> & {
  label?: string;
  wrapperClassName?: string;
};

function SearchInputArea({
  id,
  label = '검색:',
  placeholder = '매장명 검색',
  className,
  wrapperClassName,
  type = 'search',
  ...props
}: SearchInputAreaProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('flex items-center gap-2', wrapperClassName)}>
      <label
        htmlFor={inputId}
        className='text-body3 text-riu-monochrome-800 shrink-0'>
        {label}
      </label>

      <Input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={cn('w-64 shrink-0', className)}
        {...props}
      />
    </div>
  );
}

export {SearchInputArea};
