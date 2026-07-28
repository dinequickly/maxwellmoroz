import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { sortedPosts, type Post } from '@/content/posts';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays and notes on frontier AI, automation, and the companies building it.',
};

function href(post: Post) {
  return post.type === 'paper' ? post.pdfUrl ?? '#' : `/blog/${post.slug}`;
}

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pt-40 pb-24 sm:px-8 sm:pt-48">
        <Reveal>
          <p className="eyebrow mb-6">Writing</p>
          <h1 className="font-display text-5xl leading-[0.95] text-fg sm:text-6xl">
            All writing
          </h1>
          <p className="mt-6 max-w-xl font-serif-body text-lg leading-relaxed text-fg-soft">
            Essays and notes on frontier AI, the economics of automation, and the labs racing to
            build it.
          </p>
        </Reveal>

        <ul className="mt-16">
          {sortedPosts.map((post, i) => {
            const isPdf = post.type === 'paper';
            return (
              <Reveal as="li" key={post.slug} delay={i * 60}>
                <Link
                  href={href(post)}
                  {...(isPdf ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group block border-b border-line py-8 transition-colors hover:border-fg-ghost"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono-ui text-[11px] text-fg-faint">
                      {formatDate(post.date)}
                    </span>
                    <span className="font-mono-ui text-[11px] text-fg-ghost">·</span>
                    <span className="font-mono-ui text-[11px] text-fg-faint">{post.category}</span>
                    {isPdf ? (
                      <span className="rounded-full border border-line px-2.5 py-0.5 font-mono-ui text-[9px] uppercase tracking-[0.14em] text-accent">
                        PDF
                      </span>
                    ) : null}
                  </div>
                  <h2 className="font-display text-2xl leading-snug text-fg-soft transition-colors group-hover:text-fg sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl font-serif-body leading-relaxed text-fg-faint">
                    {post.excerpt}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}
