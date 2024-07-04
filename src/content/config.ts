import { z, defineCollection } from 'astro:content';

export const imageRegex = 'jpg|png'
export const videoRegex = 'mp4'

const workCollection = defineCollection({
    schema: ({ image }) => z.object({
        layout: z.string(),
        title: z.string(),
        keywords: z.string(),
        year: z.string(),
        preview: image().optional(),
        previewVideoSrc: z.string().optional().nullable(),
        previewAlt: z.string().optional(),
        position: z.number(),
    }),
});

//    This key should match your collection directory name in "src/content"
export const collections = {
    work: workCollection,
};
