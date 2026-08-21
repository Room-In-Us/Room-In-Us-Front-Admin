import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcEye = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d='M2.062 11.651a1 1 0 0 0 0 .696 10.75 10.75 0 0 0 19.876 0 1 1 0 0 0 0-.696 10.75 10.75 0 0 0-19.876 0'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcEye);
const Memo = memo(ForwardRef);
export default Memo;
