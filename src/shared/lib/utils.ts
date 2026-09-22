import {clsx, type ClassValue} from 'clsx';
import {extendTailwindMerge} from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'h1',
        'h2',
        'title2',
        'body2',
        'body3',
        'body4',
        'button2',
        'button3',
        'caption1',
        'caption2',
        'caption3',
      ],
    },
  },
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export {cn};
