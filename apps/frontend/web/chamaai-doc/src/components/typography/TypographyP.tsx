import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyPProps {
  children: ReactNode;
  className?: string;
}

export function TypographyP({ children, className }: TypographyPProps) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-3.25', className)}>
      {children}
    </p>
  );
}
