import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-6 py-40 sm:px-8">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent/60" />
          Error 404
        </p>
        <h1 className="font-display text-5xl leading-[0.95] text-fg sm:text-7xl">
          Nothing here.
        </h1>
        <p className="mt-6 max-w-lg font-serif-body text-xl leading-relaxed text-fg-soft">
          This page doesn’t exist — either it never did, or I deleted it without
          telling anyone. Both are on brand.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-fg py-3 pl-6 pr-2 text-sm font-medium text-bg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
          >
            Take me home
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/blog"
            className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-fg-faint transition-colors hover:text-fg"
          >
            Read something instead
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
