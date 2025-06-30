
// TypeScript type definitions untuk aplikasi portofolio dan blog

export interface Post {
  id: string;
  title: string;
  content: string;
  summary: string;
  created_at: string;
  slug: string;
  author?: string;
  tags?: string[];
  featured_image?: string;
  reading_time?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  description?: string;
}

// Utility types
export type Theme = 'light' | 'dark';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface BlogPostMeta {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}
