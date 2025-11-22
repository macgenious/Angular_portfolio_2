import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;
  activeFilter$: Observable<string>;
  categories: string[] = [];
  
  private subscription = new Subscription();
  visibleCards: Project[] = [];
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
    setTimeout(() => {
      this.projectsService.navigateToProject(project);
    }, 500);
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
