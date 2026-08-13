import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcLogOut = (
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
      d='m16 7 5 5-5 5m5-5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcLogOut);
const Memo = memo(ForwardRef);
export default Memo;
