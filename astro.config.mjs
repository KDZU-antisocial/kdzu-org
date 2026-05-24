import { defineConfig, sessionDrivers } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  trailingSlash: 'always',
  // Avoid default cloudflare-kv-binding for sessions (requires SESSION KV in wrangler-astro.toml).
  // This site does not use Astro.locals.session; memory driver is enough and prevents Worker 1101 crashes.
  session: {
    driver: sessionDrivers.memory(),
  },
  adapter: cloudflare({
    // Use Astro's wrangler config, not wrangler-static.toml (static R2 proxy worker).
    configPath: './wrangler.astro.toml',
    imageService: 'compile',
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