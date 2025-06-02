// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  adapter: cloudflare({
    includeFiles: ['./public/**'],
  }),
  build: {
    assets: 'https://assets.kdzu.org/_astro/', // <-- Add this line
  },
});