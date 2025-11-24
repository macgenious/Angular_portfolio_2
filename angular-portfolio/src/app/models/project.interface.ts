export interface Project {
  id: string;
  title: string;
  category: 'Python' | 'Java' | 'JavaScript' | 'Hardware' | 'AI';
  imageUrl: string;
  description?: string;
  projectPath?: string;
  githubUrl?: string;
}

export interface ProjectFilter {
  category: string;
  isActive: boolean;
}