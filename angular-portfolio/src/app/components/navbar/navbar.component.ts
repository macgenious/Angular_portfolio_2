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
  private io?: IntersectionObserver;
  private handler = () => {};

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.initObserver();
    this.handler = this.debounce(() => this.initObserver(), 250);
    window.addEventListener('resize', this.handler, { passive: true });
    window.addEventListener('scroll', this.handler, { passive: true });
    
    // Track navigation to project details
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isOnProjectDetails = event.url.startsWith('/projects/') && event.url !== '/projects';
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.io) this.io.disconnect();
    window.removeEventListener('resize', this.handler);
    window.removeEventListener('scroll', this.handler);
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

  private initObserver(): void {
    if (this.io) this.io.disconnect();
    this.io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.active = (e.target as HTMLElement).id;
          this.cdr.markForCheck();
        }
      });
    }, { root: null, threshold: 0.6 });
    ['home','skills','projects'].forEach(id => {
      const el = document.getElementById(id);
      if (el) this.io!.observe(el);
    });
  }

  private debounce<T extends (...a: any[]) => void>(fn: T, ms: number): T {
    let t: any;
    return ((...args: any[]) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }) as T;
  }
}
