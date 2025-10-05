'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavItem = { id: string; label: React.ReactNode; url?: string };

const DEFAULT_ITEMS: NavItem[] = [
  { id: 'pt', label: 'Português', url: '/pt' },
  { id: 'en', label: 'English', url: '/en' },
  { id: 'api', label: 'API', url: '/api' },
];

export function Navigation({ items }: { items?: NavItem[] }) {
  const list = items ?? DEFAULT_ITEMS;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = React.useState(list[0].id);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });
  const [hover, setHover] = React.useState<{
    left: number;
    width: number;
    opacity?: number;
  } | null>(null);
  const prevHoverLeft = React.useRef<number | null>(null);

  const updateIndicator = React.useCallback((id: string) => {
    const btn = itemRefs.current[id];
    const container = containerRef.current;
    if (!btn || !container) return;
    const b = btn.getBoundingClientRect();
    const c = container.getBoundingClientRect();
    setIndicator({ left: b.left - c.left, width: b.width });
  }, []);

  React.useEffect(() => {
    updateIndicator(activeId);
    function onResize() {
      updateIndicator(activeId);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeId, updateIndicator]);

  // ensure initial measurement after mount
  React.useEffect(() => {
    const t = setTimeout(() => updateIndicator(activeId), 0);
    return () => clearTimeout(t);
  }, [updateIndicator, activeId]);

  function handleMouseEnterForId(id: string) {
    const btn = itemRefs.current[id];
    const container = containerRef.current;
    if (!btn || !container) return;
    const b = btn.getBoundingClientRect();
    const c = container.getBoundingClientRect();
    const targetLeft = b.left - c.left;
    const targetWidth = b.width;

    const startLeft = prevHoverLeft.current ?? indicator.left;
    setHover({ left: startLeft, width: targetWidth, opacity: 1 });
    // double rAF to ensure the element is painted at startLeft before animating
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setHover({ left: targetLeft, width: targetWidth, opacity: 1 })
      )
    );
    prevHoverLeft.current = targetLeft;
  }

  function handleMouseLeave() {
    setHover((cur) =>
      cur ? { left: cur.left, width: cur.width, opacity: 0 } : null
    );
    window.setTimeout(() => {
      prevHoverLeft.current = null;
    }, 220);
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <div className="flex gap-6">
          {list.map((it) => {
            const setRef = (el: HTMLElement | null) => {
              itemRefs.current[it.id] = el;
            };

            const commonProps: React.HTMLAttributes<HTMLElement> = {
              onClick: () => setActiveId(it.id),
              onMouseEnter: () => handleMouseEnterForId(it.id),
              onMouseLeave: handleMouseLeave,
              className: cn(
                'relative z-10 text-sm font-medium px-1 py-1 text-muted-foreground',
                activeId === it.id ? 'text-foreground' : 'text-muted-foreground'
              ),
              // aria-current is an ARIA attribute; keep as boolean for simplicity
              'aria-current': activeId === it.id,
            };

            if (it.url) {
              return (
                <Link
                  href={it.url}
                  key={it.id}
                  ref={(el: HTMLAnchorElement | null) =>
                    setRef(el as HTMLElement | null)
                  }
                  onClick={() => setActiveId(it.id)}
                  onMouseEnter={() => handleMouseEnterForId(it.id)}
                  onMouseLeave={handleMouseLeave}
                  className={commonProps.className as string}
                  aria-current={commonProps['aria-current']}
                >
                  {it.label}
                </Link>
              );
            }

            return (
              <button
                key={it.id}
                ref={(el) => setRef(el)}
                {...(commonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
              >
                {it.label}
              </button>
            );
          })}
        </div>

        {/* TODO: background border - full width */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px w-full shrink-0 bg-border"
        />

        {/* active indicator */}
        <div
          aria-hidden
          className="absolute bottom-0 z-10 h-0.5 bg-emerald-400 transition-all duration-200 ease-in-out"
          style={{ left: indicator.left, width: indicator.width }}
        />

        {/* hover indicator (lighter) - always rendered to allow smooth exit animation */}
        <div
          aria-hidden
          className="absolute bottom-0 z-10 h-0.5 bg-emerald-300 pointer-events-none transition-[left,width,opacity] duration-200 ease-out"
          style={{
            left: hover ? hover.left : indicator.left,
            width: hover ? hover.width : 0,
            opacity: hover ? hover.opacity ?? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
