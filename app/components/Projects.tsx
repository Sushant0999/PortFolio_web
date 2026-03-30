
'use client';

import { PROJECTS, Project } from '../data/portfolio';
import { useState, MouseEvent } from 'react';

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-4 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A curation of technical systems, algorithms, and applications I've designed and built.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="group relative rounded-3xl border border-white/10 overflow-hidden glass-card h-full"
        >
            {/* Spotlight Gradient effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.1), transparent 80%)`
                }}
            />

            {/* Content Container (z-10 to stay above spotlight) */}
            <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="h-48 mb-8 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-20"></div>
                    <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 transition-all duration-500 group-hover:bg-sky-500/20 group-hover:scale-110">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                </div>

                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-sky-400 transition-colors tracking-tight">
                        {project.title}
                    </h3>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                <p className="text-slate-400 mb-8 text-sm leading-relaxed grow font-light">
                    {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((t: string, i: number) => (
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
