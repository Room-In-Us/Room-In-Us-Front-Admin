'use client';

import {
  PageTitle,
  PageTitleActionButton,
} from '@/src/shared/components/layout/PageTitle';

import {
  ThemeManagementClientProvider,
  useThemeManagementSummary,
} from './components/ThemeManagementClientProvider';
import {ThemeManagementTable} from './components/ThemeManagementTable';

function ThemeManagementPage() {
  return (
    <ThemeManagementClientProvider>
      <ThemeManagementPageContent />
    </ThemeManagementClientProvider>
  );
}

function ThemeManagementPageContent() {
  const {totalElements} = useThemeManagementSummary();

  return (
    <section aria-labelledby='theme-management-title' className='min-w-0'>
      <PageTitle
        title={<span id='theme-management-title'>테마 관리</span>}
        subtitle={`총 ${totalElements}개의 테마`}
        action={<PageTitleActionButton>테마 추가</PageTitleActionButton>}
      />

      <ThemeManagementTable />
    </section>
  );
}

export {ThemeManagementPage};
