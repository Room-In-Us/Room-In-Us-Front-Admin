'use client';

import {useState} from 'react';

import {IcHistory, IcKeyRound, IcMessageSquare, IcStore} from '@/src/assets/icons';
import {IconSlot} from '@/src/shared/components/ui/IconSlot';
import {cn} from '@/src/shared/lib/utils';

type SidebarMenuItem = {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const sidebarMenuItems: SidebarMenuItem[] = [
  {value: 'store', label: '\ub9e4\uc7a5 \uad00\ub9ac', icon: IcStore},
  {value: 'theme', label: '\ud14c\ub9c8 \uad00\ub9ac', icon: IcKeyRound},
  {value: 'history', label: '\ud788\uc2a4\ud1a0\ub9ac', icon: IcHistory},
  {value: 'review', label: '\ud6c4\uae30 \uad00\ub9ac', icon: IcMessageSquare},
];

const adminMenuLabel = '\uad00\ub9ac\uc790 \uba54\ub274';

function SidebarMenuPreview() {
  const [activeMenu, setActiveMenu] = useState(sidebarMenuItems[0].value);

  return (
    <section className='mt-10 w-fit bg-riu-monochrome-30 p-5'>
      <h2 className='mb-5 text-title2 text-riu-monochrome-700'>
        Sidebar Menu Preview
      </h2>

      <div className='bg-sidebar p-4'>
        <nav className='flex w-[12.5rem] flex-col' aria-label={adminMenuLabel}>
          {sidebarMenuItems.map(({value, label, icon: Icon}) => {
            const isActive = activeMenu === value;

            return (
              <button
                key={value}
                type='button'
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveMenu(value)}
                className={cn(
                  'flex h-12 w-full items-center gap-3 rounded-[10px] px-4 text-left text-body2 text-riu-monochrome-600 transition-colors',
                  isActive && 'bg-riu-primary-0 text-riu-primary-300',
                )}
              >
                <IconSlot size='md'>
                  <Icon aria-hidden='true' />
                </IconSlot>
                <span
                  className={cn(
                    isActive &&
                      'bg-linear-[125deg,var(--riu-primary-500),var(--riu-primary-300)] bg-clip-text text-transparent',
                  )}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

export {SidebarMenuPreview};
