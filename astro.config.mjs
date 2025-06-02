import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  adapter: cloudflare({
    includeFiles: ['./public/**'],
  }),
  build: {
    assets: 'https://assets.kdzu.org/_astro/', // Point to your R2 asset Worker domain
  },
});