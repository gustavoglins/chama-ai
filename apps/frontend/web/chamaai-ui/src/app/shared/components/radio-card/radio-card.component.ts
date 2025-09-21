import type { ClassValue } from 'clsx';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { mergeClasses } from '@shared/utils/merge-classes';
import {
  radioCardGroupVariants,
  radioRowVariants,
  radioBulletVariants,
  badgeVariants,
} from './radio-card.variants';

export interface SimpleRadioCardOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  badge?: string;
}

@Component({
  selector: 'z-radio-card-group',
  exportAs: 'zRadioCardGroup',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      role="radiogroup"
      [attr.aria-disabled]="disabled() || undefined"
      [class]="groupClasses()"
    >
      @for (option of options(); track option.value; let i = $index) {
      <button
        type="button"
        role="radio"
        [attr.aria-checked]="option.value === value()"
        [attr.aria-label]="option.label"
        [attr.name]="name()"
        (click)="onSelect(option.value)"
        [class]="getRowClasses(i > 0, option.value === value())"
        [attr.data-state]="option.value === value() ? 'checked' : 'unchecked'"
      >
        <!-- Radio Bullet -->
        <span
          aria-hidden="true"
          [class]="getBulletClasses(option.value === value())"
        >
          @if (option.value === value()) {
          <svg
            class="h-3 w-3 text-primary-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
          }
        </span>

        <!-- Text & Badge -->
        <span class="flex flex-1 items-center justify-between gap-2">
          <span class="font-light leading-none">{{ option.label }}</span>
          @if (option.badge) {
          <span [class]="getBadgeClasses(option.badge)">
            {{ option.badge }}
          </span>
          }
        </span>
      </button>
      }
    </div>
  `,
})
export class ZardRadioCardGroupComponent<T extends string = string> {
  readonly options = input.required<SimpleRadioCardOption<T>[]>();
  readonly value = input<T | null>(null);
  readonly name = input<string>();
  readonly disabled = input<boolean>(false);
  readonly class = input<ClassValue>('');

  readonly valueChange = output<T>();

  protected readonly groupClasses = computed(() =>
    mergeClasses(
      radioCardGroupVariants(),
      this.disabled() && 'opacity-60 pointer-events-none',
      this.class()
    )
  );

  protected getRowClasses(showDivider: boolean, checked: boolean): string {
    return mergeClasses(
      radioRowVariants({
        showDivider,
        checked,
        disabled: this.disabled(),
      })
    );
  }

  protected getBulletClasses(checked: boolean): string {
    return mergeClasses(radioBulletVariants({ checked }));
  }

  protected getBadgeClasses(badge: string): string {
    const variant =
      badge.toLowerCase() === 'profissional' ? 'profissional' : 'default';
    return mergeClasses(badgeVariants({ variant }));
  }

  protected onSelect(selectedValue: T): void {
    if (!this.disabled()) {
      this.valueChange.emit(selectedValue);
    }
  }
}

// Single radio card component (individual variant)
@Component({
  selector: 'z-radio-card',
  exportAs: 'zRadioCard',
  standalone: true,
  imports: [ZardRadioCardGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <z-radio-card-group
      [options]="[{ value: value(), label: label(), badge: badge() }]"
      [value]="checked() ? value() : null"
      [name]="name()"
      [disabled]="disabled()"
      [class]="class()"
      (valueChange)="onSelect($event)"
    />
  `,
})
export class ZardRadioCardComponent<T extends string = string> {
  readonly value = input.required<T>();
  readonly label = input.required<string>();
  readonly badge = input<string>();
  readonly checked = input<boolean>(false);
  readonly name = input<string>();
  readonly disabled = input<boolean>(false);
  readonly class = input<ClassValue>('');

  readonly valueChange = output<T>();

  protected onSelect(selectedValue: T): void {
    this.valueChange.emit(selectedValue);
  }
}
