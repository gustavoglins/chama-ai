import { filter, fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { EventEmitter } from '@angular/core';

import { OverlayRef } from '@angular/cdk/overlay';

import {
  OnClickCallback,
  ZardDialogComponent,
  ZardDialogOptions,
} from './dialog.component';

export class ZardDialogRef<T = unknown, R = unknown> {
  componentInstance?: T;
  private destroy$ = new Subject<void>();
  private readonly afterClosedSubject: Subject<R | undefined> = new Subject();

  constructor(
    private overlayRef: OverlayRef,
    private config: ZardDialogOptions<T, unknown>,
    private containerInstance: ZardDialogComponent<T, unknown>
  ) {
    containerInstance.cancelTriggered.subscribe(() => {
      this.handleCancel();
    });

    containerInstance.okTriggered.subscribe(() => {
      this.handleOk();
    });

    this.handleMaskClick();

    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter((event) => event.key === 'Escape'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.close());
  }

  close(dialogResult?: R): void {
    this.containerInstance.state.set('close');

    setTimeout(() => {
      this.overlayRef.dispose();
      this.afterClosedSubject.next(dialogResult);
      this.afterClosedSubject.complete();
      this.destroy$.next();
      this.destroy$.complete();
    }, 200);
  }

  afterClosed(): Observable<R | undefined> {
    return this.afterClosedSubject.asObservable();
  }

  private handleOk(): void {
    const onOk = this.config.zOnOk;

    if (onOk) {
      if (typeof onOk === 'function') {
        const result = (onOk as OnClickCallback<T>)(
          this.componentInstance as T
        );
        if (result === false) {
          return;
        }
        this.close(result as R);
      } else if (onOk && typeof (onOk as any).emit === 'function') {
        (onOk as any).emit(this.componentInstance as T);
      }
    } else {
      this.close();
    }
  }

  private handleCancel(): void {
    const onCancel = this.config.zOnCancel;

    if (onCancel) {
      if (typeof onCancel === 'function') {
        const result = (onCancel as OnClickCallback<T>)(
          this.componentInstance as T
        );
        if (result === false) {
          return;
        }
        this.close(result as R);
      } else if (onCancel && typeof (onCancel as any).emit === 'function') {
        (onCancel as any).emit(this.componentInstance as T);
      }
    } else {
      this.close();
    }
  }

  private handleMaskClick(): void {
    if (this.config.zMaskClosable !== false) {
      this.containerInstance.overlayClickOutside().subscribe(() => {
        this.close();
      });
    }
  }
}
