'use client';

import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './badge';

interface RequestCardProps {
  method: string;
  endpoint: string;
}

const METHOD_STYLES: Record<
  string,
  {
    light: string;
    dark: string;
  }
> = {
  GET: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
  POST: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
  PUT: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
  PATCH: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
  DELETE: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
  HEAD: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
  OPTIONS: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
  DEFAULT: {
    light: 'bg-[#ebeef2] text-foreground/80',
    dark: 'dark:bg-[#16181a] dark:text-white/80',
  },
};

export default function RequestCard({ method, endpoint }: RequestCardProps) {
  const displayMethod = method.trim().toUpperCase();
  const methodStyle = METHOD_STYLES[displayMethod] ?? METHOD_STYLES.DEFAULT;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(endpoint);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy endpoint', error);
    }
  };

  return (
    <div
      className={cn(
        'flex w-full items-center gap-5 rounded-lg border px-2 py-1.5 text-sm',
        'bg-[#f5f7fa] border-border/50 text-foreground',
        'dark:bg-[#1c1e1f] dark:border-border/40 dark:text-foreground'
      )}
    >
      <Badge
        variant="outline"
        className={cn('font-medium', methodStyle.light, methodStyle.dark)}
      >
        {displayMethod}
      </Badge>
      <p className="flex-1 font-mono text-[14px] text-foreground/80 dark:text-white/80">
        {endpoint}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'hover:border-border/70 hover:text-foreground hover:bg-black/5',
          'dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
        )}
        aria-label={copied ? 'Endpoint copiado' : 'Copiar endpoint'}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
