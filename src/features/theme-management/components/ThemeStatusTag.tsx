import {cva} from 'class-variance-authority';

import type {ThemeStatus} from '../model/theme';

type ThemeStatusTagProps = {
  status: ThemeStatus;
};

const themeStatusTagLabel = {
  operating: '정상 운영',
  new: '신규 오픈',
  closing: '폐업 예정',
  closed: '폐업',
} satisfies Record<ThemeStatus, string>;

const themeStatusTagVariants = cva(
  'text-button3 inline-flex h-[1.625rem] items-center justify-center rounded-[12px] px-3',
  {
    variants: {
      status: {
        operating: 'bg-tag-default-background text-tag-default-foreground',
        new: 'bg-tag-new-background text-tag-new-foreground',
        closing:
          'bg-tag-expect-delete-background text-tag-expect-delete-foreground',
        closed: 'bg-tag-delete-background text-tag-delete-foreground',
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
