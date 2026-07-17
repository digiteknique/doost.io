---
title: Updates to koppmechanical.com
date: 2026-07-16
description: A real brand identity, a working contact form, and a fixed mobile header for my brother's HVAC site.
tags: [web, kopp-mechanical, hvac]
draft: false
---

Pushed a round of updates to [koppmechanical.com](https://koppmechanical.com), the static site I built for my brother Shayne's new HVAC business ([repo](https://github.com/digiteknique/koppmechanical.com)). It's been live with placeholder content since the initial build — this round starts replacing that with the real thing.

## Contact form that actually goes somewhere

The contact form was calling `preventDefault()` and showing a success toast without submitting anywhere — a genuine inquiry would have just vanished. The plan is to eventually route leads into a CRM (Housecall Pro or Jobber, once Shayne picks one), but that's a later decision with its own trial period. In the meantime, submissions now go out through Formspree's free tier via an AJAX POST, so the on-page success message still fires the same way but an actual email lands in the inbox. Explicitly a stopgap — it's built to be swapped out, not extended, once the CRM decision is made.

## Brand refresh

The site was reading as an unfinished template: `[CITY, ST]` and `[XXXXXX]` style placeholders were still sitting in the title tag, meta description, and JSON-LD; the header's `tel:`/`mailto:` links pointed at placeholder contact info even though the visible text had been updated; and the hero was claiming a fabricated "4.9/5 from 300+ local reviews" for a company that hasn't taken a customer yet.

Fixed all of it together:

- New visual identity — a full flame-with-nested-snowflake icon and a navy/blue/brass palette, replacing the generic flame-in-a-circle and default teal/orange
- Swapped the fake review stat for the real, honest pitch: Shayne & Jayson Kopp, father-son team, est. 2026
- Pulled "Licensed & Insured" until it's actually true — Shayne's still studying for the licensing exam — replaced with "Family-Owned & Operated"
- Fixed the `tel:`/`mailto:` hrefs site-wide so clicking "call" actually dials the right number
- Dropped the placeholder street address (it's a home-based/mobile business — service area shown instead) and filled in the real OKC-metro service list
- Cleaned up the SEO metadata: title, description, Open Graph tags, and JSON-LD no longer have placeholder text or a broken `og:image` reference

## Mobile header overflow

Found that at 390px width the header overflowed horizontally — the wordmark plus the still-visible "Get a Free Quote" button were wider than the viewport, which pushed the hamburger menu off-screen entirely. On a home-service business site, mobile is probably most of the traffic, so a broken nav there is about as bad as it gets.

Fix was to stop showing the full text button on mobile and instead give it a compact, icon-only tap-to-call button — reusing the existing phone link markup rather than adding new elements, with an explicit `aria-label` since the visible text is hidden and a large enough tap target to actually hit it.

## What's left

Real reviews and job photos, once there are some to use. The site's honest about that gap right now instead of faking it, which feels like the right tradeoff for a business that's just getting started.
