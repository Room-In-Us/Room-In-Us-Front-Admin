import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcSearch = (
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
      d='m21 21-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcSearch);
const Memo = memo(ForwardRef);
export default Memo;
