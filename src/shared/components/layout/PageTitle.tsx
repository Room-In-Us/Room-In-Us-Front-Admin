import * as React from 'react';

import {IcPlus} from '@/src/assets/icons';
import {Button} from '@/src/shared/components/ui/button';
import {IconSlot, type IconSlotSize} from '@/src/shared/components/ui/IconSlot';
import {cn} from '@/src/shared/lib/utils';

type PageTitleProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

function PageTitle({title, subtitle, action, className}: PageTitleProps) {
  return (
    <div
      className={cn(
        'flex w-full items-start justify-between gap-4',
        !action && 'flex-col justify-start gap-1',
        className
      )}
    >
      <div className='flex min-w-0 flex-col items-start justify-center gap-1'>
        <h1 className='min-w-0 text-h1 text-riu-monochrome-1000'>{title}</h1>
        {subtitle ? (
          <p className='min-w-0 text-caption2 text-riu-monochrome-300'>
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? <div className='shrink-0'>{action}</div> : null}
    </div>
  );
}

function PageTitleActionButton({
  className,
  children,
  iconSize = 'sm',
  ...props
}: React.ComponentProps<typeof Button> & {
  iconSize?: IconSlotSize;
}) {
  return (
    <Button
      type='button'
      className={cn(
        'h-9 gap-3.5 rounded-lg bg-riu-monochrome-800 px-3 py-2 text-button2 text-riu-monochrome-10 hover:bg-riu-monochrome-700 hover:text-riu-monochrome-10',
        className
      )}
      {...props}
    >
      <IconSlot size={iconSize}>
        <IcPlus aria-hidden='true' />
      </IconSlot>
      {children}
    </Button>
  );
}

export {PageTitle, PageTitleActionButton};
