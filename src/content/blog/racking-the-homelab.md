---
title: Racking the homelab
date: 2025-06-18
description: Moving off Google mesh Wi-Fi to wired UniFi networking, a coat-closet rack, and a Proxmox box to run the controller.
tags: [homelab, networking]
---

Replaced Google mesh Wi-Fi with actual wired networking. The mesh nodes worked fine, but I was tired of not knowing what was going on behind the scenes, and wanted real access points and a real switch instead of a handful of pucks talking to each other over wireless backhaul. I wanted to have a bit of control over VLANs, and honestly the nerd itch was just there. 

I considered exploring stuff like OpnSense or PFSense on a mini pc, but opted for UniFi gear. 

## Wiring

Ran Cat6 to three spots: my office, my partner's office, and a coat closet that had no business becoming a networking closet but was the only sensible central point in the house. That closet is now the rack.

## Equipment

Went with UniFi across the board:

- **UXG Fiber** - the gateway, COX cable internet (Still no fiber available here) into WAN port
- **U7 Pro XG** - a single access point, wired straight back to the gateway, covering the whole house
- **USW Flex 2.5G 8 PoE** - the core switch in the rack, uplinked to the gateway over SFP+ at 10GbE
- **USW Flex 2.5G 8** and **USW Flex 2.5G 5** - two more Flex switches downstream of the core switch, one in each office, feeding the local wired ports

The UXG Fiber doesn't run the Network application on its own - it needs something else on the LAN hosting it - so I picked up a Minisforum MS-01 mini PC with 64gb ram, put Proxmox on it, and run the UniFi Network software from a VM there. Its a great little mini-pc. It runs Home Assistant, Unifi Network, Technitium DNS, and a Portainer LXC. Plus PBS. I kept my existing unraid server that runs the *arr stack. 

## The rack

Short wall-mounted rack in the coat closet - the UXG Fiber gateway, the core Flex 2.5G 8 PoE switch, and the Minisforum box all live there now, off the floor and out of the way. Nothing dramatic, but it turned "networking gear shoved in a corner" into something that actually looks intentional.

## What I'd do differently

I was impatient and got the gateway fiber that doesnt run the control software because i said i was being frugal, but it was just that the one with the software was out of stock. It would be nice to have that integrated. 
