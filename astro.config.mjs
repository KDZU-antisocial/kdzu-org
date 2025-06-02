// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  adapter: cloudflare({
    includeFiles: ['./public/**'],
  }),
});