import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full px-6 py-4">
        <div className="mx-auto flex justify-between items-center px-4">
          <Link href={'/app'}>
            <Image
              src="/icon.png"
              alt="Chama Ai Icon"
              width={1000}
              height={1000}
              className="h-6 w-auto object-contain"
              priority
            />
          </Link>

          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href={'/app/services'}>
                  <Button variant="ghost">
                    Explorar <ArrowUpRight />
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={'/auth/login'}>
                  <Button>Entrar</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-[75rem] mx-auto px-4 flex-1 flex items-center">
        {children}
      </main>

      <footer className="max-w-[75rem] w-full mx-auto px-6 py-6 mt-auto border-t">
        <div className="flex flex-row text-sm justify-between items-center mb-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Chama Ai Logo"
              width={802}
              height={222}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex gap-8">
            <Link href="/terms-of-service" className="hover:underline">
              Termos de Serviço
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Política de Privacidade
            </Link>
          </div>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Copyright © 2025 Chama Ai. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
