'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export function CategoryIconCarousel({
  images,
  alt = 'Category icon',
  intervalMs = 2000,
  className,
}: {
  images: string[];
  alt?: string;
  intervalMs?: number;
  className?: string;
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused || safeImages.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [intervalMs, paused, safeImages.length]);

  const src = safeImages[index] ?? safeImages[0];

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-16 w-16 flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={src}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -48 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <Image
              src={src}
              alt={alt}
              width={64}
              height={64}
              className="h-14 w-14 object-contain"
              priority={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
