// Referência para Tailwind Purge: NÃO REMOVER
// bg-emerald bg-emerald-500 bg-white bg-slate-700 bg-slate-800 bg-black bg-transparent
import * as LucideIcons from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type MosaicCardsProps = {
  imageSrcs: CardInput[];
};

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-white/90 text-xs text-slate-700 px-3 py-1 rounded-full shadow-sm">
    {children}
  </span>
);

export type CardInput =
  | string
  | {
      image?: string;
      solid?: string;
      title?: string;
      subtitle?: string;
      badges?: string[];
      actionIcon?: React.ReactNode | string;
      cta?: { label: string; href?: string };
    };

const ImageCard: React.FC<{
  source?: CardInput;
  src?: CardInput;
  title?: string;
  subtitle?: string;
  badges?: string[];
  actionIcon?: React.ReactNode | string;
  className?: string;
}> = ({
  source,
  src,
  title: propTitle,
  subtitle: propSubtitle,
  badges: propBadges,
  actionIcon: propActionIcon,
  className = '',
}) => {
  const resolvedInput = (source ?? src) as CardInput | undefined;

  let imageSrc: string | undefined;
  let solidValue: string | undefined;
  let title: string | undefined;
  let subtitle: string | undefined;
  let badges: string[] | undefined;
  let actionIcon: React.ReactNode | string | undefined;
  let cta: { label: string; href?: string } | undefined;

  if (resolvedInput) {
    if (typeof resolvedInput === 'string') {
      const s = resolvedInput;
      if (s.startsWith('solid:')) {
        solidValue = s.replace(/^solid:/, '');
      } else {
        imageSrc = s;
      }
    } else {
      const obj = resolvedInput as Exclude<CardInput, string>;
      imageSrc = obj.image;
      solidValue = obj.solid;
      title = obj.title;
      subtitle = obj.subtitle;
      badges = obj.badges;
      actionIcon = obj.actionIcon as React.ReactNode | string | undefined;
      cta = obj.cta;
    }
  }

  if (propTitle) title = propTitle;
  if (propSubtitle) subtitle = propSubtitle;
  if (propBadges) badges = propBadges;
  if (propActionIcon)
    actionIcon = propActionIcon as React.ReactNode | string | undefined;

  const isSolid = !!solidValue;
  const colorValue = isSolid ? solidValue : null;

  const tailwindBgClass = (name: string) => {
    if (!name) return '';
    if (name.startsWith('#')) return '';
    const clean = name.replace(/[^a-zA-Z0-9-]/g, '');
    // Se for cor Tailwind padrão sem sufixo, usa -500
    if (['emerald', 'white', 'black', 'slate', 'transparent'].includes(clean)) {
      return `bg-${clean}-500`;
    }
    // Se já tem sufixo tipo -500, retorna direto
    if (/-[0-9]{3}$/.test(clean)) return `bg-${clean}`;
    return `bg-${clean}-500`;
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-md min-h-0 ${className}`}
    >
      {isSolid ? (
        <div
          className={`absolute inset-0 ${
            colorValue && !colorValue.startsWith('#')
              ? tailwindBgClass(colorValue)
              : ''
          }`}
          style={
            colorValue && colorValue.startsWith('#')
              ? { backgroundColor: colorValue }
              : undefined
          }
        />
      ) : (
        <>
          <div className="absolute inset-0">
            <Image
              src={imageSrc ?? ''}
              alt={title ?? ''}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/10" />
        </>
      )}

      <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-[70%]">
        {badges && badges.length > 0
          ? badges.map((b, i) => <Badge key={i}>{b}</Badge>)
          : null}
      </div>

      {typeof resolvedInput === 'string' ? (
        <div className="absolute right-4 top-4">
          <div className="w-10 h-10 bg-white/95 text-slate-800 rounded-full flex items-center justify-center shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      ) : actionIcon ? (
        <div className="absolute right-4 top-4">
          {typeof actionIcon === 'string' ? (
            (() => {
              const icons = LucideIcons as unknown as Record<
                string,
                React.ComponentType<Record<string, unknown>>
              >;
              const IconComp = icons[actionIcon as string];
              return IconComp ? (
                <div className="w-10 h-10 bg-white/95 text-slate-800 rounded-full flex items-center justify-center shadow">
                  {React.createElement(IconComp, { size: 18 } as Record<
                    string,
                    unknown
                  >)}
                </div>
              ) : (
                <div className="w-10 h-10 bg-white/95 text-slate-800 rounded-full flex items-center justify-center shadow">
                  {actionIcon}
                </div>
              );
            })()
          ) : (
            <div className="w-10 h-10 bg-white/95 text-slate-800 rounded-full flex items-center justify-center shadow">
              {actionIcon}
            </div>
          )}
        </div>
      ) : null}

      {(title || subtitle || cta) && (
        <div className="absolute left-6 bottom-6 text-white flex flex-col items-start gap-3">
          {title && (
            <h3 className="text-xl lg:text-3xl font-bold leading-tight drop-shadow">
              {title}
            </h3>
          )}
          {subtitle && <p className="mt-0 text-sm text-white/90">{subtitle}</p>}

          {cta &&
            (cta.href ? (
              <a
                href={cta.href}
                className="inline-flex items-center rounded-md bg-white/95 text-slate-800 px-4 py-2 text-sm font-medium shadow"
              >
                {cta.label}
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white/95 text-slate-800 px-4 py-2 text-sm font-medium shadow"
              >
                {cta.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export const MosaicCards: React.FC<MosaicCardsProps> = ({ imageSrcs }) => {
  const imgs = Array.from({ length: 6 }).map(
    (_, i) => imageSrcs[i] ?? imageSrcs[0] ?? ''
  );

  return (
    <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-6 gap-6">
      {/* LEFT */}
      <div className="lg:col-span-3 h-full min-h-0">
        <div className="h-full min-h-0 grid grid-rows-[70%_30%] gap-6">
          <div className="h-full min-h-0 flex flex-col">
            <ImageCard source={imgs[5]} className="h-full min-h-0" />
          </div>
          <div className="min-h-0 grid grid-cols-2 gap-6">
            <div className="min-h-0 h-full">
              <ImageCard source={imgs[3]} className="h-full min-h-0" />
            </div>
            <div className="min-h-0 h-full">
              <ImageCard source={imgs[4]} className="h-full min-h-0" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-3 h-full min-h-0">
        <div className="h-full min-h-0 grid grid-cols-2 gap-6">
          <div className="min-h-0 grid grid-rows-[30%_70%] gap-6 h-full">
            <div className="min-h-0 h-full">
              <ImageCard source={imgs[0]} className="h-full min-h-0" />
            </div>
            <div className="min-h-0 h-full">
              <ImageCard source={imgs[1]} className="h-full min-h-0" />
            </div>
          </div>

          <div className="min-h-0 h-full">
            <ImageCard source={imgs[2]} className="h-full min-h-136" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MosaicCards;
