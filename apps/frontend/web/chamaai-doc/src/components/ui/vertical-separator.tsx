import { cn } from '@/lib/utils';

interface VerticalSeparatorProps {
  className?: string;
  height?: string;
}

export function VerticalSeparator({
  className,
  height = '1.5rem',
}: VerticalSeparatorProps) {
  return (
    <div
      className={cn('w-px bg-border', className)}
      style={{ height }}
      role="separator"
      aria-orientation="vertical"
    />
  );
}
