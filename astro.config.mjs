import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  trailingSlash: 'always',
  // Avoid default cloudflare-kv-binding for sessions (requires SESSION KV in wrangler-astro.toml).
  // This site does not use Astro.locals.session; memory driver is enough and prevents Worker 1101 crashes.
  session: {
    driver: 'memory',
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  image: {
    // Use compile service for Cloudflare Workers (Sharp not supported at runtime)
    service: {
      entrypoint: 'astro/assets/services/compile'
    }
  },
  integrations: [
    mdx({
      components: {
        VimeoVideo: './src/components/VideoPlayer.astro',
        AudioPlayer: './src/components/AudioPlayer.astro'
      }
    })
  ]
});