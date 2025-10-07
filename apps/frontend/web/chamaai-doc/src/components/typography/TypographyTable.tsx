import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyTableProps {
  children: ReactNode;
  className?: string;
}

export function TypographyTable({ children, className }: TypographyTableProps) {
  return (
    <div className={cn('my-6 w-full overflow-y-auto', className)}>
      <table className="w-full [&_thead_tr]:even:bg-muted [&_thead_tr]:m-0 [&_thead_tr]:border-t [&_thead_tr]:p-0 [&_thead_th]:border [&_thead_th]:px-4 [&_thead_th]:py-2 [&_thead_th]:text-left [&_thead_th]:font-bold [&_thead_th[align=center]]:text-center [&_thead_th[align=right]]:text-right [&_tbody_tr]:even:bg-muted [&_tbody_tr]:m-0 [&_tbody_tr]:border-t [&_tbody_tr]:p-0 [&_tbody_td]:border [&_tbody_td]:px-4 [&_tbody_td]:py-2 [&_tbody_td]:text-left [&_tbody_td[align=center]]:text-center [&_tbody_td[align=right]]:text-right">
        {children}
      </table>
    </div>
  );
}
