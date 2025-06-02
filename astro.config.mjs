import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  build: {
    assets: isProd
      ? 'https://static.kdzu.org/_astro'
      : 'http://localhost:4000',
  },
});