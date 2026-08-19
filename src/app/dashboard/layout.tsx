import type {ReactNode} from 'react';

import {DashboardHeader} from '@/src/app/dashboard/DashboardHeader';
import {SidebarNavigation} from '@/src/shared/components/layout/SidebarNavigation';

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <div className='bg-dashboard-background min-h-screen'>
      <DashboardHeader />

      <div className='flex min-h-[calc(100vh-4rem)]'>
        <aside className='border-dashboard-border bg-surface w-64 shrink-0 border-r'>
          <SidebarNavigation />
        </aside>

        <main className='min-w-0 flex-1 p-6'>{children}</main>
      </div>
    </div>
  );
}
