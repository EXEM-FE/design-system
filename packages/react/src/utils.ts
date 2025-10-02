import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-header-1',
        'text-header-2',
        'text-title-1',
        'text-title-2',
        'text-body-1',
        'text-body-2',
        'text-body-3',
        'text-caption',
      ],
    },
  },
});

/**
 * Utility function to merge Tailwind CSS classes
 * Uses clsx to combine class names
 */
const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};

export { cn };
