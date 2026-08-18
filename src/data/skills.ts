/**
 * Technical skills live in code, not Sanity. Unlike Projects or Experience,
 * this is a fixed taxonomy that changes rarely and benefits more from
 * type-checking and version control (a PR + diff) than from being editable
 * by a non-technical person at 11pm.
 */
export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript (ES2023)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Astro", "Next.js"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "CSS Modules", "Responsive Design"],
  },
  {
    category: "Tooling",
    items: ["Vite", "Git", "npm", "ESLint / Prettier"],
  },
  {
    category: "Testing & Quality",
    items: ["Playwright", "Accessibility (WCAG 2.1 AA)"],
  },
  {
    category: "CMS & Data",
    items: ["Sanity", "GROQ", "REST APIs"],
  },
];
