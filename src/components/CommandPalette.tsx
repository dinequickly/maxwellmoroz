'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sortedPosts } from '@/content/posts';
import { profile } from '@/content/profile';

export const OPEN_PALETTE_EVENT = 'open-command-palette';

type Cmd = {
  id: string;
  label: string;
  hint: string;
  group: 'Go to' | 'Writing' | 'Elsewhere' | 'Actions';
  action: () => void | Promise<void>;
};

const SECTIONS = [
  { id: 'writing', label: 'Writing' },
  { id: 'work', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'reading', label: 'Reading' },
  { id: 'posts', label: 'On X' },
  { id: 'newsletter', label: 'Newsletter' },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const goHash = useCallback((id: string) => {
    window.location.assign(`/#${id}`);
  }, []);

  const commands = useMemo<Cmd[]>(() => {
    const cmds: Cmd[] = [];

    for (const s of SECTIONS) {
      cmds.push({
        id: `sec-${s.id}`,
        label: s.label,
        hint: 'Section',
        group: 'Go to',
        action: () => goHash(s.id),
      });
    }

    cmds.push({
      id: 'all-writing',
      label: 'All writing',
      hint: 'Index',
      group: 'Writing',
      action: () => router.push('/blog'),
    });
    for (const p of sortedPosts) {
      cmds.push({
        id: `post-${p.slug}`,
        label: p.title,
        hint: p.type === 'paper' ? 'PDF' : `${p.readingTime} min`,
        group: 'Writing',
        action: () => {
          if (p.type === 'paper') window.open(p.pdfUrl, '_blank', 'noopener');
          else router.push(`/blog/${p.slug}`);
        },
      });
    }

    const ext: [string, string][] = [
      ['X / Twitter', profile.socials.twitter],
      ['GitHub', profile.socials.github],
      ['LinkedIn', profile.socials.linkedin],
      ['Substack', profile.socials.substack],
    ];
    for (const [label, href] of ext) {
      cmds.push({
        id: `ext-${label}`,
        label,
        hint: 'External ↗',
        group: 'Elsewhere',
        action: () => {
          window.open(href, '_blank', 'noopener');
        },
      });
    }

    cmds.push({
      id: 'copy-email',
      label: copied ? 'Copied!' : `Copy email — ${profile.email}`,
      hint: 'Clipboard',
      group: 'Actions',
      action: async () => {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
    });

    return cmds;
  }, [router, goHash, copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + ' ' + c.group).toLowerCase().includes(q));
  }, [commands, query]);

  // Toggle via ⌘K / Ctrl+K + open via custom event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = useCallback(
    (cmd: Cmd | undefined) => {
      if (!cmd) return;
      const keepOpen = cmd.id === 'copy-email';
      Promise.resolve(cmd.action()).finally(() => {
        if (!keepOpen) setOpen(false);
      });
    },
    []
  );

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  // keep active item in view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  let lastGroup = '';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-md" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
        className="relative w-full max-w-xl rounded-[1.25rem] border border-line bg-bg-raised/95 p-1.5 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center gap-3 rounded-[calc(1.25rem-0.375rem)] border border-line-soft px-4 py-3">
          <span className="font-mono-ui text-[11px] text-fg-faint">⌘K</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, post, or link…"
            className="w-full bg-transparent font-sans text-[15px] text-fg outline-none placeholder:text-fg-ghost"
          />
        </div>

        <div ref={listRef} className="mt-1.5 max-h-[52vh] overflow-y-auto px-1 pb-1">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center font-mono-ui text-[12px] text-fg-faint">
              Nothing here.
            </p>
          ) : (
            filtered.map((cmd, i) => {
              const showGroup = cmd.group !== lastGroup;
              lastGroup = cmd.group;
              return (
                <div key={cmd.id}>
                  {showGroup ? (
                    <p className="px-3 pb-1 pt-3 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-fg-ghost">
                      {cmd.group}
                    </p>
                  ) : null}
                  <button
                    data-idx={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(cmd)}
                    className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      i === active ? 'bg-white/[0.06]' : ''
                    }`}
                  >
                    <span className="truncate text-[14px] text-fg-soft">{cmd.label}</span>
                    <span className="shrink-0 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-fg-ghost">
                      {cmd.hint}
                    </span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
