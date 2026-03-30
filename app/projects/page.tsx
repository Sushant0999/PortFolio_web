
import { PROJECTS, Project, ProjectCategory } from '../data/portfolio';
import Link from 'next/link';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        A collection of systems designed for reliability, privacy, and correctness.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </main>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const categoryColors: Record<ProjectCategory, string> = {
        signal: "text-purple-400 border-purple-500/20 hover:border-purple-500/50",
        decision: "text-orange-400 border-orange-500/20 hover:border-orange-500/50",
        system: "text-blue-400 border-blue-500/20 hover:border-blue-500/50",
        trust: "text-green-400 border-green-500/20 hover:border-green-500/50",
    };

    return (
        <Link
            href={`/projects/${project.id}`}
            className={`block p-8 rounded-2xl bg-card-bg border transition-all hover:-translate-y-1 group ${categoryColors[project.category]}`}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                    {project.category}
                </span>
                {project.featured && (
                    <span className="bg-white/10 text-white text-xs px-2 py-1 rounded">Featured</span>
                )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-current transition-colors">
                {project.title}
            </h3>

            <p className="text-slate-400 mb-6 leading-relaxed">
                {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-white/5 text-slate-300 px-2 py-1 rounded border border-white/5">
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
}
