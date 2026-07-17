## Context

doost.io is an Astro static site (Cloudflare Pages) with two content collections today: `blog` (chronological log posts — tags, optional hero image) and `projects` (curated project cards, each with its own schema, its own detail route, and its own MDX body, optionally linking out to a blog post for a deeper build log).

Trips are currently *not* a collection. A trip is held together by three uncoordinated, hand-maintained signals: a `travel` tag on a "hub" blog post, an optional `series: { title, slug }` field on child posts pointing back at that hub post's own slug, and a hand-written array (`src/data/adventures.ts`) that drives the homepage's "adventures" section. Nothing enforces agreement between the three. This works today because there are only two trips (Bonaire, May 2026 — five dive posts plus one hub post; Philippines whale sharks, 2025 — a single post with no children), but it doesn't scale and has already produced duplicated data (the trip title lives on every child post's `series.title`).

## Goals / Non-Goals

**Goals:**
- Model adventures as a first-class collection, structurally consistent with how `projects` already works (own schema, own detail route, own MDX body).
- Eliminate the hand-maintained homepage array in favor of deriving the homepage list from the collection.
- Eliminate the `series.slug` back-reference in favor of a single `adventure` field on blog posts as the one source of truth for trip membership.
- Support richer trip metadata: date range, an overall coordinate pin, accommodations, companions, status, and links.
- Support a derived set of map pins per adventure: its own overall pin plus any pins set on its child posts.

**Non-Goals:**
- Building an interactive map widget with a third-party JS map library. Whether/how pins render visually (vs. as a coordinate/text list) is deferred — see Open Questions.
- Filtering or special homepage treatment based on `status` or `companions` beyond the fields existing.
- Unifying `adventures` and `projects` into a shared abstraction — they remain independently-defined collections even though they share shape.
- Preserving the old `/blog/<slug>/` URLs for the two migrated hub posts. No redirects are added.

## Decisions

**1. Adventure schema mirrors `projects`, plus adventure-specific fields.**
`title`, `meta` (free text), `description`, `draft`, `heroImage`/`heroImageAlt`, and an own MDX body — same shape as `projects`. Adventure-specific additions: `dateRange` (optional `{ start, end }`), `coordinates` (optional overall pin), `accommodations` (optional), `companions` (optional), `status` (`'upcoming' | 'completed'`, optional), `links[]` (same shape as `projects.links`).
*Alternative considered:* invent a bespoke shape for adventures. Rejected — reusing a proven pattern from this codebase is simpler and keeps the two collections easy to reason about side by side.

**2. Membership is derived, not stored on the adventure.**
Blog posts declare `adventure: <adventure-id>` in frontmatter (replacing `series`). An adventure's detail page queries `blog` for posts where `data.adventure === entry.id`, sorted by date.
*Alternative considered:* keep an explicit `links[]` array on the adventure enumerating its child posts, exactly like `projects` does for its build log. Rejected — this reintroduces a manual sync point, which is the exact failure mode (three sources of truth that must agree) this change exists to remove.

**3. `meta` stays free text; `dateRange` is separate structured data.**
`meta` (e.g. `"MAY 2026 · BONAIRE"`) is written by hand for display, same as `projects.meta`. `dateRange` is optional structured data available for future use (sorting, a timeline view) but does not drive `meta`'s formatting.
*Alternative considered:* derive `meta`'s display string from `dateRange`. Rejected as unnecessary formatting logic for a two-entry collection; free text is simpler and matches the existing `projects` convention.

**4. Coordinates are a union of the adventure's own pin and its children's pins.**
An adventure has an optional single `coordinates` field. A blog post has an optional single `coordinates` field. An adventure's rendered pin set is its own coordinate (if set) plus each child post's coordinate (if set).
*Rationale:* a childless adventure (whale sharks) still needs a pin; a multi-post adventure (Bonaire) benefits from per-dive-site pins without forcing every child post to carry one.

**5. Full separation from `blog`.**
Adventure recap content (currently `bonaire-may-2026` and `philippines-whale-sharks-2025` blog posts) moves entirely into the `adventures` collection as each entry's own MDX body. Only per-day/per-dive detail posts remain in `blog`.
*Rationale:* matches the existing `projects`/`blog` relationship exactly — a project's card and body live in `projects`, never in `blog`; only its optional build-log post does. Removes the ambiguity of a "hub post" that's really a trip recap wearing a blog-post costume.

**6. Blog's `adventure` field uses Astro's content `reference('adventures')`, not a bare string.**
Using a typed content reference means an invalid or renamed adventure id is caught at Astro build time instead of silently producing a dead link.
*Alternative considered:* `z.string().optional()`. Rejected — since adventure slugs may change over time (nothing external permalinks them), a typed reference catches breakage at build time for free.

## Risks / Trade-offs

- [Risk] Hand-migrating existing content (moving 2 posts, retagging 5 dive posts) is manual and error-prone → [Mitigation] Enumerate exact file moves and frontmatter diffs as discrete checklist items in tasks.md.
- [Risk] No map-rendering decision yet; pins may ship as a plain coordinate/text list rather than a visual map → [Mitigation] Acceptable for this change — ship the derived pin *data* correctly now; treat actual map visualization as a follow-up once the data shape is proven.
- [Risk] Breaking `/blog/<slug>/` URLs for the two migrated posts, with no redirects → [Mitigation] Explicitly acceptable per this project's current stance that nothing is externally permalinked; revisit with Cloudflare Pages redirects if that stance changes.
- [Risk] `reference('adventures')` couples blog's schema to the adventures collection's existence → [Mitigation] Field stays optional; blast radius is contained to `src/content.config.ts`.

## Migration Plan

1. Update `src/content.config.ts`: add the `adventures` collection schema; update the `blog` schema (remove `series`, add `adventure: reference('adventures').optional()` and `coordinates`).
2. Create `src/content/adventures/bonaire-may-2026/` and `src/content/adventures/philippines-whale-sharks-2025/` — move recap content and hero images from their current `blog` locations; add the new frontmatter fields (`meta`, `dateRange`, `coordinates`, `accommodations`, `companions`, `status`, `links`).
3. Update `bonaire-dive-1` through `bonaire-dive-5` frontmatter: replace the `series` block with `adventure: bonaire-may-2026`; optionally add per-dive `coordinates`.
4. Delete the two migrated posts from `src/content/blog/`.
5. Build `src/pages/adventures/index.astro` and `src/pages/adventures/[...slug].astro`, mirroring the `projects` routes, including derived pin rendering.
6. Update `src/pages/index.astro`'s adventures section to query the `adventures` collection; delete `src/data/adventures.ts`.
7. Update `src/pages/blog/[...slug].astro` breadcrumb logic to resolve `adventure` instead of `series`.
8. Verify `/blog`, `/blog/tags/*`, and `rss.xml.js` no longer reference the migrated posts; verify the homepage and `/adventures` render correctly.

## Open Questions

- Should pins eventually render on an actual map (static Leaflet, lightweight SVG, or a link out to a maps service), or stay a coordinate/text list indefinitely?
- Should `status: upcoming` adventures be visually distinguished on the homepage, or included in the same list as completed ones?
- Is `companions` sufficient as free text long-term, or will it eventually want structure (e.g. links to a person)?
- Should `projects` and `adventures` eventually share a base schema/component given how closely they mirror each other, or is the duplication acceptable indefinitely?
