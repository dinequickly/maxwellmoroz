'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { profile } from '@/content/profile';
import { OPEN_PALETTE_EVENT } from '@/components/CommandPalette';

const LINKS = [
  { label: 'Writing', href: '/#writing' },
  { label: 'Work', href: '/#work' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Reading', href: '/#reading' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4">
        <nav
          className={`mt-4 flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border px-3 py-2 pl-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? 'border-line bg-bg/70 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Link
            href="/"
            className="font-display text-[15px] tracking-tight text-fg transition-colors hover:text-accent"
          >
            {profile.name}
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-fg-faint transition-colors hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
              aria-label="Open command palette"
              className="flex items-center gap-1 rounded-md border border-line px-2 py-1 font-mono-ui text-[10px] text-fg-faint transition-colors hover:border-fg-ghost hover:text-fg"
            >
              ⌘K
            </button>
            <a
              href={profile.socials.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-fg py-1.5 pl-4 pr-1.5 text-[12px] font-medium text-bg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97]"
            >
              Subscribe
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative h-6 w-6 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-fg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-fg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? '-rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-bg/90 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {LINKS.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`font-display text-4xl text-fg-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-fg ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
          >
            {l.label}
          </Link>
        ))}
        <a
          href={profile.socials.substack}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className={`mt-6 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: open ? '340ms' : '0ms' }}
        >
          Subscribe
        </a>
      </div>
    </>
  );
}
