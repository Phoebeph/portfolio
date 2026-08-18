import { createClient, type SanityClient } from "@sanity/client";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || "production";

export const hasSanityConfig = Boolean(projectId);

/**
 * Server-side Sanity client. Because SANITY_PROJECT_ID/SANITY_DATASET have
 * no PUBLIC_ prefix, Astro keeps them out of the client JS bundle — they
 * only exist while `.astro` frontmatter runs on the server/at build time.
 *
 * `@sanity/client` throws immediately if constructed without a projectId,
 * so this stays `null` until the env vars are set (i.e. before the user
 * has created a Sanity project) — callers must check `hasSanityConfig`
 * first, which every query in queries.ts does.
 */
export const sanityClient: SanityClient | null = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      // The CDN serves cached, fast responses — fine for a build-time read
      // where a few minutes of staleness is irrelevant.
      useCdn: true,
    })
  : null;
