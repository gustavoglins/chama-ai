import { cva, VariantProps } from 'class-variance-authority';

export type zInputIcon = 'email' | 'password' | 'text';

export const inputVariants = cva(
  [
    // Base styles
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input',
    'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    // Focus styles
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    // Error styles
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  ],
  {
    variants: {
      zType: {
        default: '',
        textarea: 'min-h-[80px] resize-none',
      },
      zSize: {
        default: 'h-9 py-1',
        sm: 'h-8 py-0.5',
        lg: 'h-11 py-2',
      },
      zStatus: {
        error:
          'border-destructive ring-destructive/20 dark:ring-destructive/40',
        warning: 'border-yellow-500 ring-yellow-500/20 dark:ring-yellow-500/40',
        success: 'border-green-500 ring-green-500/20 dark:ring-green-500/40',
      },
      zBorderless: {
        true: 'flex-1 bg-transparent border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-0 shadow-none',
      },
    },
    defaultVariants: {
      zType: 'default',
      zSize: 'default',
    },
  }
);

export type ZardInputVariants = VariantProps<typeof inputVariants>;
