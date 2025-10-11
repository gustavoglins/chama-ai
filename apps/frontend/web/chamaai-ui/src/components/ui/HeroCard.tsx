import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type HeroCardSize = 'small' | 'medium' | 'large';

type HeroCardProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  href?: string;
  tags?: string[];
  size?: HeroCardSize;
};

const sizeToClasses: Record<HeroCardSize, string> = {
  small: 'h-28',
  medium: 'h-36 sm:h-44',
  large: 'h-64 sm:h-80 md:h-96',
};

export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  subtitle,
  imageSrc,
  href = '#',
  tags = [],
  size = 'large',
}) => {
  const classes = sizeToClasses[size];

  return (
    <Link
      href={href}
      className="block relative rounded-2xl overflow-hidden group"
    >
      <div className={`relative w-full ${classes} bg-gray-100`}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />

        {/* tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="bg-white/90 text-xs text-slate-700 px-3 py-1 rounded-full shadow-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* content */}
        <div className="absolute left-6 bottom-6 text-white">
          <h3 className="text-2xl md:text-3xl font-semibold leading-tight drop-shadow">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-sm md:text-base text-white/90">
              {subtitle}
            </p>
          )}
        </div>

        {/* circular action button */}
        <div className="absolute right-4 top-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/95 text-slate-800 rounded-full flex items-center justify-center shadow-lg">
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
              className="feather feather-arrow-right"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroCard;
