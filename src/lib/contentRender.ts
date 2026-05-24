import { render, type CollectionEntry, type CollectionKey } from 'astro:content';

export async function renderEntries<T extends CollectionKey>(
  entries: CollectionEntry<T>[],
) {
  return Promise.all(
    entries.map(async (entry) => ({
      entry,
      rendered: await render(entry),
    })),
  );
}
