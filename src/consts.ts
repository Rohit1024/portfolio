import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'rohitkharche',
  description: 'Personal site and blog by rohitkharche',
  href: 'https://rohitkharche.web.app',
  author: 'rohitkharche',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
  notesPerPage: 6,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/notes',
    label: 'notes',
  },
  {
    href: '/categories',
    label: 'categories',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/rohit1024',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/rohit-kharche',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:rohitkharche1024@gmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

export const EXTERNAL_CSS = {
  KATEX: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
  DEVICONS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
} as const