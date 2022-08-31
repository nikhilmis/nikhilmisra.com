export const imageId = (uniqueTitle: string, index: number) => `${uniqueTitle}-${index}`;
export const imageAnchor = (uniqueTitle: string, index: number) => `#${imageId(uniqueTitle, index)}`;