'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

export type AnimatedSearchProps = {
  placeholder?: string;
  width?: number; // expanded width in px
  collapseWidth?: number; // collapsed width in px
  onSubmit?: (q: string) => void;
  autoFocusWhenOpen?: boolean;
};

export function AnimatedSearch({
  placeholder = 'Buscar...',
  width = 360,
  collapseWidth = 40,
  onSubmit,
  autoFocusWhenOpen = true,
}: AnimatedSearchProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && autoFocusWhenOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 90);
      return () => clearTimeout(t);
    }
  }, [open, autoFocusWhenOpen]);

  // Clique no botão da esquerda: se fechado, abre; se aberto, só foca o input.
  function handleLeftClick() {
    if (open) {
      inputRef.current?.focus();
    } else {
      setOpen(true);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(q.trim());
  }

  // Fechar clicando fora
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <motion.form
        onSubmit={handleSubmit}
        className="flex items-center"
        initial={false}
      >
        <motion.div
          animate={{ width: open ? width : collapseWidth }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 36,
            mass: 0.6,
          }}
          className="relative"
        >
          {/* Icon button area */}
          <Button
            type={'button'}
            onClick={handleLeftClick}
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9"
            aria-label={open ? 'Focar busca' : 'Abrir busca'}
            title={open ? 'Focar busca' : 'Abrir busca'}
          >
            <Search size={18} />
          </Button>

          {/* Animated input that slides from right to left */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="input"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 24, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center"
              >
                <Input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={placeholder}
                  // usar o mesmo estilo do Input, apenas abrindo espaço para os ícones
                  className="pl-9 pr-9"
                />

                {/* Botão fechar do lado direito, dentro do campo */}
                <Button
                  type="button"
                  onClick={() => (setOpen(false), setQ(''))}
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9"
                  aria-label="Fechar"
                  title="Fechar"
                >
                  <X size={16} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.form>
    </div>
  );
}
