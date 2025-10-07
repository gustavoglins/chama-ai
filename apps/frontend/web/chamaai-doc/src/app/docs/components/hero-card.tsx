'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/typography/TypographyH1';
import LiquidShape from '@/app/docs/components/liquid-shape';

interface HeroCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function HeroCard({
  title,
  description,
  buttonText,
  buttonHref,
  onButtonClick,
}: HeroCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-emerald-800 text-emerald-50 dark:bg-emerald-950">
      {/* Borda interna */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-emerald-400/50 dark:border-emerald-400/40" />

      {/* Gradientes de fundo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-700/70 via-emerald-800 to-emerald-950/90 dark:from-emerald-900/70 dark:via-emerald-950 dark:to-black/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-emerald-400/20 via-transparent to-emerald-700/35 dark:from-emerald-700/25 dark:via-transparent dark:to-emerald-900/35" />

      {/* Efeitos de luz blur */}
      <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-300/30 blur-[90px] dark:bg-emerald-400/25" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px] dark:bg-emerald-600/15" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-56 w-56 rounded-full bg-emerald-200/25 blur-[100px] dark:bg-emerald-300/20" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />

      {/* Sombra interna */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-80px_120px_rgba(0,0,0,0.20),inset_0_80px_120px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_-80px_120px_rgba(0,0,0,0.35),inset_0_80px_120px_rgba(0,0,0,0.25)]" />

      {/* Conteúdo */}
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8">
        <div className="max-w-xl">
          <TypographyH1>{title}</TypographyH1>
          <p className="mt-2 text-emerald-100/80 max-w-lg leading-relaxed text-sm">
            {description}
          </p>
          <div className="mt-4">
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-300/40 bg-emerald-800/20 text-emerald-50 hover:bg-emerald-700/30 hover:text-emerald-50 focus-visible:ring-emerald-400/30"
              onClick={onButtonClick}
              asChild={!!buttonHref}
            >
              {buttonHref ? (
                <a href={buttonHref} target="_blank" rel="noopener noreferrer">
                  {buttonText}
                  <ExternalLink className="size-4" />
                </a>
              ) : (
                <>
                  {buttonText}
                  <ExternalLink className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Visual */}
        <div className="relative w-full md:w-auto flex justify-end">
          <LiquidShape />
        </div>
      </div>
    </div>
  );
}
