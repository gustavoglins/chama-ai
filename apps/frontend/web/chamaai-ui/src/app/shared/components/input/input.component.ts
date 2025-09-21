import type { ClassValue } from 'clsx';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { mergeClasses, transform } from '@shared/utils/merge-classes';
import { inputVariants, ZardInputVariants } from './input.variants';

@Component({
  selector: 'z-input',
  exportAs: 'zInput',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (zType() === 'textarea') {
    <textarea
      [class]="classes()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
    ></textarea>
    } @else {
    <input
      [type]="type()"
      [class]="classes()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
    />
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZardInputComponent),
      multi: true,
    },
  ],
})
export class ZardInputComponent implements ControlValueAccessor {
  // Input properties
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly disabled = input(false, { transform });
  readonly readonly = input(false, { transform });

  // Variant properties
  readonly zType = input<ZardInputVariants['zType']>('default');
  readonly zSize = input<ZardInputVariants['zSize']>('default');
  readonly zStatus = input<ZardInputVariants['zStatus']>();
  readonly zBorderless = input(false, { transform });

  readonly class = input<ClassValue>('');

  // Internal state
  protected value: string = '';
  private onChange = (value: string) => {};
  private onTouched = () => {};

  protected readonly classes = computed(() =>
    mergeClasses(
      inputVariants({
        zType: this.zType(),
        zSize: this.zSize(),
        zStatus: this.zStatus(),
        zBorderless: this.zBorderless(),
      }),
      this.class()
    )
  );

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // This will be handled by the disabled input
  }

  // Event handlers
  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  protected onFocus(): void {
    // Optional: Add focus logic if needed
  }
}
