import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService } from '../../services/skills.service';
import { Skill } from '../../models/skill.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit, OnDestroy {
  skills$: Observable<Skill[]>;
  activeCategory$: Observable<string>;
  categories: string[] = [];
  animationKey = 0; // Key to force re-render and re-trigger animations
  
  private subscription = new Subscription();

  constructor(private skillsService: SkillsService) {
    this.skills$ = this.skillsService.getSkillsByCategory();
    this.activeCategory$ = this.skillsService.getActiveCategory();
    this.categories = this.skillsService.getCategories();
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setActiveCategory(category: string): void {
    this.skillsService.setActiveCategory(category);
    // Increment key to force re-render and re-trigger animations
    this.animationKey++;
  }

  isActive(category: string): boolean {
    // This will be handled by the async pipe in template
    return false;
  }

  getProficiencyWidth(proficiency: number): string {
    return `${proficiency}%`;
  }

  // Convert percentage (0-100) to segments (0-5)
  getSegmentCount(proficiency: number): number {
    return Math.round((proficiency / 100) * 5);
  }

  // Get proficiency level label
  getProficiencyLabel(proficiency: number): string {
    const segments = this.getSegmentCount(proficiency);
    const labels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Proficient', 'Expert'];
    return labels[segments] || 'Beginner';
  }

  // Generate array for *ngFor to create segments
  getSegmentArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  // Get color class based on proficiency level
  getSegmentColorClass(proficiency: number): string {
    const segments = this.getSegmentCount(proficiency);
    if (segments <= 2) return 'segment-pink';
    if (segments <= 4) return 'segment-light-blue';
    return 'segment-blue';
  }
}