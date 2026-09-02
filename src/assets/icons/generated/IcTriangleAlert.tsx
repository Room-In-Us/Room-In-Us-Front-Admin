import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcTriangleAlert = (
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
      d='M12 9v4m0 4h.01m9.72 1-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcTriangleAlert);
const Memo = memo(ForwardRef);
export default Memo;
