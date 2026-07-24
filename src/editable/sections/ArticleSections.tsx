import Link from 'next/link'
import { ArrowRight, ChevronLeft, Search } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
      <section className={`${container} pt-14 sm:pt-20 lg:pt-24`}>
        <div className="relative overflow-hidden rounded-[36px] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] p-8 text-[#fbf7ee] sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--slot4-accent-hi)]/15 blur-3xl" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent-hi)]">{voice.eyebrow}</p>
          <h1 className="editable-serif mt-5 max-w-4xl text-4xl font-medium leading-[1.03] sm:text-6xl lg:text-7xl">
            {voice.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{voice.description}</p>
          <form action={basePath} className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white/10 px-5 backdrop-blur">
              <Search className="h-4 w-4 text-[var(--slot4-accent-hi)]" />
              <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold text-white outline-none">
                <option value="all" className="text-black">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug} className="text-black">{item.name}</option>)}
              </select>
            </label>
            <button className="rounded-full bg-[var(--slot4-accent-hi)] px-6 py-3 text-sm font-semibold text-[var(--slot4-accent)] transition hover:brightness-110">
              Filter
            </button>
          </form>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20 lg:py-24`}>
        {posts.length ? (
          <div className="grid gap-6">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-[28px] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-10 text-center">
            <Search className="mx-auto h-8 w-8 text-[var(--slot4-accent)]" />
            <h2 className="editable-serif mt-5 text-3xl font-medium">No articles found</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">Try another category or return to all articles.</p>
          </div>
        )}
        {posts.length ? (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="rounded-full border border-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-on-accent)]">Previous</Link> : null}
            <span className="rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)]">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="rounded-full border border-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-on-accent)]">Next</Link> : null}
          </div>
        ) : null}
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
      <section className={`${container} pt-14 sm:pt-16 lg:pt-20`}>
        <div className="grid gap-8 rounded-[36px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link href="/article" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
              <ChevronLeft className="h-4 w-4" /> Articles
            </Link>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{voice.eyebrow}</p>
            <h1 className="editable-serif mt-4 max-w-4xl text-4xl font-medium leading-[1.03] text-[var(--slot4-page-text)] sm:text-5xl lg:text-6xl">
              {post?.title || pagesContent.detailPages.article.fallbackTitle}
            </h1>
          </div>
          <aside className="min-w-0 rounded-[28px] bg-[var(--slot4-dark-bg)] p-8 text-[#fbf7ee]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent-hi)]">Reading note</p>
            <p className="mt-5 text-sm leading-7 text-white/72">{voice.secondaryNote}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-hi)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-accent)]">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 sm:p-10">
          <p className="text-base leading-8 text-[var(--slot4-muted-text)]">
            {post?.summary || `Article detail content for ${slug} will render through the editable detail page.`}
          </p>
        </div>
      </section>
    </main>
  )
}
