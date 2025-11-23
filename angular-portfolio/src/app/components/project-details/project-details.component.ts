import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  // Modern Angular 18+ input signal for route parameter
  id = input.required<string>();
  
  // Computed signal to derive project from id
  project = computed<Project | undefined>(() => {
    return this.projectsService.getProjectById(this.id());
  });

  constructor(private projectsService: ProjectsService) {}
}
