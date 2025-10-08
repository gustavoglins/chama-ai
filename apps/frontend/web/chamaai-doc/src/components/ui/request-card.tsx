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
        'flex items-center gap-4 rounded-lg border border-border px-4 py-2.5 text-sm w-full overflow-hidden'
      )}
    >
      <Badge
        variant="outline"
        className={cn(
          'font-medium shrink-0 min-w-[60px] justify-center',
          methodStyle.light,
          methodStyle.dark
        )}
      >
        {displayMethod}
      </Badge>
      <p className="flex-1 font-mono text-sm text-foreground/80 dark:text-white/80 truncate">
        {endpoint}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'p-1.5 rounded-md transition-colors shrink-0',
          'text-foreground/60 hover:text-foreground hover:bg-black/5',
          'dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
        )}
        aria-label={copied ? 'Endpoint copiado' : 'Copiar endpoint'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
