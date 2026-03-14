export type { AboutContent, Project, Result, TimelineItem, Testimonial } from "./api.model";
import type { AboutContent, Project, Testimonial } from "./api.model";

const BASE_URL = import.meta.env.LARAVEL_API_URL;
const TOKEN = import.meta.env.LARAVEL_API_TOKEN;

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}

// --- Raw API types (snake_case from Laravel) ---

type RawTestimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar_url: string | null;
};

type RawProject = {
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
  results: { value: string; label: string }[];
  result_preview: string;
  body?: { problem: string; approach: string; outcome: string };
  images?: { before_url: string | null; after_url: string | null };
  timeline?: { phase: string; duration: string }[];
  deliverables?: string[];
  testimonial?: RawTestimonial;
  next_project?: { slug: string; title: string; result_preview: string };
};

type RawAboutContent = {
  headline: string;
  bio_paragraphs: string[];
  availability_status: boolean;
  availability_note?: string;
};

// --- Mappers ---

function mapTestimonial(raw: RawTestimonial): Testimonial {
  return {
    quote: raw.quote,
    author: raw.author,
    role: raw.role,
    company: raw.company,
    avatarUrl: raw.avatar_url,
  };
}

function mapProject(raw: RawProject): Project {
  return {
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    client: raw.client,
    industry: raw.industry,
    projectType: raw.project_type,
    year: raw.year,
    durationWeeks: raw.duration_weeks,
    deliveredNote: raw.delivered_note,
    featured: raw.featured,
    tags: raw.tags,
    thumbnailUrl: raw.thumbnail_url,
    heroImageUrl: raw.hero_image_url,
    results: raw.results,
    resultPreview: raw.result_preview,
    body: raw.body,
    images: raw.images
      ? { beforeUrl: raw.images.before_url, afterUrl: raw.images.after_url }
      : undefined,
    timeline: raw.timeline,
    deliverables: raw.deliverables,
    testimonial: raw.testimonial ? mapTestimonial(raw.testimonial) : undefined,
    nextProject: raw.next_project
      ? {
          slug: raw.next_project.slug,
          title: raw.next_project.title,
          resultPreview: raw.next_project.result_preview,
        }
      : undefined,
  };
}

function mapAboutContent(raw: RawAboutContent): AboutContent {
  return {
    headline: raw.headline,
    bioParagraphs: raw.bio_paragraphs,
    availabilityStatus: raw.availability_status,
    availabilityNote: raw.availability_note,
  };
}

// --- Projects ---

export async function getAllProjects(): Promise<Project[]> {
  const raw = await apiFetch<RawProject[]>("/api/projects");
  return raw.map(mapProject);
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.featured) ?? null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await apiFetch<RawProject>(`/api/projects/${slug}`);
    return mapProject(raw);
  } catch {
    return null;
  }
}

// --- Testimonials ---

export async function getTestimonials(): Promise<Testimonial[]> {
  const raw = await apiFetch<RawTestimonial[]>("/api/testimonials");
  return raw.map(mapTestimonial);
}

export async function getFirstTestimonial(): Promise<Testimonial | null> {
  const testimonials = await getTestimonials();
  return testimonials[0] ?? null;
}

// --- About ---

export async function getAboutContent(): Promise<AboutContent> {
  const raw = await apiFetch<RawAboutContent>("/api/about");
  return mapAboutContent(raw);
}
