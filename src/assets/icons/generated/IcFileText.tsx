import {forwardRef, memo, type Ref, type SVGProps} from 'react';
const SvgIcFileText = (
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
      d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8m-6-6a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8m-6-6v5a1 1 0 0 0 1 1h5M10 9H8m8 4H8m8 4H8'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgIcFileText);
const Memo = memo(ForwardRef);
export default Memo;
