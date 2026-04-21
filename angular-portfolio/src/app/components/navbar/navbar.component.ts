import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnDestroy {
  open = false;
  active = 'home';
  isOnProjectDetails = false;
  private cleanupScroll?: () => void;
  private handler = () => {};

  private readonly sectionIds = ['home', 'skills', 'projects', 'contact'];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.initScrollTracker();
    this.handler = this.debounce(() => this.updateActive(), 50);
    window.addEventListener('resize', this.handler, { passive: true });

    // Track navigation to project details
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isOnProjectDetails = event.url.startsWith('/projects/') && event.url !== '/projects';
      this.cdr.markForCheck();
      // Re-evaluate active section after navigation settles
      setTimeout(() => this.updateActive(), 100);
    });
  }

  ngOnDestroy(): void {
    this.cleanupScroll?.();
    window.removeEventListener('resize', this.handler);
  }

  toggle(): void {
    this.open = !this.open;
  }

  navigate(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.open = false;
    } else {
      this.router.navigateByUrl(id === 'home' ? '/' : `/${id}`).then(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        this.open = false;
      });
    }
  }

  returnToHome(): void {
    this.router.navigate(['/'], { fragment: 'projects' });
    this.open = false;
  }

  private initScrollTracker(): void {
    this.cleanupScroll?.();

    this.updateActive();

    const onScroll = this.debounce(() => this.updateActive(), 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    this.cleanupScroll = () => window.removeEventListener('scroll', onScroll);
  }

  // Finds which section is currently "active" by checking which section's top
  // edge is closest to 40% down the viewport. Works for sections of any height.
  private updateActive(): void {
    const trigger = window.scrollY + window.innerHeight * 0.4;
    let current = this.sectionIds[0];

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= trigger) {
        current = id;
      }
    }

    if (this.active !== current) {
      this.active = current;
      this.cdr.markForCheck();
    }
  }

  private debounce<T extends (...a: any[]) => void>(fn: T, ms: number): T {
    let t: any;
    return ((...args: any[]) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }) as T;
  }
}
