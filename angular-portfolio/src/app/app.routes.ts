import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./components/skills/skills.component').then(c => c.SkillsComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./components/projects/projects.component').then(c => c.ProjectsComponent)
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./components/project-details/project-details.component').then(c => c.ProjectDetailsComponent)
  },
  { path: '**', redirectTo: '' }
];
