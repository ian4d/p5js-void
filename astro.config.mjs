// @ts-check
import { defineConfig } from 'astro/config';
import dynamicImport from 'astro-dynamic-import'

// https://astro.build/config
export default defineConfig({
  site: 'https://ian4d.github.io',
  base: '/p5js-void',
  integrations: [dynamicImport()]
})
