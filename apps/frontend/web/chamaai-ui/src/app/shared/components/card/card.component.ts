import type { ClassValue } from 'clsx';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { mergeClasses } from '@shared/utils/merge-classes';
import { ZardStringTemplateOutletDirective } from '../core/directives/string-template-outlet/string-template-outlet.directive';
import {
  cardBodyVariants,
  cardHeaderVariants,
  cardVariants,
} from './card.variants';

@Component({
  selector: 'z-card',
  exportAs: 'zCard',
  standalone: true,
  imports: [ZardStringTemplateOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (zImage()) {
    <div class="mb-6 flex justify-center">
      <ng-container *zStringTemplateOutlet="zImage()">
        <img class="w-25 h-auto" [src]="zImage()" [alt]="zImage() + ' image'" />
      </ng-container>
    </div>
    } @if (zTitle()) {
    <div [class]="headerClasses()">
      <div class="text-3xl font-bold leading-none tracking-tight">
        <ng-container *zStringTemplateOutlet="zTitle()">{{
          zTitle()
        }}</ng-container>
      </div>

      @if (zDescription()) {
      <div class="text-muted-foreground text-sm">
        <ng-container *zStringTemplateOutlet="zDescription()">{{
          zDescription()
        }}</ng-container>
      </div>
      }
    </div>
    }

    <div [class]="bodyClasses()">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardCardComponent {
  readonly zTitle = input<string | TemplateRef<void>>();
  readonly zDescription = input<string | TemplateRef<void>>();
  readonly zImage = input<string | TemplateRef<void>>();

  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    mergeClasses(cardVariants(), this.class())
  );
  protected readonly headerClasses = computed(() =>
    mergeClasses(cardHeaderVariants())
  );
  protected readonly bodyClasses = computed(() =>
    mergeClasses(cardBodyVariants())
  );
}
