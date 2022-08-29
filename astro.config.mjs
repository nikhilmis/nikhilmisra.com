import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://oleskaar.github.io',
    integrations: [mdx()],
});
