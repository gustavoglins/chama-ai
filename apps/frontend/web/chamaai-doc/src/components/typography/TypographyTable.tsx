import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyTableProps {
  children: ReactNode;
  className?: string;
}

export function TypographyTable({ children, className }: TypographyTableProps) {
  return (
    <div
      className={cn(
        'my-6 w-full overflow-hidden rounded-lg border border-border',
        className
      )}
    >
      <table className="w-full [&_thead_tr]:bg-muted/50 [&_thead_tr]:m-0 [&_thead_tr]:p-0 [&_thead_th]:border-b [&_thead_th]:border-r [&_thead_th]:last:border-r-0 [&_thead_th]:px-4 [&_thead_th]:py-2 [&_thead_th]:text-left [&_thead_th]:font-semibold [&_thead_th[align=center]]:text-center [&_thead_th[align=right]]:text-right [&_tbody_tr]:m-0 [&_tbody_tr]:border-b [&_tbody_tr]:last:border-b-0 [&_tbody_tr]:p-0 [&_tbody_td]:border-r [&_tbody_td]:last:border-r-0 [&_tbody_td]:px-4 [&_tbody_td]:py-2 [&_tbody_td]:text-left [&_tbody_td[align=center]]:text-center [&_tbody_td[align=right]]:text-right">
        {children}
      </table>
    </div>
  );
}
