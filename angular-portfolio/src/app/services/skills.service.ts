import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Skill, SkillCategory } from '../models/skill.interface';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skillsData: { [key: string]: Skill[] } = {
    'Languages': [
      { id: '1', name: 'Python', category: 'Languages', proficiency: 90, description: 'Advanced Python development' },
      { id: '2', name: 'Java', category: 'Languages', proficiency: 85, description: 'Object-oriented programming' },
      { id: '3', name: 'JavaScript', category: 'Languages', proficiency: 88, description: 'Modern ES6+ development' },
      { id: '4', name: 'TypeScript', category: 'Languages', proficiency: 80, description: 'Type-safe JavaScript' },
      { id: '5', name: 'C++', category: 'Languages', proficiency: 75, description: 'Systems programming' }
    ],
    'Tools': [
      { id: '6', name: 'Git', category: 'Tools', proficiency: 85, description: 'Version control' },
      { id: '7', name: 'Docker', category: 'Tools', proficiency: 70, description: 'Containerization' },
      { id: '8', name: 'AWS', category: 'Tools', proficiency: 65, description: 'Cloud services' },
      { id: '9', name: 'React', category: 'Tools', proficiency: 82, description: 'Frontend framework' },
      { id: '10', name: 'Angular', category: 'Tools', proficiency: 78, description: 'Enterprise framework' }
    ],
    'AI & ML': [
      { id: '11', name: 'TensorFlow', category: 'AI & ML', proficiency: 75, description: 'Machine learning framework' },
      { id: '12', name: 'PyTorch', category: 'AI & ML', proficiency: 70, description: 'Deep learning framework' },
      { id: '13', name: 'Scikit-learn', category: 'AI & ML', proficiency: 80, description: 'ML algorithms' },
      { id: '14', name: 'OpenAI API', category: 'AI & ML', proficiency: 85, description: 'AI integration' },
      { id: '15', name: 'Computer Vision', category: 'AI & ML', proficiency: 72, description: 'Image processing' }
    ],
    'Hardware': [
      { id: '16', name: 'Arduino', category: 'Hardware', proficiency: 88, description: 'Microcontroller programming' },
      { id: '17', name: 'Raspberry Pi', category: 'Hardware', proficiency: 80, description: 'Single-board computer' },
      { id: '18', name: 'IoT', category: 'Hardware', proficiency: 75, description: 'Internet of Things' },
      { id: '19', name: 'Circuit Design', category: 'Hardware', proficiency: 70, description: 'Electronic circuits' },
      { id: '20', name: '3D Printing', category: 'Hardware', proficiency: 65, description: 'Additive manufacturing' }
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