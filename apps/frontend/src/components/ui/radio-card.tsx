'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface SimpleRadioCardOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  badge?: string;
}

export interface RadioCardGroupProps<T extends string = string> {
  options: SimpleRadioCardOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  className?: string;
  name?: string;
  disabled?: boolean;
}

// Container representing the whole card group (single bordered box with stacked rows)
export function RadioCardGroup<T extends string = string>({
  options,
  value,
  onChange,
  className,
  name,
  disabled,
}: RadioCardGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-disabled={disabled || undefined}
      className={cn(
        'rounded-md border bg-background overflow-hidden text-sm',
        disabled && 'opacity-60 pointer-events-none',
        className
      )}
    >
      {options.map((opt, i) => (
        <RadioRow<T>
          key={opt.value}
          showDivider={i !== 0}
          option={opt}
          checked={opt.value === value}
          onSelect={onChange}
          name={name}
        />
      ))}
    </div>
  );
}

interface RadioRowProps<T extends string> {
  option: SimpleRadioCardOption<T>;
  checked: boolean;
  onSelect: (value: T) => void;
  name?: string;
  showDivider: boolean;
}

function RadioRow<T extends string>({
  option,
  checked,
  onSelect,
  name,
  showDivider,
}: RadioRowProps<T>) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={option.label}
      name={name}
      onClick={() => onSelect(option.value)}
      className={cn(
        'flex w-full items-center gap-2 px-4 py-3 outline-none text-left transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:z-10',
        'hover:bg-accent/50 cursor-pointer',
        // checked && 'bg-accent/20',
        showDivider && 'border-t border-border'
      )}
      data-state={checked ? 'checked' : 'unchecked'}
    >
      {/* Bullet */}
      <span
        aria-hidden
        className={cn(
          'grid place-items-center rounded-full border mt-0.5 h-4 w-4 shrink-0',
          checked ? 'border-blue-600 bg-blue-600' : 'border-muted-foreground'
        )}
      >
        {checked && (
          <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
        )}
      </span>
      {/* Text & badge */}
      <span className="flex flex-1 items-center justify-between gap-2">
        <span className="font-light leading-none">{option.label}</span>
        {option.badge && (
          <span
            className={cn(
              'rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
              option.badge.toLowerCase() === 'profissional'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'text-muted-foreground'
            )}
          >
            {option.badge}
          </span>
        )}
      </span>
    </button>
  );
}

// Single item variant if someone wants just one (not used in screenshot but handy)
export interface RadioCardProps<T extends string = string>
  extends Omit<SimpleRadioCardOption<T>, 'badge'> {
  badge?: string;
  checked: boolean;
  onSelect: (value: T) => void;
  className?: string;
}

export function RadioCard<T extends string = string>({
  value,
  label,
  badge,
  checked,
  onSelect,
  className,
}: RadioCardProps<T>) {
  return (
    <RadioCardGroup
      options={[{ value, label, badge }]}
      value={checked ? value : null}
      onChange={onSelect}
      className={className}
    />
  );
}

export default RadioCardGroup;
