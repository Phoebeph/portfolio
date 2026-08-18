import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Sanity's Vite-based dev server only exposes env vars prefixed with
// SANITY_STUDIO_ to the browser — see studio/.env.example.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID. Copy .env.example to .env and fill in your project ID from sanity.io/manage.",
  );
}

export default defineConfig({
  name: "default",
  title: "Portfolio",

  projectId,
  dataset,

  plugins: [
    // The main editing UI. Customized below so "Profile" behaves as a
    // singleton: one fixed document, not a creatable/deletable list.
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Profile")
              .id("profile")
              .child(
                S.document().schemaType("profile").documentId("profile"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "profile",
            ),
          ]),
    }),
    // A GROQ query playground, handy while we build queries for the Astro site.
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
