import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  phase: 'spawn' | 'active' | 'death';
  phaseStartTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class ParticlesService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private isRunningSubject = new BehaviorSubject<boolean>(false);
  private pool: Particle[] = [];

  // Configuration
  private config = {
    particleCount: 100,
    minSize: 1,
    maxSize: 3,
    minSpeed: 0.3,
    maxSpeed: 1.2,
    connectionDistance: 120,
    connectionColor: 'rgba(0, 255, 255, 0.08)',
    spawnDuration: 800,     // Fade in and grow to max
    activeDuration: 1500,   // Stay at max size
    deathDuration: 800      // Shrink and fade out
  };

  constructor() {}

  initialize(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setupCanvas();
    this.createParticles();
  }

  private setupCanvas(): void {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-2';
  }

  private createParticles(): void {
    if (!this.canvas) return;
    const target = this.getAdaptiveCount();
    this.particles = [];
    for (let i = 0; i < target; i++) {
      // Stagger initial spawns to avoid all particles spawning at once
      const particle = this.spawn();
      particle.phaseStartTime = Date.now() - Math.random() * this.config.spawnDuration;
      this.particles.push(particle);
    }
  }

  private spawn(): Particle {
    const w = this.canvas!.width;
    const h = this.canvas!.height;
    const targetRadius = this.rand(this.config.minSize, this.config.maxSize);
    const hue = Math.floor(this.rand(0, 360));
    const sat = Math.floor(this.rand(70, 100));
    const light = Math.floor(this.rand(50, 70));
    const speed = this.rand(this.config.minSpeed, this.config.maxSpeed);
    
    const p = this.pool.pop() || { 
      x: 0, y: 0, vx: 0, vy: 0, radius: 0, targetRadius: 0,
      color: '', alpha: 0, targetAlpha: 0, 
      phase: 'spawn' as 'spawn', phaseStartTime: 0
    };
    
    // Start from edges of screen
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) { p.x = 0; p.y = Math.random() * h; } // Left
    else if (edge === 1) { p.x = w; p.y = Math.random() * h; } // Right
    else if (edge === 2) { p.x = Math.random() * w; p.y = 0; } // Top
    else { p.x = Math.random() * w; p.y = h; } // Bottom
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
    
    p.radius = 0; // Start at 0 and grow
    p.targetRadius = targetRadius;
    p.color = `hsl(${hue} ${sat}% ${light}%)`;
    p.alpha = 0; // Start invisible
    p.targetAlpha = Math.random() * 0.3 + 0.5;
    p.phase = 'spawn';
    p.phaseStartTime = Date.now();
    return p;
  }

  private rand(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private getAdaptiveCount(): number {
    const base = this.config.particleCount;
    const cores = (navigator.hardwareConcurrency || 4);
    const mem = (navigator as any).deviceMemory || 4;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return Math.max(20, Math.floor(base * 0.25));
    const factor = Math.min(1, (cores / 8 + mem / 8) / 2);
    return Math.floor(base * (0.6 + 0.4 * factor));
  }

  start(): void {
    if (this.animationId) return;
    this.isRunningSubject.next(true);
    this.animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isRunningSubject.next(false);
  }

  private animate = (): void => {
    if (!this.canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateAll();
    this.drawConnections();

    this.animationId = requestAnimationFrame(this.animate);
  };

  private updateParticle(particle: Particle): void {
    if (!this.canvas) return;
    
    const now = Date.now();
    const timeSincePhaseStart = now - particle.phaseStartTime;

    // Handle phase transitions
    if (particle.phase === 'spawn') {
      // Spawning phase: fade in and grow to max
      const progress = Math.min(1, timeSincePhaseStart / this.config.spawnDuration);
      particle.alpha = particle.targetAlpha * this.easeOutCubic(progress);
      particle.radius = particle.targetRadius * this.easeOutCubic(progress);
      
      if (progress >= 1) {
        particle.phase = 'active';
        particle.phaseStartTime = now;
      }
    } else if (particle.phase === 'active') {
      // Active phase: stay at max size, then transition to death
      particle.alpha = particle.targetAlpha;
      particle.radius = particle.targetRadius;
      
      if (timeSincePhaseStart >= this.config.activeDuration) {
        particle.phase = 'death';
        particle.phaseStartTime = now;
      }
    } else if (particle.phase === 'death') {
      // Death phase: shrink and fade out
      const progress = Math.min(1, timeSincePhaseStart / this.config.deathDuration);
      particle.alpha = particle.targetAlpha * (1 - this.easeInCubic(progress));
      particle.radius = particle.targetRadius * (1 - this.easeInCubic(progress));
      
      if (progress >= 1) {
        this.reset(particle);
      }
    }

    // Move particle in constant direction
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Check if particle is off screen - if so, respawn
    if (particle.x < -50 || particle.x > this.canvas.width + 50 || 
        particle.y < -50 || particle.y > this.canvas.height + 50) {
      this.reset(particle);
    }
  }

  // Easing functions for smooth animations
  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  private easeInCubic(t: number): number {
    return t * t * t;
  }

  private drawParticle(particle: Particle): void {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = particle.color;
    this.ctx.globalAlpha = particle.alpha;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }

  private drawConnections(): void {
    if (!this.ctx) return;
    this.ctx.strokeStyle = this.config.connectionColor;
    this.ctx.lineWidth = 1;
    const qt = new Quadtree(0, 0, this.canvas!.width, this.canvas!.height, 8);
    for (const p of this.particles) qt.insert(p);
    for (const p of this.particles) {
      const neighbors = qt.query(p.x, p.y, this.config.connectionDistance);
      for (const q of neighbors) {
        if (p === q) continue;
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < this.config.connectionDistance) {
          const o = 1 - d / this.config.connectionDistance;
          // Factor in both particles' alpha for connection opacity
          const connectionAlpha = o * 0.2 * Math.min(p.alpha, q.alpha);
          this.ctx.globalAlpha = connectionAlpha;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(q.x, q.y);
          this.ctx.stroke();
          this.ctx.globalAlpha = 1;
        }
      }
    }
  }

  private updateAll(): void {
    const qt = new Quadtree(0, 0, this.canvas!.width, this.canvas!.height, 8);
    for (const p of this.particles) qt.insert(p);
    for (const p of this.particles) {
      this.updateParticle(p);
      const neighbors = qt.query(p.x, p.y, p.radius * 2);
      for (const q of neighbors) {
        if (p === q) continue;
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = p.radius + q.radius;
        if (dist > 0 && dist < minDist) {
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          p.x += nx * (overlap / 2);
          p.y += ny * (overlap / 2);
          q.x -= nx * (overlap / 2);
          q.y -= ny * (overlap / 2);
        }
      }
      this.drawParticle(p);
    }
  }

  handleResize(): void {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  isRunning(): Observable<boolean> {
    return this.isRunningSubject.asObservable();
  }

  private reset(p: Particle): void {
    const w = this.canvas!.width;
    const h = this.canvas!.height;
    const targetRadius = this.rand(this.config.minSize, this.config.maxSize);
    const hue = Math.floor(this.rand(0, 360));
    const sat = Math.floor(this.rand(70, 100));
    const light = Math.floor(this.rand(50, 70));
    const speed = this.rand(this.config.minSpeed, this.config.maxSpeed);
    
    // Start from edges of screen
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) { p.x = 0; p.y = Math.random() * h; } // Left
    else if (edge === 1) { p.x = w; p.y = Math.random() * h; } // Right
    else if (edge === 2) { p.x = Math.random() * w; p.y = 0; } // Top
    else { p.x = Math.random() * w; p.y = h; } // Bottom
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
    
    p.radius = 0;
    p.targetRadius = targetRadius;
    p.color = `hsl(${hue} ${sat}% ${light}%)`;
    p.alpha = 0;
    p.targetAlpha = Math.random() * 0.3 + 0.5;
    p.phase = 'spawn';
    p.phaseStartTime = Date.now();
  }

  destroy(): void {
    this.stop();
    this.particles = [];
    this.pool = [];
    this.canvas = null;
    this.ctx = null;
  }
}

class Quadtree {
  private items: Particle[] = [];
  private nodes: Quadtree[] | null = null;
  constructor(private x: number, private y: number, private w: number, private h: number, private cap: number) {}
  insert(p: Particle): boolean {
    if (!this.contains(p.x, p.y)) return false;
    if (this.items.length < this.cap) { this.items.push(p); return true; }
    if (!this.nodes) this.subdivide();
    return this.nodes![0].insert(p) || this.nodes![1].insert(p) || this.nodes![2].insert(p) || this.nodes![3].insert(p);
  }
  query(x: number, y: number, r: number): Particle[] {
    const out: Particle[] = [];
    if (!this.intersects(x, y, r)) return out;
    for (const it of this.items) out.push(it);
    if (this.nodes) {
      out.push(...this.nodes[0].query(x, y, r));
      out.push(...this.nodes[1].query(x, y, r));
      out.push(...this.nodes[2].query(x, y, r));
      out.push(...this.nodes[3].query(x, y, r));
    }
    return out;
  }
  private contains(px: number, py: number): boolean {
    return px >= this.x && py >= this.y && px <= this.x + this.w && py <= this.y + this.h;
  }
  private intersects(cx: number, cy: number, r: number): boolean {
    const rx = cx - r, ry = cy - r, rw = r * 2, rh = r * 2;
    return !(rx > this.x + this.w || rx + rw < this.x || ry > this.y + this.h || ry + rh < this.y);
  }
  private subdivide() {
    const hw = this.w / 2, hh = this.h / 2;
    this.nodes = [
      new Quadtree(this.x, this.y, hw, hh, this.cap),
      new Quadtree(this.x + hw, this.y, hw, hh, this.cap),
      new Quadtree(this.x, this.y + hh, hw, hh, this.cap),
      new Quadtree(this.x + hw, this.y + hh, hw, hh, this.cap)
    ];
  }
}
