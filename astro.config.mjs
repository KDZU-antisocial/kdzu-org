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
    service: {
      entrypoint: 'astro/assets/services/compile'
    }
  },
  integrations: [
    mdx({
      components: {
        VimeoVideo: './src/components/VimeoVideo.astro',
        AudioPlayer: './src/components/AudioPlayer.astro'
      }
    })
  ]
});