import { cva } from 'class-variance-authority';

export const radioCardGroupVariants = cva([
  'rounded-lg border bg-background overflow-hidden text-sm',
]);

export const radioRowVariants = cva(
  [
    'flex w-full items-center gap-2 px-4 py-3 outline-none text-left transition-colors',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:z-10',
    'hover:bg-accent/50 cursor-pointer',
  ],
  {
    variants: {
      showDivider: {
        true: 'border-t border-border',
        false: '',
      },
      checked: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-60 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      showDivider: false,
      checked: false,
      disabled: false,
    },
  }
);

export const radioBulletVariants = cva(
  ['grid place-items-center rounded-full border mt-0.5 h-4 w-4 shrink-0'],
  {
    variants: {
      checked: {
        true: 'border-blue-600 bg-blue-600',
        false: 'border-muted-foreground',
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

export const badgeVariants = cva(
  [
    'rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
  ],
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        profissional: 'bg-primary text-primary-foreground border-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
