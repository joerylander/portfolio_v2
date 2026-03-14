export type Project = {
  slug: string;
  title: string;
  summary: string;
  client: string;
  industry: string;
  project_type?: string;
  year: number;
  duration_weeks?: number;
  delivered_note?: string;
  featured: boolean;
  tags: string[];
  thumbnail_url: string | null;
  hero_image_url?: string | null;
  results: Result[];
  result_preview: string;
  body?: {
    problem: string;
    approach: string;
    outcome: string;
  };
  images?: {
    before_url: string | null;
    after_url: string | null;
  };
  timeline?: TimelineItem[];
  deliverables?: string[];
  testimonial?: Testimonial;
  next_project?: {
    slug: string;
    title: string;
    result_preview: string;
  };
};

export type Result = {
  value: string;
  label: string;
};

export type TimelineItem = {
  phase: string;
  duration: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar_url: string | null;
};

export type AboutContent = {
  bio: string;
  availability: boolean;
  availability_note?: string;
};
