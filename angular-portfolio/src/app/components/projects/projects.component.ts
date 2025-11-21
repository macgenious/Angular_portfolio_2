import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ProjectsComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;
  activeFilter$: Observable<string>;
  categories: string[] = [];
  
  private subscription = new Subscription();
  visibleCards: Project[] = [];
  showTypingGame = false;
  isPaused = false;
  hoveredCardId: string | null = null;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterProjects(category: string): void {
    this.projectsService.filterProjects(category);
  }

  onProjectClick(project: Project): void {
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

  pauseAnimation(projectId: string): void {
    this.isPaused = true;
    this.hoveredCardId = projectId;
  }

  resumeAnimation(): void {
    this.isPaused = false;
    this.hoveredCardId = null;
  }
}
