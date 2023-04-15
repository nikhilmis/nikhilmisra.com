import { z, defineCollection } from 'astro:content';

export const imageRegex = 'jpg|png'
export const videoRegex = 'mp4'

const workCollection = defineCollection({
    schema: z.object({
        layout: z.string(),
        title: z.string(),
        keywords: z.string(),
        year: z.string(),
        preview: z.object({
          src: z.string(),
          alt: z.string().optional().nullable(),
        }),
        position: z.number(),
    }),
});

//    This key should match your collection directory name in "src/content"
export const collections = {
    work: workCollection,
};
