import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcStar = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    ref={ref}
    {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M11.526 2.759a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0l-4.617 2.428a.53.53 0 0 1-.77-.56l.881-5.14a2.12 2.12 0 0 0-.611-1.878L2.16 10.259a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcStar);
const Memo = memo(ForwardRef);
export default Memo;
