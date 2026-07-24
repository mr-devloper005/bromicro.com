'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const isHome = pathname === '/'

  const navItems = useMemo(
    () =>
      SITE_CONFIG.tasks
        .filter((task) => task.enabled && task.key !== 'profile')
        .map((task) => ({ label: task.label, href: task.route })),
    []
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On the home page we float over the hero; elsewhere we sit on a solid cream bar.
  const solid = !isHome || scrolled
  const textTone = solid ? 'text-[var(--slot4-page-text)]' : 'text-[#fbf7ee]'
  const mutedTone = solid ? 'text-[var(--slot4-muted-text)]' : 'text-white/80'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-[var(--slot4-page-bg)]/92 backdrop-blur-md shadow-[0_1px_0_var(--editable-border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className={`mx-auto flex min-h-[76px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8 ${textTone}`}>
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          <span className="hidden min-w-0 md:block">
            <span className={`editable-serif block max-w-[220px] truncate text-2xl font-semibold leading-none tracking-[-0.01em]`}>
              {SITE_CONFIG.name}
            </span>
            <span className={`mt-1 block max-w-[220px] truncate text-[10px] font-medium uppercase tracking-[0.3em] ${mutedTone}`}>
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? solid
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'bg-white/15 text-white'
                    : `${mutedTone} hover:text-current`
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {item.label}
                  <span className="text-[10px] opacity-70">+</span>
                </span>
              </Link>
            )
          })}
          <Link
            href="/about"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${mutedTone} hover:text-current`}
          >
            About
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link
            href="/search"
            aria-label="Search"
            className={`hidden h-10 w-10 items-center justify-center rounded-full transition sm:inline-flex ${
              solid ? 'hover:bg-[var(--slot4-accent-soft)]' : 'hover:bg-white/15'
            }`}
          >
            <Search className="h-4 w-4" />
          </Link>
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent-hi)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-accent)] shadow-[0_6px_20px_-8px_rgba(31,77,43,0.5)] transition hover:brightness-105 sm:inline-flex"
              >
                Create <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={logout}
                className={`hidden px-3 py-2 text-sm font-medium transition sm:inline-flex ${mutedTone} hover:text-current`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signup"
              className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent-hi)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-accent)] shadow-[0_6px_20px_-8px_rgba(31,77,43,0.5)] transition hover:brightness-105 sm:inline-flex"
            >
              Get Started
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition lg:hidden ${
              solid ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'bg-white/15 text-white'
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-6 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search the directory" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-surface-bg)]'
                  }`}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
