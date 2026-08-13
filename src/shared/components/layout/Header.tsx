'use client';

import type {ComponentProps} from 'react';

import {IcLogOut, IcRefreshCw} from '@/src/assets/icons';
import {Button} from '@/src/shared/components/ui/button';
import {IconSlot, type IconSlotSize} from '@/src/shared/components/ui/IconSlot';
import {cn} from '@/src/shared/lib/utils';

type HeaderProps = {
  title?: string;
  resetLabel?: string;
  logoutLabel?: string;
  iconSize?: IconSlotSize;
  onReset?: () => void;
  onLogout?: () => void;
  className?: string;
};

function Header({
  title = '\uBC29\uD0C8\uCD9C \uC5B4\uB4DC\uBBFC',
  resetLabel = '\uB370\uC774\uD130 \uCD08\uAE30\uD654',
  logoutLabel = '\uB85C\uADF8\uC544\uC6C3',
  iconSize = 'sm',
  onReset,
  onLogout,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'flex h-16 w-full items-center justify-between border-b border-riu-monochrome-30 bg-surface px-6 py-4',
        className
      )}
    >
      <h1 className='text-h2 text-riu-monochrome-1000'>{title}</h1>

      <div className='flex items-center gap-2'>
        <HeaderActionButton onClick={onReset}>
          <IconSlot size={iconSize}>
            <IcRefreshCw aria-hidden='true' />
          </IconSlot>
          <span>{resetLabel}</span>
        </HeaderActionButton>

        <HeaderActionButton onClick={onLogout}>
          <IconSlot size={iconSize}>
            <IcLogOut aria-hidden='true' />
          </IconSlot>
          <span>{logoutLabel}</span>
        </HeaderActionButton>
      </div>
    </header>
  );
}

function HeaderActionButton({className, ...props}: ComponentProps<typeof Button>) {
  return (
    <Button
      type='button'
      variant='outline'
      className={cn(
        'h-8 gap-3.5 border-riu-monochrome-30 bg-surface px-3.5 py-1.5 text-button2 text-riu-monochrome-1000 hover:bg-riu-monochrome-10 hover:text-riu-monochrome-1000',
        className
      )}
      {...props}
    />
  );
}

export {Header};
