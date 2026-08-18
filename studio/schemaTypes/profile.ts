import { defineField, defineType } from "sanity";

/**
 * Singleton document — there is only ever one "profile". The Studio
 * structure (see sanity.config.ts) pins editors to a single fixed-id
 * document instead of a normal list, so nobody can accidentally create two.
 */
export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / title",
      description: 'e.g. "Frontend Developer"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Hero tagline",
      description: "One sentence shown large in the hero section.",
      type: "string",
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      description: "2-4 sentences used in the introduction section.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: {
                list: ["GitHub", "LinkedIn", "Twitter / X", "Other"],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
