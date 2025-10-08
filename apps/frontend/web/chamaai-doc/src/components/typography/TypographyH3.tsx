import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyH3Props {
  children: ReactNode;
  className?: string;
}

export function TypographyH3({ children, className }: TypographyH3Props) {
  return (
    <h3 className={cn('text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  );
}
