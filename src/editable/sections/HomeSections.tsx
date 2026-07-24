import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronRight, Compass, Leaf, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 6) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ================================================================== HERO */

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool, 4)
  const featured = pool[0]
  const taglineWords = (pagesContent.home.hero.title?.join(' ') || 'The best way to discover the work that matters').split(' ')
  const midpoint = Math.max(2, Math.floor(taglineWords.length / 2))
  const firstLine = taglineWords.slice(0, midpoint).join(' ')
  const secondLine = taglineWords.slice(midpoint).join(' ')

  return (
    <section className="relative">
      {/* Full-bleed hero canvas */}
      <div className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
        <EditableHeroCollage images={heroImages} />
        {/* Softer top gradient, deeper bottom gradient for readability */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,15,0.35)_0%,rgba(20,35,15,0.05)_28%,rgba(20,35,15,0.0)_50%,rgba(20,35,15,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,transparent,rgba(20,35,15,0.35))]" />

        {/* Centered serif hero title, HUTS-style */}
        <div className={`relative flex h-full flex-col items-center justify-center text-center ${container}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#f5efe3]/80">
            {pagesContent.home.hero.badge || `Welcome to ${SITE_CONFIG.name}`}
          </p>
          <h1 className="editable-serif mt-6 max-w-5xl text-balance text-4xl font-medium leading-[1.02] text-[#fbf7ee] sm:text-6xl lg:text-[5.5rem]">
            {firstLine}{' '}
            <span className="editable-under">{secondLine.split(' ')[0]}</span>{' '}
            {secondLine.split(' ').slice(1).join(' ')}
          </h1>

          <Link
            href={primaryRoute}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--slot4-accent-hi)] pl-6 pr-2 py-2 text-sm font-semibold text-[var(--slot4-accent)] shadow-[0_20px_50px_-20px_rgba(197,225,122,0.7)] transition hover:brightness-105"
          >
            Get Started
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-accent-hi)] transition group-hover:translate-x-0.5">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>

        {/* Small floating attribution tag */}
        {featured ? (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/25 bg-black/25 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-md">
            Now featuring · {featured.title.slice(0, 60)}
          </div>
        ) : null}
      </div>

      {/* Slim trust strip under hero */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
        <div className={`flex flex-wrap items-center justify-between gap-4 py-4 ${container}`}>
          <div className="flex items-center gap-6 text-xs font-medium text-[var(--slot4-muted-text)]">
            <span className="inline-flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> Fresh finds weekly</span>
            <span className="hidden items-center gap-2 sm:inline-flex"><Compass className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> Independent picks</span>
            <span className="hidden items-center gap-2 md:inline-flex"><Leaf className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> Made with care</span>
          </div>
          <Link href={primaryRoute} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)] hover:underline">
            Browse the {taskLabel(primaryTask).toLowerCase()} <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ==================================================== SPLIT IMAGE STORY */

function StackedFrames({ images }: { images: string[] }) {
  const [a, b] = images
  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[560px]">
      {b ? (
        <div className="absolute inset-y-8 -right-4 w-3/4 -rotate-[6deg] overflow-hidden rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-media-bg)] shadow-[0_30px_60px_-30px_rgba(32,54,30,0.35)]">
          <img src={b} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="absolute inset-x-4 -top-4 bottom-4 rotate-[3deg] overflow-hidden rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-media-bg)] shadow-[0_30px_60px_-30px_rgba(32,54,30,0.4)]">
        <img src={a || '/placeholder.svg?height=1200&width=1000'} alt="" className="h-full w-full object-cover" />
      </div>
      {/* Sprigs decoration */}
      <svg
        aria-hidden="true"
        viewBox="0 0 60 80"
        className="absolute -bottom-6 -left-6 h-14 w-10 text-[var(--slot4-accent)]"
      >
        <path d="M30 78 Q 20 40 10 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M18 30 Q 26 32 30 40" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M22 46 Q 30 46 34 52" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function EditableMagazineSplit({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImgs = latestPostImages(pool, 2)

  return (
    <>
      {/* Section 1 — Image left, copy right (HUTS "We do it across the country") */}
      <section className="bg-[var(--slot4-page-bg)] py-16 sm:py-24">
        <div className={container}>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <StackedFrames images={heroImgs} />
            <div className="max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent)]">Across the network</p>
              <h2 className="editable-serif mt-4 text-4xl font-medium leading-[1.05] text-[var(--slot4-accent)] sm:text-5xl lg:text-6xl">
                We do it <span className="editable-under">everywhere</span> online
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--slot4-muted-text)]">
                {SITE_CONFIG.name} collects the best independent posts from across the web — from studios,
                shop owners, writers and makers. Through guidance, intent, and care, each entry earns its
                place in the directory. Looking for something specific? Chances are we&apos;ve covered it,
                or will soon.
              </p>
              <Link
                href={primaryRoute}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-on-accent)]"
              >
                See our directory
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--slot4-accent)]/40 transition group-hover:border-[var(--slot4-accent)]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Copy left, illustration right (HUTS "Using a process built around you") */}
      <section className="bg-[var(--slot4-panel-bg)] py-16 sm:py-24">
        <div className={container}>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 max-w-xl lg:order-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent)]">Built around you</p>
              <h2 className="editable-serif mt-4 text-4xl font-medium leading-[1.05] text-[var(--slot4-accent)] sm:text-5xl">
                Using a process built <span className="editable-under">around</span> the reader
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--slot4-muted-text)]">
                We think of ourselves as your guide on the path to great content. Our people-first process
                goes far beyond a feed — we surface, curate, and connect every kind of post so you can move
                from a spark of curiosity to something worth bookmarking. It&apos;s a start-to-finish
                approach that&apos;s vetted, calm, and simply the best way to browse.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-on-accent)]"
              >
                How it works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Playful illustration panel */}
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[36px] border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)]">
                <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-[var(--slot4-accent)]" aria-hidden="true">
                  {/* Sun + hill sketch */}
                  <circle cx="120" cy="120" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
                  <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="120" y1="50" x2="120" y2="30" />
                    <line x1="120" y1="210" x2="120" y2="190" />
                    <line x1="60" y1="120" x2="40" y2="120" />
                    <line x1="200" y1="120" x2="180" y2="120" />
                    <line x1="72" y1="72" x2="60" y2="60" />
                    <line x1="180" y1="60" x2="168" y2="72" />
                    <line x1="72" y1="168" x2="60" y2="180" />
                    <line x1="168" y1="168" x2="180" y2="180" />
                  </g>
                  <path d="M20 320 Q 100 220 200 260 T 380 240 L 380 400 L 20 400 Z" fill="var(--slot4-accent-hi)" opacity="0.65" />
                  <path d="M20 340 Q 120 260 220 300 T 380 280" fill="none" stroke="currentColor" strokeWidth="2" />
                  {/* Little house */}
                  <g transform="translate(240 200)">
                    <rect x="0" y="30" width="80" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M-6 30 L 40 -6 L 86 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="30" y="55" width="20" height="35" fill="currentColor" opacity="0.15" />
                    <line x1="10" y1="45" x2="20" y2="45" stroke="currentColor" strokeWidth="2" />
                    <line x1="60" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================================== STANDARDS / FEATURED RAIL */

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  // "It all starts with our Standards..." — 3-up featured rail
  const rail = visible[0]?.posts.slice(0, 3) || []
  const editorial = visible[1]?.posts.slice(0, 4) || []
  const compact = visible[2]?.posts.slice(0, 6) || []
  const secondaryRoute = visible[1]?.href || primaryRoute
  const tertiaryRoute = visible[2]?.href || primaryRoute

  return (
    <>
      {/* Featured 3-up section, HUTS "Standards" style */}
      <section className="relative bg-[var(--slot4-page-bg)] py-20 sm:py-28">
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent)]">Selected</p>
            <h2 className="editable-serif mt-4 text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
              It all starts with our <span className="editable-under">Standards</span>...
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--slot4-muted-text)]">
              They&apos;re more than posts — they&apos;re editorial anchors. Each pick combines real
              craft with everyday usefulness, making it easier to find something that feels anything but standard.
            </p>
          </div>

          {rail.length ? (
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {rail.map((post, index) => {
                const image = getEditablePostImage(post)
                const size = ['Small Bar', 'Medium Bar', 'Big Bar'][index] || 'Standard'
                const scale = [0.94, 1.05, 0.98][index] ?? 1
                return (
                  <Link
                    key={post.id || post.slug}
                    href={postHref(primaryTask, post, primaryRoute)}
                    className="group flex flex-col"
                    style={{ transform: `translateY(${(index % 2) * 22}px)` }}
                  >
                    <div
                      className="relative aspect-[3/4] overflow-hidden rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-media-bg)] shadow-[0_20px_40px_-25px_rgba(32,54,30,0.4)] transition duration-500 group-hover:-translate-y-2"
                      style={{ transform: `scale(${scale})` }}
                    >
                      <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">{categoryOf(post) || 'Selected'}</p>
                      <h3 className="editable-serif mt-2 text-2xl font-medium leading-tight text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{size}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : null}
        </div>
      </section>

      {/* Editorial horizontal cards */}
      {editorial.length ? (
        <section className="bg-[var(--slot4-warm)] py-20 sm:py-24">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent)]">This week</p>
                <h2 className="editable-serif mt-3 text-3xl font-medium leading-tight sm:text-5xl">
                  Fresh <span className="editable-under">picks</span> from the field
                </h2>
              </div>
              <Link href={secondaryRoute} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-on-accent)]">
                See all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {editorial.map((post, index) => (
                <HorizontalPickCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Compact grid — mixed styles */}
      {compact.length ? (
        <section className="bg-[var(--slot4-page-bg)] py-20 sm:py-24">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent)]">Also worth a look</p>
                <h2 className="editable-serif mt-3 text-3xl font-medium leading-tight sm:text-4xl">From the archive</h2>
              </div>
              <Link href={tertiaryRoute} className="text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
                Explore all →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {compact.map((post, index) => (
                <MixedGridCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

function HorizontalPickCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  const cat = categoryOf(post) || 'Featured'
  return (
    <Link href={href} className="group flex overflow-hidden rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-22px_rgba(32,54,30,0.35)]">
      <div className="relative aspect-square w-[42%] shrink-0 overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-page-bg)]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)] backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{cat}</p>
          <h3 className="editable-serif mt-3 line-clamp-3 text-2xl font-medium leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 120)}</p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
          Read <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function MixedGridCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  const cat = categoryOf(post) || 'Field note'

  // Variant A — image-first
  if (index % 3 === 0) {
    return (
      <Link href={href} className="group flex flex-col overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
          <span className="absolute right-3 top-3 rounded-full bg-[var(--slot4-accent-hi)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
            {cat}
          </span>
        </div>
        <div className="p-6">
          <h3 className="editable-serif line-clamp-2 text-xl font-medium leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
        </div>
      </Link>
    )
  }

  // Variant B — editorial numbered
  if (index % 3 === 1) {
    return (
      <Link href={href} className="group flex flex-col justify-between rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] p-7 transition duration-500 hover:-translate-y-1">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="editable-serif text-5xl font-medium text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{cat}</span>
          </div>
          <h3 className="editable-serif mt-5 line-clamp-4 text-2xl font-medium leading-snug text-[var(--slot4-page-text)]">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 140)}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
          Open story <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </Link>
    )
  }

  // Variant C — compact with side thumb
  return (
    <Link href={href} className="group flex gap-4 rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-500 hover:-translate-y-1">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{cat}</p>
        <h3 className="editable-serif mt-2 line-clamp-2 text-lg font-medium leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[var(--slot4-muted-text)]">{getExcerpt(post, 90)}</p>
      </div>
    </Link>
  )
}

/* ================================================================= CTA */

export function EditableHomeCta() {
  return (
    <section id="get-app" className="relative scroll-mt-24 overflow-hidden bg-[var(--slot4-page-bg)] py-20 sm:py-28">
      <div className={container}>
        <div className="relative overflow-hidden rounded-[36px] bg-[var(--slot4-dark-bg)] px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--slot4-accent-hi)]/20 blur-3xl" />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent-hi)]">Join the directory</p>
          <h2 className="editable-serif relative mx-auto mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.05] text-[#fbf7ee] sm:text-5xl lg:text-6xl">
            Got something worth <span className="editable-under text-[var(--slot4-accent-hi)]">sharing?</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Add your business, post a story, or share a link. Reach the {SITE_CONFIG.name} community, one thoughtful post at a time.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-hi)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:brightness-110">
              Create a post <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-[#fbf7ee] transition hover:bg-white/10">
              Say hello
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
