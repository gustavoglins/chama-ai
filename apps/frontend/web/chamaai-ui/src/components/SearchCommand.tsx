'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  House,
  Briefcase,
  ReceiptText,
  Search,
  CircleHelp,
  Plus,
} from 'lucide-react';

type CommandItem = {
  label: string;
  href?: string;
  action?: () => void;
  icon?: React.ReactNode;
  kbd?: string;
};

export type SearchCommandProps = {
  placeholder?: string;
  sectionLabel?: string;
  items?: CommandItem[];
  buttonAriaLabel?: string;
};

export function SearchCommand({
  placeholder = 'Procure por serviços, pedidos e mais...',
  sectionLabel = 'Atalhos',
  buttonAriaLabel = 'Abrir busca (Ctrl/Cmd + K)',
  items,
}: SearchCommandProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Default items adapted to this app
  const defaultItems = useMemo<CommandItem[]>(
    () => [
      {
        label: 'Criar Serviço',
        icon: <Plus size={16} />,
        href: '/app/services',
      },
      { label: 'Ir para Início', icon: <House size={16} />, href: '/app' },
      {
        label: 'Abrir Serviços',
        icon: <Briefcase size={16} />,
        href: '/app/services',
      },
      {
        label: 'Abrir Pedidos',
        icon: <ReceiptText size={16} />,
        href: '/app/orders',
      },
      { label: 'Abrir Ajuda', icon: <CircleHelp size={16} />, href: '/ajuda' },
    ],
    []
  );

  const data = items?.length ? items : defaultItems;

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((i) => i.label.toLowerCase().includes(q));
  }, [query, data]);

  function handleItemClick(item: CommandItem) {
    if (item.action) item.action();
    if (item.href) router.push(item.href);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={buttonAriaLabel}
          title={buttonAriaLabel}
        >
          <Search size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] p-0 gap-0 top-24 translate-y-0">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col">
          {/* Search input */}
          <div className="flex items-center border-b px-4 py-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              placeholder={placeholder}
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="max-h-[420px] overflow-y-auto">
            <div className="px-2 py-2">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {sectionLabel}
              </div>
              <div className="space-y-1">
                {filtered.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleItemClick(item)}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span className="mr-2 grid place-items-center text-muted-foreground">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.kbd && (
                      <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        {item.kbd}
                      </kbd>
                    )}
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="px-2 py-6 text-sm text-muted-foreground">
                    Nenhum resultado para {query}.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
