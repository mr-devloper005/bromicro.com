import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock3, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/* ------------------------------- Featured -------------------------------- */
// Large, immersive post card — image with dark bottom gradient and big serif title.
export function EditorialFeatureCard({ post, href, label = 'Featured pick' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group relative block min-w-0 overflow-hidden rounded-[32px] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] shadow-[0_30px_60px_-30px_rgba(32,54,30,0.5)]">
      <div className="relative min-h-[520px] p-8 sm:p-12 lg:min-h-[640px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,15,0.1)_0%,rgba(20,35,15,0.4)_45%,rgba(20,35,15,0.92)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[560px]">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--slot4-accent-hi)]/85 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">
            <Sparkles className="h-3 w-3" /> {label}
          </span>
          <h3 className="editable-serif mt-6 max-w-3xl text-balance text-4xl font-medium leading-[1.03] text-[#fbf7ee] sm:text-5xl lg:text-[3.5rem]">
            {post.title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-accent-hi)] pl-5 pr-2 py-2 text-sm font-semibold text-[var(--slot4-accent)]">
            Read the story
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-accent-hi)] transition group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

/* --------------------------------- Rail ---------------------------------- */
// Portrait-oriented card ideal for horizontal snap rails.
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[280px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-20px_rgba(32,54,30,0.35)] sm:w-[320px]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--slot4-page-bg)]/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)] backdrop-blur">
          No. {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="editable-serif mt-3 line-clamp-3 text-xl font-medium leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

/* ------------------------------ Compact index ---------------------------- */
// Numbered list-style card with a soft accent tile.
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex min-w-0 gap-4 rounded-[20px] border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] p-5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_30px_-18px_rgba(32,54,30,0.35)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--slot4-accent-hi)] text-[var(--slot4-accent)]">
        <span className="editable-serif text-lg font-semibold">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="min-w-0">
        <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
          <Clock3 className="h-3 w-3" /> {getEditableCategory(post)}
        </p>
        <h3 className="editable-serif mt-2 line-clamp-2 text-lg font-medium leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

/* ------------------------------ Article list ----------------------------- */
// Horizontal reading-list card used on the articles archive.
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-6 overflow-hidden rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgba(32,54,30,0.35)] sm:grid-cols-[240px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[220px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        <span className="absolute right-3 top-3 rounded-full bg-[var(--slot4-accent-hi)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="min-w-0 py-2 sm:py-4 sm:pr-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h2 className="editable-serif mt-3 line-clamp-3 text-2xl font-medium leading-tight text-[var(--slot4-page-text)] sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)]">
          Read article <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
