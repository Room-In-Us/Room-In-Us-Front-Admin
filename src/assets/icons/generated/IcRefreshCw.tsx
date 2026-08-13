import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcRefreshCw = (
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
      d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8m-5 0h5V3m0 9a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16m0 5v-5h5'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcRefreshCw);
const Memo = memo(ForwardRef);
export default Memo;
