/**
 * Draft / private content (Astro-style `draft` frontmatter + legacy `_` filenames).
 *
 * - `draft: true` → treated as draft.
 * - `draft: false` or omitted → not draft from frontmatter (still draft if `_` filename applies).
 * - Slug or entry id basename starting with `_` → draft (legacy convention).
 */
export type DraftableEntry = {
  id: string;
  data: { draft?: boolean };
};

export function isContentDraft(entry: DraftableEntry): boolean {
  if (entry.data.draft === true) return true;
  if (entry.id.startsWith('_')) return true;
  const base = entry.id.split('/').pop() ?? entry.id;
  return base.startsWith('_');
}

/** Listings and per-entry routes: in dev, drafts are visible; in prod they are excluded. */
export function isPublishedForRuntime(entry: DraftableEntry, dev: boolean): boolean {
  return dev || !isContentDraft(entry);
}

/** For getCollection(..., filter) */
export function publishedContentFilter(dev: boolean) {
  return (entry: DraftableEntry) => isPublishedForRuntime(entry, dev);
}
