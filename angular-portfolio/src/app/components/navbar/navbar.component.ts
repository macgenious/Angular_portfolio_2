import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  open = false;
  active = 'home';
  private io?: IntersectionObserver;
  private handler = () => {};

  constructor(private router: Router) {
    this.initObserver();
    this.handler = this.debounce(() => this.initObserver(), 250);
    window.addEventListener('resize', this.handler, { passive: true });
    window.addEventListener('scroll', this.handler, { passive: true });
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

  private initObserver(): void {
    if (this.io) this.io.disconnect();
    this.io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) this.active = (e.target as HTMLElement).id;
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
