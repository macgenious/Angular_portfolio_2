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
  }

  isActive(category: string): boolean {
    // This will be handled by the async pipe in template
    return false;
  }

  getProficiencyWidth(proficiency: number): string {
    return `${proficiency}%`;
  }
}