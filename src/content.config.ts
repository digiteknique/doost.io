import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
      series: z
        .object({
          title: z.string(),
          slug: z.string(),
        })
        .optional(),
    }),
});

export const collections = { blog };
