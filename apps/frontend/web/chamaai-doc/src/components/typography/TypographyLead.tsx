import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyLeadProps {
  children: ReactNode;
  className?: string;
}

export function TypographyLead({ children, className }: TypographyLeadProps) {
  return (
    <p className={cn('text-muted-foreground text-xl', className)}>{children}</p>
  );
}
