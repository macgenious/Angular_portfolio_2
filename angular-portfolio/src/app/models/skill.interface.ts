export interface Skill {
  id: string;
  name: string;
  category: 'Languages' | 'Tools' | 'AI & ML' | 'Hardware';
  proficiency: number; // 0-100
  description?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  isActive: boolean;
}