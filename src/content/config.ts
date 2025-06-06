import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const tracks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    label: z.string(),
    labelLink: z.string().url().optional(),
    youtube: z.string().url().optional(),
    bandcamp: z.string().url().optional(),
    spotify: z.string().url().optional(),
    pubDate: z.coerce.date(),
    heroImage: z.string(),
  }),
});

export const collections = { blog, tracks };