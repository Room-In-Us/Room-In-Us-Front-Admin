import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcPlus = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d='M5 12h14m-7-7v14'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcPlus);
const Memo = memo(ForwardRef);
export default Memo;
