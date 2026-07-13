export interface Project {
  meta: string;
  title: string;
  description: string;
  href?: string;
}

export const projects: Project[] = [
  {
    meta: '2026 · ASTRO / TYPESCRIPT',
    title: 'doost.io',
    description: "This site — a static bio page and blog, built to be fast, legible, and mine.",
    href: 'https://github.com/dustinkopp/doost.io',
  },
  {
    meta: '2026 · PROXMOX / NETWORKING',
    title: 'homelab rack',
    description: 'Notes, configs, and lessons learned from a slowly-growing home server rack.',
  },
  {
    meta: '2025 · WHITE OAK / HAND TOOLS',
    title: 'workbench build',
    description: 'A hand-tool workbench build, mistakes included.',
  },
];
