import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyH2Props {
  children: ReactNode;
  className?: string;
}

export function TypographyH2({ children, className }: TypographyH2Props) {
  return (
    <h2 className={cn('text-3xl font-semibold tracking-tight', className)}>
      {children}
    </h2>
  );
}
