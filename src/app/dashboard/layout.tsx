import type {ReactNode} from 'react';

import {DashboardHeader} from '@/src/app/dashboard/DashboardHeader';
import {SidebarNavigation} from '@/src/shared/components/layout/SidebarNavigation';

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <div className='min-h-screen bg-[#f9fafb]'>
      <DashboardHeader />

      <div className='flex min-h-[calc(100vh-4rem)]'>
        <aside className='w-64 shrink-0 border-r border-[#e5e7eb] bg-white'>
          <SidebarNavigation />
        </aside>

        <main className='min-w-0 flex-1 p-6'>{children}</main>
      </div>
    </div>
  );
}
