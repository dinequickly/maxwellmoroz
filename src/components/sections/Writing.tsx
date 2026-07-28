import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Section from './Section';
import { sortedPosts, type Post } from '@/content/posts';
import { formatDate } from '@/lib/format';

export default function Writing() {
  const featured = sortedPosts.find((p) => p.featured) ?? sortedPosts[0];
  const rest = sortedPosts.filter((p) => p.slug !== featured.slug);

  return (
    <Section id="writing" index="01" label="Writing">
      <div className="space-y-px">
        <Reveal>
          <FeaturedCard post={featured} />
        </Reveal>
        <ul>
          {rest.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 60}>
              <PostRow post={post} />
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal delay={120}>
        <Link
          href="/blog"
          className="group mt-10 inline-flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-fg-faint transition-colors hover:text-fg"
        >
          All writing
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}

function postHref(post: Post) {
  return post.type === 'paper' ? post.pdfUrl ?? '#' : `/blog/${post.slug}`;
}

function FeaturedCard({ post }: { post: Post }) {
  const href = postHref(post);
  const isPdf = post.type === 'paper';
  return (
    <Link
      href={href}
      {...(isPdf ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group block rounded-[1.5rem] border border-line bg-bg-raised/40 p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-fg-ghost hover:bg-bg-raised sm:p-9"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-full border border-line px-3 py-1 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-accent">
          Featured
        </span>
        <span className="font-mono-ui text-[11px] text-fg-faint">{post.category}</span>
        <span className="font-mono-ui text-[11px] text-fg-ghost">·</span>
        <span className="font-mono-ui text-[11px] text-fg-faint">{formatDate(post.date)}</span>
      </div>
      <h3 className="font-display text-3xl leading-[1.08] text-fg transition-colors group-hover:text-accent-soft sm:text-4xl">
        {post.title}
      </h3>
      <p className="mt-5 max-w-2xl font-serif-body text-lg leading-relaxed text-fg-soft">
        {post.excerpt}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-fg-faint">
        {isPdf ? 'Read the paper (PDF)' : `Read · ${post.readingTime} min`}
        <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          {isPdf ? '↗' : '→'}
        </span>
      </span>
    </Link>
  );
}

function PostRow({ post }: { post: Post }) {
  const href = postHref(post);
  const isPdf = post.type === 'paper';
  return (
    <Link
      href={href}
      {...(isPdf ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-baseline justify-between gap-6 border-b border-line py-7 transition-colors hover:border-fg-ghost"
    >
      <div className="min-w-0">
        <div className="mb-2.5 flex items-center gap-3">
          <span className="font-mono-ui text-[11px] text-fg-faint">{formatDate(post.date)}</span>
          <span className="font-mono-ui text-[11px] text-fg-ghost">·</span>
          <span className="font-mono-ui text-[11px] text-fg-faint">{post.category}</span>
        </div>
        <h3 className="font-display text-xl leading-snug text-fg-soft transition-colors group-hover:text-fg sm:text-[1.6rem]">
          {post.title}
        </h3>
      </div>
      <span className="mt-1 shrink-0 text-fg-ghost transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-accent">
        {isPdf ? '↗' : '→'}
      </span>
    </Link>
  );
}
