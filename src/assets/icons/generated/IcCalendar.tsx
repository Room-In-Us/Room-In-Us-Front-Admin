import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcCalendar = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 23'
    ref={ref}
    {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 2v3m8-3v3M3 9h18M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcCalendar);
const Memo = memo(ForwardRef);
export default Memo;
