import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { TypographyH1 } from '@/components/typography/TypographyH1';

export default function DocOverviewPage() {
  return (
    <section className="relative">
      {/* Emerald hero card (adaptive light/dark) */}
      <div className="relative overflow-hidden rounded-4xl ring-2 ring-inset bg-emerald-800 text-emerald-50 ring-emerald-900/20 dark:bg-emerald-950 dark:ring-emerald-300/30">
        {/* non-patterned gradient stack (light + dark variants) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-700/70 via-emerald-800 to-emerald-950/90 dark:from-emerald-900/70 dark:via-emerald-950 dark:to-black/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-emerald-400/20 via-transparent to-emerald-700/35 dark:from-emerald-700/25 dark:via-transparent dark:to-emerald-900/35" />
        {/* soft emerald glows (different weights per theme) */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-300/30 blur-[90px] dark:bg-emerald-400/25" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px] dark:bg-emerald-600/15" />
        <div className="pointer-events-none absolute top-10 right-1/3 h-56 w-56 rounded-full bg-emerald-200/25 blur-[100px] dark:bg-emerald-300/20" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />
        {/* subtle vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-80px_120px_rgba(0,0,0,0.20),inset_0_80px_120px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_-80px_120px_rgba(0,0,0,0.35),inset_0_80px_120px_rgba(0,0,0,0.25)]" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10 p-8 md:p-12">
          {/* Copy */}
          <div className="max-w-2xl">
            {/* <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
              Chama Aí | On-demand services platform.
            </h1> */}
            <TypographyH1>Chama Aí | On-demand services platform.</TypographyH1>
            <p className="mt-3 text-emerald-100/80 max-w-xl leading-relaxed">
              An app to connect customers with service providers quickly and
              reliably.
            </p>
            <div className="mt-6">
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-300/40 bg-emerald-800/20 text-emerald-50 hover:bg-emerald-700/30 hover:text-emerald-50 focus-visible:ring-emerald-400/30"
              >
                Visit Chama Aí
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative w-full md:w-auto flex justify-end">
            <div className="relative h-40 w-56 sm:h-56 sm:w-72 md:h-64 md:w-80">
              <Image
                src="/icon.png"
                alt="Code preview"
                fill
                className="object-contain drop-shadow-[0_25px_60px_rgba(16,185,129,0.55)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
