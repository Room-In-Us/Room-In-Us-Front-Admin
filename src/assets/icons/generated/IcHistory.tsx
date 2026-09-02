import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcHistory = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
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
      d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8m5 0H3V3m9 4v5l4 2'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcHistory);
const Memo = memo(ForwardRef);
export default Memo;
