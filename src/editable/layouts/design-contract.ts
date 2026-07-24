import type { CSSProperties } from 'react'

/*
  Playful directory palette inspired by warm nature-brand editorials.
  - Cream / off-white paper canvas
  - Deep forest green primary, lime highlight for accents/CTAs
  - Warm brown body text, soft sand borders
  - Serif display type + clean sans body
*/

export const editableRootStyle = {
  '--slot4-page-bg': '#f5efe3',
  '--slot4-page-text': '#2a1f14',
  '--slot4-panel-bg': '#efe7d6',
  '--slot4-surface-bg': '#fbf7ee',
  '--slot4-muted-text': '#6f5b47',
  '--slot4-soft-muted-text': '#9a8770',
  '--slot4-accent': '#1f4d2b',
  '--slot4-accent-fill': '#1f4d2b',
  '--slot4-accent-soft': '#e6ecdd',
  '--slot4-accent-hi': '#c5e17a',
  '--slot4-on-accent': '#f5efe3',
  '--slot4-dark-bg': '#20361e',
  '--slot4-dark-text': '#f5efe3',
  '--slot4-media-bg': '#e5dcc7',
  '--slot4-cream': '#fbf7ee',
  '--slot4-warm': '#eee6d3',
  '--slot4-lavender': '#f0e9d8',
  '--slot4-gray': '#efe7d6',
  '--slot4-body-gradient': 'radial-gradient(120% 60% at 50% 0%, rgba(197,225,122,0.14), transparent 70%)',
  '--editable-page-bg': '#f5efe3',
  '--editable-page-text': '#2a1f14',
  '--editable-container': '1400px',
  '--editable-border': '#d9cdb3',
  '--editable-nav-bg': 'rgba(245,239,227,0.0)',
  '--editable-nav-text': '#f5efe3',
  '--editable-nav-active': '#1f4d2b',
  '--editable-nav-active-text': '#f5efe3',
  '--editable-cta-bg': '#c5e17a',
  '--editable-cta-text': '#1f4d2b',
  '--editable-search-bg': '#fbf7ee',
  '--editable-footer-bg': '#20361e',
  '--editable-footer-text': '#f5efe3',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  accentHiBg: 'bg-[var(--slot4-accent-hi)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_10px_30px_-18px_rgba(32,54,30,0.25)]',
  shadowStrong: 'shadow-[0_30px_60px_-30px_rgba(32,54,30,0.4)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(20,35,15,0.05),rgba(20,35,15,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[260px] shrink-0 snap-start sm:w-[300px]',
  },
  type: {
    eyebrow: 'text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]',
    heroTitle: 'editable-serif text-4xl font-medium leading-[1.05] tracking-[-0.01em] sm:text-6xl lg:text-[4.5rem]',
    sectionTitle: 'editable-serif text-3xl font-medium leading-[1.05] tracking-[-0.01em] sm:text-5xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-[28px] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[28px] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[28px] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-hi)] px-7 py-3 text-sm font-semibold text-[var(--slot4-accent)] transition duration-300 hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--slot4-accent)]/40 bg-transparent px-7 py-3 text-sm font-semibold text-[var(--slot4-accent)] transition duration-300 hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent-soft)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-7 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[24px] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-22px_rgba(32,54,30,0.35)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep the cream + forest palette consistent — change editableRootStyle to shift globally.',
  'Serif display + sans body: rely on .editable-serif for headings.',
  'Cards prefer generous radii (24–32px), soft cream surfaces and thin sand borders.',
  'Use postHref() for all post links so task-specific routes keep working.',
  'Do not replace the dynamic post feeds with mock arrays.',
] as const
