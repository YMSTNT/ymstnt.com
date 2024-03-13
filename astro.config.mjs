import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://ymstnt.com',
  redirects: {
    '/érettségi': '/erettsegi',
    '/egyetem': '/uni',
    '/university': '/uni'
  },
  integrations: [tailwind()]
});