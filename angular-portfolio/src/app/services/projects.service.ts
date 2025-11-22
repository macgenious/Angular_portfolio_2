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
      imageUrl: '/imgs/projects/pokedex-python-banner.png',
      projectPath: 'pokedex'
    },
    {
      id: '2',
      title: 'Java Game',
      category: 'Java',
      imageUrl: '/imgs/projects/java-game-banner.jpg',
      projectPath: 'java'
    },
    {
      id: '3',
      title: 'Personality Book Test',
      category: 'JavaScript',
      imageUrl: '/imgs/projects/personality-test-banner.png',
      projectPath: 'https://llarjovecorresponsales.infinityfreeapp.com'
    },
    {
      id: '4',
      title: 'Arduino Car Project',
      category: 'Hardware',
      imageUrl: '/imgs/projects/arduino-car-banner.webp',
      projectPath: 'arduino'
    },
    {
      id: '5',
      title: 'AI Chatbot Assistant',
      category: 'AI',
      imageUrl: '/imgs/projects/ai-chatbot-banner.png',
      projectPath: 'deepseek_api'
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

  navigateToProject(project: Project): void {
    const path = project.projectPath;
    if (!path) return;
    if (path.startsWith('http')) {
      window.open(path, '_blank');
      return;
    }
    if (path.startsWith('/')) {
      this.router.navigateByUrl(path);
      return;
    }
    window.location.href = `${path}/index.html`;
  }
}
