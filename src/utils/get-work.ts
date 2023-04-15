import { getCollection } from "astro:content";

export async function getWork() {
  const work = await getCollection('work');
  
  return work.sort((a, b) => a.data.position - b.data.position);
}