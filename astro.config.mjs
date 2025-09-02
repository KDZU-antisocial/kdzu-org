import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kdzu.org',
  output: 'server',
  trailingSlash: 'always',
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