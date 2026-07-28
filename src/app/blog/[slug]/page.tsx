import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Markdown from '@/components/Markdown';
import { articles, getPost, sortedPosts, type Post } from '@/content/posts';
import { getPostBody } from '@/content/postBody';
import { formatDate } from '@/lib/format';

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render every article at build time → fully static.
export function generateStaticParams() {
  return articles.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post || post.type !== 'article') notFound();

  const body = getPostBody(post);
  const next = getNext(post);

  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto max-w-2xl px-6 pt-36 sm:px-8 sm:pt-44">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-fg-faint transition-colors hover:text-fg"
          >
            <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1">
              ←
            </span>
            All writing
          </Link>

          <header className="mt-10 border-b border-line pb-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="font-mono-ui text-[11px] text-fg-faint">{formatDate(post.date)}</span>
              <span className="font-mono-ui text-[11px] text-fg-ghost">·</span>
              <span className="font-mono-ui text-[11px] text-fg-faint">{post.category}</span>
              <span className="font-mono-ui text-[11px] text-fg-ghost">·</span>
              <span className="font-mono-ui text-[11px] text-fg-faint">
                {post.readingTime} min read
              </span>
            </div>
            <h1 className="font-display text-4xl leading-[1.05] text-fg sm:text-[3.25rem]">
              {post.title}
            </h1>
          </header>

          <div className="py-12">
            <Markdown>{body}</Markdown>
          </div>
        </article>

        {next ? (
          <div className="mx-auto max-w-2xl px-6 pb-24 sm:px-8">
            <Link
              href={`/blog/${next.slug}`}
              className="group block rounded-[1.5rem] border border-line bg-bg-raised/40 p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-fg-ghost hover:bg-bg-raised"
            >
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-accent/70">
                Next
              </span>
              <h3 className="mt-2 font-display text-2xl leading-snug text-fg transition-colors group-hover:text-accent-soft">
                {next.title}
              </h3>
            </Link>
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

/** Next article in display order, wrapping around. */
function getNext(post: Post): Post | null {
  const list = sortedPosts.filter((p) => p.type === 'article');
  const idx = list.findIndex((p) => p.slug === post.slug);
  if (idx === -1) return null;
  return list[(idx + 1) % list.length] ?? null;
}
