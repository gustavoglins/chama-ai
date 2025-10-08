'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Heading = {
  id: string;
  title: string;
  level: number;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function OnThisPage({
  contentSelector = '#docs-content',
}: {
  contentSelector?: string;
}) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const container = document.querySelector(contentSelector);
    if (!container) {
      setHeadings([]);
      return;
    }

    const headingElements = Array.from(
      container.querySelectorAll('h2, h3, h4')
    ) as HTMLElement[];

    const idCounts = new Map<string, number>();

    const mappedHeadings: Heading[] = headingElements
      .filter((heading) => heading.textContent?.trim())
      .map((heading) => {
        const text = heading.textContent?.trim() ?? '';
        let id = heading.id;
        if (!id) {
          const base = slugify(text);
          const count = idCounts.get(base) ?? 0;
          idCounts.set(base, count + 1);
          id = count === 0 ? base : `${base}-${count}`;
          heading.id = id;
        }

        return {
          id,
          title: text,
          level: Number(heading.tagName.replace('H', '')),
        };
      });

    setHeadings(mappedHeadings);
    setActiveId(mappedHeadings[0]?.id ?? '');

    if (!mappedHeadings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible[0]) {
          setActiveId(visible[0].target.id);
          return;
        }

        const entryIds = entries
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => a.offsetTop - b.offsetTop);

        if (entryIds[0]) {
          setActiveId(entryIds[0].id);
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.1, 1],
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading));
      observer.disconnect();
    };
  }, [contentSelector, pathname]);

  return (
    <nav
      aria-label="On this page"
      className="flex h-full flex-col justify-between py-2 pr-2"
    >
      <div>
        <p className="text-xs font-normal tracking-wide text-muted-foreground">
          On this page
        </p>

        {headings.length ? (
          <ul className="mt-2 space-y-1 text-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    'block rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                    heading.level === 3 && 'ml-3 text-muted-foreground',
                    heading.level >= 4 && 'ml-6 text-muted-foreground',
                    activeId === heading.id &&
                      'bg-primary/10 font-medium text-foreground'
                  )}
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Sem seções nesta página.
          </p>
        )}
      </div>
    </nav>
  );
}
