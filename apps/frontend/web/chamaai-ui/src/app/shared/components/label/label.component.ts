import type { ClassValue } from 'clsx';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { mergeClasses } from '@shared/utils/merge-classes';
import { labelVariants } from './label.variants';

@Component({
  selector: 'z-label',
  exportAs: 'zLabel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <label [class]="classes()" [attr.data-slot]="'label'">
      <ng-content></ng-content>
    </label>
  `,
})
export class ZardLabelComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    mergeClasses(labelVariants(), this.class())
  );
}
