import { ReactNode } from 'react';

export function TypographyH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-left text-4xl font-semibold tracking-tight text-balance">
      {children}
    </h1>
  );
}
