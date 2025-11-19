import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService, Project } from '../../core/services/projects.service';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, ProjectCardComponent],
    template: `
    <section id="projects" [class.active]="isActive">
        <h2>PROJECT<span class="neon-text-purple">SHOWCASE</span></h2>
        <p class="section-subtitle">A collection of my finest work, showcasing technical skills and creative solutions.</p>
        
        <div class="filter-buttons">
            <button *ngFor="let category of categories" 
                    class="filter-btn" 
                    [class.active]="selectedCategory === category"
                    (click)="filterProjects(category)">
                {{ category }}
            </button>
        </div>
        
        <div class="project-carousel-container">
            <div class="project-carousel-track" #carouselTrack 
                 (mouseenter)="pauseAnimation()" 
                 (mouseleave)="resumeAnimation()"
                 (touchstart)="onTouchStart($event)"
                 (touchend)="onTouchEnd($event)">
                
                <app-project-card *ngFor="let project of visibleProjects; let i = index"
                                  [project]="project"
                                  [class.carousel-clone]="project.isClone"
                                  [style.z-index]="getZIndex(i)"
                                  [style.transform]="getTransform(i)"
                                  [style.opacity]="getOpacity(i)"
                                  [style.filter]="getFilter(i)"
                                  [style.animation]="getAnimation(i)"
                                  (cardClick)="onCardClick($event, i)">
                </app-project-card>

            </div>
        </div>
    </section>
  `,
    styles: [`
    section {
        padding: 60px 5%;
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        overflow: hidden;
    }

    section h2 {
        font-family: 'Orbitron', sans-serif;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        letter-spacing: 2px;
        color: var(--primary-color);
        text-shadow: var(--neon-glow-cyan);
    }

    .neon-text-purple {
        color: var(--secondary-color);
        text-shadow: var(--neon-glow-magenta);
        margin-left: 0.5ch;
    }

    .section-subtitle {
        font-size: 1.1rem;
        color: rgba(224, 224, 224, 0.7);
        margin-bottom: 3rem;
        max-width: 600px;
    }

    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        z-index: 10;
        position: relative;
    }

    .filter-btn {
        background: transparent;
        border: 1px solid var(--primary-color);
        color: var(--text-color);
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        font-family: 'Orbitron', sans-serif;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .filter-btn:hover, .filter-btn.active {
        background: var(--primary-color);
        color: var(--background-color);
        box-shadow: var(--neon-glow-cyan);
    }

    .project-carousel-container {
        width: 100%;
        height: 500px;
        position: relative;
        perspective: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;
    }

    .project-carousel-track {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform-style: preserve-3d;
        transition: transform 0.5s ease-out;
    }

    @media (max-width: 768px) {
        section h2 {
            font-size: 2rem;
        }
        .project-carousel-container {
            height: 400px;
        }
    }
  `]
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('carouselTrack') carouselTrack!: ElementRef;

    projects: (Project & { isClone?: boolean })[] = [];
    visibleProjects: (Project & { isClone?: boolean })[] = [];
    categories: string[] = ['All', 'Python', 'Java', 'JavaScript', 'Hardware', 'AI'];
    selectedCategory: string = 'All';

    currentIndex = 0;
    isActive = false;
    isAnimating = false;

    // Touch handling
    touchStartX = 0;
    touchEndX = 0;

    // Animation
    private animationInterval: any;
    private autoScrollSpeed = 4000;

    constructor(
        private projectsService: ProjectsService,
        private ngZone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {
        this.projectsService.getProjects().subscribe(data => {
            this.projects = data;
            this.filterProjects('All');
        });
    }

    ngAfterViewInit() {
        // Start auto-scroll
        this.startAutoScroll();

        // Intersection Observer to detect when section is active
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isActive = true;
                }
            });
        }, { threshold: 0.2 });

        const section = document.getElementById('projects');
        if (section) observer.observe(section);
    }

    ngOnDestroy() {
        this.stopAutoScroll();
    }

    // 3D Effect Calculations
    getZIndex(index: number): number {
        return index === this.currentIndex ? 10 : 10 - Math.min(Math.abs(index - this.currentIndex), 5);
    }

    getTransform(index: number): string {
        const distance = index - this.currentIndex;
        const absDistance = Math.abs(distance);

        if (distance === 0) {
            return `translateZ(50px) rotateY(0deg) scale(1.05)`;
        } else if (distance < 0) {
            return `translateZ(${30 - absDistance * 10}px) translateX(${distance * 60}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
        } else {
            return `translateZ(${30 - absDistance * 10}px) translateX(${distance * 60}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
        }
    }

    getOpacity(index: number): string {
        const distance = Math.abs(index - this.currentIndex);
        return index === this.currentIndex ? '1' : `${Math.max(0, 1 - distance * 0.2)}`;
    }

    getFilter(index: number): string {
        const distance = Math.abs(index - this.currentIndex);
        return index === this.currentIndex ? 'brightness(1.1)' : `brightness(${Math.max(0.5, 1 - distance * 0.1)})`;
    }

    getAnimation(index: number): string {
        return index === this.currentIndex ? 'pulse 2s ease infinite' : 'none';
    }

    filterProjects(category: string) {
        this.selectedCategory = category;
        this.currentIndex = 0;

        if (category === 'All') {
            this.visibleProjects = [...this.projects];
        } else {
            this.visibleProjects = this.projects.filter(p => p.category === category);
        }
    }

    // Navigation
    nextProject() {
        if (this.visibleProjects.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.visibleProjects.length;
    }

    prevProject() {
        if (this.visibleProjects.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.visibleProjects.length) % this.visibleProjects.length;
    }

    onCardClick(project: Project, index: number) {
        if (index !== this.currentIndex) {
            this.currentIndex = index;
        } else {
            // Navigate to project details
            this.router.navigate(['/projects', project.id]);
        }
    }

    // Auto Scroll
    startAutoScroll() {
        this.ngZone.runOutsideAngular(() => {
            this.animationInterval = setInterval(() => {
                this.ngZone.run(() => {
                    this.nextProject();
                });
            }, this.autoScrollSpeed);
        });
    }

    stopAutoScroll() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }

    pauseAnimation() {
        this.stopAutoScroll();
    }

    resumeAnimation() {
        this.startAutoScroll();
    }

    // Keyboard Navigation
    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (!this.isActive) return;

        if (event.key === 'ArrowRight') {
            this.pauseAnimation();
            this.nextProject();
            setTimeout(() => this.resumeAnimation(), 1500);
        } else if (event.key === 'ArrowLeft') {
            this.pauseAnimation();
            this.prevProject();
            setTimeout(() => this.resumeAnimation(), 1500);
        }
    }

    // Touch Navigation
    onTouchStart(e: TouchEvent) {
        this.touchStartX = e.changedTouches[0].screenX;
        this.pauseAnimation();
    }

    onTouchEnd(e: TouchEvent) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
        this.resumeAnimation();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (swipeDistance > swipeThreshold) {
            this.prevProject();
        } else if (swipeDistance < -swipeThreshold) {
            this.nextProject();
        }
    }
}
