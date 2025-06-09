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
    artistLink: z.string().optional(),
    label: z.string(),
    labelLink: z.string().optional(),
    heroImage: z.string(),
    youtube: z.string().optional(),
    bandcamp: z.string().optional(),
    spotify: z.string().optional(),
    pubDate: z.coerce.date(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    time: z.string(),
    title: z.string(),
    location: z.string(),
    link: z.string().optional(),
    pubDate: z.coerce.date(),
  })
});

export const collections = { blog, tracks, events };