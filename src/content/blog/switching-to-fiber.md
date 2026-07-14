---
title: Switching to fiber
date: 2025-11-15
description: AT&T fiber finally showed up - dropped the ISP modem for a WS-110 SFP straight into the gateway, plus a 3D printed fan housing to keep it cool.
tags: [homelab, networking]
---

AT&T fiber finally lit up in the neighborhood, so I dropped COX cable for 2Gb fiber. Rather than run the AT&T-provided ONT/modem as another box in the chain, I went with a WS-110 SFP module straight into the UXG Fiber's SFP+ WAN port - the gateway terminates the fiber itself, no separate modem sitting between it and the outside world.

One less box, one less thing to troubleshoot, and the gateway has direct control over the WAN connection instead of just being handed an ethernet cable from someone else's router.

## Keeping it cool

The WS-110 runs warm sitting in an SFP+ cage with no airflow, so I designed and 3D printed a small fan housing that clips onto it - just enough forced air to keep it from cooking itself in the closet.

## Result

2Gb fiber, one fewer box in the rack, and the WS-110 stays cool. Simple upgrade, but a satisfying one - the kind of thing that only "clicks" once you've already got a gateway capable of taking an SFP WAN directly.
