import Reveal from '@/components/Reveal';
import Section from './Section';
import { tweets } from '@/content/misc';
import { formatDate } from '@/lib/format';
import { profile } from '@/content/profile';

/** Static tweet cards — no external syndication fetch, so the page stays instant. */
export default function Posts() {
  return (
    <Section id="posts" index="05" label="On X">
      <div className="grid gap-5 sm:grid-cols-2">
        {tweets.map((t, i) => (
          <Reveal key={t.tweetId} delay={(i % 2) * 80}>
            <a
              href={t.tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-[1.25rem] border border-line bg-bg-raised/40 p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-fg-ghost hover:bg-bg-raised"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono-ui text-[12px] text-fg-soft">@maxwellsmoroz</span>
                <span className="text-fg-ghost transition-colors group-hover:text-accent" aria-hidden>
                  𝕏
                </span>
              </div>
              <p className="font-serif-body text-[1.05rem] leading-relaxed text-fg-soft">
                {t.content}
              </p>
              <span className="mt-5 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                {formatDate(t.date)}
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <a
          href={profile.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-fg-faint transition-colors hover:text-fg"
        >
          Follow on X
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            ↗
          </span>
        </a>
      </Reveal>
    </Section>
  );
}
