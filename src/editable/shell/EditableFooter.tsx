'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="relative mt-16 overflow-hidden bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* Big soft glow — the "campfire" behind the footer copy. */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--slot4-accent-hi)]/10 blur-3xl" />

      {/* Playful oversized wordmark */}
      <div className="relative mx-auto w-full max-w-[var(--editable-container)] px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--slot4-accent-hi)]">Say hello</p>
            <h2 className="editable-serif mt-3 max-w-2xl text-4xl font-medium leading-[1.05] text-[#f5efe3] sm:text-6xl lg:text-7xl">
              Ready to see your <span className="editable-under text-[var(--slot4-accent-hi)]">business</span> here?
            </h2>
          </div>
          <Link
            href="/create"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--slot4-accent-hi)] px-6 py-3.5 text-sm font-semibold text-[var(--slot4-accent)] shadow-[0_10px_30px_-10px_rgba(197,225,122,0.55)] transition hover:brightness-105"
          >
            Get started
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-accent-hi)] transition group-hover:translate-x-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
            <span className="editable-serif text-2xl font-semibold">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#f5efe3]/70">
            {globalContent.footer?.description || SITE_CONFIG.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#f5efe3]/60">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[var(--slot4-accent-hi)]" /> Everywhere online</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-[var(--slot4-accent-hi)]" /> hello@{SITE_CONFIG.domain || 'example.com'}</span>
          </div>
        </div>

        <FooterColumn title="Explore">
          {taskLinks.map((task) => (
            <FooterLink key={task.key} href={task.route}>{task.label}</FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Site">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/search">Search</FooterLink>
          {session ? <FooterLink href="/create">Create post</FooterLink> : null}
        </FooterColumn>

        <FooterColumn title="Account">
          {session ? (
            <button onClick={logout} className="text-left text-sm font-medium text-[#f5efe3]/70 transition hover:text-[var(--slot4-accent-hi)]">
              Logout
            </button>
          ) : (
            <>
              <FooterLink href="/login">Login</FooterLink>
              <FooterLink href="/signup">Sign up</FooterLink>
            </>
          )}
        </FooterColumn>
      </div>

      {/* Bottom marquee-style tagline */}
      <div className="relative overflow-hidden border-t border-white/10 py-6">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col gap-3 px-4 text-xs text-[#f5efe3]/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} {SITE_CONFIG.name}. Built with intent.</p>
          <p className="tracking-[0.24em] uppercase">Made for curious readers · Independent · Ad-supported</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent-hi)]">{title}</h3>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-medium text-[#f5efe3]/70 transition hover:text-[var(--slot4-accent-hi)]"
    >
      <span className="h-px w-4 bg-white/20 transition group-hover:w-6 group-hover:bg-[var(--slot4-accent-hi)]" />
      {children}
    </Link>
  )
}
