import Reveal from '@/components/Reveal';
import { profile } from '@/content/profile';

export default function Newsletter() {
  return (
    <section id="newsletter" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-bg-raised/50 p-10 sm:p-16">
            <p className="eyebrow mb-6">Newsletter</p>
            <h2 className="max-w-2xl font-display text-3xl leading-[1.1] text-fg sm:text-5xl">
              Thoughts on the frontier, in your inbox.
            </h2>
            <p className="mt-5 max-w-xl font-serif-body text-lg leading-relaxed text-fg-soft">
              Occasional essays on AI, the economics of automation, and the companies building it.
              No noise.
            </p>
            <a
              href={profile.socials.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-fg py-3 pl-6 pr-2 text-sm font-medium text-bg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
            >
              Subscribe on Substack
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                  <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
