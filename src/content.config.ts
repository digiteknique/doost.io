import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const coordinates = z.object({
  lat: z.number(),
  lng: z.number(),
  label: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      adventure: reference('adventures').optional(),
      coordinates: coordinates.optional(),
    }),
});

const adventures = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/adventures' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      meta: z.string(),
      description: z.string(),
      dateRange: z
        .object({
          start: z.coerce.date(),
          end: z.coerce.date().optional(),
        })
        .optional(),
      coordinates: coordinates.optional(),
      accommodations: z.union([z.string(), z.array(z.object({ name: z.string(), href: z.string().optional() }))]).optional(),
      companions: z.union([z.string(), z.array(z.string())]).optional(),
      status: z.enum(['upcoming', 'completed']).optional(),
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      meta: z.string(),
      description: z.string(),
      stack: z.array(z.string()).default([]),
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      order: z.number().default(0),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
    }),
});

export const collections = { blog, projects, adventures };
