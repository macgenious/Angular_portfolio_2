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
      imageUrl: 'assets/imgs/projects/python.png',
      description: 'A RESTful API built with Python that provides comprehensive Pokemon data and statistics. Features include search functionality, detailed Pokemon information, and type-based filtering. Uses modern Python frameworks for efficient data handling and API endpoints.',
      projectPath: 'pokedex',
      githubUrl: 'https://github.com/macgenious/pokedex-python-api'
    },
    {
      id: '2',
      title: 'Java Game',
      category: 'Java',
      imageUrl: 'assets/imgs/projects/java.png',
      description: 'An interactive game developed in Java featuring object-oriented design patterns and game mechanics. Implements collision detection, score tracking, and multiple game levels. Built using Java Swing for graphics rendering and event handling.',
      projectPath: 'java',
      githubUrl: 'https://github.com/macgenious/java-game'
    },
    {
      id: '3',
      title: 'Personality Book Test',
      category: 'JavaScript',
      imageUrl: 'assets/imgs/projects/javascript.png',
      description: 'An interactive personality quiz that recommends books based on user preferences and personality traits. Features dynamic question flows and personalized recommendations using vanilla JavaScript.',
      githubUrl: 'https://github.com/macgenious/test-libro-llar-jove'
    },
    {
      id: '4',
      title: 'Arduino Car Project',
      category: 'Hardware',
      imageUrl: 'assets/imgs/projects/arduino.png',
      description: 'A motorized car controlled by Arduino microcontroller featuring autonomous navigation and obstacle detection. Integrates motors, sensors, and custom circuitry for real-time movement control and environmental awareness.',
      projectPath: 'arduino',
      githubUrl: 'https://github.com/macgenious/arduino-car-project'
    },
    {
      id: '5',
      title: 'AI Chatbot Assistant',
      category: 'AI',
      imageUrl: 'assets/imgs/projects/gemini.png',
      description: 'An intelligent chatbot powered by AI that provides conversational responses and assistance. Utilizes natural language processing APIs for context-aware dialogue and maintains conversation history for personalized interactions.',
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
    
    if (path && path.startsWith('http')) {
      window.open(path, '_blank');
      return;
    }
    
    this.router.navigate(['/projects', project.id]);
  }
}
