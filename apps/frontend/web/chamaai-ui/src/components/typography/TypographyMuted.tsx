import { ReactNode } from 'react';

export function TypographyMuted({ children }: { children: ReactNode }) {
  return (
    <p className="text-muted-foreground text-[15px] leading-6 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
}
