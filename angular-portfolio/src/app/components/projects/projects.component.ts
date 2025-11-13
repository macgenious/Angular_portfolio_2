import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.interface';
import { Observable, Subscription } from 'rxjs';
import { TypingGameComponent } from '../typing-game/typing-game.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TypingGameComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;
  
  projects$: Observable<Project[]>;
  activeFilter$: Observable<string>;
  categories: string[] = [];
  
  private subscription = new Subscription();
  currentIndex = 0;
  visibleCards: Project[] = [];
  isAnimating = false;
  showTypingGame = false;

  constructor(private projectsService: ProjectsService) {
    this.projects$ = this.projectsService.getAllProjects();
    this.activeFilter$ = this.projectsService.getActiveFilter();
    this.categories = this.projectsService.getProjectCategories();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.projects$.subscribe(projects => {
        this.visibleCards = projects;
      })
    );
  }

  ngAfterViewInit(): void {
    this.setupKeyboardNavigation();
    this.setupTouchNavigation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterProjects(category: string): void {
    this.projectsService.filterProjects(category);
    this.currentIndex = 0;
    this.isAnimating = false;
  }

  onProjectClick(project: Project): void {
    if (this.isAnimating) return;
    const isTypingGame = project.title === 'Typing Improvement Game' || project.projectPath === '/typing-game' || project.id === '6';
    if (isTypingGame) {
      this.showTypingGame = true;
      return;
    }
    setTimeout(() => {
      this.projectsService.navigateToProject(project);
    }, 500);
  }

  closeTypingGame(): void {
    this.showTypingGame = false;
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (this.isAnimating) return;
        
        if (e.key === 'ArrowLeft') {
          this.currentIndex = (this.currentIndex - 1 + this.visibleCards.length) % this.visibleCards.length;
        } else {
          this.currentIndex = (this.currentIndex + 1) % this.visibleCards.length;
        }
        
        this.updateCarousel();
      }
    });
  }

  private setupTouchNavigation(): void {
    let touchStartX = 0;
    let touchEndX = 0;

    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.carouselTrack.nativeElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      }, { passive: true });
    }
  }

  private handleSwipe(startX: number, endX: number): void {
    if (this.isAnimating) return;
    
    const swipeThreshold = 50;
    const swipeDistance = endX - startX;
    
    if (swipeDistance > swipeThreshold) {
      // Swipe right - go to previous
      this.currentIndex = (this.currentIndex - 1 + this.visibleCards.length) % this.visibleCards.length;
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe left - go to next
      this.currentIndex = (this.currentIndex + 1) % this.visibleCards.length;
    }
    
    this.updateCarousel();
  }

  private updateCarousel(): void {
    // This method can be extended for more complex carousel animations
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  getCardTransform(index: number): string {
    const distance = index - this.currentIndex;
    const absDistance = Math.abs(distance);
    
    if (distance === 0) {
      // Current card
      return 'translateZ(50px) rotateY(0deg) scale(1.05)';
    } else if (distance < 0) {
      // Cards to the left
      return `translateZ(${30 - absDistance * 10}px) translateX(${distance * 5}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
    } else {
      // Cards to the right
      return `translateZ(${30 - absDistance * 10}px) translateX(${distance * 5}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
    }
  }

  getCardOpacity(index: number): number {
    const distance = Math.abs(index - this.currentIndex);
    return distance === 0 ? 1 : Math.max(0.7, 1 - distance * 0.15);
  }

  getCardZIndex(index: number): number {
    return index === this.currentIndex ? 10 : 10 - Math.min(Math.abs(index - this.currentIndex), 5);
  }
}
