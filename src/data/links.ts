export type LinkIcon = 'github' | 'linkedin' | 'instagram' | 'threads' | 'email';

export interface LinkEntry {
  label: string;
  value: string;
  href: string;
  icon: LinkIcon;
}

export const links: LinkEntry[] = [
  { label: 'GITHUB', value: 'github.com/digiteknique', href: 'https://github.com/digiteknique', icon: 'github' },
  { label: 'LINKEDIN', value: 'in/dustin-kopp-b423348', href: 'https://www.linkedin.com/in/dustin-kopp-b423348/', icon: 'linkedin' },
  { label: 'INSTAGRAM', value: '@digiteknique', href: 'https://www.instagram.com/digiteknique/', icon: 'instagram' },
  { label: 'THREADS', value: '@digiteknique', href: 'https://www.threads.com/@digiteknique', icon: 'threads' },
  { label: 'EMAIL', value: 'hello@doost.io', href: 'mailto:hello@doost.io', icon: 'email' },
];
