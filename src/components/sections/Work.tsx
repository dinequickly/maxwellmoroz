import Reveal from '@/components/Reveal';
import Section from './Section';
import ExperienceItem from '@/components/ExperienceItem';
import { experience } from '@/content/work';

export default function Work() {
  return (
    <Section id="work" index="02" label="Experience">
      <div className="space-y-4">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${job.role}`} delay={i * 70}>
            <ExperienceItem job={job} align={i % 2 === 0 ? 'left' : 'right'} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
