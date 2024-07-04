import { getCollection } from "astro:content";
import type { CollectionEntry } from 'astro:content';

export async function getWork(): Promise<CollectionEntry<'work'>[]> {
  const work: CollectionEntry<'work'>[] = await getCollection('work');
  
  return work.sort((a, b) => a.data.position - b.data.position);
}