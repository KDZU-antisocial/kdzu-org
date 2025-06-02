// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    // This will bundle your static assets with the Worker
    includeFiles: ['./dist/client/**'],
  }),
});