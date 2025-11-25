import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Skill, SkillCategory } from '../models/skill.interface';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skillsData: { [key: string]: Skill[] } = {
    'Languages': [
      { id: '1', name: 'Python', category: 'Languages', proficiency: 80, description: 'Advanced Python development' },
      { id: '2', name: 'Java', category: 'Languages', proficiency: 100, description: 'Object-oriented programming' },
      { id: '3', name: 'JavaScript', category: 'Languages', proficiency: 90, description: 'Modern ES6+ development' },
      { id: '4', name: 'TypeScript', category: 'Languages', proficiency: 70, description: 'Type-safe JavaScript' },
      { id: '5', name: 'C++', category: 'Languages', proficiency: 30, description: 'Systems programming' }
    ],
    'Tools': [
      { id: '6', name: 'Git/Github', category: 'Tools', proficiency: 90, description: 'Version control' },
      { id: '7', name: 'Arch Linux', category: 'Tools', proficiency: 80, description: 'Containerization' },
      { id: '8', name: 'Wolfram Mathematica', category: 'Tools', proficiency: 30, description: 'Cloud services' },
      { id: '9', name: 'Node.js', category: 'Tools', proficiency: 40, description: 'Frontend framework' },
      { id: '10', name: 'Angular', category: 'Tools', proficiency: 75, description: 'Enterprise framework' }
    ],
    'AI tools': [
      { id: '11', name: 'Trae AI', category: 'AI & ML', proficiency: 80, description: 'Machine learning framework' },
      { id: '12', name: 'Antigravity', category: 'AI & ML', proficiency: 100, description: 'Deep learning framework' },
      { id: '13', name: 'Gemini API', category: 'AI & ML', proficiency: 60, description: 'ML algorithms' },
      { id: '14', name: 'Qwen CLI', category: 'AI & ML', proficiency: 75, description: 'AI integration' },
      { id: '15', name: 'Stable Diffusion', category: 'AI & ML', proficiency: 40, description: 'Image processing' }
    ],
    'Low Level': [
      { id: '16', name: 'Arduino', category: 'Hardware', proficiency: 75, description: 'Microcontroller programming' },
      { id: '17', name: 'Assembly', category: 'Hardware', proficiency: 90, description: 'Single-board computer' },
      { id: '18', name: 'IoT', category: 'Hardware', proficiency: 20, description: 'Internet of Things' },
      { id: '19', name: 'Circuit Design', category: 'Hardware', proficiency: 30, description: 'Electronic circuits' },
      { id: '20', name: 'Tinkercad', category: 'Hardware', proficiency: 50, description: 'Additive manufacturing' }
    ]
  };

  private activeCategorySubject = new BehaviorSubject<string>('Languages');
  private skillsSubject = new BehaviorSubject<Skill[]>(this.skillsData['Languages']);

  constructor() {}

  getActiveCategory(): Observable<string> {
    return this.activeCategorySubject.asObservable();
  }

  getSkillsByCategory(): Observable<Skill[]> {
    return this.skillsSubject.asObservable();
  }

  setActiveCategory(category: string): void {
    this.activeCategorySubject.next(category);
    this.skillsSubject.next(this.skillsData[category] || []);
  }

  getCategories(): string[] {
    return Object.keys(this.skillsData);
  }

  getAllSkills(): { [key: string]: Skill[] } {
    return this.skillsData;
  }
}