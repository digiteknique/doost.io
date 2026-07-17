## 1. Content Schema

- [x] 1.1 Add the `adventures` collection to `src/content.config.ts` with fields: `title`, `meta`, `description`, `dateRange` (optional `{ start, end }`), `coordinates` (optional `{ lat, lng, label? }`), `accommodations` (optional), `companions` (optional), `status` (optional `'upcoming' | 'completed'`), `links` (array, default empty), `draft` (default false), `heroImage`/`heroImageAlt` (optional)
- [x] 1.2 Update the `blog` collection schema: remove `series`, add `adventure: reference('adventures').optional()` and `coordinates` (optional `{ lat, lng }`)

## 2. Content Migration

- [x] 2.1 Create `src/content/adventures/bonaire-may-2026/` — move recap body and hero image from `src/content/blog/bonaire-may-2026/`, add new frontmatter (`meta`, `dateRange`, `coordinates`, `accommodations`, `companions`, `status`, `links`)
- [x] 2.2 Create `src/content/adventures/philippines-whale-sharks-2025/` — move recap body and hero image from `src/content/blog/philippines-whale-sharks-2025/`, add new frontmatter
- [x] 2.3 Delete the two migrated posts from `src/content/blog/`
- [x] 2.4 Update `bonaire-dive-1` through `bonaire-dive-5` frontmatter: replace `series` block with `adventure: bonaire-may-2026`; add per-dive `coordinates` where known
- [x] 2.5 Update `philippines-whale-sharks-2025` (if any other posts referenced its old series, none currently) — confirm no other blog posts reference the removed `series` field

## 3. Adventures Routes

- [x] 3.1 Create `src/pages/adventures/index.astro` listing all non-draft adventures, mirroring `src/pages/projects/index.astro`
- [x] 3.2 Create `src/pages/adventures/[...slug].astro` detail page, mirroring `src/pages/projects/[...slug].astro` (breadcrumb, hero image, body content, links list)
- [x] 3.3 On the adventure detail page, derive child blog posts via `getCollection('blog', post => post.data.adventure?.id === entry.id)`, sorted by date
- [x] 3.4 On the adventure detail page, derive the pin set as the union of the adventure's own `coordinates` and each child post's `coordinates`; render the derived pins (as a list, not a visual map, per design.md non-goals)

## 4. Homepage and Blog Integration

- [x] 4.1 Update `src/pages/index.astro`'s "adventures" section to query the `adventures` collection (sorted appropriately) instead of importing `src/data/adventures.ts`
- [x] 4.2 Delete `src/data/adventures.ts`
- [x] 4.3 Update `src/pages/blog/[...slug].astro` breadcrumb logic: resolve `post.data.adventure` to build a link to `/adventures/<id>/`, replacing the `series.slug` breadcrumb logic

## 5. Verification

- [x] 5.1 Run the dev server and confirm `/adventures/` and `/adventures/bonaire-may-2026/` and `/adventures/philippines-whale-sharks-2025/` render correctly, including derived child posts and pins
- [x] 5.2 Confirm the homepage "adventures" section renders both migrated adventures without referencing `src/data/adventures.ts`
- [x] 5.3 Confirm `/blog/`, `/blog/tags/*`, and `rss.xml` no longer list the two migrated posts
- [x] 5.4 Confirm each `bonaire-dive-*` post's breadcrumb links to `/adventures/bonaire-may-2026/`
- [x] 5.5 Run `npm run build` and confirm it succeeds with no broken content references
