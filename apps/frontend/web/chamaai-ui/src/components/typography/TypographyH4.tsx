import { ReactNode } from 'react';

export function TypographyH4({ children }: { children: ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight leading-0">
      {children}
    </h4>
  );
}
