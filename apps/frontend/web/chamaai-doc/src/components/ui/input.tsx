'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type Shortcut = {
  /** What to render as the shortcut indicator (e.g. 'Enter', '⌘K', '/') */
  display: React.ReactNode;
  /** The key to listen for (e.g. 'Enter', '/', 'k') */
  key: string;
  /** Require ctrl (Windows/Linux) */
  ctrl?: boolean;
  /** Require meta (Command on macOS) */
  meta?: boolean;
  /** Require alt */
  alt?: boolean;
  /** Require shift */
  shift?: boolean;
};

type InputProps = React.ComponentProps<'input'> & {
  /** Optional leading icon to render inside the input (left side) */
  icon?: React.ReactNode;
  /** Optional trailing text to render inside the input (right side) */
  rightText?: React.ReactNode;
  /** Optional keyboard shortcut that focuses the input */
  shortcut?: Shortcut;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, rightText, shortcut, ...props }, forwardedRef) => {
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    // allow parent ref to access the input element
    React.useImperativeHandle(
      forwardedRef,
      () => internalRef.current as HTMLInputElement
    );

    React.useEffect(() => {
      if (!shortcut) return;
      const s = shortcut;

      function onKeyDown(e: KeyboardEvent) {
        // don't trigger when user is focused in an input/textarea or contenteditable
        const active = document.activeElement;
        if (
          active &&
          (active.tagName === 'INPUT' ||
            active.tagName === 'TEXTAREA' ||
            (active as HTMLElement).isContentEditable)
        )
          return;

        const ctrl = !!e.ctrlKey;
        const meta = !!e.metaKey;
        const alt = !!e.altKey;
        const shift = !!e.shiftKey;

        const keyMatches = e.key.toLowerCase() === s.key.toLowerCase();

        const modsOk =
          (s.ctrl ?? false) === ctrl &&
          (s.meta ?? false) === meta &&
          (s.alt ?? false) === alt &&
          (s.shift ?? false) === shift;

        if (keyMatches && modsOk) {
          e.preventDefault();
          internalRef.current?.focus();
        }
      }

      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [shortcut]);

    return (
      <div className="relative w-full">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {icon}
          </div>
        )}

        {rightText && (
          <div
            onClick={() => internalRef.current?.focus()}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground text-sm cursor-pointer"
          >
            {rightText}
          </div>
        )}

        {shortcut && !rightText && (
          <button
            type="button"
            onClick={() => internalRef.current?.focus()}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground text-sm rounded"
            aria-label="Focus search"
          >
            {shortcut.display}
          </button>
        )}

        <input
          ref={internalRef}
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            // add left/right padding when leading icon or trailing text/shortcut is present so text doesn't overlap
            icon ? 'pl-9' : '',
            rightText || shortcut ? 'pr-12' : '',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
