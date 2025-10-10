'use client';

import { ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TypographyH1 } from '@/components/typography/TypographyH1';
import LiquidShape from '@/app/docs/components/liquid-shape';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface HeroCardProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function HeroCard({
  title,
  description,
  buttonText,
}: HeroCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-emerald-800 text-emerald-50 dark:bg-emerald-950">
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
          <TypographyH1>{title}</TypographyH1>
          <p className="mt-2 text-emerald-100/80 max-w-lg leading-relaxed text-sm">
            {description}
          </p>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-300/40 bg-emerald-800/20 text-emerald-50 hover:bg-emerald-700/30 hover:text-emerald-50 focus-visible:ring-emerald-400/30"
                >
                  {buttonText}
                  <ExternalLink className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Choose Your Platform
                  </DialogTitle>
                  <DialogDescription>
                    Select where you want to access Chama Aí
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                  <a
                    href="https://chamaai.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-6 rounded-lg border hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      <Globe className="size-6 text-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm mb-1">Web App</h3>
                      <p className="text-xs text-muted-foreground">
                        Access via browser
                      </p>
                    </div>
                    <ExternalLink className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <div className="relative group flex flex-col items-center gap-3 p-6 rounded-lg border border-muted-foreground/30 opacity-60 cursor-not-allowed">
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 -right-2 text-xs px-2 py-0.5 bg-emerald-500 text-white"
                    >
                      Soon
                    </Badge>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      <svg
                        className="size-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm mb-1">iOS App</h3>
                      <p className="text-xs text-muted-foreground">App Store</p>
                    </div>
                  </div>

                  <div className="relative group flex flex-col items-center gap-3 p-6 rounded-lg border border-muted-foreground/30 opacity-60 cursor-not-allowed">
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 -right-2 text-xs px-2 py-0.5 bg-emerald-500 text-white"
                    >
                      Soon
                    </Badge>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      <svg
                        className="size-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 0 0-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C2.92 10.91 1 14.25 1 18h22c0-3.75-1.92-7.09-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm mb-1">
                        Android App
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Google Play
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative w-full md:w-auto flex justify-end">
          <LiquidShape />
        </div>
      </div>
    </div>
  );
}
