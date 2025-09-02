'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="w-full p-6">
        <div className="mx-auto flex items-center justify-between px-4">
          <Link href={'/app'} className="shrink-0">
            <Image
              src="/icon.png"
              alt="Chama Ai Icon"
              width={1000}
              height={1000}
              className="h-6 w-auto object-contain"
              priority
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {/* DESCOBRIR */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Descobrir</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-4 p-6 md:w-[520px] lg:w-[620px] lg:grid-cols-[.9fr_1.1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/explore"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/60 to-primary p-6 no-underline outline-none focus:shadow-md text-primary-foreground"
                        >
                          <div className="mb-4 text-sm font-medium uppercase tracking-wide/ font-medium/90">
                            Plataforma
                          </div>
                          <h3 className="text-lg font-semibold">Chama Ai</h3>
                          <p className="mt-2 text-sm leading-snug opacity-90">
                            Encontre serviços confiáveis em minutos. Compare,
                            contrate e acompanhe tudo num só lugar.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/explore"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent focus:outline-none"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Explorar serviços
                        </p>
                        <span className="line-clamp-2 text-xs text-muted-foreground">
                          Busque por área, necessidade ou palavra‑chave.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/categorias"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent focus:outline-none"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Categorias populares
                        </p>
                        <span className="line-clamp-2 text-xs text-muted-foreground">
                          Veja o que mais está sendo contratado.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/perto-de-mim"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent focus:outline-none"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Perto de você (em breve)
                        </p>
                        <span className="line-clamp-2 text-xs text-muted-foreground">
                          Serviços com disponibilidade imediata na sua região.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/projetos"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent focus:outline-none"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Projetos em destaque
                        </p>
                        <span className="line-clamp-2 text-xs text-muted-foreground">
                          Inspiração e casos resolvidos com excelência.
                        </span>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* PROFISSIONAIS */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Profissionais</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-4 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[.9fr_1.1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/profissional/inscricao"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-emerald-500/60 to-emerald-600 p-6 no-underline outline-none focus:shadow-md text-white"
                        >
                          <div className="mb-4 text-sm font-medium uppercase tracking-wide opacity-90">
                            Cresça com a gente
                          </div>
                          <h3 className="text-lg font-semibold">
                            Vire Prestador
                          </h3>
                          <p className="mt-2 text-sm leading-snug opacity-90">
                            Aumente sua renda recebendo pedidos qualificados e
                            gerindo tudo em um painel simples.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/profissional/dicas"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Guia de sucesso
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Boas práticas para conseguir mais clientes.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/profissional/planos"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Planos & benefícios
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Mais visibilidade e vantagens exclusivas.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/profissional/qualidade"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Qualidade & verificação
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Ganhe selos e destaque seu perfil.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/profissional/suporte"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Central do prestador
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Tire dúvidas e receba suporte.
                        </span>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* RECURSOS */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-4 p-6 md:w-[480px] lg:w-[560px] lg:grid-cols-[.9fr_1.1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/seguranca"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-sky-500/60 to-sky-600 p-6 no-underline outline-none focus:shadow-md text-white"
                        >
                          <div className="mb-4 text-sm font-medium uppercase tracking-wide opacity-90">
                            Confiança
                          </div>
                          <h3 className="text-lg font-semibold">
                            Segurança & Proteção
                          </h3>
                          <p className="mt-2 text-sm leading-snug opacity-90">
                            Avaliações, perfis verificados e pagamentos
                            garantidos.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/pagamentos"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Pagamentos protegidos
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Transações seguras e rastreáveis.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/avaliacoes"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Sistema de avaliações
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Transparência para escolher melhor.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/app/mobile"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          App mobile
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Gerencie pedidos em qualquer lugar.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/roadmap"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Roadmap público
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Acompanhe o que vem por aí.
                        </span>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* EMPRESA */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Empresa</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-4 p-6 md:w-[460px] lg:w-[540px] lg:grid-cols-[.9fr_1.1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/sobre"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 no-underline outline-none focus:shadow-md text-white"
                        >
                          <div className="mb-4 text-sm font-medium uppercase tracking-wide opacity-80">
                            Nossa missão
                          </div>
                          <h3 className="text-lg font-semibold">
                            Transformar contratações
                          </h3>
                          <p className="mt-2 text-sm leading-snug opacity-90">
                            Criamos pontes entre necessidades urgentes e
                            talentos qualificados.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/sobre"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Sobre nós
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Quem somos e nossos valores.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/blog"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Blog
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Insights, novidades e dicas.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/carreiras"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Carreiras
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Venha construir o futuro com a gente.
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/contato"
                        className="block rounded-sm p-3 hover:bg-accent focus:bg-accent"
                      >
                        <p className="mb-1 text-sm font-medium leading-none">
                          Contato
                        </p>
                        <span className="text-xs text-muted-foreground">
                          Fale com nosso time.
                        </span>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuIndicator />
            <NavigationMenuViewport />
          </NavigationMenu>

          <nav>
            <ul className="flex space-x-4">
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User Profile Photo"
                      />
                      <AvatarFallback>GL</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60">
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-3 p-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>GL</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5 leading-none">
                          <p className="text-sm font-medium">Gustavo G Lins</p>
                          <p className="text-xs text-muted-foreground">
                            gustavoglins05@gmail.com
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/app/profile">Ver Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/app/settings">Configurações</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* TODO */}
                    <DropdownMenuItem>Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-[75rem] flex-1 items-center px-4">
        {children}
      </main>

      <footer className="mx-auto mt-auto w-full max-w-[75rem] py-2 text-center">
        <Separator className="mb-5" />
        <div className="mb-3 flex flex-row justify-between text-sm">
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
        <p className="text-sm">
          Copyright © 2025 Chama Ai. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
