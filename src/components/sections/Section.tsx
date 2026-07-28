import Reveal from '@/components/Reveal';

interface SectionProps {
  id: string;
  index: string; // e.g. "01"
  label: string;
  children: React.ReactNode;
}

/** Editorial split: sticky index + label on the left, content on the right. */
export default function Section({ id, index, label, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="font-mono-ui text-[11px] tracking-[0.2em] text-accent/70">
                {index}
              </span>
              <h2 className="mt-2 font-display text-2xl text-fg">{label}</h2>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
