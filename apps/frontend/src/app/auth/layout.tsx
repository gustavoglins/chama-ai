import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    // <div className="h-screen w-screen flex flex-col items-center justify-center">
    <div className="h-screen w-screen flex flex-col justify-center">
      <header className="px-10 py-7.5 top-0 absolute">
        <Link href={'/'}>
          <Image
            src="/icon.png"
            alt="Chama Ai Icon"
            width={1000}
            height={1000}
            className="h-6 w-auto object-contain"
            priority
          />
        </Link>
      </header>
      <main className="mx-auto w-full flex justify-center px-4 md:px-0">
        {children}
      </main>
    </div>
  );
}
