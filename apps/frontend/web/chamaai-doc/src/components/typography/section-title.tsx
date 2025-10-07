import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn('text-emerald-500 font-medium text-[15px] mb-2', className)}
    >
      {children}
    </div>
  );
}
