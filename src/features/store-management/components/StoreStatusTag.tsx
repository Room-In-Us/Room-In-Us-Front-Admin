import {cva} from 'class-variance-authority';

import {cn} from '@/src/shared/lib/utils';

type StoreStatusTagVariant = 'default' | 'new' | 'delete' | 'expect-delete';

type StoreStatusTagProps = {
  variant?: StoreStatusTagVariant;
  className?: string;
};

const statusTagLabel = {
  default: '정상 운영',
  new: '신규 오픈',
  delete: '폐업',
  'expect-delete': '폐업 예정',
} satisfies Record<StoreStatusTagVariant, string>;

const statusTagVariants = cva(
  'text-button3 inline-flex h-[1.625rem] items-center justify-center rounded-[12px] px-3',
  {
    variants: {
      variant: {
        default: 'bg-tag-default-background text-tag-default-foreground',
        new: 'bg-tag-new-background text-tag-new-foreground',
        delete: 'bg-tag-delete-background text-tag-delete-foreground',
        'expect-delete':
          'bg-tag-expect-delete-background text-tag-expect-delete-foreground',
      } satisfies Record<StoreStatusTagVariant, string>,
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function StoreStatusTag({variant = 'default', className}: StoreStatusTagProps) {
  return (
    <span className={cn(statusTagVariants({variant}), className)}>
      {statusTagLabel[variant]}
    </span>
  );
}

export {StoreStatusTag};
export type {StoreStatusTagVariant};
