import Reveal from '@/components/Reveal';
import Section from './Section';
import { projects, type Project } from '@/content/work';

export default function Projects() {
  return (
    <Section id="projects" index="03" label="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const links: { label: string; href: string }[] = [
    project.liveUrl ? { label: 'Live', href: project.liveUrl } : null,
    project.githubUrl ? { label: 'Code', href: project.githubUrl } : null,
    project.paperUrl ? { label: 'Paper', href: project.paperUrl } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="group flex h-full flex-col justify-between rounded-[1.25rem] border border-line bg-bg-raised/40 p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-fg-ghost hover:bg-bg-raised">
      <div>
        <h3 className="font-display text-xl text-fg transition-colors group-hover:text-accent-soft">
          {project.name}
        </h3>
        <p className="mt-3 font-serif-body text-[1.02rem] leading-relaxed text-fg-soft">
          {project.description}
        </p>
      </div>
      {links.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2.5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-fg-faint transition-colors hover:border-accent/50 hover:text-fg"
            >
              {l.label}
              <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
