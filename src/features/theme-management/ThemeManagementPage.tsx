import {
  PageTitle,
  PageTitleActionButton,
} from '@/src/shared/components/layout/PageTitle';

import {ThemeManagementTable} from './components/ThemeManagementTable';
import {themes} from './model/mockThemes';

function ThemeManagementPage() {
  return (
    <section aria-labelledby='theme-management-title' className='min-w-0'>
      <PageTitle
        title={<span id='theme-management-title'>테마 관리</span>}
        subtitle={`총 ${themes.length}개의 테마`}
        action={<PageTitleActionButton>테마 추가</PageTitleActionButton>}
      />

      <ThemeManagementTable themes={themes} />
    </section>
  );
}

export {ThemeManagementPage};
