import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyMutedProps {
  children: ReactNode;
  className?: string;
}

export function TypographyMuted({ children, className }: TypographyMutedProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  );
}
