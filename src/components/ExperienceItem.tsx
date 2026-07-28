'use client';

import { useState } from 'react';
import type { Experience } from '@/content/work';

interface Props {
  job: Experience;
  align: 'left' | 'right';
}

export default function ExperienceItem({ job, align }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={align === 'right' ? 'sm:ml-auto sm:max-w-[86%]' : 'sm:mr-auto sm:max-w-[86%]'}>
      <div
        className={`overflow-hidden rounded-[1.25rem] border bg-bg-raised/40 transition-colors duration-500 ${
          open ? 'border-fg-ghost' : 'border-line hover:border-fg-ghost'
        }`}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
        >
          <div className="min-w-0">
            <h3 className="font-display text-xl text-fg sm:text-2xl">{job.role}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2.5">
              <span className="text-[15px] text-accent-soft">{job.company}</span>
              {job.location && (
                <>
                  <span className="text-fg-ghost">·</span>
                  <span className="font-mono-ui text-[11px] text-fg-faint">{job.location}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden font-mono-ui text-[11px] uppercase tracking-[0.14em] text-fg-faint sm:inline">
              {job.dates}
            </span>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-line text-fg-faint transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-fg-ghost group-hover:text-fg ${
                open ? 'rotate-180' : ''
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </button>

        {/* grid-rows 0fr→1fr gives a smooth auto-height dropdown */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-line-soft px-6 pb-6 pt-5 sm:px-7">
              <p className="mb-3 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-fg-faint sm:hidden">
                {job.location ? `${job.dates} · ${job.location}` : job.dates}
              </p>
              {job.description ? (
                <p className="max-w-2xl font-serif-body text-[1.05rem] leading-relaxed text-fg-soft">
                  {job.description}
                </p>
              ) : (
                <p className="font-serif-body text-[1.05rem] italic leading-relaxed text-fg-faint">
                  {job.location ? `${job.location} · ${job.dates}` : job.dates}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
