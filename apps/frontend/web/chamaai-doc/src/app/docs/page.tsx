'use client';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/docs-sidebar';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/typography/TypographyH1';
import { useEffect } from 'react';

export default function DocsPage() {
  useEffect(() => {
    document.title = 'Docs | Chama Aí';
  }, []);

  return (
    <SidebarProvider>
      <div className="flex gap-4 w-full">
        <Sidebar
          collapsible="none"
          className="hidden md:block w-[16rem] shrink-0 bg-transparent border-r border-sidebar-border"
        >
          <DocsSidebar />
        </Sidebar>

        <section className="flex-1 p-4 md:p-6">
          <div className="relative overflow-hidden rounded-2xl bg-emerald-800 text-emerald-50 dark:bg-emerald-950">
            {/* Borda interna */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-emerald-400/50 dark:border-emerald-400/40" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-700/70 via-emerald-800 to-emerald-950/90 dark:from-emerald-900/70 dark:via-emerald-950 dark:to-black/60" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-emerald-400/20 via-transparent to-emerald-700/35 dark:from-emerald-700/25 dark:via-transparent dark:to-emerald-900/35" />
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-300/30 blur-[90px] dark:bg-emerald-400/25" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px] dark:bg-emerald-600/15" />
            <div className="pointer-events-none absolute top-10 right-1/3 h-56 w-56 rounded-full bg-emerald-200/25 blur-[100px] dark:bg-emerald-300/20" />
            <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-80px_120px_rgba(0,0,0,0.20),inset_0_80px_120px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_-80px_120px_rgba(0,0,0,0.35),inset_0_80px_120px_rgba(0,0,0,0.25)]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8">
              <div className="max-w-xl">
                <TypographyH1>
                  Chama Aí. On-demand services platform.
                </TypographyH1>
                <p className="mt-2 text-emerald-100/80 max-w-lg leading-relaxed text-sm">
                  An app to connect customers with service providers quickly and
                  reliably.
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="default"
                    className="border-emerald-300/40 bg-emerald-800/20 text-emerald-50 hover:bg-emerald-700/30 hover:text-emerald-50 focus-visible:ring-emerald-400/30"
                  >
                    Visit Chama Aí
                    <ExternalLink className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Visual */}
              <div className="relative w-full md:w-auto flex justify-end">
                <div className="relative h-32 w-44 sm:h-40 sm:w-52 md:h-48 md:w-60 flex items-center justify-center">
                  {/* Logo representativa com gradiente - forma abstrata */}
                  <div
                    className="logo-morph shadow-2xl relative"
                    style={{
                      width: '10rem',
                      height: '10rem',
                      background: `
                        radial-gradient(circle at 25% 25%, #38aff2 0%, transparent 50%),
                        radial-gradient(circle at 75% 25%, #73dd6e 0%, transparent 50%),
                        radial-gradient(circle at 25% 75%, #be5df1 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, #fe6b59 0%, transparent 50%),
                        linear-gradient(135deg, #38aff2 0%, #73dd6e 33%, #fe6b59 66%, #be5df1 100%)
                      `,
                      boxShadow:
                        '0 25px 60px rgba(56, 175, 242, 0.4), 0 15px 40px rgba(190, 93, 241, 0.3)',
                    }}
                  />
                  <style jsx>{`
                    @keyframes morph {
                      0%,
                      100% {
                        border-radius: 40% 40% 40% 40% / 40% 40% 40% 40%;
                        transform: scale(1.25) rotate(0deg);
                        box-shadow: 0 25px 60px rgba(56, 175, 242, 0.4),
                          0 15px 40px rgba(190, 93, 241, 0.3);
                      }
                      16% {
                        border-radius: 40% 40% 40% 40% / 40% 40% 40% 40%;
                        transform: scale(1.3) rotate(4deg);
                        box-shadow: 0 30px 70px rgba(115, 221, 110, 0.4),
                          0 20px 50px rgba(254, 107, 89, 0.3);
                      }
                      32% {
                        border-radius: 40% 60% 58% 42% / 48% 52% 42% 58%;
                        transform: scale(1.29) rotate(1deg);
                        box-shadow: 0 30px 68px rgba(190, 93, 241, 0.4),
                          0 20px 48px rgba(56, 175, 242, 0.3);
                      }
                      48% {
                        border-radius: 52% 48% 40% 60% / 45% 55% 62% 38%;
                        transform: scale(1.22) rotate(-3deg);
                        box-shadow: 0 25px 60px rgba(254, 107, 89, 0.4),
                          0 15px 40px rgba(115, 221, 110, 0.3);
                      }
                      56% {
                        border-radius: 65% 35% 55% 45% / 50% 50% 42% 58%;
                        transform: scale(1.23) rotate(-4deg);
                        box-shadow: 0 27px 62px rgba(254, 107, 89, 0.42),
                          0 17px 42px rgba(115, 221, 110, 0.32);
                      }
                      64% {
                        border-radius: 50% 50% 35% 65% / 58% 42% 55% 45%;
                        transform: scale(1.26) rotate(-1deg);
                        box-shadow: 0 29px 66px rgba(56, 175, 242, 0.42),
                          0 19px 46px rgba(190, 93, 241, 0.32);
                      }
                      80% {
                        border-radius: 42% 58% 52% 48% / 55% 45% 60% 40%;
                        transform: scale(1.27) rotate(2deg);
                        box-shadow: 0 28px 64px rgba(190, 93, 241, 0.42),
                          0 18px 44px rgba(56, 175, 242, 0.32);
                      }
                      96% {
                        border-radius: 42% 58% 52% 48% / 48% 52% 50% 50%;
                        transform: scale(1.26) rotate(0deg);
                        box-shadow: 0 26px 61px rgba(56, 175, 242, 0.41),
                          0 16px 41px rgba(190, 93, 241, 0.31);
                      }
                    }
                    .logo-morph {
                      animation: morph 12s ease-in-out infinite;
                      will-change: border-radius, transform, box-shadow;
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
}
