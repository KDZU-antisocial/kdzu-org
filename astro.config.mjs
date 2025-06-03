import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  build: {
    assets: 'https://static.kdzu.org/_astro'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/compile'
    }
  },
  integrations: [mdx()],
});