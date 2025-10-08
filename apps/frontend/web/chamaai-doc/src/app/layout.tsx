'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Kbd } from '@/components/ui/kbd';
import { Navigation } from '@/components/ui/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { VerticalSeparator } from '@/components/ui/vertical-separator';
import { sfPro } from '@/lib/fonts';
import { GalleryHorizontal, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './globals.css';
import { Separator } from '@/components/ui/separator';
import { TypographySmall } from '@/components/typography/TypographySmall';
import { TypographyMuted } from '@/components/typography/TypographyMuted';
import { TypographyP } from '@/components/typography/TypographyP';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Observar mudanças na classe 'dark' do elemento html
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Verificar estado inicial
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <html
      className={`${sfPro.variable} ${
        isExpanded ? 'max-w-full' : 'max-w-[92rem]'
      } mx-auto${isDark ? ' dark' : ''} mx-auto`}
      lang="pt-BR"
    >
      <head>
        <title>Chama Aí</title>
        <meta name="description" content="Documentação oficial do Chama Aí" />
      </head>
      <body className={`${isExpanded ? 'px-8' : ''} flex flex-col gap-5`}>
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 w-1/3 min-w-0">
              <Image
                src={isDark ? '/logo-white.png' : '/logo-black.png'}
                height={100}
                width={100}
                alt="Chama Aí Logo"
              />
              <Badge variant="outline" size="xs" className="font-medium">
                v1
              </Badge>
            </div>
            <div className="flex items-center justify-center w-1/3 min-w-0 max-w-md">
              <InputGroup
                shortcut={{ display: 'Ctrl+K', key: 'k', ctrl: true }}
              >
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupAddon className="w-20" align="inline-end">
                  <Kbd>Ctrl + K</Kbd>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="flex items-center justify-end w-1/3 min-w-0">
              <Link
                className="flex items-center gap-1.5 h-max"
                href="https://github.com/gustavoglins/chama-ai"
                target="_blank"
              >
                <Button variant="ghost" size="xs" className="font-light">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Button>
              </Link>
              <VerticalSeparator className="mx-2" />
              <Button variant="ghost" size="xs" onClick={toggleExpand}>
                <GalleryHorizontal className="currentColor" />
              </Button>
              <VerticalSeparator className="mx-2" />
              <ThemeToggle />
            </div>
          </div>
          <div className="my-8"></div>
          <div className="flex w-full">
            <nav className="w-full">
              <Navigation
                items={[
                  { id: 'docs', label: 'Documentation', url: '/docs' },
                  { id: 'api', label: 'API Reference', url: '/api-reference' },
                ]}
              />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="flex flex-col justify-center items-center p-2">
          <Separator />
          <TypographyP className="text-sm">
            Copyright © {new Date().getFullYear()} Chama Aí. All rights
            reserved.
          </TypographyP>
        </footer>
      </body>
    </html>
  );
}
