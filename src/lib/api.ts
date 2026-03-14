export type { Project, Result, TimelineItem } from "@/models/project";
export type { Testimonial } from "@/models/testimonial";
export type { AboutContent } from "@/models/about";
export type { ContactFormData, ContactResponse } from "@/models/contact";

import type { Project } from "@/models/project";
import type { Testimonial } from "@/models/testimonial";
import type { AboutContent } from "@/models/about";

const BASE_URL = import.meta.env.LARAVEL_API_URL;
const TOKEN = import.meta.env.LARAVEL_API_TOKEN;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiRecord = Record<string, any>;

async function apiFetch(path: string): Promise<ApiRecord | ApiRecord[]> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} on ${path}`);
  }

  return res.json();
}

// --- Mappers ---

function mapTestimonial(raw: ApiRecord): Testimonial {
  return {
    quote: raw.quote,
    author: raw.author,
    role: raw.role,
    company: raw.company,
    avatarUrl: raw.avatar_url,
  };
}

function mapProject(raw: ApiRecord): Project {
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

function mapAboutContent(raw: ApiRecord): AboutContent {
  return {
    headline: raw.headline,
    bioParagraphs: raw.bio_paragraphs,
    availabilityStatus: raw.availability_status,
    availabilityNote: raw.availability_note,
  };
}

// --- Projects ---

export async function getAllProjects(): Promise<Project[]> {
  const raw = await apiFetch("/api/projects") as ApiRecord[];
  return raw.map(mapProject);
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.featured) ?? null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await apiFetch(`/api/projects/${slug}`) as ApiRecord;
    return mapProject(raw);
  } catch {
    return null;
  }
}

// --- Testimonials ---

export async function getTestimonials(): Promise<Testimonial[]> {
  const raw = await apiFetch("/api/testimonials") as ApiRecord[];
  return raw.map(mapTestimonial);
}

export async function getFirstTestimonial(): Promise<Testimonial | null> {
  const testimonials = await getTestimonials();
  return testimonials[0] ?? null;
}

// --- About ---

export async function getAboutContent(): Promise<AboutContent> {
  const raw = await apiFetch("/api/about") as ApiRecord;
  return mapAboutContent(raw);
}
