import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticleBackgroundComponent } from './shared/components/particle-background/particle-background.component';
import { CustomCursorComponent } from './shared/components/custom-cursor/custom-cursor.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HomeComponent } from './features/home/home.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ParticleBackgroundComponent,
    CustomCursorComponent,
    NavigationComponent,
    HomeComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent
  ],
  template: `
    <app-particle-background></app-particle-background>
    <app-custom-cursor></app-custom-cursor>
    
    <app-navigation></app-navigation>
    
    <main>
      <app-home></app-home>
      <app-skills></app-skills>
      <app-projects></app-projects>
    </main>
    
    <app-footer></app-footer>
  `,
  styles: [`
    main {
        padding-top: 0; /* Handled by home section padding */
    }
  `]
})
export class AppComponent {
}
