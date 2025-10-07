import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographySmallProps {
  children: ReactNode;
  className?: string;
}

export function TypographySmall({ children, className }: TypographySmallProps) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </small>
  );
}
