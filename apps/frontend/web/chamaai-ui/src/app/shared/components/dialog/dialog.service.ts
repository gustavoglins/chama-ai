import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  PLATFORM_ID,
  TemplateRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ZardDialogRef } from './dialog-ref';
import { ZardDialogComponent, ZardDialogOptions } from './dialog.component';

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string | undefined;
export const Z_DIALOG_DATA = new InjectionToken<unknown>('Z_DIALOG_DATA');

@Injectable({
  providedIn: 'root',
})
export class ZardDialogService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private platformId = inject(PLATFORM_ID);

  create<T>(config: ZardDialogOptions<T, unknown>): ZardDialogRef<T> {
    return this.open<T>(config.zContent, config);
  }

  private open<T>(
    content: ContentType<T>,
    config: ZardDialogOptions<T, unknown>
  ): ZardDialogRef<T> {
    if (!isPlatformBrowser(this.platformId)) {
      return {} as ZardDialogRef<T>;
    }

    const overlayRef = this.createOverlay();
    const dialogContainer = this.attachDialogContainer(overlayRef, config);
    const dialogRef = this.attachDialogContent<T>(
      content,
      dialogContainer,
      overlayRef,
      config
    );

    return dialogRef;
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: ['bg-background/80', 'backdrop-blur-sm'],
      panelClass: ['z-dialog-overlay'],
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer<T, U>(
    overlayRef: OverlayRef,
    config: ZardDialogOptions<T, U>
  ): ZardDialogComponent<T, U> {
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: ZardDialogOptions, useValue: config },
        { provide: OverlayRef, useValue: overlayRef },
      ],
    });

    const containerPortal = new ComponentPortal(
      ZardDialogComponent,
      config.zViewContainerRef,
      injector
    );
    const containerRef = overlayRef.attach(containerPortal);

    return containerRef.instance as ZardDialogComponent<T, U>;
  }

  private attachDialogContent<T>(
    content: ContentType<T>,
    dialogContainer: ZardDialogComponent<T, unknown>,
    overlayRef: OverlayRef,
    config: ZardDialogOptions<T, unknown>
  ): ZardDialogRef<T> {
    const dialogRef = new ZardDialogRef<T>(overlayRef, config, dialogContainer);
    dialogContainer.dialogRef = dialogRef;

    if (content instanceof TemplateRef) {
      const context = {
        $implicit: config.zData,
        dialogRef,
      };

      const injector = Injector.create({
        parent: this.injector,
        providers: [
          { provide: ZardDialogRef, useValue: dialogRef },
          { provide: Z_DIALOG_DATA, useValue: config.zData },
        ],
      });

      const portal = new TemplatePortal(
        content,
        config.zViewContainerRef!,
        context as any,
        injector
      );
      const viewRef = dialogContainer.attachTemplatePortal(portal);

      dialogRef.componentInstance = viewRef.context as T;
    } else if (content) {
      const injector = Injector.create({
        parent: this.injector,
        providers: [
          { provide: ZardDialogRef, useValue: dialogRef },
          { provide: Z_DIALOG_DATA, useValue: config.zData },
        ],
      });

      const portal = new ComponentPortal(
        content as ComponentType<T>,
        config.zViewContainerRef,
        injector
      );
      const componentRef = dialogContainer.attachComponentPortal(portal);

      dialogRef.componentInstance = componentRef.instance;
    }

    dialogContainer.state.set('open');

    return dialogRef;
  }
}
