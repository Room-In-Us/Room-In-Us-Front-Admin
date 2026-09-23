import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcX = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d='M18 6 6 18M6 6l12 12'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcX);
const Memo = memo(ForwardRef);
export default Memo;
