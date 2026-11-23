// All TypeScript types matching the DB schema

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_desc: string | null;
  long_desc: string | null;
  category: string | null;
  badge: string | null;
  github_url: string | null;
  demo_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  status: 'draft' | 'published';
  sort_order: number;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  sort_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category_id: string | null;
  category_name: string | null;
  tag: string | null;
  description: string | null;
  level: number;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  icon: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string | null;
  field: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  gpa: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  location: string | null;
  exp_type: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Research {
  id: string;
  title: string;
  authors: string | null;
  publication: string | null;
  year: number | null;
  url: string | null;
  doi: string | null;
  abstract_text: string | null;
  status: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  original_name: string | null;
  url: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export interface DashboardStats {
  projects: { total: number; published: number };
  skills: number;
  achievements: number;
  education: number;
  experience: number;
  research: number;
  media: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export type ApiResponse<T> = { data: T } | { error: string };
