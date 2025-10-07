import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyLargeProps {
  children: ReactNode;
  className?: string;
}

export function TypographyLarge({ children, className }: TypographyLargeProps) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  );
}
