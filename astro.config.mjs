import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://glasgowdrainunblocker.co.uk',
  integrations: [
    sitemap(),
    tailwind(),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
});
