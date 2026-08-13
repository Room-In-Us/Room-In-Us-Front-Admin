import {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type SVGProps,
} from 'react';

import {cn} from '@/src/shared/lib/utils';

type IconSlotSize = 'sm' | 'md' | 'lg' | number;

type IconSlotProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactElement<SVGProps<SVGSVGElement>>;
  size?: IconSlotSize;
};

const iconSlotSizeValue = {
  sm: 16,
  md: 20,
  lg: 24,
};

function IconSlot({
  children,
  className,
  size = 'sm',
  style,
  ...props
}: IconSlotProps) {
  const sizeValue = typeof size === 'number' ? size : iconSlotSizeValue[size];
  const icon = isValidElement<SVGProps<SVGSVGElement>>(children)
    ? cloneElement(children, {
        className: cn(children.props.className, 'block size-full'),
        height: '100%',
        style: {
          ...children.props.style,
          height: '100%',
          width: '100%',
        },
        width: '100%',
      })
    : children;

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden',
        className
      )}
      style={
        {height: sizeValue, width: sizeValue, ...style} satisfies CSSProperties
      }
      {...props}>
      {icon}
    </span>
  );
}

export {IconSlot, type IconSlotSize};
