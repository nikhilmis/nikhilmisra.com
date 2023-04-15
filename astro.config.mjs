import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    site: 'https://nikhilmisra.com',
    integrations: [mdx(), image({ serviceEntryPoint: '@astrojs/image/sharp' }), svelte()],
});
