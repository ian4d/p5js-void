// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Define your collection(s)
const sketches = defineCollection({
    loader: glob({ pattern: '**/**/*.md', base: 'src/sketches' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        thumbnail: image().optional(),
    }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { sketches };