import { defineCliConfig } from "sanity/cli";

// Separate from sanity.config.ts: the CLI reads this file to know which
// project/dataset to target for `sanity dev`, `sanity deploy`, etc.,
// before the Studio app itself even starts.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
});
