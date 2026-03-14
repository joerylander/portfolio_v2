import type { Testimonial } from '@/models/testimonial';

export type Result = {
  value: string;
  label: string;
};

export type TimelineItem = {
  phase: string;
  duration: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  client: string;
  industry: string;
  projectType?: string;
  year: number;
  durationWeeks?: number;
  deliveredNote?: string;
  featured: boolean;
  tags: string[];
  thumbnailUrl: string | null;
  heroImageUrl?: string | null;
  results: Result[];
  resultPreview: string;
  body?: {
    problem: string;
    approach: string;
    outcome: string;
  };
  images?: {
    beforeUrl: string | null;
    afterUrl: string | null;
  };
  timeline?: TimelineItem[];
  deliverables?: string[];
  testimonial?: Testimonial;
  nextProject?: {
    slug: string;
    title: string;
    resultPreview: string;
  };
};
