import { profile } from '@/content/profile';

export default function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-40 pb-20 sm:px-8 sm:pt-48 sm:pb-28">
      <div className="reveal is-in">
        <p className="eyebrow mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent/60" />
          {profile.location}
        </p>

        <h1 className="text-display text-fg">
          {profile.name}
        </h1>

        <div className="mt-10 grid gap-8 sm:grid-cols-12 sm:items-end">
          <p className="font-serif-body text-xl leading-relaxed text-fg-soft sm:col-span-8 sm:text-2xl">
            {profile.tagline}
          </p>
          <div className="flex items-center gap-5 sm:col-span-4 sm:justify-end">
            <SocialLinks />
          </div>
        </div>
      </div>
    </header>
  );
}

function SocialLinks() {
  const items: { label: string; href: string }[] = [
    { label: 'X', href: profile.socials.twitter },
    { label: 'GitHub', href: profile.socials.github },
    { label: 'LinkedIn', href: profile.socials.linkedin },
  ];
  return (
    <div className="flex items-center gap-5">
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-fg-faint transition-colors hover:text-fg"
        >
          {i.label}
        </a>
      ))}
    </div>
  );
}
