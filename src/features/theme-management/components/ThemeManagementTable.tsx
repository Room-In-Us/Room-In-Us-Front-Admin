import {ThemeManagementPagination} from './ThemeManagementPagination';
import {ThemeManagementTableContent} from './ThemeManagementTableContent';
import {ThemeManagementToolbar} from './ThemeManagementToolbar';

function ThemeManagementTable() {
  return (
    <>
      <ThemeManagementToolbar />
      <ThemeManagementTableContent />
      <ThemeManagementPagination />
    </>
  );
}

export {ThemeManagementTable};
