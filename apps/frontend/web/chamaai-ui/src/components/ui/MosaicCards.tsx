import React from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';

type MosaicCardsProps = {
  // cada item pode ser uma string (url ou 'solid:...' como antes) ou um objeto com opções
  imageSrcs: (
    | string
    | {
        image?: string;
        solid?: string;
        title?: string;
        subtitle?: string;
        badges?: string[];
        actionIcon?: React.ReactNode;
      }
  )[];
};

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-white/90 text-xs text-slate-700 px-3 py-1 rounded-full shadow-sm">
    {children}
  </span>
);

type CardInput =
  | string
  | {
      image?: string;
      solid?: string;
      title?: string;
      subtitle?: string;
      badges?: string[];
      actionIcon?: React.ReactNode | string;
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

  // normalize
  let imageSrc: string | undefined;
  let solidValue: string | undefined;
  let title: string | undefined;
  let subtitle: string | undefined;
  let badges: string[] | undefined;
  let actionIcon: React.ReactNode | string | undefined;

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
    }
  }

  // explicit props override
  if (propTitle) title = propTitle;
  if (propSubtitle) subtitle = propSubtitle;
  if (propBadges) badges = propBadges;
  if (propActionIcon)
    actionIcon = propActionIcon as React.ReactNode | string | undefined;

  const isSolid = !!solidValue;
  const colorValue = isSolid ? solidValue : null;

  // helper to map tailwind color name to a bg- class. We'll accept plain names like 'emerald' -> 'bg-emerald-500'
  const tailwindBgClass = (name: string) => {
    if (!name) return '';
    // hexs are handled elsewhere
    if (name.startsWith('#')) return '';
    // Accept names with optional shade: emerald or emerald-600
    const clean = name.replace(/[^a-zA-Z0-9-]/g, '');
    // if already contains a dash with a numeric shade (e.g. emerald-600), use as-is
    if (/-[0-9]{3}$/.test(clean)) return `bg-${clean}`;
    // otherwise default to 500
    return `bg-${clean}-500`;
  };

  return (
    // min-h-0 aqui é crítico para que a altura possa encolher dentro do grid/flex pai
    <div
      className={`relative rounded-2xl overflow-hidden shadow-md min-h-0 ${className}`}
    >
      {/* Se for um solid: renderizamos um fundo sólido ao invés de next/image */}
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

          {/* overlay/gradiente (vinheta) — render only for images, not for solid backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/10" />
        </>
      )}

      <div className="absolute top-4 left-4 flex gap-2">
        {/* renderizar badges apenas se fornecidos, caso contrário manter comportamento legado (nenhum badge)
            para compatibilidade com strings simples. */}
        {badges && badges.length > 0
          ? badges.map((b, i) => <Badge key={i}>{b}</Badge>)
          : null}
      </div>

      {/* action icon: render only if provided in object. For backwards compatibility, if source was a string
              we keep the previous default action icon. */}
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

      {title && (
        <div className="absolute left-6 bottom-6 text-white">
          <h3 className="text-xl lg:text-3xl font-bold leading-tight drop-shadow">
            {title}
          </h3>
          {subtitle && <p className="mt-1 text-sm text-white/90">{subtitle}</p>}
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
        <div className="h-full min-h-0 grid grid-rows-[70%_30%] gap-4">
          <div className="min-h-0">
            <ImageCard source={imgs[5]} className="h-full min-h-0" />
          </div>
          <div className="min-h-0 grid grid-cols-2 gap-4">
            <div className="min-h-0">
              <ImageCard source={imgs[3]} className="h-full min-h-0" />
            </div>
            <div className="min-h-0">
              <ImageCard source={imgs[4]} className="h-full min-h-0" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-3 h-full min-h-0">
        <div className="h-full min-h-0 grid grid-cols-2 gap-4">
          <div className="min-h-0 grid grid-rows-[30%_70%] gap-4">
            <div className="min-h-0">
              <ImageCard source={imgs[0]} className="h-full min-h-0" />
            </div>
            <div className="min-h-0">
              <ImageCard source={imgs[1]} className="h-full min-h-0" />
            </div>
          </div>

          <div className="min-h-0">
            <ImageCard source={imgs[2]} className="h-full min-h-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MosaicCards;
