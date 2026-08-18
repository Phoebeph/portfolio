/**
 * Hand-written types mirroring the schemas in studio/schemaTypes.
 * These two places (Studio schema, these types) have to stay in sync
 * manually — Sanity's own `typegen` tool can generate this file from your
 * schema + queries later; hand-written is simpler while the schema is small.
 */

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SocialLink {
  platform: "GitHub" | "LinkedIn" | "Twitter / X" | "Other";
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline?: string;
  bio?: string;
  email?: string;
  resumeUrl?: string;
  socialLinks?: SocialLink[];
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  techStack?: string[];
  image?: SanityImage;
  repoUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  _id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  summary?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  externalUrl: string;
}
