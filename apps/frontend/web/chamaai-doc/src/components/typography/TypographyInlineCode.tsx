import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyInlineCodeProps {
  children: ReactNode;
  className?: string;
}

export function TypographyInlineCode({
  children,
  className,
}: TypographyInlineCodeProps) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  );
}
