'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {ComponentType, SVGProps} from 'react';

import {
  IcHistory,
  IcKeyRound,
  IcMessageSquare,
  IcStore,
} from '@/src/assets/icons';
import {cn} from '@/src/shared/lib/utils';

type NavigationItemId = 'stores' | 'themes' | 'history' | 'reviews';

type NavigationItem = {
  id: NavigationItemId;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type SidebarNavigationProps = {
  activeItem?: NavigationItemId;
  className?: string;
};

const navigationItems: NavigationItem[] = [
  {
    id: 'stores',
    label: '매장 관리',
    href: '/dashboard',
    icon: IcStore,
  },
  {
    id: 'themes',
    label: '테마 관리',
    href: '/dashboard/themes',
    icon: IcKeyRound,
  },
  {
    id: 'history',
    label: '히스토리',
    href: '/dashboard/history',
    icon: IcHistory,
  },
  {
    id: 'reviews',
    label: '후기 관리',
    href: '/dashboard/reviews',
    icon: IcMessageSquare,
  },
];

function SidebarNavigation({activeItem, className}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label='대시보드 메뉴'
      className={cn('bg-sidebar flex flex-col items-start p-4', className)}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem
          ? item.id === activeItem
          : isActivePath(pathname, item.href);
        const itemClassName = cn(
          'text-body2 flex h-12 w-full items-center gap-3 rounded-[10px] px-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-riu-primary-300 focus-visible:ring-offset-2',
          isActive
            ? 'bg-riu-primary-0 text-riu-primary-300'
            : 'text-riu-monochrome-600 hover:bg-riu-monochrome-10 hover:text-riu-monochrome-1000'
        );

        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={itemClassName}>
            <Icon className='size-5 shrink-0' aria-hidden='true' />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === '/dashboard') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export {SidebarNavigation};
export type {NavigationItemId};
