
import { PROJECTS, Project, ProjectCategory } from '../data/portfolio';
import Link from 'next/link';

export const revalidate = 3600;

async function getDeployedRepos() {
    try {
        const res = await fetch('https://api.github.com/users/Sushant0999/repos?per_page=100');
        if (!res.ok) return [];
        const repos = await res.json();
        return repos.filter((r: any) => 
            !r.fork && 
            (r.homepage || (r.description && (r.description.includes('http') || r.description.includes('www.'))))
        ).sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
    } catch {
        return [];
    }
}

export default async function ProjectsPage() {
    const deployedRepos = await getDeployedRepos();

    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto space-y-32">
                <section>
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
                </section>

                {deployedRepos.length > 0 && (
                <section>
                    <header className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Deployed Apps & Libraries</h2>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            Live projects compiled directly from GitHub repositories with public websites.
                        </p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {deployedRepos.map((repo: any) => (
                            <a 
                                key={repo.id}
                                href={repo.homepage || repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-8 rounded-2xl bg-card-bg border border-white/10 hover:border-sky-500/50 transition-all hover:-translate-y-1 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                                        {repo.language || 'Repository'}
                                    </span>
                                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                                        ⭐ {repo.stargazers_count}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors uppercase">
                                    {repo.name.replace(/[_-]/g, ' ')}
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                                    {repo.description}
                                </p>
                                <span className="text-xs text-sky-500 font-bold tracking-wider uppercase flex items-center gap-2 group-hover:text-white transition-colors">
                                    Visit Deployment →
                                </span>
                            </a>
                        ))}
                    </div>
                </section>
                )}
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
