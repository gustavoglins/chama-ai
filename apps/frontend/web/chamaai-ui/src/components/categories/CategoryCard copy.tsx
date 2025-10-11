import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { CategoryIconCarousel } from './CategoryIconCarousel';

export type CategoryCardProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  iconImages?: string[]; // caminho das imagens 3D em public
  href?: string;
  className?: string;
};

export function CategoryCard({
  title,
  subtitle,
  icon,
  iconImages,
  href,
  // color removido
  className,
}: CategoryCardProps) {
  const content = (
    <div
      className={cn(
        // Estilo alinhado ao Input: mesma borda, radius, shadow e transições
        'group relative flex items-center gap-3 rounded-md border border-input bg-transparent dark:bg-input/30 p-4 shadow-xs',
        'transition-[border-color,box-shadow,background-color] duration-200',
        // Hover sutil sem deslocar layout
        'hover:border-ring/50',
        className
      )}
    >
      <div className="flex items-center justify-center mr-3">
        {iconImages && iconImages.length > 0 ? (
          <CategoryIconCarousel images={iconImages} />
        ) : (
          <div className="[&>*]:h-10 [&>*]:w-10">{icon}</div>
        )}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{title}</div>
        {subtitle ? (
          <div className="truncate text-xs text-muted-foreground">
            {subtitle}
          </div>
        ) : null}
      </div>
      {href ? (
        <span className="pointer-events-none absolute inset-0 rounded-md focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]" />
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline-none">
        {content}
      </Link>
    );
  }
  return content;
}
