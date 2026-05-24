import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const contentLoader = (base: string) =>
  glob({ pattern: '**/[^_]*.{md,mdx}', base });

const tracks = defineCollection({
  loader: contentLoader('./src/content/tracks'),
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
  loader: contentLoader('./src/content/events'),
  schema: z.object({
    date: z.string(),
    time: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    subtitleLink: z.string().optional(),
    location: z.string(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    addressLink: z.string().optional(),
    link: z.string().optional(),
    dayOfWeek: z.string().optional(),
    heroImage: z.string().optional(),
    eventContent: z.string().optional(),
    pubDate: z.coerce.date(),
    /** Omit or set `false` to publish; `true` hides from prod (same as `_` filename prefix). */
    draft: z.boolean().optional(),
  }),
});

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  /** Omit or set `false` to publish; `true` hides from prod (same as `_` filename prefix). */
  draft: z.boolean().optional(),
});

const mdc = defineCollection({
  loader: contentLoader('./src/content/mdc'),
  schema: postSchema,
});

const staticsignal = defineCollection({
  loader: contentLoader('./src/content/staticsignal'),
  schema: postSchema,
});

const allIsNotLost = defineCollection({
  loader: contentLoader('./src/content/allIsNotLost'),
  schema: postSchema,
});

export const collections = { tracks, events, mdc, staticsignal, allIsNotLost };
