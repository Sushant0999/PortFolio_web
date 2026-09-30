
'use client';

import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import { ProjectCategory } from '../data/portfolio';

interface Props {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
  link: string;
  category: ProjectCategory;
}

const CAT_GLOW: Record<ProjectCategory, string> = {
  signal:   'rgba(168, 85, 247, 0.12)',
  decision: 'rgba(251, 146, 60, 0.12)',
  system:   'rgba(56, 189, 248, 0.12)',
  trust:    'rgba(52, 211, 153, 0.12)',
};

export default function ProjectCardClient({ id, title, shortDescription, tags, link, category }: Props) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl border border-white/10 overflow-hidden glass-card h-full"
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, ${CAT_GLOW[category]}, transparent 80%)`
        }}
      />

      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Icon preview */}
        <div className="h-48 mb-8 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-20" />
          <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 transition-all duration-500 group-hover:bg-sky-500/20 group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>

        {/* Title row */}
        <div className="flex justify-between items-start mb-4">
          <Link
            href={`/projects/${id}`}
            className="text-2xl font-bold group-hover:text-sky-400 transition-colors tracking-tight flex-1 mr-3"
          >
            {title}
          </Link>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Description */}
        <p className="text-slate-400 mb-8 text-sm leading-relaxed grow font-light line-clamp-3">
          {shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((t, i) => (
            <span
              key={i}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-400 border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
