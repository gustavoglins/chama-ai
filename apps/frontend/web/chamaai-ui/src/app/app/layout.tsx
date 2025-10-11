import { CurrentTime } from '@/components/CurrentTime';
import { NotificationsMenu } from '@/components/NotificationsMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Briefcase, House, ReceiptText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { AnimatedSearch } from '@/components/AnimatedSearch';

import { AddressSwitcher } from '@/components/AddressSwitcher';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="w-full border-b">
        <div className="max-w-[90rem] mx-auto flex items-center gap-8 px-6 py-3">
          <Link href={'/app'} className="shrink-0">
            <Image
              src="/icon.png"
              alt="Chama Ai Icon"
              width={1000}
              height={1000}
              className="h-5 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="flex-1">
            <ul className="flex gap-6 text-sm">
              <li>
                <Link
                  href={'/app'}
                  className="flex items-center gap-1.5 text-foreground hover:text-foreground/80 transition-colors duration-200"
                >
                  <House size={16} />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link
                  href={'/app/services'}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Briefcase size={16} />
                  <span>Serviços</span>
                </Link>
              </li>
              <li>
                <Link
                  href={'/app/orders'}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <ReceiptText size={16} />
                  <span>Pedidos</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-1 items-center shrink-0">
            <CurrentTime />

            <AddressSwitcher />

            <AnimatedSearch
              placeholder="Procure por eventos, calendários e mais..."
              width={440}
            />

            <NotificationsMenu />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-7 w-7 mb-0.75">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>GL</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-[90rem] w-full mx-auto px-6 py-8 flex-1">
        {children}
      </main>

      <footer className="w-full border-t">
        <div className="max-w-[90rem] mx-auto flex items-center gap-8 px-6 py-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Chama Ai Logo"
              width={802}
              height={222}
              className="h-5 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="flex-1">
            <ul className="flex gap-6 text-sm">
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </nav>

          <div className="shrink-0 text-sm text-muted-foreground">
            © 2025 Chama Ai
          </div>
        </div>
      </footer>
    </>
  );
}
