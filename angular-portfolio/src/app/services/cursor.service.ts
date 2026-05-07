import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CursorService {
  private el: HTMLElement | null = null;
  private rafId: number | null = null;
  private lastX = 0;
  private lastY = 0;
  private visible = false;

  private mouseMoveHandler = (e: MouseEvent) => {
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.updatePosition);
    }

    if (this.el) {
      const inHeader = !!(e.target as Element | null)?.closest('header');
      if (inHeader) {
        this.el.style.transition = 'opacity 0s ease-in-out, transform 0s ease-in-out';
        this.el.style.opacity = '0';
        this.visible = false;
        return;
      }
      if (!this.visible) {
        this.el.style.opacity = '0.7';
        this.visible = true;
      }
    }
  };

  private mouseOutHandler = () => {
    if (this.el) {
      this.el.style.opacity = '0';
      this.visible = false;
    }
  };

  private updatePosition = () => {
    this.rafId = null;
    if (!this.el) return;
    this.el.style.left = `${this.lastX}px`;
    this.el.style.top = `${this.lastY}px`;
  };

  attach(el: HTMLElement): void {
    this.el = el;
    document.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
    document.addEventListener('mouseout', this.mouseOutHandler, { passive: true });
  }

  detach(): void {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseout', this.mouseOutHandler);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.el = null;
    this.visible = false;
  }
}