import Reveal from '@/components/Reveal';
import Section from './Section';
import { reading, featuredQuote } from '@/content/misc';

export default function Reading() {
  return (
    <Section id="reading" index="04" label="Currently Reading">
      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {reading.map((book, i) => (
          <Reveal key={book.title} delay={i * 80}>
            <figure className="group">
              <div className="overflow-hidden rounded-lg border border-line bg-bg-raised">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.coverImage}
                  alt={`${book.title} by ${book.author}`}
                  loading="lazy"
                  className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3">
                <p className="font-display text-[15px] leading-tight text-fg">{book.title}</p>
                <p className="mt-0.5 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                  {book.author}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <blockquote className="mt-14 border-l-2 border-accent pl-6">
          <p className="font-serif-body text-lg italic leading-relaxed text-fg-soft sm:text-xl">
            “{featuredQuote.text}”
          </p>
          <footer className="mt-4 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-fg-faint">
            — {featuredQuote.author}
          </footer>
        </blockquote>
      </Reveal>
    </Section>
  );
}
