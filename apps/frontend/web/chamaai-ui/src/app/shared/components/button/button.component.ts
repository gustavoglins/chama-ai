import type { ClassValue } from 'clsx';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { mergeClasses, transform } from '@shared/utils/merge-classes';
import { buttonVariants, ZardButtonVariants } from './button.variants';

@Component({
  selector: 'z-button, button[z-button], a[z-button]',
  exportAs: 'zButton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (zLoading()) {
    <span zType="cached" class="icon-loader-circle animate-spin"></span>
    } @else {
    <!-- Ícone/Imagem à esquerda -->
    @if ((zIcon() || zImage()) && zIconPosition() === 'left') { @if (zIcon()) {
    <span [class]="zIcon() + ' flex-shrink-0'"></span>
    } @if (zImage()) {
    <img
      [src]="zImage()"
      [alt]="'Button icon'"
      class="w-4 h-4 flex-shrink-0 object-cover rounded-sm"
    />
    } }

    <!-- Conteúdo do botão -->
    <ng-content></ng-content>

    <!-- Ícone/Imagem à direita -->
    @if ((zIcon() || zImage()) && zIconPosition() === 'right') { @if (zIcon()) {
    <span [class]="zIcon() + ' flex-shrink-0'"></span>
    } @if (zImage()) {
    <img
      [src]="zImage()"
      [alt]="'Button icon'"
      class="w-4 h-4 flex-shrink-0 object-cover rounded-sm"
    />
    } } }
  `,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardButtonComponent {
  private readonly elementRef = inject(ElementRef);

  readonly zType = input<ZardButtonVariants['zType']>('default');
  readonly zSize = input<ZardButtonVariants['zSize']>('default');
  readonly zShape = input<ZardButtonVariants['zShape']>('default');

  readonly class = input<ClassValue>('');

  readonly zFull = input(false, { transform });
  readonly zLoading = input(false, { transform });

  // Novos inputs para ícone e imagem
  readonly zIcon = input<string>(); // Para ícones CSS (ex: 'icon-search', 'fa-search')
  readonly zImage = input<string>(); // Para URLs de imagem
  readonly zIconPosition = input<'left' | 'right'>('left'); // Posição do ícone/imagem

  protected readonly classes = computed(() =>
    mergeClasses(
      buttonVariants({
        zType: this.zType(),
        zSize: this.zSize(),
        zShape: this.zShape(),
        zFull: this.zFull(),
        zLoading: this.zLoading(),
      }),
      this.class()
    )
  );
}
