## Why

Trips are currently held together by three uncoordinated mechanisms that all have to be kept in sync by hand: a `travel` tag convention, a `series` field on child blog posts pointing back at a hub post's own slug, and a hand-written array (`src/data/adventures.ts`) that curates which trips show up on the homepage. Nothing enforces agreement between them, so a forgotten tag, a mistyped `series.slug`, or a missed homepage entry silently breaks the trip. Formalizing trips as a first-class `adventures` collection — mirroring how `projects` already solves the same "curated hub + linked detail posts" shape — removes the drift risk and gives trips real metadata (dates, location, logistics) instead of squeezing them into blog post frontmatter.

## What Changes

- Add a new `adventures` content collection, structurally mirroring `projects`: its own schema, its own detail pages, and its own MDX body for the trip recap.
- Add new routes `/adventures/` (index) and `/adventures/[...slug]` (detail), mirroring `/projects/` and `/projects/[...slug]`.
- Homepage "adventures" section now queries the `adventures` collection instead of a static array. **BREAKING**: `src/data/adventures.ts` is removed.
- Blog schema change: the generic `series: { title, slug }` field is replaced with `adventure: z.string().optional()`, a reference to an adventure entry's id. **BREAKING** frontmatter change — existing posts using `series` must migrate.
- Existing trip hub posts (`bonaire-may-2026`, `philippines-whale-sharks-2025`) move out of `blog` entirely; their recap content becomes the new `adventures` entries' own MDX body. **BREAKING**: these move from `/blog/<slug>/` to `/adventures/<slug>/`, and drop out of `/blog`, `/blog/tags`, and the RSS feed.
- Add adventure metadata fields: `dateRange` (start/end), `coordinates` (an optional overall trip pin), `accommodations`, `companions`, `status` (`upcoming` | `completed`), and `links[]` (reusing the existing `projects.links` shape).
- Add an optional `coordinates` field to blog posts. When a post references an adventure via `adventure` and also sets `coordinates`, that pin is folded into the parent adventure's map alongside its own overall pin.
- Adventure detail pages render the set of pins derived from the adventure's own `coordinates` plus any child posts' `coordinates`.
- Blog post breadcrumbs update to link back to `/adventures/<slug>/` (via the `adventure` field) instead of resolving a `series.slug` to another blog post.

## Capabilities

### New Capabilities
- `adventures`: the adventures content collection, its routes, homepage integration, trip metadata, and derived-membership/map behavior linking it to child blog posts.

### Modified Capabilities
_None — no existing specs in this project yet; blog's schema change is captured as impact below rather than a spec delta._

## Impact

- `src/content.config.ts` — new `adventures` collection schema; `blog` schema modified (`series` removed, `adventure` and `coordinates` added).
- `src/data/adventures.ts` — removed.
- New: `src/pages/adventures/index.astro`, `src/pages/adventures/[...slug].astro`.
- `src/pages/index.astro` — homepage adventures section switches from static array to collection query.
- `src/pages/blog/[...slug].astro` — breadcrumb logic updated to use `adventure` instead of `series`.
- Content migration: move `src/content/blog/bonaire-may-2026/` and `src/content/blog/philippines-whale-sharks-2025/` into `src/content/adventures/`; update `bonaire-dive-1..5` frontmatter (`series` → `adventure: bonaire-may-2026`).
- No mapping/geo library currently in the project — introducing one (or deciding to render pins without one) is a decision for design.md.
