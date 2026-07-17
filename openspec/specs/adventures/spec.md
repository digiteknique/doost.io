# adventures Specification

## Purpose

Trips (adventures) are modeled as a first-class content collection alongside `blog` and `projects`, with routes, homepage integration, and metadata for date range, location, accommodations, companions, and status. Blog posts declare membership in an adventure via a single `adventure` reference field rather than a hand-maintained curation list.

## Requirements

### Requirement: Adventure Collection Schema
The system SHALL provide an `adventures` content collection where each entry has: `title`, `meta` (free text), `description`, `dateRange` (optional `{ start, end }`), `coordinates` (optional overall pin), `accommodations` (optional), `companions` (optional), `status` (optional, one of `upcoming` or `completed`), `links` (array, default empty, each `{ label, href }`), `draft` (boolean, default false), `heroImage`/`heroImageAlt` (optional), and its own MDX/Markdown body content.

#### Scenario: Adventure entry renders its own recap
- **WHEN** a non-draft adventure entry exists
- **THEN** its detail page renders the entry's title, meta, description, and its own body content

### Requirement: Adventure Detail Page
The system SHALL provide a detail route for each non-draft adventure at `/adventures/<id>/`, following the same page structure as the existing `/projects/<id>/` route (breadcrumb, optional hero image, body content, optional links list).

#### Scenario: Draft adventures are not routable
- **WHEN** an adventure entry has `draft: true`
- **THEN** the system SHALL NOT generate a public route for that entry

### Requirement: Adventures Index Page
The system SHALL provide an `/adventures/` index page listing all non-draft adventures.

#### Scenario: Index lists all published adventures
- **WHEN** the `/adventures/` page is requested
- **THEN** it SHALL display every adventure entry where `draft` is not `true`

### Requirement: Homepage Adventures Section Derived From Collection
The homepage's "adventures" section SHALL be derived by querying the `adventures` collection rather than a separate static data file.

#### Scenario: New adventure appears without homepage code changes
- **WHEN** a new non-draft adventure entry is added to the collection
- **THEN** it SHALL appear in the homepage's adventures section without any change to homepage code or a separate curation file

### Requirement: Blog Post Adventure Membership
The `blog` collection schema SHALL support an optional `adventure` field referencing an adventure entry's id, replacing the removed `series` field. A blog post MAY set this field to declare its membership in an adventure.

#### Scenario: Adventure derives its child posts from blog membership
- **WHEN** one or more blog posts have `adventure` set to a given adventure's id
- **THEN** that adventure's detail page SHALL derive and list those posts as its children, without the adventure entry itself enumerating them

#### Scenario: Blog post breadcrumb links to its adventure
- **WHEN** a blog post has `adventure` set
- **THEN** its breadcrumb SHALL link to that adventure's `/adventures/<id>/` page

### Requirement: Derived Adventure Map Pins
An adventure's detail page SHALL derive its set of map pins as the union of the adventure's own optional `coordinates` and the optional `coordinates` of each blog post that references it via `adventure`.

#### Scenario: Adventure with only its own pin
- **WHEN** an adventure has `coordinates` set and no child blog post sets `coordinates`
- **THEN** its detail page SHALL show exactly one pin — the adventure's own

#### Scenario: Adventure with its own pin plus child pins
- **WHEN** an adventure has `coordinates` set and one or more child blog posts also set `coordinates`
- **THEN** its detail page SHALL show the adventure's pin plus each child post's pin

#### Scenario: Adventure with only child pins
- **WHEN** an adventure has no `coordinates` set but at least one child blog post sets `coordinates`
- **THEN** its detail page SHALL show only the child posts' pins

#### Scenario: Adventure with no pins
- **WHEN** an adventure has no `coordinates` set and no child blog post sets `coordinates`
- **THEN** its detail page SHALL show no pins

### Requirement: Blog and Adventures Remain Separate Surfaces
Adventure recap content SHALL NOT appear in the `blog` collection, the blog listing, blog tag pages, or the RSS feed.

#### Scenario: Migrated adventure recap does not appear on blog surfaces
- **WHEN** an adventure's recap content has been migrated into the `adventures` collection
- **THEN** it SHALL NOT appear at `/blog/`, at any `/blog/tags/*` page, or in the RSS feed
