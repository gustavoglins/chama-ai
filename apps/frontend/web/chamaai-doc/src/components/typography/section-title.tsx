import { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <span className="text-emerald-400 font-medium text-sm">{children}</span>
  );
}
