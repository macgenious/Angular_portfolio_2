import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParticlesService } from './services/particles.service';
import { CursorService } from './services/cursor.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './root.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cursorDot') cursorDot!: ElementRef<HTMLDivElement>;

  constructor(private particles: ParticlesService, private cursor: CursorService) {}

  ngAfterViewInit(): void {
    if (this.particleCanvas) {
      this.particles.initialize(this.particleCanvas.nativeElement);
      this.particles.start();
      window.addEventListener('resize', this.onResize);
    }
    if (this.cursorDot) {
      this.cursor.attach(this.cursorDot.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.particles.destroy();
    window.removeEventListener('resize', this.onResize);
    this.cursor.detach();
  }

  private onResize = () => {
    this.particles.handleResize();
  };
}
