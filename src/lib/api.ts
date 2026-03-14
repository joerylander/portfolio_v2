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

// --- Types ---

// --- Projects ---

export async function getAllProjects(): Promise<Project[]> {
  return apiFetch<Project[]>("/api/projects");
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.featured) ?? null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/api/projects/${slug}`);
  } catch {
    return null;
  }
}

// --- Testimonials ---

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>("/api/testimonials");
}

export async function getFirstTestimonial(): Promise<Testimonial | null> {
  const testimonials = await getTestimonials();
  return testimonials[0] ?? null;
}

// --- About ---

export async function getAboutContent(): Promise<AboutContent> {
  return apiFetch<AboutContent>("/api/about");
}
