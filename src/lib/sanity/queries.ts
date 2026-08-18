import { sanityClient, hasSanityConfig } from "./client";
import type { Profile, Project, Experience, Article } from "./types";

// GROQ note: `slug.current` pulls the string out of Sanity's { current, _type }
// slug object; `"slug": slug.current` renames that projected field to `slug`
// so consumers don't need to know about the CMS's internal shape.

const PROFILE_QUERY = /* groq */ `
  *[_type == "profile"][0]{
    name, role, tagline, bio, email, resumeUrl, socialLinks
  }
`;

const FEATURED_PROJECTS_QUERY = /* groq */ `
  *[_type == "project" && featured == true] | order(order asc) {
    _id, title, "slug": slug.current, description, techStack, image, repoUrl, liveUrl
  }
`;

const EXPERIENCE_QUERY = /* groq */ `
  *[_type == "experience"] | order(order asc) {
    _id, role, organization, startDate, endDate, summary
  }
`;

const LATEST_ARTICLES_QUERY = /* groq */ `
  *[_type == "article"] | order(publishedAt desc) [0...3] {
    _id, title, "slug": slug.current, excerpt, publishedAt, externalUrl
  }
`;

/**
 * Honest placeholder copy, not a fabricated persona — shown only until the
 * profile document is filled in via Sanity Studio. Fields present in the
 * fetched document override these one-by-one.
 */
const DEFAULT_PROFILE: Profile = {
  name: "Your Name",
  role: "Frontend Developer",
  tagline: "Add a one-line tagline for the hero section in Sanity Studio.",
  bio: "Add a short bio in Sanity Studio — this is where a 2-4 sentence introduction will appear.",
};

export async function getProfile(): Promise<Profile> {
  if (!hasSanityConfig || !sanityClient) return DEFAULT_PROFILE;
  const profile = await sanityClient.fetch<Profile | null>(PROFILE_QUERY);
  return { ...DEFAULT_PROFILE, ...profile };
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!hasSanityConfig || !sanityClient) return [];
  return sanityClient.fetch<Project[]>(FEATURED_PROJECTS_QUERY);
}

export async function getExperience(): Promise<Experience[]> {
  if (!hasSanityConfig || !sanityClient) return [];
  return sanityClient.fetch<Experience[]>(EXPERIENCE_QUERY);
}

export async function getLatestArticles(): Promise<Article[]> {
  if (!hasSanityConfig || !sanityClient) return [];
  return sanityClient.fetch<Article[]>(LATEST_ARTICLES_QUERY);
}
