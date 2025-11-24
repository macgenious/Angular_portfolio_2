import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, ProjectFilter } from '../models/project.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projects: Project[] = [
    {
      id: '1',
      title: 'Pokedex Python API',
      category: 'Python',
      imageUrl: 'assets/imgs/projects/pokedex-python-banner.png',
      projectPath: 'pokedex',
      githubUrl: 'https://github.com/macgenious/pokedex-python-api'
    },
    {
      id: '2',
      title: 'Java Game',
      category: 'Java',
      imageUrl: 'assets/imgs/projects/java-game-banner.jpg',
      projectPath: 'java',
      githubUrl: 'https://github.com/macgenious/java-game'
    },
    {
      id: '3',
      title: 'Personality Book Test',
      category: 'JavaScript',
      imageUrl: 'assets/imgs/projects/personality-test-banner.png',
      projectPath: 'https://macgenious.github.io/test-libro-llar-jove/',
      githubUrl: 'https://github.com/macgenious/test-libro-llar-jove'
    },
    {
      id: '4',
      title: 'Arduino Car Project',
      category: 'Hardware',
      imageUrl: 'assets/imgs/projects/arduino-car-banner.webp',
      projectPath: 'arduino',
      githubUrl: 'https://github.com/macgenious/arduino-car-project'
    },
    {
      id: '5',
      title: 'AI Chatbot Assistant',
      category: 'AI',
      imageUrl: 'assets/imgs/projects/ai-chatbot-banner.png',
      projectPath: 'deepseek_api',
      githubUrl: 'https://github.com/macgenious/ai-chatbot-assistant'
    }
  ];

  private filteredProjectsSubject = new BehaviorSubject<Project[]>(this.projects);
  private activeFilterSubject = new BehaviorSubject<string>('All');

  constructor(private router: Router) {}

  getAllProjects(): Observable<Project[]> {
    return this.filteredProjectsSubject.asObservable();
  }

  getActiveFilter(): Observable<string> {
    return this.activeFilterSubject.asObservable();
  }

  filterProjects(category: string): void {
    this.activeFilterSubject.next(category);
    
    if (category === 'All') {
      this.filteredProjectsSubject.next(this.projects);
    } else {
      const filtered = this.projects.filter(project => project.category === category);
      this.filteredProjectsSubject.next(filtered);
    }
  }

  getProjectCategories(): string[] {
    return ['All', 'Python', 'Java', 'JavaScript', 'Hardware', 'AI'];
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  navigateToProject(project: Project): void {
    const path = project.projectPath;
    if (!path) return;
    
    if (path.startsWith('http')) {
      window.open(path, '_blank');
      return;
    }
    
    this.router.navigate(['/projects', project.id]);
  }
}
