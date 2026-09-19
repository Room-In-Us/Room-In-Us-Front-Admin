import {cva} from 'class-variance-authority';

import type {ThemeStatus} from '../model/theme';

type ThemeStatusTagProps = {
  status: ThemeStatus;
};

const themeStatusTagLabel = {
  closed: '폐업',
  closing: '폐업 예정',
  new: '신규 오픈',
  operating: '정상 운영',
  renovation: '리뉴얼',
  upcoming: '오픈 예정',
} satisfies Record<ThemeStatus, string>;

const themeStatusTagVariants = cva(
  'text-button3 inline-flex h-[1.625rem] items-center justify-center rounded-[12px] px-3',
  {
    variants: {
      status: {
        closed: 'bg-tag-delete-background text-tag-delete-foreground',
        closing:
          'bg-tag-expect-delete-background text-tag-expect-delete-foreground',
        new: 'bg-tag-new-background text-tag-new-foreground',
        operating: 'bg-tag-default-background text-tag-default-foreground',
        renovation:
          'bg-status-renovation-background text-status-renovation-foreground',
        upcoming:
          'bg-status-upcoming-background text-status-upcoming-foreground',
      } satisfies Record<ThemeStatus, string>,
    },
  }
);

function ThemeStatusTag({status}: ThemeStatusTagProps) {
  return (
    <span className={themeStatusTagVariants({status})}>
      {themeStatusTagLabel[status]}
    </span>
  );
}

export {ThemeStatusTag};
