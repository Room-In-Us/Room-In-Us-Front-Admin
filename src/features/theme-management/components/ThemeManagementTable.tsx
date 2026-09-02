import type {Theme} from '../model/theme';
import {ThemeManagementClientProvider} from './ThemeManagementClientProvider';
import {ThemeManagementPagination} from './ThemeManagementPagination';
import {ThemeManagementTableContent} from './ThemeManagementTableContent';
import {ThemeManagementToolbar} from './ThemeManagementToolbar';

type ThemeManagementTableProps = {
  themes: Theme[];
};

function ThemeManagementTable({themes}: ThemeManagementTableProps) {
  return (
    <ThemeManagementClientProvider themes={themes}>
      <ThemeManagementToolbar />
      <ThemeManagementTableContent />
      <ThemeManagementPagination />
    </ThemeManagementClientProvider>
  );
}

export {ThemeManagementTable};
