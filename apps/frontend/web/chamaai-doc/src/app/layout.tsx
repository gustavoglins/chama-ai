import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Kbd } from '@/components/ui/kbd';
import { Navigation } from '@/components/ui/navigation';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { VerticalSeparator } from '@/components/ui/vertical-separator';
import { sfPro } from '@/lib/fonts';
import { Github, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${sfPro.variable} max-w-[85rem] mx-auto`}>
      <body>
        <header className="py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5 w-1/3 min-w-0">
              <Image
                src="/logo.png"
                height={100}
                width={100}
                alt="Chama Aí Logo"
              />
              <Badge variant="outline" className="rounded-full">
                v1.0.0
              </Badge>
            </div>
            <div className="flex items-center justify-center w-1/3 min-w-0">
              <Input
                placeholder="Search"
                icon={<Search className="h-4 w-4 text-muted-foreground" />}
                rightText={
                  <div className="flex items-center gap-1">
                    <Kbd>Ctrl</Kbd>
                    <Kbd>K</Kbd>
                  </div>
                }
                shortcut={{ display: 'Ctrl+K', key: 'k', ctrl: true }}
              />
            </div>
            <div className="flex items-center justify-end w-1/3 min-w-0">
              <Button asChild variant="ghost" size="xs">
                <Link
                  className="flex items-center gap-1.5 h-max"
                  href="https://github.com/gustavoglins/chama-ai"
                  target="_blank"
                >
                  <div className="p-1.25 rounded-full bg-foreground">
                    <Github className="text-background" />
                  </div>
                </Link>
              </Button>
              <VerticalSeparator />
              <Button variant="ghost" size="xs">
                <ThemeToggle />
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex w-full">
            <nav className="w-full">
              {/* Example usage: pass items prop with id, label and optional url */}
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
      </body>
    </html>
  );
}
