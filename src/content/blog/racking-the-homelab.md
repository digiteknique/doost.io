---
title: Racking the homelab
date: 2026-06-18
description: Moving off Google mesh Wi-Fi to wired UniFi networking, a coat-closet rack, and a Proxmox box to run the controller.
tags: [homelab, networking]
---

Replaced Google mesh Wi-Fi with actual wired networking. The mesh nodes worked fine, but I was tired of not knowing what was going on behind the scenes, and wanted real access points and a real switch instead of a handful of pucks talking to each other over wireless backhaul.

## Wiring

Ran Cat6 to three spots: my office, my partner's office, and a coat closet that had no business becoming a networking closet but was the only sensible central point in the house. That closet is now the rack.

## Equipment

Went with UniFi across the board:

- **UXG Fiber** - the gateway, terminating AT&T fiber straight into a 10GbE WAN port
- **U7 Pro XG** - a single access point, wired straight back to the gateway, covering the whole house
- **USW Flex 2.5G 8 PoE** - the core switch in the rack, uplinked to the gateway over SFP+ at 10GbE
- **USW Flex 2.5G 8** and **USW Flex 2.5G 5** - two more Flex switches downstream of the core switch, one in each office, feeding the local wired ports

The UXG Fiber doesn't run the Network application on its own - it needs something else on the LAN hosting it - so I picked up a Minisforum mini PC, put Proxmox on it, and run the UniFi Network software from a VM there. Small box, does one job, tucked into the rack next to everything else.

## The rack

Short wall-mounted rack in the coat closet - the UXG Fiber gateway, the core Flex 2.5G 8 PoE switch, and the Minisforum box all live there now, off the floor and out of the way. Nothing dramatic, but it turned "networking gear shoved in a corner" into something that actually looks intentional.

## What I'd do differently

TBD - still early days with this setup, haven't hit anything I'd change yet.
