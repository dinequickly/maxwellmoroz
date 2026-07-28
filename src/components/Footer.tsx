import Link from 'next/link';
import { profile } from '@/content/profile';

const SOCIALS: { label: string; href: string }[] = [
  { label: 'X', href: profile.socials.twitter },
  { label: 'GitHub', href: profile.socials.github },
  { label: 'LinkedIn', href: profile.socials.linkedin },
  { label: 'Substack', href: profile.socials.substack },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="font-display text-2xl text-fg transition-colors hover:text-accent">
              {profile.name}
            </Link>
            <p className="mt-3 max-w-sm font-serif-body text-[15px] leading-relaxed text-fg-faint">
              {profile.intro}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-block font-mono-ui text-[11px] tracking-[0.08em] text-fg-faint transition-colors hover:text-fg"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-wrap gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-fg-faint transition-colors hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-line-soft pt-6">
          <p className="font-mono-ui text-[11px] text-fg-ghost">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono-ui text-[11px] text-fg-ghost">Built with intention</p>
        </div>
      </div>
    </footer>
  );
}
