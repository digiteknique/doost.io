---
title: Short links with Sink
date: 2026-07-14
description: Setting up a self-hosted short link service with Sink on Cloudflare Workers.
tags: [software, meta]
---

Adding short links to doost.io - want something better than pasting a full `/blog/...` URL when sharing a post, without depending on a third-party shortener.

Going with [Sink](https://github.com/miantiao-me/Sink), an open-source, self-hosted link shortener built for Cloudflare Workers - following [their Workers deployment guide](https://github.com/miantiao-me/Sink/blob/master/docs/deployment/workers.md). Planning to run it at `go.doost.io`. Fits the rest of the stack: Cloudflare Pages for the site, Cloudflare Workers for this.

More once it's actually running.
