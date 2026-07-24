import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Warm nature-directory task themes.

  Every task shares a common cream + forest identity but each task twists the
  accent slightly so pages have their own voice. Tokens are delivered via CSS
  variables (`--tk-*`) so the rest of the theme can reference them.
*/

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY = "'Fraunces', 'Cormorant Garamond', Georgia, serif"
const BODY = "'Inter', 'DM Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY,
  fontBody: BODY,
  bg: '#f5efe3',
  surface: '#fbf7ee',
  raised: '#efe7d6',
  text: '#2a1f14',
  muted: '#6f5b47',
  line: '#d9cdb3',
  accent: '#1f4d2b',
  accentSoft: '#e6ecdd',
  onAccent: '#f5efe3',
  glow: 'rgba(197,225,122,0.28)',
  radius: '1.5rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Field Notes', note: 'Long reads, essays and stories worth a slow scroll.' },
  listing: { ...base, kicker: 'The Directory', note: 'Independent shops, studios and businesses to know.' },
  classified: { ...base, kicker: 'Open Board', note: 'Fresh offers, finds and short-notice opportunities.' },
  image: { ...base, kicker: 'The Gallery', note: 'A visual feed of standout photographs and image sets.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated links and quiet corners of the internet.' },
  pdf: { ...base, kicker: 'The Library', note: 'Guides, briefs and downloadable reference material.' },
  profile: { ...base, kicker: 'The Roster', note: 'People, makers and founders worth introducing.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
